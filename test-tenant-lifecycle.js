// ==========================================================================
// Comprehensive Test Suite: Tenant Lifecycle Management & Repeat Guest Recognition
// ==========================================================================
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
    dataset: {},
    style: { display: '', width: '' },
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
    removeAttribute(attr) { delete this[attr]; },
    querySelectorAll() { return []; },
    querySelector() { return null; }
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

const mockDocument = {
  readyState: 'loading',
  getElementById(id) {
    return getOrCreateElement(id);
  },
  querySelector(sel) {
    if (sel.startsWith('#')) return getOrCreateElement(sel.slice(1));
    return createMockElement('sel-' + Math.random().toString(36).substr(2, 4));
  },
  querySelectorAll() {
    return [];
  },
  createElement(tag) {
    return createMockElement('dyn-' + Math.random().toString(36).substr(2, 5), tag);
  },
  addEventListener() {}
};

globalThis.window = {
  addEventListener() {},
  location: { search: '' },
  localStorage: mockLocalStorage,
  sessionStorage: mockLocalStorage,
  document: mockDocument
};
globalThis.document = mockDocument;
globalThis.localStorage = mockLocalStorage;
globalThis.sessionStorage = mockLocalStorage;
globalThis.navigator = { onLine: true };
globalThis.showToast = (msg) => { toastMessages.push(msg); };
globalThis.alert = (msg) => { alertMessages.push(msg); };

const app = require('./app.js');
const {
  appState,
  getGuestStayStats,
  syncTenantLifecycleStatus,
  checkBookingRepeatGuest,
  applyRepeatGuestDetails,
  renderSettingsContactList,
  renderDashboardTab,
  normalizePhoneNumber,
  normalizeIdNumber
} = app;

console.log('====================================================');
console.log('TENANT LIFECYCLE & REPEAT GUEST RECOGNITION TEST SUITE');
console.log('====================================================\n');

// ----------------------------------------------------
// Test 1: app.js Exports & Function Availability
// ----------------------------------------------------
assert.strictEqual(typeof getGuestStayStats, 'function', 'getGuestStayStats must be exported');
assert.strictEqual(typeof syncTenantLifecycleStatus, 'function', 'syncTenantLifecycleStatus must be exported');
assert.strictEqual(typeof checkBookingRepeatGuest, 'function', 'checkBookingRepeatGuest must be exported');
assert.strictEqual(typeof applyRepeatGuestDetails, 'function', 'applyRepeatGuestDetails must be exported');
assert.strictEqual(typeof normalizeIdNumber, 'function', 'normalizeIdNumber must be exported');
console.log('✓ 1. app.js exports all required lifecycle & recognition functions');

// ----------------------------------------------------
// Test 2: Identification Matching Hierarchy: Phone FIRST, ID SECOND
// ----------------------------------------------------
appState.bookings = [
  {
    id: 'b-101',
    guestName: 'Ahmad Albab',
    guestPhone: '012-345 6789',
    guestNric: '900101-01-1111',
    checkIn: '2026-01-10',
    checkOut: '2026-01-12',
    totalAmount: 500,
    status: 'completed'
  },
  {
    id: 'b-102',
    guestName: 'Bakar Daud',
    guestPhone: '019-876 5432',
    guestNric: '900101-01-1111', // Colliding IC with Ahmad, but different phone
    checkIn: '2026-02-10',
    checkOut: '2026-02-12',
    totalAmount: 600,
    status: 'completed'
  }
];
appState.contacts = [];

// When searching by phone 0123456789 (matches Ahmad), even if IC is 900101011111, phone match takes precedence
const phoneMatch = getGuestStayStats('012-3456789', '900101011111');
assert.strictEqual(phoneMatch.matched, true, 'Should find match');
assert.strictEqual(phoneMatch.matchedBy, 'phone', 'Must match by phone number first');
assert.strictEqual(phoneMatch.tenant.name, 'Ahmad Albab', 'Should resolve to Ahmad Albab via phone match');

