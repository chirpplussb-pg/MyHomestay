// Comprehensive Integration Test Suite for Smart WhatsApp Chat Import
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// Mock browser globals for app loading
if (!globalThis.crypto) {
  const { webcrypto } = require('crypto');
  globalThis.crypto = webcrypto;
}

const storageStore = {};
const mockLocalStorage = {
  getItem(k) { return storageStore[k] || null; },
  setItem(k, v) { storageStore[k] = String(v); },
  removeItem(k) { delete storageStore[k]; },
  clear() { for (const k in storageStore) delete storageStore[k]; }
};

let toastMessages = [];
let alertMessages = [];

function createMockElement(id, tagName = 'div') {
  const elem = {
    id,
    tagName: tagName.toUpperCase(),
    value: '',
    textContent: '',
    innerHTML: '',
    title: '',
    disabled: false,
    style: { display: '' },
    classes: new Set(),
    reset() { this.value = ''; },
    children: [],
    options: [],
    appendChild(ch) { this.children.push(ch); },
    remove() {},
    addEventListener() {},
    scrollIntoView() {},
    onclick: null,
    getAttribute(attr) { return this[attr] || ''; },
    setAttribute(attr, val) { this[attr] = val; },
    removeAttribute(attr) { delete this[attr]; }
  };
  elem.classList = {
    parent: elem,
    add(c) { elem.classes.add(c); },
    remove(c) { elem.classes.delete(c); },
    contains(c) { return elem.classes.has(c); },
    toggle(c, f) { if (f !== undefined) { f ? this.add(c) : this.remove(c); } else { this.contains(c) ? this.remove(c) : this.add(c); } }
  };
  return elem;
}

const elements = {};
function getOrCreateElement(id) {
  if (!elements[id]) {
    elements[id] = createMockElement(id);
  }
  return elements[id];
}

global.window = {
  isSecureContext: true,
  addEventListener: () => {},
  removeEventListener: () => {},
  localStorage: mockLocalStorage,
  sessionStorage: mockLocalStorage,
  location: { search: '', hash: '', pathname: '/', reload: () => {} },
  open: () => {}
};
global.localStorage = mockLocalStorage;
global.navigator = { clipboard: { readText: async () => 'sample clipboard' } };
global.document = {
  readyState: 'loading',
  getElementById(id) { return getOrCreateElement(id); },
  querySelector(sel) { return createMockElement(sel); },
  querySelectorAll(sel) { return []; },
  createElement(tag) { return createMockElement('dynamic-' + Math.random(), tag); },
  addEventListener() {}
};
global.alert = (msg) => alertMessages.push(msg);
global.showToast = (msg) => toastMessages.push(msg);

console.log('====================================================');
console.log('RUNNING SMART WHATSAPP CHAT IMPORT INTEGRATION TESTS');
console.log('====================================================\n');

// 1. Load app.js module exports
const app = require('./app.js');

// Verify exports exist
assert(typeof app.parseTenantChat === 'function', 'parseTenantChat should be exported from app.js');
assert(typeof app.extractTenantChat === 'function', 'extractTenantChat should be exported from app.js');
assert(typeof app.openTenantChatImportModal === 'function', 'openTenantChatImportModal should be exported from app.js');
assert(typeof app.closeTenantChatImportModal === 'function', 'closeTenantChatImportModal should be exported from app.js');
console.log('✓ 1. app.js exports parseTenantChat, extractTenantChat, openTenantChatImportModal');

