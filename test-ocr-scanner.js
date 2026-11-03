// Comprehensive Test Suite for Malaysian OCR Receipt & Utility Bill Scanner
const assert = require('assert');
const fs = require('fs');

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
  return {
    id,
    tagName: tagName.toUpperCase(),
    value: '',
    textContent: '',
    innerHTML: '',
    title: '',
    disabled: false,
    style: { display: '' },
    classes: new Set(),
    reset() {},
    classList: {
      parent: null,
      add(c) { this.parent.classes.add(c); },
      remove(c) { this.parent.classes.delete(c); },
      contains(c) { return this.parent.classes.has(c); },
      toggle(c, f) { if (f !== undefined) { f ? this.add(c) : this.remove(c); } else { this.contains(c) ? this.remove(c) : this.add(c); } }
    },
    children: [],
    options: [],
    appendChild(ch) { this.children.push(ch); },
    remove() {},
    addEventListener() {},
    scrollIntoView() {},
    onclick: null,
    getAttribute(attr) { return this[attr] || ''; },
    setAttribute(attr, val) { this[attr] = val; }
  };
}

const elements = {};
function getEl(id, tagName = 'div') {
  if (!elements[id]) {
    const el = createMockElement(id, tagName);
    el.classList.parent = el;
    elements[id] = el;
  }
  return elements[id];
}

globalThis.window = {
  isSecureContext: true,
  addEventListener: () => {},
  removeEventListener: () => {},
  localStorage: mockLocalStorage,
  sessionStorage: mockLocalStorage,
  location: { reload: () => {} },
  open: () => {}
};