// When phone does NOT match any record, fallback to IC second
const icMatch = getGuestStayStats('011-99999999', '900101-01-1111');
assert.strictEqual(icMatch.matched, true, 'Should match by IC fallback');
assert.strictEqual(icMatch.matchedBy, 'id', 'Must match by Identification Number second');
console.log('✓ 2. Identification Matching Hierarchy verified: Phone FIRST, ID SECOND (Requirement 5)');

// ----------------------------------------------------
// Test 3: Metric Tracking: firstStayDate, lastStayDate, totalStays, lifetimeRevenue
// ----------------------------------------------------
appState.bookings = [
  {
    id: 'b-201',
    guestName: 'Siti Sarah',
    guestPhone: '+6013-1112233',
    guestNric: '950505-10-5555',
    checkIn: '2026-01-05',
    checkOut: '2026-01-07',
    totalAmount: 400,
    status: 'completed'
  },
  {
    id: 'b-202',
    guestName: 'Siti Sarah',
    guestPhone: '0131112233',
    guestNric: '950505-10-5555',
    checkIn: '2026-03-15',
    checkOut: '2026-03-18',
    totalAmount: 750,
    status: 'completed'
  },
  {
    id: 'b-203',
    guestName: 'Siti Sarah',
    guestPhone: '60131112233',
    guestNric: '950505-10-5555',
    checkIn: '2026-05-20',
    checkOut: '2026-05-22',
    totalAmount: 450,
    status: 'completed'
  },
  {
    id: 'b-204-cancelled',
    guestName: 'Siti Sarah',
    guestPhone: '60131112233',
    guestNric: '950505-10-5555',
    checkIn: '2026-06-01',
    checkOut: '2026-06-03',
    totalAmount: 1000,
    status: 'cancelled' // Cancelled stays must not count towards stats
  }
];

const statsSarah = getGuestStayStats('013-111 2233', '950505105555');
assert.strictEqual(statsSarah.totalStays, 3, 'Total stays must be 3 (excluding cancelled)');
assert.strictEqual(statsSarah.lifetimeRevenue, 1600, 'Lifetime revenue must sum 400 + 750 + 450 = 1600');
assert.strictEqual(statsSarah.firstStayDate, '2026-01-05', 'First stay date must be 2026-01-05');
assert.strictEqual(statsSarah.lastStayDate, '2026-05-20', 'Last stay date must be 2026-05-20');
console.log('✓ 3. Metric Tracking verified: firstStayDate, lastStayDate, totalStays, lifetimeRevenue (Requirement 6)');

// ----------------------------------------------------
// Test 4: Automatic Lifecycle Transition: Daily Checked Out -> Completed
// ----------------------------------------------------
appState.contacts = [
  {
    id: 'c-guest-daily',
    name: 'Mohd Fadzil',
    category: 'tenant',
    phone: '017-7788990',
    ic: '880808-08-8888',
    status: 'active'
  }
];

// Active stay
appState.bookings = [
  {
    id: 'b-daily-1',
    guestName: 'Mohd Fadzil',
    guestPhone: '017-7788990',
    guestNric: '880808-08-8888',
    checkIn: '2026-11-01',
    checkOut: '2026-11-05',
    status: 'confirmed',
    rentalType: 'daily'
  }
];

syncTenantLifecycleStatus('2026-11-03');
const fadzilContact1 = appState.contacts.find(c => c.id === 'c-guest-daily');
assert.strictEqual(fadzilContact1.status, 'active', 'Mohd Fadzil must be active while stay is ongoing');

// Guest checks out
appState.bookings[0].status = 'checked-out';
syncTenantLifecycleStatus('2026-11-03');
assert.strictEqual(fadzilContact1.status, 'completed', 'Mohd Fadzil must automatically transition to Completed upon checkout (Requirement 2)');
console.log('✓ 4. Automatic status transition verified: Daily Stay Checked Out -> Completed');

