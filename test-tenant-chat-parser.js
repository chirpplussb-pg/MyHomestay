const assert = require('assert');

function parseTenantChat(rawChat) {
  if (!rawChat || typeof rawChat !== 'string') {
    return {
      name: '',
      phone: '',
      ic: '',
      passport: '',
      email: '',
      vehicle: '',
      adults: 1,
      children: 0,
      guestCount: 1,
      checkIn: '',
      checkOut: '',
      address: '',
      confidence: 0,
      fieldConfidence: {},
      originalChat: rawChat || ''
    };
  }

  const text = rawChat.trim();
  const lines = text.split(/[\r\n]+/);

  const result = {
    name: '',
    phone: '',
    ic: '',
    passport: '',
    email: '',
    vehicle: '',
    adults: 0,
    children: 0,
    guestCount: 0,
    checkIn: '',
    checkOut: '',
    address: '',
    confidence: 0,
    fieldConfidence: {},
    originalChat: text
  };

  // Helper to remove WhatsApp timestamp/sender prefixes like "[10:15, 03/11/2026] Guest: " or "14/11/2026, 2:31 PM - Ali: "
  const cleanLine = (str) => {
    return str
      .replace(/^\[[0-9]{1,2}:[0-9]{2}(?::[0-9]{2})?(?:,\s*[0-9\/\-\.]*)?\]\s*[^:]*:\s*/i, '')
      .replace(/^[0-9\/\-\.]*,\s*[0-9]{1,2}:[0-9]{2}\s*(?:AM|PM|am|pm)?\s*-\s*[^:]*:\s*/i, '')
      .trim();
  };

  const cleanedText = lines.map(cleanLine).join('\n');

  // 1. PHONE NUMBER
  // Check labeled lines first: "No Tel: 019-3829102", "Mobile: +601128919201"
  const phoneLabelMatch = cleanedText.match(/(?:Phone|No\.?\s*Tel(?:efon)?|No\.?\s*Phone|Tel|Mobile|WhatsApp|Contact|Hp|Wasap)\s*[:=]?\s*(\+?[0-9\s-]{9,20})/i);
  if (phoneLabelMatch) {
    const rawDigits = phoneLabelMatch[1].replace(/[\s-]/g, '');
    if (rawDigits.length >= 9) {
      result.phone = phoneLabelMatch[1].trim();
      result.fieldConfidence.phone = 'high';
    }
  }

  // Fallback: look for Malaysian mobile numbers (+601x or 01x)
  if (!result.phone) {
    const phoneRegex = /\b(\+?60[\s-]?1[0-9][\s-]?[0-9]{3,4}[\s-]?[0-9]{4}|01[0-9][\s-]?[0-9]{3,4}[\s-]?[0-9]{4})\b/;
    const phoneMatch = cleanedText.match(phoneRegex);
    if (phoneMatch) {
      result.phone = phoneMatch[1].trim();
      result.fieldConfidence.phone = 'medium';
    }
  }

  // Fallback 2: WhatsApp chat sender phone header: e.g. "2:35 PM - +60 17-882 1928: " or "[10:15] +60123456789: "
  if (!result.phone) {
    const waSenderMatch = rawChat.match(/[-–]\s*(\+?[0-9\s-]{9,20})\s*:/);
    if (waSenderMatch) {
      const digits = waSenderMatch[1].replace(/[\s-]/g, '');
      if (digits.length >= 9) {
        result.phone = waSenderMatch[1].trim();
        result.fieldConfidence.phone = 'medium';
      }
    }
  }

  // 2. MALAYSIAN IC (MyKad)
  // Format: YYMMDD-PB-#### or YYMMDD-PB#### or 12 continuous digits
  const icLabelMatch = cleanedText.match(/(?:No\.?\s*(?:K\/?P|Kad\s*Pengenalan|IC|MyKad)|NRIC|IC\s*(?:No\.?)?)\s*[:=]?\s*([0-9]{6}[-\s]?[0-9]{2}[-\s]?[0-9]{4}|[0-9]{12})/i);
  if (icLabelMatch) {
    const rawIc = icLabelMatch[1].replace(/[\s-]/g, '');
    if (rawIc.length === 12) {
      result.ic = `${rawIc.slice(0, 6)}-${rawIc.slice(6, 8)}-${rawIc.slice(8, 12)}`;
      result.fieldConfidence.ic = 'high';
    }
  }

  // Fallback IC: look for standard 12-digit date-encoded string
  if (!result.ic) {
    const icPattern = /\b([0-9]{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12][0-9]|3[01])[-][0-9]{2}[-][0-9]{4})\b/;
    const icMatch = cleanedText.match(icPattern);
    if (icMatch) {
      result.ic = icMatch[1];
      result.fieldConfidence.ic = 'medium';
    }
  }

  // 3. PASSPORT NUMBER
  // Standard format: Letter followed by 7-9 alphanumeric characters
  const passLabelMatch = cleanedText.match(/(?:Passport(?:\s*(?:No\.?|Number))?|No\.?\s*Pasport)\s*[:=]?\s*([A-Za-z][0-9A-Za-z]{6,12})/i);
  if (passLabelMatch) {
    result.passport = passLabelMatch[1].trim().toUpperCase();
    result.fieldConfidence.passport = 'high';
  }

  // 4. EMAIL ADDRESS
  const emailMatch = cleanedText.match(/\b([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/);
  if (emailMatch) {
    result.email = emailMatch[1].trim().toLowerCase();
    result.fieldConfidence.email = 'high';
  }

  // 5. VEHICLE / CAR PLATE
  // Labeled vehicle line: "No Plat Kereta: VAA 8892 (Proton X50)", "Vehicle: PLA 4521", "Car: WRA 1234"
  const vehicleLabelMatch = cleanedText.match(/(?:No\.?\s*Plat(?:\s*(?:Kereta|Kenderaan))?|No\.?\s*(?:Kereta|Kenderaan)|Vehicle(?:\s*(?:No\.?|Plate))?|Car(?:\s*(?:Plate|No\.?))?|Plat(?:\s*(?:No\.?|Kereta|Kenderaan))?|Plate\s*No\.?|No\.?\s*Pendaftaran)\s*[:=]?\s*([^\n\r,;]{3,45})/i);
  if (vehicleLabelMatch) {
    let vVal = vehicleLabelMatch[1].trim();
    vVal = vVal.replace(/^(?:kereta|car|kenderaan|plat|plate)\s*[:=]?\s*/i, '').trim();
    // Exclude accidental capture of instructions
    if (!/^(tiada|none|na|nil|tak ada)$/i.test(vVal)) {
      result.vehicle = vVal;
      result.fieldConfidence.vehicle = 'high';
    }
  }

  // Conversational fallback: "plate WYY 9821", "plat kete BKA 3322", "Honda City plate WYY 9821"
  if (!result.vehicle) {
    const convoVehicleMatch = cleanedText.match(/(?:kereta|car|kete|plat|plate)\s+([A-Za-z0-9\s]{3,20}\b[A-Za-z]{1,3}\s*[0-9]{1,4}\s*[A-Za-z]?)/i);
    if (convoVehicleMatch) {
      result.vehicle = convoVehicleMatch[1].trim();
      result.fieldConfidence.vehicle = 'medium';
    } else {
      // Standalone Malaysian plate search (1-3 letters + 1-4 numbers + optional suffix letter)
      const plateRegex = /\b([A-Z]{1,3}\s*[0-9]{1,4}\s*[A-Z]?)\b/;
      const potentialPlates = cleanedText.match(new RegExp(plateRegex, 'g'));
      if (potentialPlates) {
        for (const p of potentialPlates) {
          const cleanP = p.trim();
          // Filter out false positives (e.g. "RM 300", "AM", "PM", "IC")
          if (!/^(RM|MYR|AM|PM|IC|SSM|NO|KL|PASSPORT|CHECK|BILL)$/i.test(cleanP) && /\d/.test(cleanP)) {
            result.vehicle = cleanP;
            result.fieldConfidence.vehicle = 'low';
            break;
          }
        }
      }
    }
  }

  // 6. NAME EXTRACTION
  // Labeled Name: "Nama: Mohd Hafiz", "Name: Johnathan David Smith", "Nama saya Siti Nurhaliza"
  const nameLabelMatch = cleanedText.match(/(?:Nama(?:\s*(?:Penuh|Pelanggan|Tetamu|Penyewa|saya))?|Full\s*Name|Name|Guest\s*Name|Tenant\s*Name)\s*[:=]?\s*([^\n\r,;:]{2,50})/i);
  if (nameLabelMatch) {
    let cand = nameLabelMatch[1].trim().replace(/\s{2,}/g, ' ');
    cand = cand.replace(/^(?:saya|adalah|is)\s+/i, '').trim();
    if (cand.length >= 3 && !/^(saya|awak|tuan|puan|homestay|villa)$/i.test(cand)) {
      result.name = cand;
      result.fieldConfidence.name = 'high';
    }
  }

  // Conversational Name: "Nama saya Siti Nurhaliza binti Ramli", "My name is John"
  if (!result.name) {
    const convoNameMatch = cleanedText.match(/(?:Nama\s*saya|My\s*name\s*is|I\s*am|Saya)\s+([A-Za-z\s'’@\/.]{3,40})/i);
    if (convoNameMatch) {
      const cand = convoNameMatch[1].trim().replace(/\s+(nak|ingin|mahu|book|tempah|tanya|berminat).*$/i, '').trim();
      if (cand.length >= 3 && !/\b(nak|tanya|book|homestay)\b/i.test(cand)) {
        result.name = cand;
        result.fieldConfidence.name = 'medium';
      }
    }
  }

  // 7. OCCUPANTS: ADULTS & CHILDREN
  // Adults
  const adultsMatch = cleanedText.match(/(?:([0-9]{1,2})\s*(?:Adults?|Dewasa|Pax\s*Dewasa|Orang\s*Dewasa)|(?:Adults?|Dewasa)\s*[:=]?\s*([0-9]{1,2}))/i);
  if (adultsMatch) {
    result.adults = parseInt(adultsMatch[1] || adultsMatch[2], 10);
    result.fieldConfidence.adults = 'high';
  }

  // Children
  const childrenMatch = cleanedText.match(/(?:([0-9]{1,2})\s*(?:Children|Child|Kids?|Kanak[-\s]?kanak|Kanak2|Budak)|(?:Children|Child|Kids?|Kanak[-\s]?kanak)\s*[:=]?\s*([0-9]{1,2}))/i);
  if (childrenMatch) {
    result.children = parseInt(childrenMatch[1] || childrenMatch[2], 10);
    result.fieldConfidence.children = 'high';
  }

  // Total Guests fallback: "Kami 4 orang", "Total: 5 pax", "5 guests"
  const totalPaxMatch = cleanedText.match(/(?:([0-9]{1,2})\s*(?:Pax|Guests?|Orang|Tetamu|Penghuni)|(?:Pax|Guests?|Tetamu|Occupants?)\s*[:=]?\s*([0-9]{1,2}))/i);
  if (totalPaxMatch) {
    const total = parseInt(totalPaxMatch[1] || totalPaxMatch[2], 10);
    if (!result.adults && !result.children) {
      result.adults = total;
      result.guestCount = total;
      result.fieldConfidence.adults = 'medium';
    }
  }

  if (result.adults || result.children) {
    result.guestCount = (result.adults || 0) + (result.children || 0);
  } else {
    result.adults = 1;
    result.guestCount = 1;
  }

  // 8. CHECK-IN & CHECK-OUT DATES
  const monNames = {
    jan: '01', januari: '01', january: '01',
    feb: '02', februari: '02', february: '02',
    mar: '03', mac: '03', march: '03',
    apr: '04', april: '04',
    may: '05', mei: '05',
    jun: '06', june: '06',
    jul: '07', july: '07', julai: '07',
    aug: '08', ogos: '08', august: '08',
    sep: '09', sept: '09', september: '09',
    oct: '10', okt: '10', oktober: '10', october: '10',
    nov: '11', november: '11',
    dec: '12', dis: '12', disember: '12', december: '12'
  };

  const parseDateStr = (str) => {
    if (!str) return null;
    const s = str.trim();
    // YYYY-MM-DD
    const isoM = s.match(/\b(20[2-3][0-9])-([0-1][0-9])-([0-3][0-9])\b/);
    if (isoM) return `${isoM[1]}-${isoM[2]}-${isoM[3]}`;

    // DD/MM/YYYY or DD-MM-YYYY
    const dmyM = s.match(/\b([0-3]?[0-9])[\/\-]([0-1]?[0-9])[\/\-](20[2-3][0-9])\b/);
    if (dmyM) return `${dmyM[3]}-${dmyM[2].padStart(2, '0')}-${dmyM[1].padStart(2, '0')}`;

    // DD/MM/YY (two-digit year)
    const dmyShort = s.match(/\b([0-3]?[0-9])[\/\-]([0-1]?[0-9])[\/\-]([2-3][0-9])\b/);
    if (dmyShort) return `20${dmyShort[3]}-${dmyShort[2].padStart(2, '0')}-${dmyShort[1].padStart(2, '0')}`;

    // DD Mon YYYY
    const textM = s.match(/\b([0-3]?[0-9])\s+([A-Za-z]{3,9})\s+(20[2-3][0-9])\b/);
    if (textM) {
      const mNum = monNames[textM[2].toLowerCase()];
      if (mNum) return `${textM[3]}-${mNum}-${textM[1].padStart(2, '0')}`;
    }

    return null;
  };

  // Check-In Labeled Line
  const inMatch = cleanedText.match(/(?:Tarikh\s*(?:Masuk|Daftar\s*Masuk|Check[-\s]?in)|Check[-\s]?in(?:\s*Date)?|Masuk|Arrival)\s*[:=]?\s*([^\n\r,;]{5,30})/i);
  if (inMatch) {
    const d = parseDateStr(inMatch[1]);
    if (d) {
      result.checkIn = d;
      result.fieldConfidence.checkIn = 'high';
    }
  }

  // Check-Out Labeled Line
  const outMatch = cleanedText.match(/(?:Tarikh\s*(?:Keluar|Daftar\s*Keluar|Check[-\s]?out)|Check[-\s]?out(?:\s*Date)?|Keluar|Departure)\s*[:=]?\s*([^\n\r,;]{5,30})/i);
  if (outMatch) {
    const d = parseDateStr(outMatch[1]);
    if (d) {
      result.checkOut = d;
      result.fieldConfidence.checkOut = 'high';
    }
  }

  // Date Range Pattern: "10-12-2026 to 13-12-2026" or "5 to 7 Dec 2026"
  if (!result.checkIn || !result.checkOut) {
    // DD to DD Mon YYYY (e.g. "5 to 7 Dec 2026", "15 hingga 18 Disember 2026")
    const dayToDayMatch = cleanedText.match(/\b([0-3]?[0-9])\s*(?:to|hingga|-|sampai)\s*([0-3]?[0-9])\s+([A-Za-z]{3,9})\s+(20[2-3][0-9])\b/i);
    if (dayToDayMatch) {
      const d1 = dayToDayMatch[1].padStart(2, '0');
      const d2 = dayToDayMatch[2].padStart(2, '0');
      const mNum = monNames[dayToDayMatch[3].toLowerCase()];
      const y = dayToDayMatch[4];
      if (mNum) {
        result.checkIn = `${y}-${mNum}-${d1}`;
        result.checkOut = `${y}-${mNum}-${d2}`;
        result.fieldConfidence.checkIn = 'high';
        result.fieldConfidence.checkOut = 'high';
      }
    }
  }

  if (!result.checkIn || !result.checkOut) {
    // Numeric date to numeric date: "10/12/2026 - 13/12/2026"
    const numRangeMatch = cleanedText.match(/\b([0-3]?[0-9][\/\-][0-1]?[0-9][\/\-](?:20)?[2-3][0-9])\s*(?:to|hingga|-|sampai)\s*([0-3]?[0-9][\/\-][0-1]?[0-9][\/\-](?:20)?[2-3][0-9])\b/i);
    if (numRangeMatch) {
      const d1 = parseDateStr(numRangeMatch[1]);
      const d2 = parseDateStr(numRangeMatch[2]);
      if (d1 && d2) {
        result.checkIn = d1;
        result.checkOut = d2;
        result.fieldConfidence.checkIn = 'medium';
        result.fieldConfidence.checkOut = 'medium';
      }
    }
  }

  // 9. ADDRESS EXTRACTION
  const addrMatch = cleanedText.match(/(?:Alamat(?:\s*(?:Kediaman|Rumah|Penuh))?|Address|Home\s*Address|Residential\s*Address|Add)\s*[:=]?\s*([^\n\r]{8,150})/i);
  if (addrMatch) {
    const rawAddr = addrMatch[1].trim();
    if (rawAddr.length >= 8 && !/^(tiada|none|na|nil)$/i.test(rawAddr)) {
      result.address = rawAddr;
      result.fieldConfidence.address = 'high';
    }
  }

  // 10. CONFIDENCE SCORE CALCULATION (0 to 100)
  let score = 0;
  if (result.name) score += 20;
  if (result.phone) score += 20;
  if (result.ic || result.passport) score += 15;
  if (result.checkIn && result.checkOut) score += 20;
  else if (result.checkIn || result.checkOut) score += 10;
  if (result.vehicle) score += 10;
  if (result.email) score += 5;
  if (result.adults > 0) score += 5;
  if (result.address) score += 5;

  result.confidence = Math.min(100, score);

  return result;
}

// ============================================================
// TEST SUITE EXECUTION
// ============================================================
console.log('Testing parseTenantChat engine...\n');

// Test 1: Structured Form in Bahasa Melayu
const chatBM = `
Nama: Mohd Hafiz bin Abdullah
No Tel: 019-3829102
IC: 880415-08-5431
Email: hafiz.abd@gmail.com
No Plat Kereta: VAA 8892 (Proton X50)
Bilangan Tetamu: 4 Dewasa, 2 Kanak-kanak
Tarikh Masuk: 15/12/2026
Tarikh Keluar: 17/12/2026
Alamat: No 25 Jalan Melor 3, Taman Melor, 43000 Kajang, Selangor
`;

const res1 = parseTenantChat(chatBM);
assert.strictEqual(res1.name, 'Mohd Hafiz bin Abdullah');
assert.strictEqual(res1.phone, '019-3829102');
assert.strictEqual(res1.ic, '880415-08-5431');
assert.strictEqual(res1.email, 'hafiz.abd@gmail.com');
assert.strictEqual(res1.vehicle, 'VAA 8892 (Proton X50)');
assert.strictEqual(res1.adults, 4);
assert.strictEqual(res1.children, 2);
assert.strictEqual(res1.guestCount, 6);
assert.strictEqual(res1.checkIn, '2026-12-15');
assert.strictEqual(res1.checkOut, '2026-12-17');
assert.strictEqual(res1.address, 'No 25 Jalan Melor 3, Taman Melor, 43000 Kajang, Selangor');
assert(res1.confidence >= 90);
console.log('✓ 1. Structured BM format extracted perfectly (Confidence: ' + res1.confidence + '%)');

// Test 2: English Tourist with Passport
const chatEN = `
Name: Johnathan David Smith
Passport: A12893456
Mobile: +601128919201
Email: jdsmith@outlook.com
Check-in: 2026-12-20
Check-out: 2026-12-24
Guests: 2 adults and 1 child
Car: WRA 1234
Home address: 42 Elm Street, Melbourne VIC 3000, Australia
`;

const res2 = parseTenantChat(chatEN);
assert.strictEqual(res2.name, 'Johnathan David Smith');
assert.strictEqual(res2.passport, 'A12893456');
assert.strictEqual(res2.phone, '+601128919201');
assert.strictEqual(res2.email, 'jdsmith@outlook.com');
assert.strictEqual(res2.checkIn, '2026-12-20');
assert.strictEqual(res2.checkOut, '2026-12-24');
assert.strictEqual(res2.adults, 2);
assert.strictEqual(res2.children, 1);
assert.strictEqual(res2.vehicle, 'WRA 1234');
assert.strictEqual(res2.address, '42 Elm Street, Melbourne VIC 3000, Australia');
console.log('✓ 2. English tourist with Passport extracted perfectly (Confidence: ' + res2.confidence + '%)');

// Test 3: Conversational Manglish / Rojak WhatsApp Chat
const chatConvo = `
[10:15, 03/11/2026] Guest: Salam tuan, nak tanya homestay Villa Pantai available tak 5 to 7 Dec 2026?
[10:18, 03/11/2026] Host: Salam encik, available. Berapa orang ya?
[10:20, 03/11/2026] Guest: Kami 3 dewasa 2 kanak2. Boleh book terus?
Nama saya Siti Nurhaliza binti Ramli
No phone 0124567890
IC: 920314025678
Kereta Honda City plate WYY 9821
Email: siti.ramli@yahoo.com
Alamat di No 14, Lorong Sentosa 2, Bayan Lepas, 11900 Pulau Pinang
`;

const res3 = parseTenantChat(chatConvo);
assert.strictEqual(res3.name, 'Siti Nurhaliza binti Ramli');
assert.strictEqual(res3.phone, '0124567890');
assert.strictEqual(res3.ic, '920314-02-5678');
assert.strictEqual(res3.email, 'siti.ramli@yahoo.com');
assert.strictEqual(res3.adults, 3);
assert.strictEqual(res3.children, 2);
assert.strictEqual(res3.checkIn, '2026-12-05');
assert.strictEqual(res3.checkOut, '2026-12-07');
assert(res3.vehicle.includes('WYY 9821'));
assert(res3.address.includes('Bayan Lepas'));
console.log('✓ 3. Conversational Rojak WhatsApp chat extracted perfectly (Confidence: ' + res3.confidence + '%)');

// Test 4: Short-form / WhatsApp Chat export
const chatShort = `
14/11/2026, 2:35 PM - +60 17-882 1928:
Name: Kevin Lee
IC/Passport: 950812-14-5523
Email: kevinlee@hotmail.com
Vehicle: PLA 4521
Occupants: 5 adults, 0 kids
Checkin: 10/12/2026
Checkout: 13/12/2026
Address: 18, Jalan SS2/55, 47300 Petaling Jaya
`;

const res4 = parseTenantChat(chatShort);
assert.strictEqual(res4.name, 'Kevin Lee');
assert.strictEqual(res4.phone, '+60 17-882 1928');
assert.strictEqual(res4.ic, '950812-14-5523');
assert.strictEqual(res4.email, 'kevinlee@hotmail.com');
assert.strictEqual(res4.vehicle, 'PLA 4521');
assert.strictEqual(res4.adults, 5);
assert.strictEqual(res4.children, 0);
assert.strictEqual(res4.checkIn, '2026-12-10');
assert.strictEqual(res4.checkOut, '2026-12-13');
console.log('✓ 4. WhatsApp export with mixed labels extracted perfectly (Confidence: ' + res4.confidence + '%)');

console.log('\nAll test cases passed!');