// 2. Test Structured BM Format
const bmChat = `
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

const resBM = app.parseTenantChat(bmChat);
assert.strictEqual(resBM.name, 'Mohd Hafiz bin Abdullah');
assert.strictEqual(resBM.phone, '019-3829102');
assert.strictEqual(resBM.ic, '880415-08-5431');
assert.strictEqual(resBM.email, 'hafiz.abd@gmail.com');
assert.strictEqual(resBM.vehicle, 'VAA 8892 (Proton X50)');
assert.strictEqual(resBM.adults, 4);
assert.strictEqual(resBM.children, 2);
assert.strictEqual(resBM.guestCount, 6);
assert.strictEqual(resBM.checkIn, '2026-12-15');
assert.strictEqual(resBM.checkOut, '2026-12-17');
assert.strictEqual(resBM.address, 'No 25 Jalan Melor 3, Taman Melor, 43000 Kajang, Selangor');
assert(resBM.confidence >= 90, 'Confidence should be >= 90 for full particulars');
assert.strictEqual(resBM.originalChat, bmChat.trim());
console.log('✓ 2. Structured BM format: 11 fields extracted accurately (Confidence: ' + resBM.confidence + '%)');

// 3. Test English Tourist / Expat with Passport
const enChat = `
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

const resEN = app.parseTenantChat(enChat);
assert.strictEqual(resEN.name, 'Johnathan David Smith');
assert.strictEqual(resEN.passport, 'A12893456');
assert.strictEqual(resEN.phone, '+601128919201');
assert.strictEqual(resEN.email, 'jdsmith@outlook.com');
assert.strictEqual(resEN.checkIn, '2026-12-20');
assert.strictEqual(resEN.checkOut, '2026-12-24');
assert.strictEqual(resEN.adults, 2);
assert.strictEqual(resEN.children, 1);
assert.strictEqual(resEN.guestCount, 3);
assert.strictEqual(resEN.vehicle, 'WRA 1234');
assert.strictEqual(resEN.address, '42 Elm Street, Melbourne VIC 3000, Australia');
assert(resEN.confidence >= 90);
console.log('✓ 3. English tourist with Passport: 11 fields extracted accurately (Confidence: ' + resEN.confidence + '%)');

// 4. Test Conversational Rojak / Manglish WhatsApp Chat
const convoChat = `
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

const resConvo = app.parseTenantChat(convoChat);
assert.strictEqual(resConvo.name, 'Siti Nurhaliza binti Ramli');
assert.strictEqual(resConvo.phone, '0124567890');
assert.strictEqual(resConvo.ic, '920314-02-5678');
assert.strictEqual(resConvo.email, 'siti.ramli@yahoo.com');
assert.strictEqual(resConvo.adults, 3);
assert.strictEqual(resConvo.children, 2);
assert.strictEqual(resConvo.guestCount, 5);
assert.strictEqual(resConvo.checkIn, '2026-12-05');
assert.strictEqual(resConvo.checkOut, '2026-12-07');
assert(resConvo.vehicle.includes('WYY 9821'));
assert(resConvo.address.includes('Bayan Lepas'));
console.log('✓ 4. Conversational Rojak WhatsApp chat extracted accurately (Confidence: ' + resConvo.confidence + '%)');

// 5. Test Exported WhatsApp Chat with Header Phone
const exportChat = `
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

const resExport = app.parseTenantChat(exportChat);
assert.strictEqual(resExport.name, 'Kevin Lee');
assert.strictEqual(resExport.phone, '+60 17-882 1928');
assert.strictEqual(resExport.ic, '950812-14-5523');
assert.strictEqual(resExport.email, 'kevinlee@hotmail.com');
assert.strictEqual(resExport.vehicle, 'PLA 4521');
assert.strictEqual(resExport.adults, 5);
assert.strictEqual(resExport.children, 0);
assert.strictEqual(resExport.checkIn, '2026-12-10');
assert.strictEqual(resExport.checkOut, '2026-12-13');
console.log('✓ 5. Exported chat with sender phone header extracted accurately');

// 6. Test Safe Empty and Partial Inputs
const resEmpty = app.parseTenantChat('');
assert.strictEqual(resEmpty.confidence, 0);
assert.strictEqual(resEmpty.adults, 1);
assert.strictEqual(resEmpty.guestCount, 1);
assert.strictEqual(resEmpty.name, '');

const partialChat = `Nama: Ali bin Abu\nPhone: 012-3344556`;
const resPartial = app.parseTenantChat(partialChat);
assert.strictEqual(resPartial.name, 'Ali bin Abu');
assert.strictEqual(resPartial.phone, '012-3344556');
assert.strictEqual(resPartial.confidence, 45);
console.log('✓ 6. Safe handling of empty & partial input states');