// ----------------------------------------------------
// Test 5: Automatic Lifecycle Transition: Long-Term Tenancy Vacated/Completed -> Completed
// ----------------------------------------------------
appState.contacts.push({
  id: 'c-monthly-tenant',
  name: 'Tan Sri Construction Sdn Bhd',
  category: 'tenant',
  phone: '019-3334444',
  company: 'Tan Sri Construction Sdn Bhd',
  ic: '202001009988',
  status: 'active'
});

appState.bookings.push({
  id: 'b-monthly-1',
  rentalType: 'monthly',
  companyName: 'Tan Sri Construction Sdn Bhd',
  contactPhone: '019-3334444',
  companyRegNo: '202001009988',
  checkIn: '2026-01-01',
  checkOut: '2026-12-31',
  status: 'confirmed'
});

syncTenantLifecycleStatus('2026-06-01');
const monthlyContact = appState.contacts.find(c => c.id === 'c-monthly-tenant');
assert.strictEqual(monthlyContact.status, 'active', 'Long-term tenancy must be active during term');

// Tenancy ends / vacated
appState.bookings[1].status = 'completed';
appState.bookings[1].isHistorical = true;
syncTenantLifecycleStatus('2026-06-01');
assert.strictEqual(monthlyContact.status, 'completed', 'Long-term tenancy must automatically transition to Completed upon being vacated/completed (Requirement 2)');
console.log('✓ 5. Automatic status transition verified: Long-Term Tenancy Vacated/Completed -> Completed');

// ----------------------------------------------------
// Test 6: Blacklisted Status Preservation (Never Overwritten)
// ----------------------------------------------------
appState.contacts.push({
  id: 'c-blacklisted',
  name: 'Troublemaker Guest',
  category: 'tenant',
  phone: '012-0000000',
  ic: '770707-07-7777',
  status: 'blacklisted',
  notes: 'Damaged property and broke house rules'
});

appState.bookings.push({
  id: 'b-trouble',
  guestName: 'Troublemaker Guest',
  guestPhone: '012-0000000',
  guestNric: '770707-07-7777',
  checkIn: '2026-11-10',
  checkOut: '2026-11-12',
  status: 'confirmed'
});

syncTenantLifecycleStatus('2026-11-03');
const blacklistedContact = appState.contacts.find(c => c.id === 'c-blacklisted');
assert.strictEqual(blacklistedContact.status, 'blacklisted', 'Blacklisted status must be strictly preserved and never overwritten');
console.log('✓ 6. Blacklisted guest preservation verified: strictly immune from auto-overwriting');

// ----------------------------------------------------
// Test 7: Dashboard KPIs: Active Tenants, Repeat Guests, Total Repeat Bookings, Top Returning Guests
// ----------------------------------------------------
appState.properties = [{ id: 'prop-1', name: 'Villa 1', color: '#0284c7' }];
appState.turnovers = [];
appState.selectedPropertyId = 'all';

// Setup scenario:
// Guest 1: Siti Sarah -> 3 stays, RM 1600 (Repeat Guest)
// Guest 2: Ahmad Albab -> 1 stay, RM 500 (One-time Guest)
// Guest 3: Wong Jun Wei -> 2 stays, RM 900 (Repeat Guest)
appState.bookings = [
  { id: 'b-s1', guestName: 'Siti Sarah', guestPhone: '0131112233', totalAmount: 500, checkIn: '2026-01-01', checkOut: '2026-01-03', status: 'completed' },
  { id: 'b-s2', guestName: 'Siti Sarah', guestPhone: '0131112233', totalAmount: 600, checkIn: '2026-02-01', checkOut: '2026-02-03', status: 'completed' },
  { id: 'b-s3', guestName: 'Siti Sarah', guestPhone: '0131112233', totalAmount: 500, checkIn: '2026-03-01', checkOut: '2026-03-03', status: 'completed' },
  
  { id: 'b-a1', guestName: 'Ahmad Albab', guestPhone: '0123456789', totalAmount: 500, checkIn: '2026-01-10', checkOut: '2026-01-12', status: 'completed' },
  
  { id: 'b-w1', guestName: 'Wong Jun Wei', guestPhone: '0168889999', totalAmount: 450, checkIn: '2026-02-10', checkOut: '2026-02-12', status: 'completed' },
  { id: 'b-w2', guestName: 'Wong Jun Wei', guestPhone: '0168889999', totalAmount: 450, checkIn: '2026-11-10', checkOut: '2026-11-12', status: 'confirmed' }
];

