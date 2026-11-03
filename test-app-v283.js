// Test script for StayManager Pro v2.8.3 APP PART
global.window = global;
global.localStorage = {
  _data: {},
  getItem(k) { return this._data[k] || null; },
  setItem(k, v) { this._data[k] = String(v); },
  removeItem(k) { delete this._data[k]; }
};

const app = require('./app.js');
const assert = require('assert');

let passed = 0;
let total = 0;

function test(name, fn) {
  total++;
  try {
    fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
  }
}

console.log('--- TEST SUITE: StayManager Pro v2.8.3 APP Verification ---');

// 1. Phone Normalization (normalizeLicensePhone)
console.log('\n1. Phone Normalization (normalizeLicensePhone)');
const targetPhone = '60124022462';
const phoneInputs = [
  '+60 0124022462',
  '+600124022462',
  '60 0124022462',
  '0060124022462',
  '00 60 12 402 2462',
  '124022462',
  '12-402 2462',
  '012-402 2462',
  '+60124022462'
];

phoneInputs.forEach(input => {
  test(`Phone format "${input}" normalizes to ${targetPhone}`, () => {
    const res = app.normalizeLicensePhone(input);
    assert.strictEqual(res, targetPhone);
  });
});

test('Format display license phone formats as +60 12-402 2462', () => {
  const formatted = app.formatDisplayLicensePhone('+60 0124022462');
  assert.strictEqual(formatted, '+60 12-402 2462');
});

test('Phone shorter than 9 digits or invalid is rejected', () => {
  assert.strictEqual(app.normalizeLicensePhone('12345'), '');
  assert.strictEqual(app.normalizeLicensePhone(''), '');
  assert.strictEqual(app.normalizeLicensePhone(null), '');
});

// 2. Key Cleaning and Extraction (extractLicenseKey & cleanLicenseKey)
console.log('\n2. Key Extraction & Cleaning (extractLicenseKey & cleanLicenseKey)');
const expectedKey = 'STAY-23456-789AB-CDEFG-HJKMN';

test('Standard canonical key extracts unchanged', () => {
  assert.strictEqual(app.extractLicenseKey(expectedKey), expectedKey);
});

test('Key with spaces extracts correctly', () => {
  assert.strictEqual(app.extractLicenseKey('STAY 23456 789AB CDEFG HJKMN'), expectedKey);
});

test('Key with no hyphens extracts correctly', () => {
  assert.strictEqual(app.extractLicenseKey('STAY23456789ABCDEFGHJKMN'), expectedKey);
});

test('Key with long dashes extracts correctly (– — − ‐ ‑)', () => {
  assert.strictEqual(app.extractLicenseKey('STAY–23456—789AB−CDEFG‐HJKMN'), expectedKey);
});

test('Key with lowercase extracts correctly', () => {
  assert.strictEqual(app.extractLicenseKey('stay-23456-789ab-cdefg-hjkmn'), expectedKey);
});

test('Key with zero-width characters extracts correctly', () => {
  assert.strictEqual(app.extractLicenseKey('STAY\u200B-\uFEFF23456-789AB-\u200DCDEFG-HJKMN'), expectedKey);
});

test('Full WhatsApp message extracts first canonical key', () => {
  const waMsg = 'Salam Dr. Zulkifli, ini kunci lesen rasmi anda: *STAY-23456-789AB-CDEFG-HJKMN*. Sila simpan mesej ini untuk rujukan.';
  assert.strictEqual(app.extractLicenseKey(waMsg), expectedKey);
});

test('Key followed by trailing words extracts exact key', () => {
  const text = 'STAY-23456-789AB-CDEFG-HJKMN for my unit in Kuantan Pahang';
  assert.strictEqual(app.extractLicenseKey(text), expectedKey);
});

test('Key with invalid base32 characters (0, 1, I, O) returns null', () => {
  assert.strictEqual(app.extractLicenseKey('STAY-00000-11111-IIIII-OOOOO'), null);
});

// 3. Guest WhatsApp Links (normalizePhoneNumber) Unchanged
console.log('\n3. Guest WhatsApp Links (normalizePhoneNumber) Unchanged');
test('normalizePhoneNumber for Malaysian mobile numbers remains unchanged', () => {
  assert.strictEqual(app.normalizePhoneNumber('012-345 6789'), '60123456789');
  assert.strictEqual(app.normalizePhoneNumber('+60123456789'), '60123456789');
  assert.strictEqual(app.normalizePhoneNumber('60123456789'), '60123456789');
});

// 4. License Verification Functions
console.log('\n4. License Verification Functions Unchanged');
test('verifyLicenseToken is a defined function', () => {
  assert.strictEqual(typeof app.verifyLicenseToken, 'function');
});

test('evaluateLicenseState is a defined function', () => {
  assert.strictEqual(typeof app.evaluateLicenseState, 'function');
});

// 5. Version Check
console.log('\n5. Version 2.8.3 Consistency Check');
const fs = require('fs');
test('version.json matches 2.8.3', () => {
  const vJson = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
  assert.strictEqual(vJson.version, '2.8.3');
});

test('sw.js contains staymanager-cache-v2.8.3-live', () => {
  const swCode = fs.readFileSync('./sw.js', 'utf8');
  assert.ok(swCode.includes('staymanager-cache-v2.8.3-live'));
});

test('index.html contains app.js?v=2.8.3 and styles.css?v=2.8.3', () => {
  const htmlCode = fs.readFileSync('./index.html', 'utf8');
  assert.ok(htmlCode.includes('app.js?v=2.8.3'));
  assert.ok(htmlCode.includes('styles.css?v=2.8.3'));
  assert.ok(htmlCode.includes('v2.8.3'));
});

console.log(`\n========================================`);
console.log(`RESULTS: ${passed} / ${total} tests passed.`);
console.log(`========================================`);

if (passed !== total) {
  process.exit(1);
}
