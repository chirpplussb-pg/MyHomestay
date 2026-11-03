/**
 * test-monthly-invoicing.js
 * Verification suite for Monthly Tenancy Invoicing, WhatsApp message generation,
 * invoice modals, and click handlers.
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('\n============================================================');
console.log('   StayManager: Monthly Tenant Invoicing Verification Suite');
console.log('============================================================\n');

// 1. Mock DOM and Browser Environment
const elements = {};
function mockElement(id, tag = 'div') {
  if (!elements[id]) {
    elements[id] = {
      id,
      tagName: tag.toUpperCase(),
      value: '0',
      textContent: '',
      innerHTML: '',
      style: {},
      classList: {
        _classes: new Set(),
        add(c) { this._classes.add(c); },
        remove(c) { this._classes.delete(c); },
        toggle(c, force) {
          if (force !== undefined) {
            if (force) this._classes.add(c); else this._classes.delete(c);
            return force;
          }
          if (this._classes.has(c)) { this._classes.delete(c); return false; }
          this._classes.add(c); return true;
        },
        contains(c) { return this._classes.has(c); }
      },
      children: [],
      appendChild(child) { this.children.push(child); return child; },
      remove() {},
      querySelectorAll(selector) { return []; },
      setAttribute(k, v) { this[k] = v; },
      getAttribute(k) { return this[k] || null; },
      addEventListener(evt, fn) { this['_on_' + evt] = fn; }
    };
  }
  return elements[id];
}

global.window = global;
global.window.addEventListener = () => {};
global.window.location = { search: '', protocol: 'http:', host: 'localhost', pathname: '/', href: 'http://localhost/' };
global.document = {
  readyState: 'loading',
  getElementById: (id) => mockElement(id),
  querySelectorAll: (sel) => [],
  createElement: (tag) => mockElement(tag + '_' + Math.random(), tag)
};
global.localStorage = {
  _store: {},
  getItem(k) { return this._store[k] || null; },
  setItem(k, v) { this._store[k] = String(v); },
  removeItem(k) { delete this._store[k]; }
};

// Load app module
const app = require('./app.js');

let passedCount = 0;
let failedCount = 0;

function test(title, fn) {
  try {
    fn();
    console.log(`  ✓ ${title}`);
    passedCount++;
  } catch (err) {
    console.error(`  ✗ ${title}: ${err.message}`);
    failedCount++;
  }
}

// Setup test booking data
const sampleMonthlyBooking = {
  id: 'BK-M98765432',
  guestName: 'Encik Farhan Razak',
  guestPhone: '60123456789',
  guestNric: '880512-08-5431',
  guestEmail: 'farhan@example.com',
  guestAddress: 'No. 25, Jalan Harmoni, Shah Alam',
  propertyId: 'p1',
  rentalType: 'monthly',
  checkIn: '2026-11-01',
  checkOut: '2027-04-30',
  monthlyRate: 1600,
  rentalDeposit: 1600,
  utilitiesDeposit: 500,
  agreementFee: 150,
  depositPaid: 1600,
  balance: 2250,
  totalAmount: 3850,
  monthlyDuration: 6,
  status: 'confirmed'
};

app.appState.properties = [{
  id: 'p1',
  name: 'Residensi Damai Luxury Suite',
  propType: 'house',
  address: 'Unit 12-3, Residensi Damai, Shah Alam',
  checkInTime: '3:00 PM',
  checkOutTime: '12:00 PM'
}];
app.appState.settings = {
  currency: 'RM',
  language: 'bm',
  bankName: 'Maybank',
  bankAccNum: '512345678901',
  bankAccHolder: 'Homestay Ventures Sdn Bhd',
  duitNow: '0123456789'
};
app.appState.bookings = [sampleMonthlyBooking];

// TEST 1: WhatsApp Message Generation (No todayStr crash)
test('1. generateWhatsAppMessage produces valid BM monthly rent invoice with date and amount', () => {
  app.appState.activeWaMonthIndex = 2;
  const msg = app.generateWhatsAppMessage(sampleMonthlyBooking, 'monthly_invoice', 'bm');
  assert(msg.includes('INVOIS SEWAAN BULANAN (BULAN KE-2 DRPD 6)'), 'Must include correct header');
  assert(msg.includes('No. Invois: *INV-M2-65432*'), 'Must include invoice number');
  assert(msg.includes('Tarikh Invois: *'), 'Must include formatted invoice date without throwing todayStr error');
  assert(msg.includes('Tarikh Akhir Bayaran: *'), 'Must include payment due date');
  assert(msg.includes('Sewa Bulanan: *RM 1600.00*'), 'Must include monthly rent amount');
  assert(msg.includes('Maybank'), 'Must include bank details');
});

test('2. generateWhatsAppMessage produces valid EN monthly rent invoice with date and amount', () => {
  app.appState.activeWaMonthIndex = 2;
  const msg = app.generateWhatsAppMessage(sampleMonthlyBooking, 'monthly_invoice', 'en');
  assert(msg.includes('MONTHLY RENTAL INVOICE (MONTH 2 OF 6)'), 'Must include EN header');
  assert(msg.includes('Invoice No: *INV-M2-65432*'), 'Must include invoice number');
  assert(msg.includes('Invoice Date: *'), 'Must include formatted invoice date in EN');
  assert(msg.includes('Payment Due Date: *'), 'Must include due date');
  assert(msg.includes('*TOTAL AMOUNT DUE:* *RM 1600.00*'), 'Must include total due');
});

test('3. generateWhatsAppMessage produces valid monthly_rent_receipt in BM & EN', () => {
  app.appState.activeWaMonthIndex = 1;
  const msgBM = app.generateWhatsAppMessage(sampleMonthlyBooking, 'monthly_rent_receipt', 'bm');
  assert(msgBM.includes('RESIT RASMI BAYARAN SEWA (BULAN KE-1)'), 'Must include BM receipt header');
  assert(msgBM.includes('Tarikh: *'), 'Must include date');
  assert(msgBM.includes('SELESAI DIBAYAR (PAID)'), 'Must include paid status');

  const msgEN = app.generateWhatsAppMessage(sampleMonthlyBooking, 'monthly_rent_receipt', 'en');
  assert(msgEN.includes('OFFICIAL RENT PAYMENT RECEIPT (MONTH 1)'), 'Must include EN receipt header');
  assert(msgEN.includes('Date: *'), 'Must include date');
  assert(msgEN.includes('PAID IN FULL'), 'Must include paid in full');
});

// TEST 2: Invoices Data Initialization & Move-In Settlement
test('4. getOrInitMonthlyInvoices creates full 6-month invoice schedule with Month 1 settled via move-in', () => {
  const invs = app.getOrInitMonthlyInvoices(sampleMonthlyBooking);
  assert.strictEqual(invs.length, 6, 'Should generate 6 invoices for 6-month stay');
  assert.strictEqual(invs[0].monthIndex, 1);
  assert.strictEqual(invs[0].status, 'paid', 'Month 1 must be recorded as settled/paid');
  assert.strictEqual(invs[0].settledViaMoveIn, true, 'Month 1 settledViaMoveIn must be true');
  assert.strictEqual(invs[0].noInvoiceRequired, true, 'Month 1 noInvoiceRequired must be true');
  assert.strictEqual(invs[0].notes, 'Month 1 Rental Paid Via Move-In Package', 'Month 1 notes must clearly indicate move-in package');
  assert.strictEqual(invs[1].monthIndex, 2);
  assert.strictEqual(invs[1].status, 'pending', 'Month 2 should be pending');
  assert.strictEqual(invs[1].rentAmount, 1600);
});

// TEST 3: openWhatsAppModal Execution & Invoicing Starts from Month 2
test('5. openWhatsAppModal begins invoice generation from Month 2', () => {
  const waModal = mockElement('whatsappModal');
  waModal.classList.remove('active');

  // Requesting monthly_invoice with month 1 should auto-default to Month 2
  app.openWhatsAppModal(sampleMonthlyBooking, 'monthly_invoice', 1);
  assert(waModal.classList.contains('active'), 'whatsappModal must have active class');
  assert.strictEqual(app.appState.activeWaTemplate, 'monthly_invoice');
  assert.strictEqual(app.appState.activeWaMonthIndex, 2, 'Invoice generation must begin from Month 2');

  const monthSelect = mockElement('waInvoiceMonthSelect');
  assert(monthSelect.children.length >= 2, 'Month select should contain options');
  const optMonth1 = monthSelect.children.find(c => String(c.value) === '1');
  assert(optMonth1 && optMonth1.disabled === true, 'Month 1 option must be disabled for monthly_invoice');
  assert(optMonth1.textContent.includes('TIADA INVOIS') || optMonth1.textContent.includes('NO INVOICE'), 'Month 1 option must show no invoice required');
});

// TEST 4: openMonthlyInvoicesModal Execution
test('6. openMonthlyInvoicesModal opens and sets active state', () => {
  const mModal = mockElement('monthlyInvoicesModal');
  mModal.classList.remove('active');

  app.openMonthlyInvoicesModal(sampleMonthlyBooking);
  assert(mModal.classList.contains('active'), 'monthlyInvoicesModal must have active class');
  assert.strictEqual(mockElement('mInvRateDisplay').textContent, 'RM 1,600.00 / bulan');
});

// TEST 5: toggleMonthlyInvoicePaid protects Month 1
test('7. toggleMonthlyInvoicePaid protects Month 1 settled status and cannot mark it pending', () => {
  const invs = app.getOrInitMonthlyInvoices(sampleMonthlyBooking);
  assert.strictEqual(invs[0].status, 'paid');
  app.toggleMonthlyInvoicePaid(sampleMonthlyBooking.id, 1);
  assert.strictEqual(invs[0].status, 'paid', 'Month 1 must remain settled and cannot be marked pending');
});

// TEST 6: Isolation - Daily Homestay bookings remain untouched
test('8. getOrInitMonthlyInvoices strictly isolates daily homestay bookings and returns empty', () => {
  const dailyBooking = { id: 'BK-D123', rentalType: 'daily', nights: 3, totalAmount: 600 };
  const dailyInvs = app.getOrInitMonthlyInvoices(dailyBooking);
  assert.deepStrictEqual(dailyInvs, [], 'Daily homestays must return empty array from getOrInitMonthlyInvoices');
});

// TEST 7: Backward compatibility - Upgrade existing monthly booking with pending Month 1
test('9. Existing monthly booking with pending Month 1 is auto-upgraded to paid via move-in package', () => {
  const legacyBooking = {
    id: 'BK-LEGACY-001',
    rentalType: 'monthly',
    monthlyDuration: 3,
    monthlyRate: 1200,
    monthlyInvoices: [
      { monthIndex: 1, status: 'pending', notes: '' },
      { monthIndex: 2, status: 'pending', notes: '' },
      { monthIndex: 3, status: 'pending', notes: '' }
    ]
  };
  const invs = app.getOrInitMonthlyInvoices(legacyBooking);
  assert.strictEqual(invs[0].status, 'paid', 'Month 1 must be auto-upgraded to paid');
  assert.strictEqual(invs[0].settledViaMoveIn, true, 'Month 1 must be marked settledViaMoveIn');
  assert.strictEqual(invs[0].notes, 'Month 1 Rental Paid Via Move-In Package', 'Month 1 notes must be updated');
  assert.strictEqual(invs[1].status, 'pending', 'Month 2 remains pending');
});

// TEST 8: Ageing & Outstanding Balance excludes Month 1
test('10. Financial reports and outstanding checks treat Month 1 as paid, not overdue or pending', () => {
  const invs = app.getOrInitMonthlyInvoices(sampleMonthlyBooking);
  const pendingInvs = invs.filter(x => x.status === 'pending');
  assert(!pendingInvs.some(x => x.monthIndex === 1), 'Month 1 must not be in pending invoices list');
  const overdueInvs = invs.filter(x => x.status === 'pending' && x.dueDate < '2099-01-01');
  assert(!overdueInvs.some(x => x.monthIndex === 1), 'Month 1 must never be counted in overdue lists');
});

// Summary
console.log('\n------------------------------------------------------------');
console.log(`Test Results: ${passedCount} passed, ${failedCount} failed`);
console.log('------------------------------------------------------------\n');

if (failedCount > 0) process.exit(1);