appState.contacts = [
  { id: 'c-siti', name: 'Siti Sarah', category: 'tenant', phone: '0131112233', status: 'completed' },
  { id: 'c-ahmad', name: 'Ahmad Albab', category: 'tenant', phone: '0123456789', status: 'completed' },
  { id: 'c-wong', name: 'Wong Jun Wei', category: 'tenant', phone: '0168889999', status: 'active' }
];

renderDashboardTab();

assert.strictEqual(elements['dashKpiActiveTenants'].textContent, 1, 'Active Tenants KPI must equal 1 (only Wong Jun Wei is active)');
assert.strictEqual(elements['dashKpiRepeatGuests'].textContent, 2, 'Repeat Guests KPI must equal 2 (Siti Sarah [3 stays] & Wong Jun Wei [2 stays])');
assert.strictEqual(elements['dashKpiRepeatBookings'].textContent, 5, 'Total Repeat Bookings KPI must equal 3 + 2 = 5');
console.log('✓ 7. Dashboard KPIs verified: Active Tenants (1), Repeat Guests (2), Total Repeat Bookings (5) (Requirement 7)');

// ----------------------------------------------------
// Test 8: Repeat Guest Alert Banner & 1-Tap Record Auto-fill
// ----------------------------------------------------
// Set input values for new booking
getOrCreateElement('bookingTenantType').value = 'individual';
getOrCreateElement('bookingGuestPhone').value = '0131112233'; // Matches Siti Sarah
getOrCreateElement('bookingGuestNric').value = '';
getOrCreateElement('bookingIdInput').value = '';

const repeatCheck = checkBookingRepeatGuest();
assert.strictEqual(repeatCheck.matched, true, 'Repeat guest must be detected');
assert.strictEqual(repeatCheck.totalStays, 3, 'Previous stays must be 3');
assert.strictEqual(getOrCreateElement('repeatGuestAlertBox').style.display, 'block', 'Repeat guest alert banner must be displayed');
assert.strictEqual(getOrCreateElement('repeatGuestStayCount').textContent, 3, 'Stay count element must display 3');
assert.strictEqual(getOrCreateElement('repeatGuestLastStay').textContent, '2026-03-01', 'Last stay element must display 2026-03-01');

// Test 1-Tap Apply
applyRepeatGuestDetails(repeatCheck);
assert.strictEqual(getOrCreateElement('bookingGuestName').value, 'Siti Sarah', 'Guest name must be auto-filled with existing tenant name');
assert.strictEqual(getOrCreateElement('bookingGuestPhone').value, '0131112233', 'Guest phone must be auto-filled');
console.log('✓ 8. Repeat Guest Detected banner & 1-tap auto-fill verified (Requirement 5 & 8)');

// ----------------------------------------------------
// Test 9: Blacklist Detection Banner
// ----------------------------------------------------
appState.contacts.push({
  id: 'c-blacklisted-9',
  name: 'Troublemaker Guest',
  category: 'tenant',
  phone: '012-0000000',
  ic: '770707-07-7777',
  status: 'blacklisted',
  notes: 'Damaged property and broke house rules'
});

getOrCreateElement('bookingGuestPhone').value = '012-0000000'; // Troublemaker
getOrCreateElement('bookingGuestNric').value = '770707-07-7777';

const blacklistCheck = checkBookingRepeatGuest();
assert.strictEqual(blacklistCheck.isBlacklisted, true, 'Must detect blacklisted guest');
assert.strictEqual(getOrCreateElement('blacklistedGuestAlertBox').style.display, 'block', 'Blacklist alert box must be displayed');
console.log('✓ 9. Blacklist Detection banner verified');

