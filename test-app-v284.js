// Comprehensive Test Suite for StayManager v2.8.4 (App & Diagnostics)
const assert = require('assert');
const fs = require('fs');

// Ensure WebCrypto is in global scope
if (!globalThis.crypto) {
  const { webcrypto } = require('crypto');
  globalThis.crypto = webcrypto;
}

// Mock browser globals
const storageStore = {};
const mockLocalStorage = {
  getItem(k) { return storageStore[k] || null; },
  setItem(k, v) { storageStore[k] = String(v); },
  removeItem(k) { delete storageStore[k]; },
  clear() { for (const k in storageStore) delete storageStore[k]; }
};

let toastMessages = [];
let alertMessages = [];
let clipboardWritten = '';

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
    classList: {
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
    onclick: null
  };
}

const elements = {};
function getEl(id, tagName = 'div') {
  if (!elements[id]) {
    const el = createMockElement(id, tagName);
    el.classList.parent = el;
    if (id === 'toastContainer') {
      el.appendChild = (toast) => {
        el.children.push(toast);
        toastMessages.push(toast.innerHTML || toast.textContent);
      };
    }
    elements[id] = el;
  }
  return elements[id];
}

globalThis.window = globalThis;
globalThis.addEventListener = () => {};
globalThis.location = {
  href: 'https://app.staymanager.local',
  search: '',
  pathname: '/'
};
globalThis.localStorage = mockLocalStorage;
globalThis.isSecureContext = true;
Object.defineProperty(globalThis, 'navigator', {
  value: {
    onLine: true,
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) TestRunner/2.8.4',
    clipboard: {
      writeText: async (t) => { clipboardWritten = t; }
    }
  },
  configurable: true,
  writable: true
});
globalThis.document = {
  getElementById: (id) => getEl(id),
  querySelector: () => null,
  querySelectorAll: () => [],
  createElement: (tag) => {
    const el = createMockElement(tag + '-' + Math.random(), tag);
    el.classList.parent = el;
    return el;
  },
  body: getEl('body'),
  readyState: 'loading',
  addEventListener: () => {}
};
globalThis.showToast = (msg) => { toastMessages.push(msg); };
globalThis.alert = (msg) => { alertMessages.push(msg); };
globalThis.confirm = () => false;

// Load App module
const app = require('./app.js');

let passed = 0;
let total = 0;