globalThis.document = {
  readyState: 'loading',
  getElementById: (id) => getEl(id),
  querySelector: (sel) => {
    const id = sel.replace(/^#/, '');
    return getEl(id);
  },
  querySelectorAll: (sel) => {
    return [];
  },
  createElement: (tag) => {
    const el = createMockElement(`dyn-${Date.now()}-${Math.random()}`, tag);
    el.classList.parent = el;
    return el;
  },
  body: createMockElement('body')
};

globalThis.localStorage = mockLocalStorage;
globalThis.sessionStorage = mockLocalStorage;
globalThis.showToast = (msg) => { toastMessages.push(msg); };
globalThis.alert = (msg) => { alertMessages.push(msg); };

// Load app.js
const appSource = fs.readFileSync('app.js', 'utf8');
const app = require('./app.js');

console.log('============================================================');
console.log('   Malaysian OCR Receipt & Utility Bill Scanner Test Suite');
console.log('============================================================\n');

// 1. Maybank / MAE DuitNow Slip
const maybankText = `
MAE by Maybank2u
Transfer successful
03 Nov 2026, 14:22:15
Reference ID: 2026110300921822
To: HOMESTAY RESOURCES
Account: 512345678901
Amount: RM 350.00
Payment type: DuitNow Transfer
Recipient reference: Ali Homestay
`;
const r1 = app.parseReceiptText(maybankText);
assert.strictEqual(r1.bankName, 'Maybank');
assert.strictEqual(r1.amount, 350.00);
assert.strictEqual(r1.referenceNo, '2026110300921822');
assert.strictEqual(r1.dateOnly, '2026-11-03');
assert.strictEqual(r1.timeOnly, '14:22');
assert.strictEqual(r1.documentType, 'bank_transfer');
console.log('  ✓ 1. Maybank / MAE DuitNow transfer parsed accurately');

// 2. CIMB OCTO / Clicks Slip
const cimbText = `
Status: Successful
Reference: 20261103982181
Date/Time: 03/11/2026 15:45:10
To: MOHD SHARIF BIN AHMAD
Bank: CIMB Bank Berhad
Amount: RM 1,200.00
Payment details: Villa Pantai Deposit
`;
const r2 = app.parseReceiptText(cimbText);
assert.strictEqual(r2.bankName, 'CIMB');
assert.strictEqual(r2.amount, 1200.00);
assert.strictEqual(r2.referenceNo, '20261103982181');
assert.strictEqual(r2.dateOnly, '2026-11-03');
assert.strictEqual(r2.timeOnly, '15:45');
assert.strictEqual(r2.documentType, 'bank_transfer');
console.log('  ✓ 2. CIMB OCTO / Clicks slip parsed accurately');

// 3. Bank Islam / BIMB Slip
const bankIslamText = `
Status: BERJAYA
No. Rujukan: 261103091823910
Tarikh & Masa: 03-11-2026 11:15 AM
Penerima: HOMESTAY SELESA
Jumlah: RM 250.00
Jenis Pindahan: DuitNow
Bank: Bank Islam
`;
const r3 = app.parseReceiptText(bankIslamText);
assert.strictEqual(r3.bankName, 'Bank Islam');
assert.strictEqual(r3.amount, 250.00);
assert.strictEqual(r3.referenceNo, '261103091823910');
assert.strictEqual(r3.dateOnly, '2026-11-03');
assert.strictEqual(r3.timeOnly, '11:15');
assert.strictEqual(r3.documentType, 'bank_transfer');
console.log('  ✓ 3. Bank Islam DuitNow slip parsed accurately');

// 4. Public Bank / PBe Slip
const pbeText = `
Public Bank Berhad
Fund Transfer - Successful
Reference Number: PBE991203912
Transaction Date/Time: 03 Nov 2026 09:30:00
To Account: 3192019201
Beneficiary Name: HOMESTAY DESA
Amount: RM 500.00
`;
const r4 = app.parseReceiptText(pbeText);
assert.strictEqual(r4.bankName, 'Public Bank');
assert.strictEqual(r4.amount, 500.00);
assert.strictEqual(r4.referenceNo, 'PBE991203912');
assert.strictEqual(r4.dateOnly, '2026-11-03');
assert.strictEqual(r4.timeOnly, '09:30');
console.log('  ✓ 4. Public Bank (PBe) transfer parsed accurately');

// 5. RHB Now Slip
const rhbText = `
RHB Now
Transfer Successful
Ref No.: RHB202611038192
Date: 03-11-2026 13:10
To: HOMESTAY IDAMAN
Amount: RM 180.00
`;
const r5 = app.parseReceiptText(rhbText);
assert.strictEqual(r5.bankName, 'RHB');
assert.strictEqual(r5.amount, 180.00);
assert.strictEqual(r5.referenceNo, 'RHB202611038192');
assert.strictEqual(r5.dateOnly, '2026-11-03');
console.log('  ✓ 5. RHB Now transfer parsed accurately');

// 6. Touch 'n Go eWallet
const tngText = `
Touch 'n Go eWallet
Payment Successful
Transaction ID: TNG2026110388912
03 Nov 2026, 04:30 PM
Paid to: HOMESTAY BERKAT
Amount: RM 88.00
`;
const r6 = app.parseReceiptText(tngText);
assert.strictEqual(r6.bankName, "Touch 'n Go eWallet");
assert.strictEqual(r6.amount, 88.00);
assert.strictEqual(r6.referenceNo, 'TNG2026110388912');
assert.strictEqual(r6.dateOnly, '2026-11-03');
assert.strictEqual(r6.timeOnly, '16:30');
console.log('  ✓ 6. Touch \'n Go eWallet parsed accurately');

// 7. Tenaga Nasional Berhad (TNB) Utility Bill
const tnbText = `
TENAGA NASIONAL BERHAD
BIL ELEKTRIK
No Akaun: 220192837492
Tarikh Bil: 28/10/2026
Tempoh Bil: 28/09/2026 - 28/10/2026
Jumlah Perlu Dibayar: RM 148.65
Tarikh Akhir Bayaran: 15/11/2026
`;
const r7 = app.parseReceiptText(tnbText);
assert.strictEqual(r7.documentType, 'utility_bill');
assert.strictEqual(r7.billCategory, 'utilities');
assert.strictEqual(r7.amount, 148.65);
assert.strictEqual(r7.accountNo, '220192837492');
assert.strictEqual(r7.dateOnly, '2026-10-28');
assert(r7.suggestedDescription.includes('TNB Electricity Bill'));
console.log('  ✓ 7. Tenaga Nasional Berhad (TNB) electricity bill parsed accurately');

// 8. Air Selangor / Water Utility Bill
const waterText = `
PENGURUSAN AIR SELANGOR SDN BHD
BIL AIR
No Akaun: 1002938102
Tarikh Bil: 01/11/2026
Jumlah Perlu Dibayar: RM 24.50
Tarikh Akhir: 21/11/2026
`;
const r8 = app.parseReceiptText(waterText);
assert.strictEqual(r8.documentType, 'utility_bill');
assert.strictEqual(r8.billCategory, 'utilities');
assert.strictEqual(r8.amount, 24.50);
assert.strictEqual(r8.accountNo, '1002938102');
assert.strictEqual(r8.dateOnly, '2026-11-01');
console.log('  ✓ 8. Air Selangor water bill parsed accurately');

// 9. Indah Water Konsortium (IWK) Sewerage Bill
const iwkText = `
INDAH WATER KONSORTIUM SDN BHD
BIL PEMBENTUNGAN
No Akaun: 882910394012
Tarikh Bil: 15/10/2026
Jumlah Kena Dibayar: RM 32.00
`;
const r9 = app.parseReceiptText(iwkText);
assert.strictEqual(r9.documentType, 'utility_bill');
assert.strictEqual(r9.billCategory, 'utilities');
assert.strictEqual(r9.amount, 32.00);
assert.strictEqual(r9.accountNo, '882910394012');
console.log('  ✓ 9. Indah Water Konsortium (IWK) sewerage bill parsed accurately');

// 10. Unifi / TM Internet Bill
const unifiText = `
Telekom Malaysia Berhad (TM)
unifi Home Bill
Account No: 1029381092
Bill Date: 20/10/2026
Total Amount Due: RM 136.75
`;
const r10 = app.parseReceiptText(unifiText);
assert.strictEqual(r10.documentType, 'utility_bill');
assert.strictEqual(r10.billCategory, 'utilities');
assert.strictEqual(r10.amount, 136.75);
assert.strictEqual(r10.accountNo, '1029381092');
console.log('  ✓ 10. Unifi / TM internet bill parsed accurately');

// 11. Hardware / DIY Store Expense Receipt
const hardwareText = `
MR. D.I.Y. (M) SDN BHD
TAX INVOICE
DATE: 02/11/2026 18:22
1. LED BULB 12W - RM 15.90
2. BROOM & DUSTPAN - RM 18.50
TOTAL: RM 34.40
CASH: RM 50.00
`;
const r11 = app.parseReceiptText(hardwareText);
assert.strictEqual(r11.documentType, 'general_expense');
assert.strictEqual(r11.billCategory, 'supplies');
assert.strictEqual(r11.amount, 34.40);
assert.strictEqual(r11.dateOnly, '2026-11-02');
console.log('  ✓ 11. MR. DIY supplies receipt parsed accurately');

// 12. Forwarded WhatsApp Text Message from Guest
const waPastedText = `
[Forwarded from Ali]
DuitNow Transfer to MOHD SHARIF
Bank: Maybank
Amount: RM 300.00
Ref: 202611030018291
Date: 03 Nov 2026 14:15
`;
const r12 = app.parseReceiptText(waPastedText);
assert.strictEqual(r12.bankName, 'Maybank');
assert.strictEqual(r12.amount, 300.00);
assert.strictEqual(r12.referenceNo, '202611030018291');
assert.strictEqual(r12.dateOnly, '2026-11-03');
console.log('  ✓ 12. Forwarded WhatsApp text message parsed accurately');

// 13. Expense Modal Prefill with OCR Data
app.appState.properties = [
  { id: 'prop-1', name: 'Villa Pantai' }
];
app.openExpenseModal({
  propertyId: 'prop-1',
  amount: 148.65,
  date: '2026-10-28',
  category: 'utilities',
  description: 'TNB Electricity Bill (Acc: 220192837492)',
  receiptImageData: 'data:image/jpeg;base64,mockbilldata',
  ocrNotice: 'Auto-filled from Bill: TNB RM 148.65'
});

assert.strictEqual(getEl('expenseAmountInput').value, 148.65);
assert.strictEqual(getEl('expenseDateInput').value, '2026-10-28');
assert.strictEqual(getEl('expenseCategorySelect').value, 'utilities');
assert.strictEqual(getEl('expenseDescInput').value, 'TNB Electricity Bill (Acc: 220192837492)');
assert.strictEqual(getEl('expenseReceiptImageData').value, 'data:image/jpeg;base64,mockbilldata');
assert.strictEqual(getEl('expenseModal').classes.has('active'), true);
console.log('  ✓ 13. Expense modal pre-fills with scanned utility bill fields and image attachment');

// 14. Universal OCR Modal Open & Close Lifecycle
app.appState.bookings = [
  { id: 'b-101', propertyId: 'prop-1', guestName: 'Mohd Ali', checkIn: '2026-11-03', status: 'confirmed' }
];
app.openUniversalOcrModal();
assert.strictEqual(getEl('universalOcrModal').classes.has('active'), true);
assert(getEl('universalOcrBookingSelect').children.length >= 1);
assert(getEl('universalOcrPropertySelect').children.length >= 1);
console.log('  ✓ 14. Universal OCR Modal initializes with active bookings and properties');

console.log('\n------------------------------------------------------------');
console.log('All 14 OCR scanner test assertions passed successfully!');
console.log('------------------------------------------------------------\n');