// 7. Verify index.html elements
const htmlContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

assert(htmlContent.includes('id="btnImportTenantChatBooking"'), 'index.html must have #btnImportTenantChatBooking in Bookings tab');
assert(htmlContent.includes('id="btnImportTenantChatContact"'), 'index.html must have #btnImportTenantChatContact in Contacts card');
assert(htmlContent.includes('id="tenantChatImportModal"'), 'index.html must have #tenantChatImportModal');
assert(htmlContent.includes('id="tenantChatInput"'), 'index.html must have #tenantChatInput');
assert(htmlContent.includes('id="btnExtractTenantChat"'), 'index.html must have #btnExtractTenantChat');
assert(htmlContent.includes('id="tenantChatResultCard"'), 'index.html must have #tenantChatResultCard');
assert(htmlContent.includes('id="tenantChatConfidenceBadge"'), 'index.html must have #tenantChatConfidenceBadge');
assert(htmlContent.includes('id="btnApplyChatToBooking"'), 'index.html must have #btnApplyChatToBooking');
assert(htmlContent.includes('id="btnApplyChatToContact"'), 'index.html must have #btnApplyChatToContact');
assert(htmlContent.includes('id="btnApplyChatToBoth"'), 'index.html must have #btnApplyChatToBoth');
assert(htmlContent.includes('id="tenantChatOriginalText"'), 'index.html must have #tenantChatOriginalText');
assert(htmlContent.includes('value="tenant"'), 'index.html must have tenant category option in contactCategorySelect');
// Company booking elements
assert(htmlContent.includes('id="btnSampleChatCompany"'), 'index.html must have #btnSampleChatCompany');
assert(htmlContent.includes('id="tenantChatBookingTypeSegmented"'), 'index.html must have #tenantChatBookingTypeSegmented');
assert(htmlContent.includes('id="tenantChatFieldsIndividual"'), 'index.html must have #tenantChatFieldsIndividual');
assert(htmlContent.includes('id="tenantChatFieldsCompany"'), 'index.html must have #tenantChatFieldsCompany');
assert(htmlContent.includes('id="tenantChatResultCompanyName"'), 'index.html must have #tenantChatResultCompanyName');
assert(htmlContent.includes('id="tenantChatResultCompanyRegNo"'), 'index.html must have #tenantChatResultCompanyRegNo');
assert(htmlContent.includes('id="tenantChatResultPicName"'), 'index.html must have #tenantChatResultPicName');
assert(htmlContent.includes('id="tenantChatResultPicPosition"'), 'index.html must have #tenantChatResultPicPosition');
assert(htmlContent.includes('id="tenantChatResultPicPhone"'), 'index.html must have #tenantChatResultPicPhone');
assert(htmlContent.includes('id="tenantChatResultPicEmail"'), 'index.html must have #tenantChatResultPicEmail');
assert(htmlContent.includes('id="tenantChatResultCompanyAddress"'), 'index.html must have #tenantChatResultCompanyAddress');
assert(htmlContent.includes('id="tenantChatResultCompanyGuests"'), 'index.html must have #tenantChatResultCompanyGuests');
console.log('✓ 7. index.html contains all required buttons, modal markup, individual/company segmented control and fields');

// 8. Verify styles.css classes
const cssContent = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8');
assert(cssContent.includes('.badge-tenant'), 'styles.css must style .badge-tenant');
assert(cssContent.includes('.tenant-chat-confidence-badge'), 'styles.css must style .tenant-chat-confidence-badge');
assert(cssContent.includes('.tenant-chat-confidence-badge.high'), 'styles.css must style high confidence');
assert(cssContent.includes('.tenant-chat-confidence-badge.medium'), 'styles.css must style medium confidence');
assert(cssContent.includes('.tenant-chat-confidence-badge.low'), 'styles.css must style low confidence');
console.log('✓ 8. styles.css contains tenant category badge and confidence rating styles');