async function test(name, fn) {
  total++;
  try {
    await fn();
    console.log(`  ✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`  ✗ ${name}:`, err.message);
    if (err.stack) console.error(err.stack);
  }
}

// Helpers for ECDSA Token Generation
function arrayBufferToBase64Url(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function stringToBase64Url(str) {
  return btoa(unescape(encodeURIComponent(str))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function createSignedToken(payload, privateKey) {
  const header = { alg: 'ES256', typ: 'JWT' };
  const encodedHeader = stringToBase64Url(JSON.stringify(header));
  const encodedPayload = stringToBase64Url(JSON.stringify(payload));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const signature = await crypto.subtle.sign(
    { name: 'ECDSA', hash: { name: 'SHA-256' } },
    privateKey,
    new TextEncoder().encode(dataToSign)
  );

  return `${dataToSign}.${arrayBufferToBase64Url(signature)}`;
}

async function runAllTests() {
  console.log('\n============================================================');
  console.log('   StayManager v2.8.4 Client App Behavioral Test Suite');
  console.log('============================================================\n');

  // Generate KeyPair A (Valid) and KeyPair B (Wrong key)
  const keyPairA = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify']
  );
  const publicJwkA = await crypto.subtle.exportKey('jwk', keyPairA.publicKey);

  const keyPairB = await crypto.subtle.generateKey(
    { name: 'ECDSA', namedCurve: 'P-256' },
    true,
    ['sign', 'verify']
  );

  // Set default public key in app to KeyPair A
  app.setTestLicensePublicKey(publicJwkA);

  // --------------------------------------------------------------------------
  // SECTION 1: VERSION & SYNTAX CONSISTENCY
  // --------------------------------------------------------------------------
  console.log('--- 1. Version 2.8.4 Consistency & Cache ---');

  await test('1a. App constant APP_VERSION is 2.8.4', () => {
    assert.strictEqual(app.APP_VERSION, '2.8.4');
  });

  await test('1b. version.json has version 2.8.4 and changelog', () => {
    const vJson = JSON.parse(fs.readFileSync('./version.json', 'utf8'));
    assert.strictEqual(vJson.version, '2.8.4');
    assert.ok(vJson.changelog.includes('2.8.4'));
    assert.ok(vJson.changelog.includes('silent failures') || vJson.changelog.includes('troubleshooting'));
  });

  await test('1c. sw.js cache name is staymanager-cache-v2.8.4-live', () => {
    const swCode = fs.readFileSync('./sw.js', 'utf8');
    assert.ok(swCode.includes('staymanager-cache-v2.8.4-live'));
  });

  await test('1d. index.html references app.js?v=2.8.4 and styles.css?v=2.8.4', () => {
    const htmlCode = fs.readFileSync('./index.html', 'utf8');
    assert.ok(htmlCode.includes('app.js?v=2.8.4'));
    assert.ok(htmlCode.includes('styles.css?v=2.8.4'));
    assert.ok(htmlCode.includes('id="appCurrentVersionBadge"'));
    assert.ok(htmlCode.includes('v2.8.4'));
    assert.ok(htmlCode.includes('id="proModalVersionText"'));
  });

  await test('1e. GUIDE LINKS: activation window and Pro Hub link to ./user-guide.html (new tab, rel="noopener")', () => {
    const htmlCode = fs.readFileSync('./index.html', 'utf8');
    
    // Check activation window (#licenseModal)
    assert.ok(htmlCode.includes('id="linkUserGuideLicenseModal"'), 'licenseModal must have user guide link');
    assert.ok(htmlCode.includes('href="./user-guide.html"'), 'must link to ./user-guide.html');
    assert.ok(htmlCode.includes('target="_blank"'), 'must open in new tab');
    assert.ok(htmlCode.includes('rel="noopener"'), 'must have rel="noopener"');

    // Check Pro Hub (#proSystemModal)
    assert.ok(htmlCode.includes('id="linkUserGuideProHub"'), 'proSystemModal must have user guide link');
    assert.ok(htmlCode.includes('User guide / Panduan pengguna'), 'must have bilingual text "User guide / Panduan pengguna"');
  });

  await test('1f. GUIDE LINKS: sw.js does NOT add user-guide.html to install list', () => {
    const swCode = fs.readFileSync('./sw.js', 'utf8');
    // Extract ASSETS_TO_CACHE
    const match = swCode.match(/const\s+ASSETS_TO_CACHE\s*=\s*\[([\s\S]*?)\];/);
    assert.ok(match, 'ASSETS_TO_CACHE must exist in sw.js');
    const cachedList = match[1];
    assert.strictEqual(cachedList.includes('user-guide.html'), false, 'user-guide.html must NOT be in ASSETS_TO_CACHE');
  });

  // --------------------------------------------------------------------------
  // SECTION 2: PHONE & KEY EXTRACTION REGRESSION
  // --------------------------------------------------------------------------
  console.log('\n--- 2. Phone Normalization & Key Extraction Regression ---');

  await test('2a. Phone variants all normalize to 60124022462', () => {
    const target = '60124022462';
    const variants = [
      '+60 0124022462',
      '+600124022462',
      '60 0124022462',
      '0060124022462',
      '00 60 12 402 2462',
      '124022462',
      '12-402 2462'
    ];
    for (const v of variants) {
      assert.strictEqual(app.normalizeLicensePhone(v), target, `Failed for ${v}`);
    }
  });

  await test('2b. Key extraction handles spaces, no hyphens, dashes, lowercase, and full message', () => {
    const canonical = 'STAY-23456-789AB-CDEFG-HJKMN';
    assert.strictEqual(app.extractLicenseKey('STAY 23456 789AB CDEFG HJKMN'), canonical);
    assert.strictEqual(app.extractLicenseKey('STAY23456789ABCDEFGHJKMN'), canonical);
    assert.strictEqual(app.extractLicenseKey('stay–23456—789ab−cdefg‐hjkmn'), canonical);
    assert.strictEqual(app.extractLicenseKey('Salam, ini lesen anda: STAY-23456-789AB-CDEFG-HJKMN. Terima kasih!'), canonical);
    assert.strictEqual(app.extractLicenseKey('STAY-23456-789AB-CDEFG-HJKMN extra words'), canonical);
  });

  await test('2c. Guest WhatsApp links normalizePhoneNumber remains unchanged', () => {
    assert.strictEqual(app.normalizePhoneNumber('012-345 6789'), '60123456789');
    assert.strictEqual(app.normalizePhoneNumber('+60123456789'), '60123456789');
  });

  // --------------------------------------------------------------------------
  // SECTION 3: SIMULATION (a) - CRYPTO.SUBTLE MISSING
  // --------------------------------------------------------------------------
  console.log('\n--- 3. Simulation (a): Crypto.subtle Missing / Insecure Context ---');

  await test('3. crypto.subtle missing shows ERR_CRYPTO_UNAVAILABLE / ERR_INSECURE_CONTEXT and NO success toast', async () => {
    toastMessages = [];
    alertMessages = [];
    mockLocalStorage.clear();
    app.appState.isLicensed = false;

    const testDevId = 'dev-test-crypto-missing';
    mockLocalStorage.setItem(app.STORAGE_KEYS.DEVICE_ID || 'staymanager_device_id', testDevId);

    // Prepare valid token from server signed by keypair A
    const nowSec = Math.floor(Date.now() / 1000);
    const validToken = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: testDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairA.privateKey);

    // Mock fetch to simulate successful server response
    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: validToken })
    });

    // Setup input fields
    getEl('licensePhoneInput').value = '012-402 2462';
    getEl('licenseKeyInput').value = 'STAY-23456-789AB-CDEFG-HJKMN';

    // Save crypto and redefine without subtle to simulate unsupported crypto
    const origCrypto = globalThis.crypto;
    Object.defineProperty(globalThis, 'crypto', {
      value: {
        getRandomValues: (b) => origCrypto.getRandomValues(b),
        randomUUID: () => origCrypto.randomUUID()
      },
      configurable: true
    });

    try {
      await app.handleActivateLicenseSubmit({ preventDefault: () => {} });

      // Verification checks:
      assert.strictEqual(app.appState.isLicensed, false, 'appState.isLicensed must be false when crypto.subtle is missing');
      assert.strictEqual(toastMessages.length, 0, 'No success toast should ever be displayed on failure');

      const errBox = getEl('licenseActivationErrorBox');
      assert.strictEqual(errBox.style.display, 'block', 'Error box must be visible');

      const codeEl = getEl('licenseActivationErrorCode');
      assert.ok(
        codeEl.textContent === 'ERR_CRYPTO_UNAVAILABLE' || codeEl.textContent === 'ERR_INSECURE_CONTEXT',
        `Code should indicate crypto unavailable, got: ${codeEl.textContent}`
      );

      const msgEl = getEl('licenseActivationErrorMsg');
      assert.ok(msgEl.textContent.includes('secure connection') || msgEl.textContent.includes('HTTPS'), 'Message must explain HTTPS/WebCrypto requirement');

      // Contact seller button exists and does not leak key or token
      const btnContact = getEl('btnContactSellerActivationError');
      assert.ok(typeof btnContact.onclick === 'function', 'Contact seller button must have onclick handler');
    } finally {
      Object.defineProperty(globalThis, 'crypto', {
        value: origCrypto,
        configurable: true
      });
    }
  });

  // --------------------------------------------------------------------------
  // SECTION 4: SIMULATION (b) - WRONG PUBLIC KEY / SIGNATURE MISMATCH
  // --------------------------------------------------------------------------
  console.log('\n--- 4. Simulation (b): Wrong Public Key / Invalid Signature ---');

  await test('4. Wrong public key rejects activation, shows ERR_SIGNATURE_INVALID and NO success toast', async () => {
    toastMessages = [];
    alertMessages = [];
    mockLocalStorage.clear();
    app.appState.isLicensed = false;

    const testDevId = 'dev-test-wrong-key';
    mockLocalStorage.setItem(app.STORAGE_KEYS.DEVICE_ID || 'staymanager_device_id', testDevId);

    // Token signed by KeyPair B (wrong key), but app expects KeyPair A
    const nowSec = Math.floor(Date.now() / 1000);
    const rogueToken = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: testDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairB.privateKey);

    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: rogueToken })
    });

    getEl('licensePhoneInput').value = '012-402 2462';
    getEl('licenseKeyInput').value = 'STAY-23456-789AB-CDEFG-HJKMN';

    await app.handleActivateLicenseSubmit({ preventDefault: () => {} });

    assert.strictEqual(app.appState.isLicensed, false, 'appState.isLicensed must remain false');
    assert.strictEqual(toastMessages.length, 0, 'No success toast must be shown');

    const errBox = getEl('licenseActivationErrorBox');
    assert.strictEqual(errBox.style.display, 'block', 'Error box must be displayed');

    const codeEl = getEl('licenseActivationErrorCode');
    assert.strictEqual(codeEl.textContent, 'ERR_SIGNATURE_INVALID');

    const msgEl = getEl('licenseActivationErrorMsg');
    assert.ok(msgEl.textContent.includes('signature') || msgEl.textContent.includes('disahkan'));
  });

  // --------------------------------------------------------------------------
  // SECTION 5: SIMULATION (c) - DEVICE ID MISMATCH
  // --------------------------------------------------------------------------
  console.log('\n--- 5. Simulation (c): Device ID Mismatch ---');

  await test('5. Device ID mismatch shows ERR_DEVICE_MISMATCH and NO success toast', async () => {
    toastMessages = [];
    alertMessages = [];
    mockLocalStorage.clear();
    app.appState.isLicensed = false;

    const currentDevId = 'dev-current-device-xyz';
    mockLocalStorage.setItem(app.STORAGE_KEYS.DEVICE_ID || 'staymanager_device_id', currentDevId);

    // Server returns token bound to a different device ID
    const otherDevId = 'dev-different-phone-abc';
    const nowSec = Math.floor(Date.now() / 1000);
    const tokenMismatchedDev = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: otherDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairA.privateKey);

    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: tokenMismatchedDev })
    });

    getEl('licensePhoneInput').value = '012-402 2462';
    getEl('licenseKeyInput').value = 'STAY-23456-789AB-CDEFG-HJKMN';

    await app.handleActivateLicenseSubmit({ preventDefault: () => {} });

    assert.strictEqual(app.appState.isLicensed, false, 'appState.isLicensed must be false on device mismatch');
    assert.strictEqual(toastMessages.length, 0, 'No success toast must be shown');

    const errBox = getEl('licenseActivationErrorBox');
    assert.strictEqual(errBox.style.display, 'block', 'Error box must be visible');

    const codeEl = getEl('licenseActivationErrorCode');
    assert.strictEqual(codeEl.textContent, 'ERR_DEVICE_MISMATCH');

    const msgEl = getEl('licenseActivationErrorMsg');
    assert.ok(msgEl.textContent.includes('device ID mismatch') || msgEl.textContent.includes('ID peranti tidak sepadan'));
  });

  // --------------------------------------------------------------------------
  // SECTION 6: SIMULATION (d) - CLOCK ROLLED BACK
  // --------------------------------------------------------------------------
  console.log('\n--- 6. Simulation (d): Clock Rolled Back ---');

  await test('6. Clock rolled back shows ERR_CLOCK_ROLLBACK and NO success toast', async () => {
    toastMessages = [];
    alertMessages = [];
    mockLocalStorage.clear();
    app.appState.isLicensed = false;

    const testDevId = 'dev-test-clock';
    mockLocalStorage.setItem(app.STORAGE_KEYS.DEVICE_ID || 'staymanager_device_id', testDevId);

    // Simulate clock rollback: lastSeenAt was recorded 3 days in the future relative to Date.now()
    const futureTime = Date.now() + (3 * 86400 * 1000);
    mockLocalStorage.setItem('staymanager_last_seen_at', futureTime.toString());

    const nowSec = Math.floor(Date.now() / 1000);
    const validToken = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: testDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairA.privateKey);

    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: validToken })
    });

    getEl('licensePhoneInput').value = '012-402 2462';
    getEl('licenseKeyInput').value = 'STAY-23456-789AB-CDEFG-HJKMN';

    await app.handleActivateLicenseSubmit({ preventDefault: () => {} });

    assert.strictEqual(app.appState.isLicensed, false, 'License must be rejected when clock is rolled back');
    assert.strictEqual(app.appState.proHubState, 'CLOCK_ERROR');
    assert.strictEqual(toastMessages.length, 0, 'No success toast on clock rollback');

    const errBox = getEl('licenseActivationErrorBox');
    assert.strictEqual(errBox.style.display, 'block');

    const codeEl = getEl('licenseActivationErrorCode');
    assert.strictEqual(codeEl.textContent, 'ERR_CLOCK_ROLLBACK');

    const msgEl = getEl('licenseActivationErrorMsg');
    assert.ok(msgEl.textContent.includes('clock') || msgEl.textContent.includes('jam') || msgEl.textContent.includes('tarikh'));
  });

  // --------------------------------------------------------------------------
  // SECTION 7: NORMAL SUCCESSFUL ACTIVATION
  // --------------------------------------------------------------------------
  console.log('\n--- 7. Normal Activation: Success Toast & PRO ACTIVE State ---');

  await test('7. Normal activation succeeds: shows success toast, hides DEMO banner, shows PRO ACTIVE badge', async () => {
    toastMessages = [];
    alertMessages = [];
    mockLocalStorage.clear();
    app.appState.isLicensed = false;

    const testDevId = 'dev-normal-pass-123';
    mockLocalStorage.setItem(app.STORAGE_KEYS.DEVICE_ID || 'staymanager_device_id', testDevId);

    const nowSec = Math.floor(Date.now() / 1000);
    const validToken = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: testDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairA.privateKey);

    globalThis.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: validToken })
    });

    getEl('licensePhoneInput').value = '012-402 2462';
    getEl('licenseKeyInput').value = 'STAY-23456-789AB-CDEFG-HJKMN';

    // Mock banner & badges before activation
    const banner = getEl('demoSalesBanner');
    banner.style.display = 'flex';
    banner.classes.delete('hidden');

    const demoBtn = getEl('btnDemoToggle');
    demoBtn.innerHTML = 'Demo';

    await app.handleActivateLicenseSubmit({ preventDefault: () => {} });

    assert.strictEqual(app.appState.isLicensed, true, 'License state must be true on valid activation');
    assert.strictEqual(app.appState.proHubState, 'ACTIVE');

    assert.strictEqual(toastMessages.length, 1, 'Success toast MUST be shown');
    assert.ok(toastMessages[0].includes('🎉') && toastMessages[0].includes('Pro'));

    // Check DEMO banner is hidden
    assert.strictEqual(banner.style.display, 'none');
    assert.ok(banner.classes.has('hidden'), 'demoSalesBanner must have hidden class');

    // Check Demo button toggled to Pro
    assert.ok(demoBtn.innerHTML.includes('Pro') && demoBtn.innerHTML.includes('fa-circle-check'));
  });

  // --------------------------------------------------------------------------
  // SECTION 8: PRO HUB SUPPORT DIAGNOSTICS
  // --------------------------------------------------------------------------
  console.log('\n--- 8. Pro Hub Support Diagnostics ---');

  await test('8a. Diagnostics data compiles all required fields without exposing key or token', async () => {
    const diag = await app.getSupportDiagnosticsData();

    assert.strictEqual(diag.version, '2.8.4');
    assert.strictEqual(diag.isSecureContext, 'true');
    assert.strictEqual(diag.cryptoSubtle, 'Yes');
    assert.ok(diag.deviceId.length >= 8);
    assert.strictEqual(diag.tokenStored, 'Yes');
    assert.ok(diag.tokenVerification.includes('Valid'));
    assert.strictEqual(diag.clockStatus, 'OK (Normal)');
    assert.strictEqual(diag.proHubState, 'ACTIVE');
    assert.strictEqual(diag.network, 'Online');
    assert.ok(diag.userAgent.includes('TestRunner/2.8.4'));

    const rawJson = JSON.stringify(diag);
    assert.ok(!rawJson.includes('STAY-23456'), 'Never expose license key in diagnostics');
    assert.ok(!rawJson.includes('eyJ'), 'Never expose token string in diagnostics');
  });

  await test('8b. Formatted diagnostics string is suitable for WhatsApp', async () => {
    const diag = await app.getSupportDiagnosticsData();
    const formatted = app.formatDiagnosticsForWhatsApp(diag);

    assert.ok(formatted.includes('📋 *StayManager Support Diagnostics*'));
    assert.ok(formatted.includes('• App Version: v2.8.4'));
    assert.ok(formatted.includes('• WebCrypto Subtle: Yes'));
    assert.ok(formatted.includes('• Short Device ID:'));
    assert.ok(formatted.includes('• Token Verification:'));
    assert.ok(formatted.includes('• Clock Status: OK (Normal)'));
    assert.ok(formatted.includes('• Network: Online'));

    // Verify key & token never leak
    assert.ok(!formatted.includes('STAY-'));
    assert.ok(!formatted.includes('eyJ'));
  });

  await test('8c. openProSystemModal renders diagnostics and wires Copy button', async () => {
    clipboardWritten = '';
    toastMessages = [];

    app.openProSystemModal();

    // Allow promise resolution inside openProSystemModal
    await new Promise(r => setTimeout(r, 20));

    const contentEl = getEl('proModalDiagnosticsContent');
    assert.ok(contentEl.innerHTML.includes('v2.8.4'));
    assert.ok(contentEl.innerHTML.includes('Secure:'));
    assert.ok(contentEl.innerHTML.includes('Device ID:'));

    // Simulate clicking Copy Diagnostics button
    const copyBtn = getEl('btnCopyDiagnostics');
    assert.ok(typeof copyBtn.onclick === 'function', 'Copy diagnostics button must be wired');
    await copyBtn.onclick();

    assert.ok(clipboardWritten.includes('📋 *StayManager Support Diagnostics*'));
    assert.ok(clipboardWritten.includes('v2.8.4'));
    assert.strictEqual(toastMessages.length, 1);
    assert.ok(toastMessages[0].includes('Diagnostik') || toastMessages[0].includes('Diagnostics'));
  });

  // --------------------------------------------------------------------------
  // SECTION 9: WHATSAPP SELLER CONTACT REASON & REF CODE
  // --------------------------------------------------------------------------
  console.log('\n--- 9. Contact Seller WhatsApp Link ---');

  await test('9. handleContactSellerWhatsApp includes reference code without leaking secrets', () => {
    let openedUrl = '';
    globalThis.window.open = (url) => { openedUrl = url; };

    app.handleContactSellerWhatsApp('verification_failed', 'ERR_CRYPTO_UNAVAILABLE');

    assert.ok(openedUrl.startsWith('https://wa.me/'));
    const decodedUrl = decodeURIComponent(openedUrl);
    assert.ok(decodedUrl.includes('ERR_CRYPTO_UNAVAILABLE'), 'Must include reference code');
    assert.ok(decodedUrl.includes('Device ID:') || decodedUrl.includes('ID Peranti:'));
    assert.ok(!decodedUrl.includes('STAY-'), 'Must never include license key');
    assert.ok(!decodedUrl.includes('eyJ'), 'Must never include token');
  });

  // --------------------------------------------------------------------------
  // SECTION 10: BROWSER ENVIRONMENT SECURITY (NO TEST HOOKS EXPOSED)
  // --------------------------------------------------------------------------
  console.log('\n--- 10. Browser Environment Security (No Test Hooks on Window) ---');

  await test('10. In browser environment: window.setTestLicensePublicKey is undefined, and token signed with different key is rejected', async () => {
    const vm = require('vm');
    const appSource = fs.readFileSync('./app.js', 'utf8');

    // Verify static source has const LICENSE_PUBLIC_KEY_JWK and no window.setTestLicensePublicKey
    assert.ok(
      appSource.includes('const LICENSE_PUBLIC_KEY_JWK ='),
      'LICENSE_PUBLIC_KEY_JWK must be declared as const in app.js'
    );
    assert.ok(
      !appSource.includes('let LICENSE_PUBLIC_KEY_JWK'),
      'LICENSE_PUBLIC_KEY_JWK must NOT be let in app.js'
    );
    assert.ok(
      !appSource.includes('window.setTestLicensePublicKey'),
      'window.setTestLicensePublicKey must NOT exist anywhere in app.js'
    );

    // Create a real browser-like sandbox where module and exports are undefined
    const mockStorage = {};
    const elements10 = {};
    function getEl10(id, tag = 'div') {
      if (!elements10[id]) {
        const el = createMockElement(id, tag);
        el.classList.parent = el;
        elements10[id] = el;
      }
      return elements10[id];
    }

    const sandboxWindow = {
      isSecureContext: true,
      addEventListener: () => {},
      location: { href: 'https://homestay.my/app/', search: '', pathname: '/app/' },
      URLSearchParams: globalThis.URLSearchParams,
      TextEncoder: globalThis.TextEncoder,
      TextDecoder: globalThis.TextDecoder,
      btoa: globalThis.btoa,
      atob: globalThis.atob,
      console: console,
      setTimeout: setTimeout,
      setInterval: setInterval,
      clearTimeout: clearTimeout,
      clearInterval: clearInterval,
      localStorage: {
        getItem(k) { return mockStorage[k] || null; },
        setItem(k, v) { mockStorage[k] = String(v); },
        removeItem(k) { delete mockStorage[k]; }
      },
      navigator: {
        onLine: true,
        userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) Mobile/15E148',
        clipboard: { writeText: async () => {} }
      },
      crypto: globalThis.crypto,
      document: {
        getElementById: (id) => getEl10(id),
        querySelectorAll: () => [],
        createElement: (tag) => {
          const el = createMockElement(tag + '-' + Math.random(), tag);
          el.classList.parent = el;
          return el;
        },
        body: getEl10('body'),
        readyState: 'loading',
        addEventListener: () => {}
      }
    };
    sandboxWindow.window = sandboxWindow;

    const browserContext = vm.createContext(sandboxWindow);

    // Execute app.js in browserContext
    vm.runInContext(appSource, browserContext);

    // 1. Assert window.setTestLicensePublicKey is undefined
    assert.strictEqual(
      browserContext.window.setTestLicensePublicKey,
      undefined,
      'window.setTestLicensePublicKey must be undefined in browser context'
    );
    assert.strictEqual(
      typeof browserContext.setTestLicensePublicKey,
      'undefined',
      'setTestLicensePublicKey must not be a global function in browser context'
    );

    // 2. Generate a rogue token signed with keyPairB (different from production key)
    const testDevId = 'dev-browser-sim-456';
    mockStorage['staymanager_device_id'] = testDevId;

    const nowSec = Math.floor(Date.now() / 1000);
    const rogueToken = await createSignedToken({
      v: 1,
      phone: '60124022462',
      deviceId: testDevId,
      iat: nowSec,
      exp: nowSec + 60 * 86400
    }, keyPairB.privateKey);

    // Evaluate token verification inside browser context against production key
    const verifyResult = await vm.runInContext(`verifyLicenseToken("${rogueToken}")`, browserContext);
    assert.strictEqual(verifyResult.valid, false, 'Token signed with different key must be rejected');
    assert.strictEqual(verifyResult.error, 'Invalid cryptographic signature', 'Error must be signature mismatch');

    // Also test activation form submission in browserContext
    let browserToastShown = false;
    browserContext.window.showToast = () => { browserToastShown = true; };
    browserContext.window.fetch = async () => ({
      ok: true,
      json: async () => ({ success: true, token: rogueToken })
    });

    const phoneInp = browserContext.document.getElementById('licensePhoneInput');
    const keyInp = browserContext.document.getElementById('licenseKeyInput');
    phoneInp.value = '012-402 2462';
    keyInp.value = 'STAY-23456-789AB-CDEFG-HJKMN';

    await browserContext.window.handleActivateLicenseSubmit({ preventDefault: () => {} });

    assert.strictEqual(browserContext.window.appState.isLicensed, false, 'isLicensed must remain false');
    assert.strictEqual(browserToastShown, false, 'No success toast on rogue key signature');

    const errBox = browserContext.document.getElementById('licenseActivationErrorBox');
    assert.strictEqual(errBox.style.display, 'block', 'Activation error box must show');

    const codeEl = browserContext.document.getElementById('licenseActivationErrorCode');
    assert.strictEqual(codeEl.textContent, 'ERR_SIGNATURE_INVALID');
  });

  console.log('\n------------------------------------------------------------');
  console.log(`Test Results: ${passed} passed, ${total - passed} failed`);
  console.log('------------------------------------------------------------\n');

  if (passed !== total) {
    process.exit(1);
  }
  process.exit(0);
}

runAllTests().catch(err => {
  console.error('Fatal test runner error:', err);
  process.exit(1);
});