// ----------------------------------------------------
// Test 10: Backward Compatibility: Legacy Contacts & Bookings
// ----------------------------------------------------
const legacyContact = {
  id: 'c-legacy',
  name: 'Old Tenant Pak Samad',
  category: 'tenant',
  phone: '012-3334444'
  // No status, no ic
};
appState.contacts = [legacyContact];
appState.bookings = [];

syncTenantLifecycleStatus('2026-11-03');
assert.strictEqual(legacyContact.status, 'active', 'Legacy contacts without status must default to active without errors');

const legacyStats = getGuestStayStats('012-3334444', null);
assert.strictEqual(legacyStats.matched, true, 'Legacy contact must match by phone');
assert.strictEqual(legacyStats.totalStays, 0, 'No bookings returns 0 stays gracefully');
assert.strictEqual(legacyStats.isBlacklisted, false, 'Legacy contact is not blacklisted');
console.log('✓ 10. Backward compatibility with un-statused legacy contacts and bookings verified (Requirement 9)');

// ----------------------------------------------------
// Test 11: UI Markup Verification in index.html and styles.css
// ----------------------------------------------------
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8');
const stylesCss = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf-8');

// index.html checks
assert(indexHtml.includes('id="dashKpiActiveTenants"'), 'index.html must have #dashKpiActiveTenants');
assert(indexHtml.includes('id="dashKpiRepeatGuests"'), 'index.html must have #dashKpiRepeatGuests');
assert(indexHtml.includes('id="dashKpiRepeatBookings"'), 'index.html must have #dashKpiRepeatBookings');
assert(indexHtml.includes('id="dashTopReturningGuestsList"'), 'index.html must have #dashTopReturningGuestsList');
assert(indexHtml.includes('id="contactSearchInput"'), 'index.html must have #contactSearchInput');
assert(indexHtml.includes('id="contactStatusFilterPills"'), 'index.html must have #contactStatusFilterPills');
assert(indexHtml.includes('id="contactStatusSelect"'), 'index.html must have #contactStatusSelect');
assert(indexHtml.includes('id="contactIcInput"'), 'index.html must have #contactIcInput');
assert(indexHtml.includes('id="repeatGuestAlertBox"'), 'index.html must have #repeatGuestAlertBox');
assert(indexHtml.includes('id="repeatGuestStayCount"'), 'index.html must have #repeatGuestStayCount');
assert(indexHtml.includes('id="repeatGuestLastStay"'), 'index.html must have #repeatGuestLastStay');
assert(indexHtml.includes('id="repeatGuestLifetimeRev"'), 'index.html must have #repeatGuestLifetimeRev');
assert(indexHtml.includes('id="btnApplyRepeatGuestDetails"'), 'index.html must have #btnApplyRepeatGuestDetails');
assert(indexHtml.includes('id="blacklistedGuestAlertBox"'), 'index.html must have #blacklistedGuestAlertBox');

// styles.css checks
assert(stylesCss.includes('.badge-status-active'), 'styles.css must have .badge-status-active');
assert(stylesCss.includes('.badge-status-completed'), 'styles.css must have .badge-status-completed');
assert(stylesCss.includes('.badge-status-prospect'), 'styles.css must have .badge-status-prospect');
assert(stylesCss.includes('.badge-status-blacklisted'), 'styles.css must have .badge-status-blacklisted');
assert(stylesCss.includes('.tenant-lifecycle-metrics'), 'styles.css must have .tenant-lifecycle-metrics');
assert(stylesCss.includes('.tenant-metric-pill'), 'styles.css must have .tenant-metric-pill');
console.log('✓ 11. All UI elements, modal banners, badges, filters and CSS styles verified');

console.log('\n====================================================');
console.log('ALL 11 TENANT LIFECYCLE & REPEAT RECOGNITION TESTS PASSED!');
console.log('====================================================');