// 9. Test Company Booking Extraction
const companyChat = `
Company Name: Gamuda Engineering Sdn Bhd
SSM: 202101008899 (1409123-T)
PIC Name: Ts. Ir. Azman bin Mokhtar
PIC Position: Senior Project Director
PIC Phone: 013-9876543
PIC Email: azman.mokhtar@gamuda.com.my
Company Address: Menara Gamuda, PJ Trade Centre, No. 8 Jalan PJU 8/8A, Bandar Damansara Perdana, 47820 Petaling Jaya, Selangor
Number of Guests: 6
Check-In Date: 2026-12-01
Check-Out Date: 2026-12-05
`;

const resComp = app.parseTenantChat(companyChat);
assert.strictEqual(resComp.bookingType, 'company', 'Booking type should auto-detect as company');
assert.strictEqual(resComp.companyName, 'Gamuda Engineering Sdn Bhd', 'Company name must be extracted');
assert.strictEqual(resComp.companyRegNo, '202101008899 (1409123-T)', 'SSM number must be extracted');
assert.strictEqual(resComp.picName, 'Ts. Ir. Azman bin Mokhtar', 'PIC name must be extracted');
assert.strictEqual(resComp.contactPerson, 'Ts. Ir. Azman bin Mokhtar', 'contactPerson alias must match picName');
assert.strictEqual(resComp.picPosition, 'Senior Project Director', 'PIC position must be extracted');
assert.strictEqual(resComp.contactDesignation, 'Senior Project Director', 'contactDesignation alias must match picPosition');
assert.strictEqual(resComp.picPhone, '013-9876543', 'PIC phone must be extracted');
assert.strictEqual(resComp.contactPhone, '013-9876543', 'contactPhone alias must match picPhone');
assert.strictEqual(resComp.picEmail, 'azman.mokhtar@gamuda.com.my', 'PIC email must be extracted');
assert.strictEqual(resComp.contactEmail, 'azman.mokhtar@gamuda.com.my', 'contactEmail alias must match picEmail');
assert(resComp.companyAddress.includes('Petaling Jaya, Selangor'), 'Company address must be extracted');
assert.strictEqual(resComp.guestCount, 6, 'Number of guests must be extracted');
assert.strictEqual(resComp.checkIn, '2026-12-01', 'Check-in date must be extracted');
assert.strictEqual(resComp.checkOut, '2026-12-05', 'Check-out date must be extracted');
assert(resComp.confidence >= 90, 'Confidence score should be >= 90 for complete company particulars');
console.log('✓ 9. Company booking: all 10 corporate fields extracted accurately (Confidence: ' + resComp.confidence + '%)');

// 10. Test Detection of Required Company Indicators
const testIndicators = [
  { text: 'Syarikat: Jaya Megah Sdn Bhd\nTel: 012-3344556', expected: 'Sdn Bhd' },
  { text: 'SSM No: 202001009988\nPhone: 019-2233445', expected: 'SSM' },
  { text: 'Booking for Maju Jaya Enterprise\nContact: 016-7788990', expected: 'Enterprise' },
  { text: 'Company: Prime City Holdings\nTel: 018-9988776', expected: 'Holdings' },
  { text: 'Syarikat: Mega Resources\nTel: 017-5566778', expected: 'Resources' },
  { text: 'Employer: Sun Industries\nPhone: 011-22334455', expected: 'Industries' },
  { text: 'Company: Apex Precision Manufacturing\nTel: 012-8877665', expected: 'Manufacturing' },
  { text: 'PIC: Encik Roslan Hamid\nJawatan: Site Manager\nNo Tel: 013-4455667', expected: 'PIC' }
];

testIndicators.forEach(({ text, expected }) => {
  const parsed = app.parseTenantChat(text);
  assert.strictEqual(parsed.bookingType, 'company', `Should auto-detect company for indicator: ${expected}`);
  assert(parsed.companyIndicators.includes(expected), `companyIndicators must contain '${expected}'`);
});
console.log('✓ 10. All 8 company indicators verified: Sdn Bhd, SSM, Enterprise, Holdings, Resources, Industries, Manufacturing, PIC');

// 11. Test Foreign Guest Passport Unified into Identification Number (Constraint 7)
const foreignChat = `
Name: Jean-Luc Picard
Passport: E8829104
Phone: +33612345678
Email: jl.picard@enterprise.org
Check-in: 2026-11-20
Check-out: 2026-11-25
`;
// Force bookingType: 'individual' so indicator in domain doesn't override
const resForeign = app.parseTenantChat(foreignChat, { bookingType: 'individual' });
assert.strictEqual(resForeign.passport, 'E8829104', 'Passport must be captured');
assert.strictEqual(resForeign.ic, 'E8829104', 'Passport must populate the same Identification Number field (Constraint 7)');
console.log('✓ 11. Foreign guest Passport unified into Identification Number (IC) field (Constraint 7)');

// 12. Test Occupant Names Not Required for Company Bookings (Constraint 1)
const corporateChatNoOccupants = `
Company: Apex Resources Sdn Bhd
SSM: 202201005544
PIC: Sarah Tan
PIC Phone: 012-9988112
Check-In: 2026-12-10
Check-Out: 2026-12-12
Number of Guests: 4
`;
const resCorpNoOcc = app.parseTenantChat(corporateChatNoOccupants);
assert.strictEqual(resCorpNoOcc.bookingType, 'company');
assert.strictEqual(resCorpNoOcc.guestCount, 4);
assert.strictEqual(resCorpNoOcc.companyName, 'Apex Resources Sdn Bhd');
assert.strictEqual(resCorpNoOcc.picName, 'Sarah Tan');
console.log('✓ 12. Occupant names are not required for company bookings (Constraint 1)');

// 13. Test openBookingModal Pre-filling for Company Booking
let mockProp = { id: 'p1', name: 'Villa Pantai', propType: 'whole_unit', defaultRate: 350, cleaningFee: 50 };
app.appState.properties = [mockProp];
app.appState.selectedPropertyId = 'p1';

app.openBookingModal(null, '2026-12-01', 'p1', {
  tenantType: 'company',
  companyName: 'Gamuda Engineering Sdn Bhd',
  companyRegNo: '202101008899 (1409123-T)',
  companyAddress: 'PJ Trade Centre, Petaling Jaya',
  contactPerson: 'Ts. Ir. Azman bin Mokhtar',
  contactDesignation: 'Senior Project Director',
  contactPhone: '013-9876543',
  contactEmail: 'azman.mokhtar@gamuda.com.my',
  guestCount: 6,
  checkIn: '2026-12-01',
  checkOut: '2026-12-05'
});

assert.strictEqual(getOrCreateElement('bookingTenantType').value, 'company', 'bookingTenantType must be set to company');
assert.strictEqual(getOrCreateElement('bookingCompanyName').value, 'Gamuda Engineering Sdn Bhd');
assert.strictEqual(getOrCreateElement('bookingCompanyRegNo').value, '202101008899 (1409123-T)');
assert.strictEqual(getOrCreateElement('bookingContactPerson').value, 'Ts. Ir. Azman bin Mokhtar');
assert.strictEqual(getOrCreateElement('bookingContactDesignation').value, 'Senior Project Director');
assert.strictEqual(getOrCreateElement('bookingContactPhone').value, '013-9876543');
assert.strictEqual(getOrCreateElement('bookingContactEmail').value, 'azman.mokhtar@gamuda.com.my');
assert.strictEqual(getOrCreateElement('bookingGuestCount').value, 6);
console.log('✓ 13. openBookingModal pre-fills company details seamlessly (tenantType: company)');

// 14. Test async extractTenantChat (offline engine default)
app.extractTenantChat(bmChat).then((result) => {
  assert.strictEqual(result.name, 'Mohd Hafiz bin Abdullah');
  assert.strictEqual(result.engine, 'offline');
  console.log('✓ 14. extractTenantChat async offline engine works seamlessly');

  console.log('\n====================================================');
  console.log('ALL 14 SMART WHATSAPP CHAT IMPORT TESTS PASSED!');
  console.log('====================================================');
}).catch(err => {
  console.error('Async test failed:', err);
  process.exit(1);
});
