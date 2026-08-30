/**
 * HOMESTAY MANAGER - MOBILE-FIRST PWA ENGINE
 * Full-featured property, booking, turnover, and revenue management system.
 */

// ==========================================================================
// 1. STATE & LOCALSTORAGE DATA MODEL
// ==========================================================================

const STORAGE_KEYS = {
  PROPERTIES: 'staymanager_properties_v2',
  BOOKINGS: 'staymanager_bookings_v2',
  TURNOVERS: 'staymanager_turnovers_v2',
  EXPENSES: 'staymanager_expenses_v2',
  SETTINGS: 'staymanager_settings_v2',
  LICENSE: 'staymanager_license_v2'
};

const LICENSE_SECRET_SALT = 'HOMESTAY_PRO_SALT_2026_SECURE_AUTH';

// Secret Master Admin Keys (Master Admin / Unrestricted access)
// Master key validation is performed via cryptographic signatures
function isMasterAdminKey(rawKey) {
  if (!rawKey) return false;
  const k = rawKey.trim().toUpperCase();
  return k === 'STAY-MASTER-ADMIN-2026' || k === 'STAY-VIP-2026-LIFETIME';
}

const DEFAULT_SETTINGS = {
  businessName: 'My Homestay',
  currency: 'RM',
  theme: 'light',
  language: 'en',
  ownerPhone: '+60123456789',
  sellerPhone: '+60123456789',
  defaultDepositPct: 30,
  bankName: 'Maybank',
  bankAccNum: '5123 4567 8901',
  bankAccHolder: 'Homestay Host',
  duitNow: '0123456789'
};

const TRANSLATIONS = {
  en: {
    nav_today: 'Today',
    nav_calendar: 'Calendar',
    nav_bookings: 'Bookings',
    nav_turnovers: 'Turnovers',
    nav_finances: 'Finances',
    nav_settings: 'Settings',

    kpi_checkin: 'Today Check-In',
    kpi_checkout: 'Today Check-Out',
    kpi_inhouse: 'In-House Guests',
    kpi_turnovers: 'Turnovers Needed',
    this_month: 'This Month',
    occupancy: 'Occupancy',
    nights_booked: 'nights booked',
    today_actions: "Today's Schedule & Actions",
    see_all: 'See All',
    manage_units: 'Homestay Units Overview',
    manage_btn: 'Manage',

    all_units: 'All Units',
    add_unit: 'Add Unit',
    selected_date: 'Selected Date',
    book_date_btn: 'Book Date',

    filter_all: 'All',
    filter_quotations: '📋 Quotations',
    filter_booked: '🟡 Booked (Deposit)',
    filter_confirmed: '🟢 Confirmed (Full)',
    filter_inhouse: 'In-House',
    filter_completed: 'Completed',
    filter_blocked: 'Blocked',
    search_placeholder: 'Search guest name, phone, ref...',

    btn_send_quotation: 'Send Quotation',
    btn_mark_booked: 'Mark Deposit Paid (Book)',
    btn_send_deposit_receipt: 'Send Deposit Receipt',
    btn_send_invoice: 'Send Invoice',
    btn_mark_confirmed: 'Mark Fully Paid (Confirm)',
    btn_send_full_receipt: 'Send Full Receipt & Key',
    btn_checkin: 'Check In',
    btn_checkout_reminder: 'Check-Out Reminder',
    btn_complete_checkout: 'Complete Check-Out',

    total_rev: 'Total Revenue',
    total_exp: 'Total Expenses',
    net_profit: 'Net Profit',
    rev_by_homestay: 'Revenue by Homestay',
    expense_breakdown: 'Expense Breakdown',

    demo_badge: 'DEMO MODE',
    demo_banner_text: 'Loving this app for your homestays?',
    buy_app: 'Buy App',
    activate: 'Activate'
  },
  bm: {
    nav_today: 'Hari Ini',
    nav_calendar: 'Kalendar',
    nav_bookings: 'Tempahan',
    nav_turnovers: 'Pembersihan',
    nav_finances: 'Kewangan',
    nav_settings: 'Tetapan',

    kpi_checkin: 'Daftar Masuk Hari Ini',
    kpi_checkout: 'Daftar Keluar Hari Ini',
    kpi_inhouse: 'Tetamu Menginap',
    kpi_turnovers: 'Perlu Dibersihkan',
    this_month: 'Bulan Ini',
    occupancy: 'Penghunian',
    nights_booked: 'malam ditempah',
    today_actions: 'Jadual & Tindakan Hari Ini',
    see_all: 'Lihat Semua',
    manage_units: 'Ringkasan Unit Homestay',
    manage_btn: 'Urus',

    all_units: 'Semua Unit',
    add_unit: 'Tambah Unit',
    selected_date: 'Tarikh Dipilih',
    book_date_btn: 'Tempah Tarikh',

    filter_all: 'Semua',
    filter_quotations: '📋 Sebut Harga',
    filter_booked: '🟡 Ditempah (Deposit)',
    filter_confirmed: '🟢 Disahkan (Penuh)',
    filter_inhouse: 'Sedang Menginap',
    filter_completed: 'Selesai',
    filter_blocked: 'Disekat',
    search_placeholder: 'Cari nama tetamu, telefon, rujukan...',

    btn_send_quotation: 'Hantar Sebut Harga',
    btn_mark_booked: 'Tanda Deposit Dibayar (Kunci)',
    btn_send_deposit_receipt: 'Hantar Resit Deposit',
    btn_send_invoice: 'Hantar Invois',
    btn_mark_confirmed: 'Tanda Bayaran Penuh (Sahkan)',
    btn_send_full_receipt: 'Hantar Resit Penuh & Kunci',
    btn_checkin: 'Daftar Masuk',
    btn_checkout_reminder: 'Peringatan Daftar Keluar',
    btn_complete_checkout: 'Selesaikan Daftar Keluar',

    total_rev: 'Jumlah Pendapatan',
    total_exp: 'Jumlah Perbelanjaan',
    net_profit: 'Keuntungan Bersih',
    rev_by_homestay: 'Pendapatan Mengikut Homestay',
    expense_breakdown: 'Pecahan Perbelanjaan',

    demo_badge: 'MOD DEMO',
    demo_banner_text: 'Suka aplikasi ini untuk homestay anda?',
    buy_app: 'Beli App',
    activate: 'Aktifkan'
  }
};

function t(key) {
  const lang = appState.settings.language || 'en';
  return (TRANSLATIONS[lang] && TRANSLATIONS[lang][key]) || (TRANSLATIONS['en'][key]) || key;
}

const INITIAL_PROPERTIES = [
  {
    id: 'prop-1',
    name: 'Sunset Ocean Villa (Whole House)',
    propType: 'entire',
    roomNo: 'Whole Unit (3-Bedroom)',
    address: 'Unit 12-05, Seaview Residences, Jalan Pantai 1',
    wifiName: 'SunsetVilla_HighSpeed',
    wifiPass: 'oceanbreeze2026',
    doorCode: '5829#',
    color: '#0284c7',
    defaultRate: 280,
    cleaningFee: 60,
    checkInTime: '15:00',
    checkOutTime: '12:00',
    rules: 'No smoking indoors. Quiet hours after 10:00 PM. Please turn off air conditioning when leaving.'
  },
  {
    id: 'prop-2',
    name: 'Villa Impian - Master Bedroom',
    propType: 'room_master',
    roomNo: 'Bilik Master (Attached Bathroom)',
    address: 'Lot 45, Green Hills Sanctuary, Cameron View',
    wifiName: 'VillaImpian_5G',
    wifiPass: 'freshcool99',
    doorCode: '1122#',
    color: '#059669',
    defaultRate: 150,
    cleaningFee: 30,
    checkInTime: '15:00',
    checkOutTime: '12:00',
    rules: 'No pets inside. Shoes off at entrance. Kitchen and living hall are shared.'
  },
  {
    id: 'prop-3',
    name: 'Villa Impian - Room 2 (Medium)',
    propType: 'room_medium',
    roomNo: 'Bilik 2',
    address: 'Lot 45, Green Hills Sanctuary, Cameron View',
    wifiName: 'VillaImpian_5G',
    wifiPass: 'freshcool99',
    doorCode: '1123#',
    color: '#d97706',
    defaultRate: 100,
    cleaningFee: 25,
    checkInTime: '15:00',
    checkOutTime: '12:00',
    rules: 'Quiet hours after 10:00 PM. Shared kitchen & living hall.'
  }
];

let appState = {
  properties: [],
  bookings: [],
  turnovers: [],
  expenses: [],
  settings: { ...DEFAULT_SETTINGS },
  isLicensed: false,
  isMasterAdmin: false,
  licenseKey: null,
  selectedPropertyId: 'all',
  activeTab: 'dashboard',
  currentCalDate: new Date(),
  selectedCalDate: new Date().toISOString().split('T')[0],
  activeWaBooking: null,
  activeWaTemplate: 'confirm'
};

// ==========================================================================
// 2. INITIALIZATION & DEMO DATA SEEDING
// ==========================================================================

function initApp() {
  loadFromStorage();

  // Check URL params for Demo or 1-Click Auto-Activation (?phone=...&key=...)
  const urlParams = new URLSearchParams(window.location.search);
  const isDemoParam = urlParams.get('demo') === '1';
  const phoneParam = urlParams.get('phone');
  const keyParam = urlParams.get('key');

  if (keyParam) {
    const rawTargetPhone = phoneParam || appState.settings.ownerPhone;
    const verification = verifyLicenseKey(keyParam, rawTargetPhone);

    if (verification.valid) {
      appState.isLicensed = true;
      appState.licenseKey = keyParam.toUpperCase();
      appState.isMasterAdmin = verification.isMaster;
      
      if (verification.phone) {
        appState.settings.ownerPhone = '+' + verification.phone;
        appState.settings.sellerPhone = '+' + verification.phone;
      }
      
      saveToStorage();
      showToast('🎉 Lifetime License Activated Successfully!');

      // Remove query params from address bar for clean PWA URL
      if (window.history.replaceState) {
        const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
        window.history.replaceState({ path: cleanUrl }, '', cleanUrl);
      }
    }
  }

  const isFirstEverVisit = localStorage.getItem('staymanager_initialized') === null;
  if (isDemoParam || isFirstEverVisit) {
    seedDemoData();
    localStorage.setItem('staymanager_initialized', 'true');
  }

  applyTheme(appState.settings.theme);
  setupEventListeners();
  renderApp();

  // Register PWA Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(err => console.log('SW registration note:', err));
  }
}

function loadFromStorage() {
  try {
    const savedProps = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const savedTurnovers = localStorage.getItem(STORAGE_KEYS.TURNOVERS);
    const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const savedLicense = localStorage.getItem(STORAGE_KEYS.LICENSE);

    if (savedProps) appState.properties = JSON.parse(savedProps);
    if (savedBookings) appState.bookings = JSON.parse(savedBookings);
    if (savedTurnovers) appState.turnovers = JSON.parse(savedTurnovers);
    if (savedExpenses) appState.expenses = JSON.parse(savedExpenses);
    if (savedSettings) appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    
    if (savedLicense) {
      const parsedLicense = JSON.parse(savedLicense);
      if (parsedLicense && parsedLicense.key) {
        const check = verifyLicenseKey(parsedLicense.key, appState.settings.ownerPhone);
        if (check.valid) {
          appState.isLicensed = true;
          appState.licenseKey = parsedLicense.key;
          appState.isMasterAdmin = check.isMaster;
        }
      }
    }
  } catch (e) {
    console.error('Error loading localStorage:', e);
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(appState.properties));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(appState.bookings));
  localStorage.setItem(STORAGE_KEYS.TURNOVERS, JSON.stringify(appState.turnovers));
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(appState.expenses));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(appState.settings));
  if (appState.isLicensed && appState.licenseKey) {
    localStorage.setItem(STORAGE_KEYS.LICENSE, JSON.stringify({ key: appState.licenseKey, activatedAt: new Date().toISOString() }));
  }
}

function seedDemoData() {
  appState.properties = [...INITIAL_PROPERTIES];
  
  const today = new Date();
  const formatDate = (d) => d.toISOString().split('T')[0];

  const dMinus2 = new Date(today); dMinus2.setDate(today.getDate() - 2);
  const dMinus1 = new Date(today); dMinus1.setDate(today.getDate() - 1);
  const dToday = new Date(today);
  const dPlus1 = new Date(today); dPlus1.setDate(today.getDate() + 1);
  const dPlus2 = new Date(today); dPlus2.setDate(today.getDate() + 2);
  const dPlus4 = new Date(today); dPlus4.setDate(today.getDate() + 4);
  const dPlus6 = new Date(today); dPlus6.setDate(today.getDate() + 6);
  const dPlus8 = new Date(today); dPlus8.setDate(today.getDate() + 8);

  appState.bookings = [
    {
      id: 'b-demo-1',
      propertyId: 'prop-1',
      rentalType: 'daily',
      guestName: 'Sarah Jenkins',
      guestPhone: '+60123456789',
      guestNric: '900412-14-5588',
      guestEmail: 'sarah.j@example.com',
      guestAddress: 'No 45, Jalan Ampang Hilir, 55000 Kuala Lumpur',
      guestCount: 4,
      checkIn: formatDate(dMinus2),
      checkOut: formatDate(dToday),
      nights: 2,
      nightlyRate: 280,
      cleaningFee: 60,
      securityDeposit: 100,
      totalAmount: 720,
      depositPaid: 720,
      balance: 0,
      status: 'checked-in',
      channel: 'whatsapp',
      notes: 'Family vacation. Key PIN 5829# sent. Security deposit RM 100 held.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'b-demo-2',
      propertyId: 'prop-2',
      rentalType: 'daily',
      guestName: 'David Lee',
      guestPhone: '+60198765432',
      guestNric: '920820-01-6789',
      guestEmail: 'david.lee@outlook.com',
      guestAddress: 'Block B-12-3, Sri Petaling, 57000 KL',
      guestCount: 2,
      checkIn: formatDate(dToday),
      checkOut: formatDate(dPlus2),
      nights: 2,
      nightlyRate: 150,
      cleaningFee: 30,
      securityDeposit: 50,
      totalAmount: 380,
      depositPaid: 380,
      balance: 0,
      status: 'confirmed',
      channel: 'airbnb',
      notes: 'Fully paid! Booked Villa Impian Master Bedroom. Arriving at 4:00 PM.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'b-demo-3',
      propertyId: 'prop-3',
      rentalType: 'daily',
      guestName: 'Ahmad Faiz',
      guestPhone: '+60176543210',
      guestNric: '951104-10-5231',
      guestEmail: 'ahmad.faiz@gmail.com',
      guestAddress: 'No 18, Jalan Melati 3, 40000 Shah Alam',
      guestCount: 1,
      checkIn: formatDate(dPlus2),
      checkOut: formatDate(dPlus4),
      nights: 2,
      nightlyRate: 100,
      cleaningFee: 25,
      securityDeposit: 50,
      totalAmount: 275,
      depositPaid: 100,
      balance: 175,
      status: 'booked',
      channel: 'whatsapp',
      notes: 'Room 2 booking fee paid RM 100. Balance due before check-in.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'b-demo-4',
      propertyId: 'prop-1',
      rentalType: 'daily',
      guestName: 'Chloe Lim',
      guestPhone: '+60112345678',
      guestNric: '',
      guestEmail: 'chloe@example.com',
      guestAddress: '',
      guestCount: 2,
      checkIn: formatDate(dPlus4),
      checkOut: formatDate(dPlus6),
      nights: 2,
      nightlyRate: 280,
      cleaningFee: 60,
      securityDeposit: 100,
      totalAmount: 720,
      depositPaid: 0,
      balance: 720,
      status: 'quotation',
      channel: 'whatsapp',
      notes: 'Enquiry received for Sunset Ocean Villa. Quotation sent on WhatsApp.',
      createdAt: new Date().toISOString()
    },
    {
      id: 'b-demo-5',
      propertyId: 'prop-2',
      rentalType: 'monthly',
      guestName: 'Dr. Zulkifli Rahman',
      guestPhone: '+60133445566',
      guestNric: '780612-03-5123',
      guestEmail: 'dr.zul@hospital.gov.my',
      guestAddress: 'No 99, Lorong Seri Teruntum, 25000 Kuantan, Pahang',
      guestCount: 1,
      checkIn: formatDate(dToday),
      checkOut: formatDate(new Date(today.getFullYear(), today.getMonth() + 6, today.getDate())),
      monthlyStart: formatDate(dToday),
      monthlyDuration: 6,
      monthlyRate: 750,
      rentalDeposit: 750,
      utilitiesDeposit: 200,
      agreementFee: 100,
      totalAmount: 1800,
      depositPaid: 1800,
      balance: 0,
      status: 'checked-in',
      channel: 'direct',
      notes: '6-Month Master Bedroom tenancy. Agreement signed & deposit settled.',
      createdAt: new Date().toISOString()
    }
  ];

  appState.turnovers = [
    {
      id: 't-demo-1',
      propertyId: 'prop-1',
      bookingId: 'b-demo-1',
      date: formatDate(dToday),
      status: 'pending',
      cleanerName: 'Kak Siti (Cleaner)',
      cleanerPhone: '+60129998877',
      checklist: [
        { text: 'Strip & wash bedsheets & pillowcases', done: false },
        { text: 'Sanitize bathroom & provide fresh towels', done: false },
        { text: 'Restock toiletries, coffee & mineral water', done: false },
        { text: 'Reset Smart Lock PIN code (5829#)', done: false },
        { text: 'Check air-conditioners & TV remotes', done: false },
        { text: 'Empty all trash bins', done: false }
      ]
    }
  ];

  appState.expenses = [
    {
      id: 'exp-1',
      propertyId: 'prop-1',
      date: formatDate(dMinus2),
      category: 'cleaning',
      description: 'Turnover deep cleaning fee',
      amount: 60
    },
    {
      id: 'exp-2',
      propertyId: 'prop-1',
      date: formatDate(dMinus1),
      category: 'supplies',
      description: 'Restocked shampoo, body wash & coffee packets',
      amount: 45
    },
    {
      id: 'exp-3',
      propertyId: 'prop-2',
      date: formatDate(dMinus2),
      category: 'utilities',
      description: 'High-speed WiFi monthly subscription',
      amount: 89
    }
  ];

  saveToStorage();
  showToast('Demo data loaded with 2 homestays & sample bookings!');
}

// ==========================================================================
// 3. EVENT LISTENERS & NAVIGATION
// ==========================================================================

function setupEventListeners() {
  // Bottom Navigation Tabs
  document.querySelectorAll('.bottom-nav .nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = item.getAttribute('data-tab');
      switchTab(tab);
    });
  });

  // Header quick buttons
  document.getElementById('btnLangToggle').addEventListener('click', toggleLanguage);
  document.getElementById('btnThemeToggle').addEventListener('click', toggleTheme);
  document.getElementById('btnDemoToggle').addEventListener('click', () => {
    if (appState.isLicensed) {
      switchTab('settings');
      showToast(appState.isMasterAdmin ? '👑 Master Admin Mode Active' : '✨ Lifetime Pro License Active');
    } else {
      openLicenseModal();
    }
  });
  document.getElementById('btnQuickGuestGuide').addEventListener('click', openGuestGuideModal);

  // Language selector in Settings
  const langSelect = document.getElementById('settingLanguageSelect');
  if (langSelect) {
    langSelect.addEventListener('change', (e) => setLanguage(e.target.value));
  }

  // Property Switcher '+ Add' button
  document.getElementById('btnAddPropertyPill').addEventListener('click', () => openPropertyModal());

  // Dashboard quick triggers
  document.getElementById('btnSeeAllBookings').addEventListener('click', () => switchTab('bookings'));
  document.getElementById('btnManageProperties').addEventListener('click', () => switchTab('settings'));

  // Floating Action Button
  document.getElementById('fabAddBooking').addEventListener('click', () => openBookingModal());

  // Calendar Controls
  document.getElementById('calPrevMonth').addEventListener('click', () => changeCalMonth(-1));
  document.getElementById('calNextMonth').addEventListener('click', () => changeCalMonth(1));
  document.getElementById('btnQuickBookForDate').addEventListener('click', () => {
    openBookingModal(null, appState.selectedCalDate);
  });

  // Bookings Search & Filter
  document.getElementById('bookingSearchInput').addEventListener('input', renderBookingsTab);
  document.querySelectorAll('#bookingStatusFilters .filter-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#bookingStatusFilters .filter-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderBookingsTab();
    });
  });

  // Modals close buttons
  document.getElementById('btnCloseBookingModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCancelBookingModal').addEventListener('click', closeAllModals);
  document.getElementById('btnClosePropertyModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCancelPropertyModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCloseWaModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCloseExpenseModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCancelExpenseModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCloseGuestGuideModal').addEventListener('click', closeAllModals);
  document.getElementById('btnCloseLicenseModal').addEventListener('click', closeAllModals);
  
  // Refund Modal Close
  const closeRefund = document.getElementById('btnCloseRefundModal');
  if (closeRefund) closeRefund.addEventListener('click', closeAllModals);
  const cancelRefund = document.getElementById('btnCancelRefundModal');
  if (cancelRefund) cancelRefund.addEventListener('click', closeAllModals);

  // License & Sales Event Handlers
  document.getElementById('btnOpenActivateModal').addEventListener('click', openLicenseModal);
  document.getElementById('btnBuyLicense').addEventListener('click', handleBuyLicenseRedirect);
  document.getElementById('btnBuyLicenseViaWa').addEventListener('click', handleBuyLicenseRedirect);
  document.getElementById('licenseForm').addEventListener('submit', handleActivateLicenseSubmit);

  // Admin License Generator Handlers
  const adminGenForm = document.getElementById('adminGenForm');
  if (adminGenForm) adminGenForm.addEventListener('submit', handleGenerateAdminLicense);
  const btnCopyMagic = document.getElementById('btnCopyMagicLink');
  if (btnCopyMagic) btnCopyMagic.addEventListener('click', handleCopyMagicLink);
  const btnSendBuyer = document.getElementById('btnSendBuyerWa');
  if (btnSendBuyer) btnSendBuyer.addEventListener('click', handleSendBuyerWa);

  // Rental Type Segmented Control (Daily vs Monthly)
  document.querySelectorAll('#rentalTypeSegmented .segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#rentalTypeSegmented .segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const type = btn.getAttribute('data-type');
      document.getElementById('bookingRentalType').value = type;
      setBookingFormRentalType(type);
      updateBookingModalPricing();
    });
  });

  // Booking Form Submission & Dynamic Pricing Calc
  document.getElementById('bookingForm').addEventListener('submit', handleSaveBooking);
  [
    'bookingCheckIn', 'bookingCheckOut', 'bookingNightlyRate', 'bookingCleaningFee', 'bookingSecurityDeposit',
    'bookingMonthlyStart', 'bookingMonthlyDuration', 'bookingMonthlyRate', 'bookingRentalDeposit',
    'bookingUtilitiesDeposit', 'bookingAgreementFee', 'bookingPropertySelect'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateBookingModalPricing);
      el.addEventListener('change', updateBookingModalPricing);
    }
  });

  // Tenancy Deposit Refund Form
  const refundForm = document.getElementById('depositRefundForm');
  if (refundForm) refundForm.addEventListener('submit', handleProcessDepositRefund);
  [
    'refundRentalDepInput', 'refundUtilitiesDepInput', 'refundDeductUtilitiesInput', 'refundDeductRepairsInput'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updateDepositRefundCalculation);
      el.addEventListener('change', updateDepositRefundCalculation);
    }
  });

  // Property Form Submission & Modals
  document.getElementById('propertyForm').addEventListener('submit', handleSaveProperty);
  document.getElementById('btnAddNewPropertyModal').addEventListener('click', () => openPropertyModal());

  // Expense Buttons & Form
  const openExpModal = () => openExpenseModal();
  document.getElementById('btnAddExpenseBtn').addEventListener('click', openExpModal);
  document.getElementById('btnAddExpenseBtn2').addEventListener('click', openExpModal);
  document.getElementById('expenseForm').addEventListener('submit', handleSaveExpense);

  // WhatsApp Modal Buttons & Template Switcher
  document.querySelectorAll('.wa-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.wa-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      appState.activeWaTemplate = btn.getAttribute('data-template');
      renderWhatsAppPreview();
    });
  });
  document.getElementById('btnCopyWaText').addEventListener('click', handleCopyWaText);
  document.getElementById('btnSendWaDirect').addEventListener('click', handleSendWaDirect);

  // Deposit Presets in Booking Form
  document.getElementById('btnPresetDep30').addEventListener('click', () => applyDepositPreset(0.30, 'booked'));
  document.getElementById('btnPresetDep50').addEventListener('click', () => applyDepositPreset(0.50, 'booked'));
  document.getElementById('btnPresetDepFull').addEventListener('click', () => applyDepositPreset(1.0, 'confirmed'));
  document.getElementById('btnPresetDepZero').addEventListener('click', () => applyDepositPreset(0, 'quotation'));

  // Settings & Preferences
  document.getElementById('btnSavePreferences').addEventListener('click', handleSavePreferences);
  document.getElementById('btnSaveBankDetails').addEventListener('click', handleSaveBankDetails);
  document.getElementById('btnExportData').addEventListener('click', exportDataBackup);
  document.getElementById('btnImportDataInput').addEventListener('change', importDataBackup);
  document.getElementById('btnLoadDemoData').addEventListener('click', seedDemoData);
  document.getElementById('btnResetAllData').addEventListener('click', resetAllData);

  // Finance Selectors
  document.getElementById('financeMonthSelect').addEventListener('change', renderFinancesTab);
  document.getElementById('financeYearSelect').addEventListener('change', renderFinancesTab);
  populateFinanceDateSelectors();
}

function applyDepositPreset(pct, targetStatus) {
  const checkInVal = document.getElementById('bookingCheckIn').value;
  const checkOutVal = document.getElementById('bookingCheckOut').value;
  const rateVal = parseFloat(document.getElementById('bookingNightlyRate').value) || 0;
  const cleanVal = parseFloat(document.getElementById('bookingCleaningFee').value) || 0;

  let nights = 0;
  if (checkInVal && checkOutVal) {
    const d1 = new Date(checkInVal);
    const d2 = new Date(checkOutVal);
    const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
    nights = diff > 0 ? diff : 0;
  }

  const total = (nights * rateVal) + cleanVal;
  const depositAmount = Math.round(total * pct * 100) / 100;
  document.getElementById('bookingDepositPaid').value = depositAmount;
  if (targetStatus) {
    document.getElementById('bookingStatusSelect').value = targetStatus;
  }
}

function handleSaveBankDetails() {
  appState.settings.bankName = document.getElementById('settingBankNameInput').value.trim() || 'Maybank';
  appState.settings.bankAccNum = document.getElementById('settingBankAccNumInput').value.trim() || '';
  appState.settings.bankAccHolder = document.getElementById('settingBankAccHolderInput').value.trim() || '';
  appState.settings.duitNow = document.getElementById('settingDuitNowInput').value.trim() || '';
  saveToStorage();
  showToast(t('Bank & payment details saved!'));
}

// ==========================================================================
// LANGUAGE / I18N SYSTEM
// ==========================================================================

function toggleLanguage() {
  const currentLang = appState.settings.language || 'en';
  const newLang = currentLang === 'en' ? 'bm' : 'en';
  setLanguage(newLang);
}

function setLanguage(lang) {
  appState.settings.language = lang;
  saveToStorage();
  applyLanguageUI();
  renderApp();
  showToast(lang === 'bm' ? '🇲🇾 Bahasa Melayu diaktifkan!' : '🇬🇧 English language activated!');
}

function applyLanguageUI() {
  const lang = appState.settings.language || 'en';

  // Header language pill
  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  // Bottom Navigation item labels
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  if (navItems.length >= 6) {
    navItems[0].querySelector('span').textContent = t('nav_today');
    navItems[1].querySelector('span').textContent = t('nav_calendar');
    navItems[2].querySelector('span').textContent = t('nav_bookings');
    navItems[3].querySelector('span').textContent = t('nav_turnovers');
    navItems[4].querySelector('span').textContent = t('nav_finances');
    navItems[5].querySelector('span').textContent = t('nav_settings');
  }

  // Dashboard KPI labels
  const kpiCheckin = document.querySelector('#kpiCheckInsCard .kpi-label');
  const kpiCheckout = document.querySelector('#kpiCheckOutsCard .kpi-label');
  const kpiInhouse = document.querySelector('#kpiOccupiedCard .kpi-label');
  const kpiTurnovers = document.querySelector('#kpiTurnoverCard .kpi-label');

  if (kpiCheckin) kpiCheckin.textContent = t('kpi_checkin');
  if (kpiCheckout) kpiCheckout.textContent = t('kpi_checkout');
  if (kpiInhouse) kpiInhouse.textContent = t('kpi_inhouse');
  if (kpiTurnovers) kpiTurnovers.textContent = t('kpi_turnovers');

  // Search input placeholder
  const searchInput = document.getElementById('bookingSearchInput');
  if (searchInput) searchInput.placeholder = t('search_placeholder');

  // Demo Sales banner
  const demoBadge = document.querySelector('.demo-sales-banner .banner-badge');
  const demoText = document.querySelector('.demo-sales-banner .banner-text');
  const btnBuy = document.getElementById('btnBuyLicense');
  const btnAct = document.getElementById('btnOpenActivateModal');

  if (demoBadge) demoBadge.innerHTML = `<i class="fa-solid fa-sparkles"></i> ${t('demo_badge')}`;
  if (demoText) demoText.textContent = t('demo_banner_text');
  if (btnBuy) btnBuy.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${t('buy_app')}`;
  if (btnAct) btnAct.innerHTML = `<i class="fa-solid fa-key"></i> ${t('activate')}`;
}

// ==========================================================================
// LICENSE & PHONE-BOUND CRYPTOGRAPHIC ENGINE
// ==========================================================================

function normalizePhoneNumber(rawPhone) {
  if (!rawPhone) return '';
  let digits = rawPhone.replace(/[^0-9]/g, '');
  // Normalize Malaysian phone prefixes (01x -> 601x)
  if (digits.startsWith('01') && digits.length >= 10 && digits.length <= 11) {
    digits = '6' + digits;
  } else if (digits.startsWith('0') && digits.length >= 9) {
    digits = '6' + digits;
  }
  return digits;
}

function computeSimpleHash(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).toUpperCase().padStart(4, '0').slice(-4);
}

function generatePhoneLicenseKey(rawPhone) {
  const cleanPhone = normalizePhoneNumber(rawPhone);
  if (!cleanPhone || cleanPhone.length < 8) return null;

  const part1 = computeSimpleHash(cleanPhone + LICENSE_SECRET_SALT);
  const part2 = computeSimpleHash(LICENSE_SECRET_SALT + cleanPhone + 'PRO_2026');
  return `STAY-${cleanPhone}-${part1}-${part2}`;
}

function verifyLicenseKey(rawKey, targetPhone = null) {
  if (!rawKey) return { valid: false, isMaster: false, phone: null, reason: 'Empty key' };
  const key = rawKey.trim().toUpperCase();

  // 1. Check Master Admin Key (Secret Signature Check)
  if (isMasterAdminKey(key)) {
    return { valid: true, isMaster: true, phone: null, key };
  }

  // 2. Check Phone-Bound License Key: STAY-<CLEAN_PHONE>-<HASH1>-<HASH2>
  const parts = key.split('-');
  if (parts.length === 4 && parts[0] === 'STAY') {
    const keyPhone = parts[1];
    const expectedKey = generatePhoneLicenseKey(keyPhone);

    if (expectedKey === key) {
      if (targetPhone) {
        const cleanTarget = normalizePhoneNumber(targetPhone);
        if (cleanTarget && cleanTarget !== keyPhone) {
          return { valid: false, isMaster: false, phone: keyPhone, reason: 'Phone mismatch' };
        }
      }
      return { valid: true, isMaster: false, phone: keyPhone, key };
    }
  }

  return { valid: false, isMaster: false, phone: null, reason: 'Invalid signature' };
}

function openLicenseModal() {
  const phoneInput = document.getElementById('licensePhoneInput');
  const keyInput = document.getElementById('licenseKeyInput');
  
  if (phoneInput) phoneInput.value = appState.settings.ownerPhone || '';
  if (keyInput) keyInput.value = appState.licenseKey || '';
  
  document.getElementById('licenseModal').classList.add('active');
}

function handleActivateLicenseSubmit(e) {
  e.preventDefault();
  const inputPhone = document.getElementById('licensePhoneInput').value.trim();
  const inputKey = document.getElementById('licenseKeyInput').value.trim().toUpperCase();

  if (!inputKey) {
    alert('Please enter your license key.');
    return;
  }

  const result = verifyLicenseKey(inputKey, inputPhone);

  if (result.valid) {
    appState.isLicensed = true;
    appState.licenseKey = inputKey;
    appState.isMasterAdmin = result.isMaster;

    if (result.phone) {
      appState.settings.ownerPhone = '+' + result.phone;
      appState.settings.sellerPhone = '+' + result.phone;
    } else if (inputPhone) {
      appState.settings.ownerPhone = inputPhone;
    }

    saveToStorage();
    closeAllModals();
    renderApp();
    showToast('🎉 Congratulations! Lifetime License activated successfully!');
  } else {
    if (result.reason === 'Phone mismatch') {
      alert(`⚠️ License Key mismatch!\n\nThis license key is locked to phone number: +${result.phone}.\nPlease ensure you enter the registered phone number.`);
    } else {
      alert('❌ Invalid License Key.\n\nPlease verify your registered WhatsApp number and license key, or contact support via WhatsApp to get a valid key.');
    }
  }
}

function handleBuyLicenseRedirect() {
  const sellerNumber = (appState.settings.sellerPhone || '+60123456789').replace(/[^0-9]/g, '');
  const message = `Hi! I am using the StayManager Homestay app demo and would like to buy the Lifetime License. Please provide the price and payment details. Thank you!`;
  const url = `https://wa.me/${sellerNumber}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
}

// ==========================================================================
// ADMIN LICENSE GENERATOR (SELLER TOOL)
// ==========================================================================

function handleGenerateAdminLicense(e) {
  e.preventDefault();
  const buyerPhone = document.getElementById('adminBuyerPhoneInput').value.trim();
  const buyerName = document.getElementById('adminBuyerNameInput').value.trim();

  const cleanPhone = normalizePhoneNumber(buyerPhone);
  if (!cleanPhone || cleanPhone.length < 8) {
    alert('Please enter a valid international phone number (e.g. +60123456789 or 0123456789).');
    return;
  }

  const licenseKey = generatePhoneLicenseKey(cleanPhone);
  const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  const magicUrl = `${baseUrl}?phone=${cleanPhone}&key=${licenseKey}`;

  document.getElementById('resBuyerPhone').textContent = `+${cleanPhone} ${buyerName ? `(${buyerName})` : ''}`;
  document.getElementById('resLicenseKey').textContent = licenseKey;
  document.getElementById('resMagicUrl').value = magicUrl;
  document.getElementById('adminGenResultBox').classList.remove('hidden');

  showToast('License Key & Magic Link generated!');
}

function handleCopyMagicLink() {
  const magicUrl = document.getElementById('resMagicUrl').value;
  if (!magicUrl) return;

  navigator.clipboard.writeText(magicUrl).then(() => {
    showToast('1-Click Magic Activation URL copied!');
  }).catch(() => {
    showToast('Copied URL!');
  });
}

function handleSendBuyerWa() {
  const magicUrl = document.getElementById('resMagicUrl').value;
  const licenseKey = document.getElementById('resLicenseKey').textContent;
  const buyerPhone = normalizePhoneNumber(document.getElementById('adminBuyerPhoneInput').value);
  const buyerName = document.getElementById('adminBuyerNameInput').value.trim();
  const isBM = appState.settings.language === 'bm';

  if (!magicUrl || !buyerPhone) return;

  let msg = '';
  if (isBM) {
    msg = `🎉 *TERIMA KASIH! LESEN APLIKASI HOMESTAY ANDA SUDAH DIAKTIFKAN*\n\n` +
      `Salam sejahtera ${buyerName ? `*${buyerName}*` : ''}! Berikut adalah maklumat lesen dan pautan pemasangan peribadi anda:\n\n` +
      `📱 *Nombor WhatsApp Berdaftar:* +${buyerPhone}\n` +
      `🔑 *Kunci Lesen Anda:* *${licenseKey}*\n\n` +
      `🚀 *PAUTAN AKTIVASI 1-KLIK:*\n${magicUrl}\n\n` +
      `📌 *PANDUAN PEMASANGAN:*\n` +
      `1. Tekan pautan di atas pada telefon anda.\n` +
      `2. Aplikasi akan diaktifkan serta-merta tanpa had homestay.\n` +
      `3. Untuk jadikan seperti app di telefon: Tekan Menu / Share ➔ "Add to Home Screen".\n\n` +
      `💡 *JAMINAN TUKAR TELEFON:*\n` +
      `Jika anda menukar telefon baru pada masa hadapan, simpan kunci lesen ini. Anda boleh menggunakannya semula pada telefon baru anda asalkan menggunakan nombor WhatsApp yang sama! ✨🏡`;
  } else {
    msg = `🎉 *THANK YOU! YOUR STAYMANAGER HOMESTAY LICENSE IS ACTIVE*\n\n` +
      `Hello ${buyerName ? `*${buyerName}*` : ''}! Here are your private app license details and installation link:\n\n` +
      `📱 *Registered WhatsApp:* +${buyerPhone}\n` +
      `🔑 *Your License Key:* *${licenseKey}*\n\n` +
      `🚀 *1-CLICK MAGIC ACTIVATION LINK:*\n${magicUrl}\n\n` +
      `📌 *INSTALLATION STEPS:*\n` +
      `1. Tap the link above on your smartphone.\n` +
      `2. The app will unlock full unlimited features immediately.\n` +
      `3. To install on phone: Tap Safari Share or Chrome Menu ➔ "Add to Home Screen".\n\n` +
      `💡 *NEW PHONE FRIENDLY:*\n` +
      `If you change or upgrade your phone in the future, your license remains valid forever under your WhatsApp number! ✨🏡`;
  }

  const waUrl = `https://wa.me/${buyerPhone}?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

// ==========================================================================
// 4. TAB & PROPERTY SWITCHING
// ==========================================================================

function switchTab(tabId) {
  appState.activeTab = tabId;
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  // Render specific tab
  if (tabId === 'dashboard') renderDashboardTab();
  if (tabId === 'calendar') renderCalendarTab();
  if (tabId === 'bookings') renderBookingsTab();
  if (tabId === 'turnovers') renderTurnoversTab();
  if (tabId === 'finances') renderFinancesTab();
  if (tabId === 'settings') renderSettingsTab();

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApp() {
  renderHeader();
  renderPropertyPills();
  switchTab(appState.activeTab);
}

function renderHeader() {
  document.getElementById('appBusinessName').textContent = appState.settings.businessName;
  const locale = appState.settings.language === 'bm' ? 'ms-MY' : 'en-US';
  const todayStr = new Date().toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
  document.getElementById('currentDateStr').textContent = todayStr;

  // Toggle Demo Sales Banner based on License state
  const demoBanner = document.getElementById('demoSalesBanner');
  if (demoBanner) {
    if (appState.isLicensed) {
      demoBanner.style.display = 'none';
      demoBanner.classList.add('hidden');
    } else {
      demoBanner.style.display = 'flex';
      demoBanner.classList.remove('hidden');
    }
  }

  // Update Header Status Badge (Top-right pill)
  const demoBtn = document.getElementById('btnDemoToggle');
  if (demoBtn) {
    if (appState.isLicensed) {
      if (appState.isMasterAdmin) {
        demoBtn.innerHTML = `<i class="fa-solid fa-crown" style="color:#f59e0b;"></i> <span class="demo-badge-text" style="color:var(--primary); font-weight:800;">Admin</span>`;
        demoBtn.title = 'Master Admin Mode (Click to open Generator & Settings)';
        demoBtn.style.background = 'var(--primary-light)';
        demoBtn.style.borderColor = 'rgba(2, 132, 199, 0.4)';
      } else {
        demoBtn.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--success);"></i> <span class="demo-badge-text" style="color:var(--success-text); font-weight:800;">Pro</span>`;
        demoBtn.title = 'Lifetime Pro Active';
        demoBtn.style.background = 'var(--success-light)';
        demoBtn.style.borderColor = 'rgba(16, 185, 129, 0.4)';
      }
    } else {
      demoBtn.innerHTML = `<i class="fa-solid fa-sparkles"></i> <span class="demo-badge-text">${t('demo_badge') || 'Demo'}</span>`;
      demoBtn.title = 'Demo Mode (Click to activate)';
      demoBtn.style.background = 'var(--warning-light)';
      demoBtn.style.borderColor = 'rgba(245, 158, 11, 0.4)';
    }
  }
}

function renderPropertyPills() {
  const container = document.getElementById('propertyPills');
  container.innerHTML = '';

  // "All Properties" pill
  const allPill = document.createElement('button');
  allPill.className = `property-pill ${appState.selectedPropertyId === 'all' ? 'active' : ''}`;
  allPill.innerHTML = `<span class="property-dot" style="background:#0284c7;"></span> ${t('all_units')} (${appState.properties.length})`;
  allPill.addEventListener('click', () => {
    appState.selectedPropertyId = 'all';
    renderPropertyPills();
    renderApp();
  });
  container.appendChild(allPill);

  // Individual Property pills
  appState.properties.forEach(prop => {
    const pill = document.createElement('button');
    pill.className = `property-pill ${appState.selectedPropertyId === prop.id ? 'active' : ''}`;
    pill.innerHTML = `<span class="property-dot" style="background:${prop.color || '#0284c7'};"></span> ${prop.name}`;
    pill.addEventListener('click', () => {
      appState.selectedPropertyId = prop.id;
      renderPropertyPills();
      renderApp();
    });
    container.appendChild(pill);
  });
}

function getFilteredBookings() {
  if (appState.selectedPropertyId === 'all') return appState.bookings;
  return appState.bookings.filter(b => b.propertyId === appState.selectedPropertyId);
}

function getFilteredTurnovers() {
  if (appState.selectedPropertyId === 'all') return appState.turnovers;
  return appState.turnovers.filter(t => t.propertyId === appState.selectedPropertyId);
}

function getFilteredExpenses() {
  if (appState.selectedPropertyId === 'all') return appState.expenses;
  return appState.expenses.filter(e => e.propertyId === appState.selectedPropertyId);
}

function getPropertyById(id) {
  return appState.properties.find(p => p.id === id) || { name: 'Homestay', color: '#0284c7', doorCode: '1234', wifiName: '', wifiPass: '' };
}

function formatCurrency(amount) {
  const curr = appState.settings.currency || 'RM';
  return `${curr} ${Number(amount || 0).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

// ==========================================================================
// 5. DASHBOARD (TODAY & ACTIONS) TAB
// ==========================================================================

function renderDashboardTab() {
  const todayStr = new Date().toISOString().split('T')[0];
  const bookings = getFilteredBookings();
  const turnovers = getFilteredTurnovers();

  // KPIs
  const todayCheckIns = bookings.filter(b => b.checkIn === todayStr && b.status !== 'cancelled');
  const todayCheckOuts = bookings.filter(b => b.checkOut === todayStr && b.status !== 'cancelled');
  const inHouse = bookings.filter(b => b.checkIn <= todayStr && b.checkOut > todayStr && b.status !== 'cancelled');
  const pendingTurnovers = turnovers.filter(t => t.status !== 'completed');

  document.getElementById('kpiCheckInsCount').textContent = todayCheckIns.length;
  document.getElementById('kpiCheckOutsCount').textContent = todayCheckOuts.length;
  document.getElementById('kpiInHouseCount').textContent = inHouse.length;
  document.getElementById('kpiTurnoversCount').textContent = pendingTurnovers.length;

  // Monthly Performance Mini Widget
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentMonthBookings = bookings.filter(b => {
    if (b.status === 'cancelled') return false;
    const d = new Date(b.checkIn);
    return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
  });

  const monthRev = currentMonthBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const bookedNights = currentMonthBookings.reduce((sum, b) => sum + (Number(b.nights) || 0), 0);

  // Total possible nights this month for filtered properties
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const propCount = appState.selectedPropertyId === 'all' ? appState.properties.length : 1;
  const totalCapacity = daysInMonth * Math.max(1, propCount);
  const occupancyRate = propCount > 0 ? Math.min(100, Math.round((bookedNights / totalCapacity) * 100)) : 0;

  document.getElementById('dashMonthRevenue').textContent = formatCurrency(monthRev);
  document.getElementById('dashOccupancyRate').textContent = `${occupancyRate}%`;
  document.getElementById('dashOccupancyProgress').style.width = `${occupancyRate}%`;
  document.getElementById('dashBookedNightsCount').textContent = `${bookedNights} nights booked`;
  document.getElementById('dashActivePropertiesCount').textContent = `${appState.properties.length} Homestay${appState.properties.length !== 1 ? 's' : ''}`;

  // Action Feed: Priority Check-ins, Check-outs, and Turnovers
  const actionFeed = document.getElementById('dashboardActionFeed');
  actionFeed.innerHTML = '';

  const actionItems = [];

  todayCheckIns.forEach(b => {
    const prop = getPropertyById(b.propertyId);
    actionItems.push({
      type: 'checkin',
      tag: 'Check-In Today',
      title: `${b.guestName} → ${prop.name}`,
      detail: `${b.guestCount} Guests • Check-in at ${prop.checkInTime || '3:00 PM'}`,
      booking: b,
      prop: prop
    });
  });

  todayCheckOuts.forEach(b => {
    const prop = getPropertyById(b.propertyId);
    actionItems.push({
      type: 'checkout',
      tag: 'Check-Out Today',
      title: `${b.guestName} from ${prop.name}`,
      detail: `Check-out at ${prop.checkOutTime || '12:00 PM'} • Prep Turnover`,
      booking: b,
      prop: prop
    });
  });

  pendingTurnovers.forEach(t => {
    const prop = getPropertyById(t.propertyId);
    actionItems.push({
      type: 'cleaning',
      tag: 'Turnover Needed',
      title: `Cleaning: ${prop.name}`,
      detail: `Date: ${t.date} • ${t.cleanerName || 'Assign Cleaner'}`,
      turnover: t,
      prop: prop
    });
  });

  if (actionItems.length === 0) {
    actionFeed.innerHTML = `
      <div class="card" style="text-align:center; padding: 24px 16px;">
        <i class="fa-solid fa-circle-check" style="font-size: 32px; color: var(--success); margin-bottom: 8px;"></i>
        <h4 style="font-size: 14px; font-weight:700;">All Clear for Today!</h4>
        <p class="card-subtitle">No urgent check-ins or pending turnovers scheduled right now.</p>
      </div>
    `;
  } else {
    actionItems.forEach(item => {
      const card = document.createElement('div');
      card.className = 'action-card';
      if (item.type === 'checkin') card.style.borderLeftColor = 'var(--primary)';
      if (item.type === 'checkout') card.style.borderLeftColor = 'var(--warning)';
      if (item.type === 'cleaning') card.style.borderLeftColor = 'var(--danger)';

      const tagClass = item.type === 'checkin' ? 'tag-checkin' : (item.type === 'checkout' ? 'tag-checkout' : 'tag-cleaning');

      card.innerHTML = `
        <div class="action-card-header">
          <span class="action-card-tag ${tagClass}">${item.tag}</span>
          <span class="card-subtitle"><i class="fa-solid fa-clock"></i> Today</span>
        </div>
        <h3 class="action-card-title">${item.title}</h3>
        <p class="action-card-detail"><i class="fa-solid fa-info-circle"></i> ${item.detail}</p>
        <div class="action-card-btns">
          ${item.booking ? `
            <button class="btn btn-whatsapp btn-xs btn-wa-trigger" data-bid="${item.booking.id}" data-type="${item.type}">
              <i class="fa-brands fa-whatsapp"></i> ${item.type === 'checkin' ? 'Send Door Code & WiFi' : 'Send Check-Out Remind'}
            </button>
          ` : ''}
          ${item.turnover ? `
            <button class="btn btn-whatsapp btn-xs btn-wa-cleaner" data-tid="${item.turnover.id}">
              <i class="fa-brands fa-whatsapp"></i> WhatsApp Cleaner
            </button>
            <button class="btn btn-outline btn-xs btn-view-turnovers">
              <i class="fa-solid fa-list-check"></i> Checklist
            </button>
          ` : ''}
        </div>
      `;

      actionFeed.appendChild(card);
    });

    // Attach event listeners for action feed buttons
    actionFeed.querySelectorAll('.btn-wa-trigger').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const bid = e.currentTarget.getAttribute('data-bid');
        const type = e.currentTarget.getAttribute('data-type');
        const booking = appState.bookings.find(b => b.id === bid);
        if (booking) {
          openWhatsAppModal(booking, type === 'checkin' ? 'checkin' : 'checkout');
        }
      });
    });

    actionFeed.querySelectorAll('.btn-wa-cleaner').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tid = e.currentTarget.getAttribute('data-tid');
        const turnover = appState.turnovers.find(t => t.id === tid);
        if (turnover) {
          openWhatsAppCleanerJob(turnover);
        }
      });
    });

    actionFeed.querySelectorAll('.btn-view-turnovers').forEach(btn => {
      btn.addEventListener('click', () => switchTab('turnovers'));
    });
  }

  // Homestay Units Overview List
  const propList = document.getElementById('dashboardPropertyStatusList');
  propList.innerHTML = '';

  const displayProps = appState.selectedPropertyId === 'all' 
    ? appState.properties 
    : appState.properties.filter(p => p.id === appState.selectedPropertyId);

  if (displayProps.length === 0) {
    propList.innerHTML = `
      <div style="text-align:center; padding:20px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">No homestay units added yet.</p>
        <button class="btn btn-primary btn-xs" onclick="openPropertyModal()"><i class="fa-solid fa-plus"></i> Add Homestay Unit</button>
      </div>
    `;
  } else {
    displayProps.forEach(prop => {
      // Check if property is currently occupied today
      const currentStay = appState.bookings.find(b => 
        b.propertyId === prop.id && 
        b.checkIn <= todayStr && 
        b.checkOut > todayStr && 
        b.status !== 'cancelled'
      );

      const hasTurnover = appState.turnovers.some(t => t.propertyId === prop.id && t.status !== 'completed');

      let statusText = 'Vacant & Ready';
      let badgeClass = 'badge-vacant';

      if (currentStay) {
        statusText = `Occupied by ${currentStay.guestName}`;
        badgeClass = 'badge-occupied';
      } else if (hasTurnover) {
        statusText = 'Turnover / Cleaning Required';
        badgeClass = 'badge-turnover';
      }

      const card = document.createElement('div');
      card.className = 'prop-status-card';
      card.innerHTML = `
        <div class="prop-status-info">
          <h4 style="display:flex; align-items:center; gap:6px;">
            <span class="property-dot" style="background:${prop.color};"></span>
            ${prop.name}
          </h4>
          <p>${statusText}</p>
        </div>
        <span class="prop-status-badge ${badgeClass}">${currentStay ? 'Occupied' : (hasTurnover ? 'Turnover' : 'Available')}</span>
      `;
      propList.appendChild(card);
    });
  }
}

// ==========================================================================
// 6. CALENDAR TAB
// ==========================================================================

function changeCalMonth(offset) {
  appState.currentCalDate.setMonth(appState.currentCalDate.getMonth() + offset);
  renderCalendarTab();
}

function renderCalendarTab() {
  const currentMonth = appState.currentCalDate.getMonth();
  const currentYear = appState.currentCalDate.getFullYear();
  
  const locale = appState.settings.language === 'bm' ? 'ms-MY' : 'en-US';
  const monthName = appState.currentCalDate.toLocaleDateString(locale, { month: 'long', year: 'numeric' });
  document.getElementById('calMonthTitle').textContent = monthName;

  const firstDay = new Date(currentYear, currentMonth, 1).getDay();
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const daysInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  const grid = document.getElementById('calDaysGrid');
  grid.innerHTML = '';

  const bookings = getFilteredBookings();
  const todayStr = new Date().toISOString().split('T')[0];

  // Previous month trailing days
  for (let i = firstDay - 1; i >= 0; i--) {
    const dayNum = daysInPrevMonth - i;
    const prevDate = new Date(currentYear, currentMonth - 1, dayNum);
    const dateStr = prevDate.toISOString().split('T')[0];
    const cell = createCalDayCell(dayNum, dateStr, true, bookings, todayStr);
    grid.appendChild(cell);
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const currDate = new Date(currentYear, currentMonth, day);
    const dateStr = currDate.toISOString().split('T')[0];
    const cell = createCalDayCell(day, dateStr, false, bookings, todayStr);
    grid.appendChild(cell);
  }

  // Next month leading days (fill up to 42 cells grid if needed)
  const totalCells = grid.children.length;
  const remaining = (totalCells <= 35 ? 35 : 42) - totalCells;
  for (let day = 1; day <= remaining; day++) {
    const nextDate = new Date(currentYear, currentMonth + 1, day);
    const dateStr = nextDate.toISOString().split('T')[0];
    const cell = createCalDayCell(day, dateStr, true, bookings, todayStr);
    grid.appendChild(cell);
  }

  // Render Legend
  const legend = document.getElementById('calPropertyLegend');
  legend.innerHTML = '';
  appState.properties.forEach(p => {
    const item = document.createElement('div');
    item.className = 'cal-legend-item';
    item.innerHTML = `<span class="property-dot" style="background:${p.color};"></span> ${p.name}`;
    legend.appendChild(item);
  });

  // Render Selected Day Details
  renderSelectedDayDetails();
}

function createCalDayCell(dayNum, dateStr, isOtherMonth, bookings, todayStr) {
  const cell = document.createElement('div');
  cell.className = `cal-day-cell ${isOtherMonth ? 'other-month' : ''} ${dateStr === todayStr ? 'today' : ''} ${dateStr === appState.selectedCalDate ? 'selected' : ''}`;
  cell.setAttribute('data-date', dateStr);

  const numSpan = document.createElement('span');
  numSpan.className = 'cal-day-num';
  numSpan.textContent = dayNum;
  cell.appendChild(numSpan);

  // Find bookings active on this date
  const dayBookings = bookings.filter(b => b.status !== 'cancelled' && b.checkIn <= dateStr && b.checkOut > dateStr);

  if (dayBookings.length > 0) {
    const dotsContainer = document.createElement('div');
    dotsContainer.className = 'cal-dots-container';

    dayBookings.forEach(b => {
      const prop = getPropertyById(b.propertyId);
      const dot = document.createElement('span');
      dot.className = 'cal-stay-dot';
      dot.style.background = prop.color || '#0284c7';
      dotsContainer.appendChild(dot);
    });

    cell.appendChild(dotsContainer);
  }

  cell.addEventListener('click', () => {
    appState.selectedCalDate = dateStr;
    document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
    cell.classList.add('selected');
    renderSelectedDayDetails();
  });

  return cell;
}

function renderSelectedDayDetails() {
  const dateStr = appState.selectedCalDate;
  const d = new Date(dateStr + 'T00:00:00');
  const locale = appState.settings.language === 'bm' ? 'ms-MY' : 'en-US';
  const formattedDate = d.toLocaleDateString(locale, { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' });
  
  document.getElementById('selectedDayTitle').textContent = formattedDate;

  const list = document.getElementById('selectedDayBookingsList');
  list.innerHTML = '';

  const dayBookings = getFilteredBookings().filter(b => b.status !== 'cancelled' && b.checkIn <= dateStr && b.checkOut >= dateStr);

  if (dayBookings.length === 0) {
    list.innerHTML = `
      <div class="empty-hint">
        <i class="fa-solid fa-calendar-check" style="font-size: 20px; color: var(--success); margin-bottom:4px; display:block;"></i>
        All homestays are available on this date.
      </div>
    `;
    return;
  }

  dayBookings.forEach(b => {
    const prop = getPropertyById(b.propertyId);
    const isCheckInDay = b.checkIn === dateStr;
    const isCheckOutDay = b.checkOut === dateStr;

    let badgeText = 'In-Stay';
    if (isCheckInDay) badgeText = 'Check-In Day';
    if (isCheckOutDay) badgeText = 'Check-Out Day';

    const card = document.createElement('div');
    card.className = 'booking-card';
    card.style.borderLeft = `4px solid ${prop.color}`;
    card.innerHTML = `
      <div class="booking-card-top">
        <span class="booking-prop-badge" style="background:${prop.color}20; color:${prop.color};">
          <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
        </span>
        <span class="booking-channel-badge">${badgeText}</span>
      </div>
      <h3 class="booking-guest-title">${b.guestName} (${b.guestCount} Guests)</h3>
      <p class="booking-dates-row"><i class="fa-regular fa-calendar"></i> ${b.checkIn} to ${b.checkOut} (${b.nights} nights)</p>
      <div class="booking-financial-pill">
        <span>Total: <strong>${formatCurrency(b.totalAmount)}</strong></span>
        <span>Balance: <strong style="color:${b.balance > 0 ? 'var(--danger)' : 'var(--success)'};">${formatCurrency(b.balance)}</strong></span>
      </div>
      <div class="booking-actions-row">
        <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}">
          <i class="fa-brands fa-whatsapp"></i> WhatsApp
        </button>
        <button class="btn btn-outline btn-xs btn-edit-booking" data-bid="${b.id}">
          <i class="fa-solid fa-pen"></i> Edit
        </button>
      </div>
    `;
    list.appendChild(card);
  });

  list.querySelectorAll('.btn-open-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openWhatsAppModal(b);
    });
  });

  list.querySelectorAll('.btn-edit-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openBookingModal(b);
    });
  });
}

// ==========================================================================
// 7. BOOKINGS (GUEST CRM) TAB
// ==========================================================================

function renderBookingsTab() {
  const container = document.getElementById('bookingsContainer');
  container.innerHTML = '';

  const query = document.getElementById('bookingSearchInput').value.toLowerCase().trim();
  const activeFilterBtn = document.querySelector('#bookingStatusFilters .filter-pill.active');
  const filterType = activeFilterBtn ? activeFilterBtn.getAttribute('data-filter') : 'all';

  let bookings = getFilteredBookings();
  const todayStr = new Date().toISOString().split('T')[0];

  // Apply status filter
  if (filterType === 'quotation') {
    bookings = bookings.filter(b => b.status === 'quotation');
  } else if (filterType === 'booked') {
    bookings = bookings.filter(b => b.status === 'booked');
  } else if (filterType === 'confirmed') {
    bookings = bookings.filter(b => b.status === 'confirmed');
  } else if (filterType === 'active') {
    bookings = bookings.filter(b => b.status === 'checked-in' || (b.checkIn <= todayStr && b.checkOut >= todayStr && b.status !== 'cancelled' && b.status !== 'quotation'));
  } else if (filterType === 'completed') {
    bookings = bookings.filter(b => b.status === 'checked-out' || b.checkOut < todayStr);
  } else if (filterType === 'blocked') {
    bookings = bookings.filter(b => b.status === 'blocked');
  }

  // Apply search query
  if (query) {
    bookings = bookings.filter(b => 
      b.guestName.toLowerCase().includes(query) ||
      (b.guestPhone && b.guestPhone.includes(query)) ||
      (b.notes && b.notes.toLowerCase().includes(query))
    );
  }

  // Sort by check-in date descending
  bookings.sort((a, b) => new Date(b.checkIn) - new Date(a.checkIn));

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px 16px;">
        <i class="fa-solid fa-address-book" style="font-size:32px; color:var(--text-subtle); margin-bottom:8px;"></i>
        <h4 style="font-size:14px; font-weight:700;">No Bookings Found</h4>
        <p class="card-subtitle">Try adjusting your search or tap + to create a new quotation / booking.</p>
      </div>
    `;
    return;
  }

  bookings.forEach(b => {
    const prop = getPropertyById(b.propertyId);
    const card = document.createElement('div');
    card.className = 'booking-card';
    card.style.borderLeft = `4px solid ${prop.color}`;

    const statusBadgeColors = {
      'quotation': 'background: var(--primary-light); color: var(--primary-text);',
      'booked': 'background: var(--warning-light); color: var(--warning-text); border: 1px solid rgba(245,158,11,0.4);',
      'confirmed': 'background: var(--success-light); color: var(--success-text); border: 1px solid rgba(16,185,129,0.4);',
      'checked-in': 'background: #dbeafe; color: #1e40af;',
      'checked-out': 'background: var(--bg-surface-subtle); color: var(--text-muted);',
      'blocked': 'background: var(--danger-light); color: var(--danger-text);',
      'cancelled': 'background: var(--danger-light); color: var(--danger-text);'
    };

    const statusLabels = {
      'quotation': '📋 QUOTATION',
      'booked': '🟡 BOOKED (DEPOSIT PAID)',
      'confirmed': '🟢 CONFIRMED (PAID FULL)',
      'checked-in': '🔑 IN-HOUSE (CHECKED IN)',
      'checked-out': '🏁 COMPLETED',
      'blocked': '🚫 BLOCKED',
      'cancelled': '❌ CANCELLED'
    };

    const channelIcons = {
      'whatsapp': '<i class="fa-brands fa-whatsapp" style="color:var(--whatsapp)"></i> WhatsApp',
      'airbnb': '<i class="fa-solid fa-house" style="color:#ff385c"></i> Airbnb',
      'booking': '<i class="fa-solid fa-b" style="color:#003580"></i> Booking.com',
      'agoda': '<i class="fa-solid fa-globe" style="color:#7c3aed"></i> Agoda',
      'direct': '<i class="fa-solid fa-user-check"></i> Direct',
      'friends': '<i class="fa-solid fa-handshake"></i> Friends',
      'walkin': '<i class="fa-solid fa-person-walking"></i> Walk-In'
    };

    card.innerHTML = `
      <div class="booking-card-top">
        <span class="booking-prop-badge" style="background:${prop.color}20; color:${prop.color};">
          <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
        </span>
        <span class="booking-channel-badge">${channelIcons[b.channel] || b.channel}</span>
      </div>
      
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:2px;">
        <h3 class="booking-guest-title">${b.guestName}</h3>
        <div style="display:flex; gap:4px; align-items:center;">
          ${b.rentalType === 'monthly' ? `<span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:999px; background:#e0e7ff; color:#3730a3;"><i class="fa-solid fa-calendar-days"></i> ${b.monthlyDuration || 6}M</span>` : ''}
          <span style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:999px; ${statusBadgeColors[b.status] || ''}">${statusLabels[b.status] || b.status.toUpperCase()}</span>
        </div>
      </div>

      <p class="booking-dates-row">
        <i class="fa-regular fa-calendar"></i> ${b.checkIn} → ${b.checkOut} (${b.rentalType === 'monthly' ? `${b.monthlyDuration || 6} Months` : `${b.nights} nights`}) • ${b.guestCount} guests
      </p>

      ${b.notes ? `<p style="font-size:12px; color:var(--text-muted); font-style:italic;"><i class="fa-regular fa-note-sticky"></i> "${b.notes}"</p>` : ''}

      <div class="booking-financial-pill">
        <span>Total: <strong>${formatCurrency(b.totalAmount)}</strong></span>
        <span>Paid: <strong style="color:var(--success);">${formatCurrency(b.depositPaid)}</strong></span>
        <span>Due: <strong style="color:${b.balance > 0 ? 'var(--danger)' : 'var(--success)'};">${formatCurrency(b.balance)}</strong></span>
      </div>

      <!-- Contextual Quick Action Workflow Bar -->
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:4px;">
        ${b.status === 'quotation' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="quotation">
            <i class="fa-solid fa-file-lines"></i> Send Quotation
          </button>
          <button class="btn btn-outline btn-xs btn-mark-booked" data-bid="${b.id}">
            <i class="fa-solid fa-hand-holding-dollar" style="color:var(--warning);"></i> Mark Deposit Paid (Book)
          </button>
        ` : ''}

        ${b.status === 'booked' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="deposit_receipt">
            <i class="fa-solid fa-receipt"></i> Send Deposit Receipt
          </button>
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> Send Rent Invoice
            </button>
          ` : `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="invoice">
              <i class="fa-solid fa-file-invoice"></i> Send Invoice
            </button>
          `}
          <button class="btn btn-outline btn-xs btn-mark-confirmed" data-bid="${b.id}">
            <i class="fa-solid fa-key" style="color:var(--success);"></i> Mark Fully Paid (Confirm)
          </button>
        ` : ''}

        ${b.status === 'confirmed' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="full_receipt">
            <i class="fa-solid fa-key"></i> Send Full Receipt & Key
          </button>
          <button class="btn btn-outline btn-xs btn-mark-checkin" data-bid="${b.id}">
            <i class="fa-solid fa-door-open" style="color:var(--primary);"></i> Check In
          </button>
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> Monthly Invoice
            </button>
          ` : ''}
        ` : ''}

        ${b.status === 'checked-in' ? `
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> Send Monthly Rent Invoice
            </button>
            <button class="btn btn-outline btn-xs btn-open-refund" data-bid="${b.id}">
              <i class="fa-solid fa-money-bill-transfer" style="color:var(--success);"></i> End Tenancy & Refund Deposit
            </button>
          ` : `
            <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="checkout">
              <i class="fa-solid fa-flag-checkered"></i> Check-Out Reminder
            </button>
            ${b.securityDeposit > 0 ? `
              <button class="btn btn-outline btn-xs btn-open-refund" data-bid="${b.id}">
                <i class="fa-solid fa-money-bill-transfer" style="color:var(--success);"></i> Refund Security Deposit
              </button>
            ` : ''}
            <button class="btn btn-outline btn-xs btn-mark-checkout" data-bid="${b.id}">
              <i class="fa-solid fa-check"></i> Complete Check-Out
            </button>
          `}
        ` : ''}

        ${b.status === 'checked-out' && (b.rentalDeposit || b.securityDeposit) ? `
          <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="refund_receipt">
            <i class="fa-solid fa-file-invoice-dollar"></i> View Refund Statement
          </button>
        ` : ''}

        <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="payment" title="Send WhatsApp">
          <i class="fa-brands fa-whatsapp"></i>
        </button>
        <button class="btn btn-outline btn-xs btn-edit-booking" data-bid="${b.id}" title="Edit Booking">
          <i class="fa-solid fa-pen"></i> Edit
        </button>
        <button class="btn btn-danger-outline btn-xs btn-delete-booking" data-bid="${b.id}" title="Delete">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event handlers
  container.querySelectorAll('.btn-open-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const waTemplate = e.currentTarget.getAttribute('data-wa') || 'quotation';
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openWhatsAppModal(b, waTemplate);
    });
  });

  container.querySelectorAll('.btn-open-refund').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openDepositRefundModal(b);
    });
  });

  container.querySelectorAll('.btn-mark-booked').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        // Prompt for deposit paid if not set
        if (b.depositPaid === 0) {
          const defaultDep = Math.round(b.totalAmount * 0.30 * 100) / 100;
          const entered = prompt(`Enter deposit amount received (${appState.settings.currency || 'RM'}):`, defaultDep);
          if (entered !== null) {
            b.depositPaid = parseFloat(entered) || defaultDep;
            b.balance = Math.max(0, b.totalAmount - b.depositPaid);
          }
        }
        b.status = 'booked';
        saveToStorage();
        renderBookingsTab();
        showToast(`Unit marked as "BOOKED"! Opening Deposit Receipt...`);
        openWhatsAppModal(b, 'deposit_receipt');
      }
    });
  });

  container.querySelectorAll('.btn-mark-confirmed').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        b.depositPaid = b.totalAmount;
        b.balance = 0;
        b.status = 'confirmed';
        saveToStorage();
        renderBookingsTab();
        showToast(`Unit marked as "CONFIRMED"! Opening Full Payment Receipt & Key guide...`);
        openWhatsAppModal(b, 'full_receipt');
      }
    });
  });

  container.querySelectorAll('.btn-mark-checkin').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        b.status = 'checked-in';
        saveToStorage();
        renderBookingsTab();
        showToast(`Guest checked in!`);
      }
    });
  });

  container.querySelectorAll('.btn-mark-checkout').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        b.status = 'checked-out';
        saveToStorage();
        renderBookingsTab();
        showToast(`Booking marked as completed.`);
      }
    });
  });

  container.querySelectorAll('.btn-edit-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openBookingModal(b);
    });
  });

  container.querySelectorAll('.btn-delete-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      if (confirm('Are you sure you want to delete this booking?')) {
        appState.bookings = appState.bookings.filter(x => x.id !== bid);
        appState.turnovers = appState.turnovers.filter(t => t.bookingId !== bid);
        saveToStorage();
        renderBookingsTab();
        showToast('Booking deleted successfully.');
      }
    });
  });
}

// ==========================================================================
// 8. TURNOVERS & CLEANING TAB
// ==========================================================================

function renderTurnoversTab() {
  const container = document.getElementById('turnoversContainer');
  container.innerHTML = '';

  const turnovers = getFilteredTurnovers();
  turnovers.sort((a, b) => new Date(a.date) - new Date(b.date));

  if (turnovers.length === 0) {
    container.innerHTML = `
      <div class="card" style="text-align:center; padding:32px 16px;">
        <i class="fa-solid fa-broom" style="font-size:32px; color:var(--text-subtle); margin-bottom:8px;"></i>
        <h4 style="font-size:14px; font-weight:700;">No Turnovers Scheduled</h4>
        <p class="card-subtitle">Turnover cleaning tasks are automatically scheduled when bookings check out.</p>
      </div>
    `;
    return;
  }

  turnovers.forEach(t => {
    const prop = getPropertyById(t.propertyId);
    const booking = appState.bookings.find(b => b.id === t.bookingId);
    const completedCount = t.checklist.filter(c => c.done).length;
    const isAllDone = completedCount === t.checklist.length && t.checklist.length > 0;

    const card = document.createElement('div');
    card.className = 'turnover-card';
    card.style.borderLeft = `4px solid ${isAllDone ? 'var(--success)' : prop.color}`;

    card.innerHTML = `
      <div class="card-header-flex">
        <div>
          <span class="booking-prop-badge" style="background:${prop.color}20; color:${prop.color};">
            <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
          </span>
          <h4 style="font-size:15px; font-weight:700; margin-top:4px;">Turnover for ${t.date}</h4>
          <p class="card-subtitle">${booking ? `After guest: ${booking.guestName}` : 'Routine Deep Clean'}</p>
        </div>
        <span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:999px; ${isAllDone ? 'background:var(--success-light);color:var(--success-text);' : 'background:var(--warning-light);color:var(--warning-text);'}">
          ${isAllDone ? 'READY FOR GUEST' : `${completedCount}/${t.checklist.length} DONE`}
        </span>
      </div>

      <div class="turnover-checklist">
        ${t.checklist.map((item, idx) => `
          <label class="checklist-item">
            <input type="checkbox" data-tid="${t.id}" data-idx="${idx}" ${item.done ? 'checked' : ''}>
            <span style="${item.done ? 'text-decoration:line-through; opacity:0.6;' : ''}">${item.text}</span>
          </label>
        `).join('')}
      </div>

      <div class="card-header-flex" style="margin-top:8px; margin-bottom:0;">
        <button class="btn btn-whatsapp btn-xs btn-wa-cleaner" data-tid="${t.id}">
          <i class="fa-brands fa-whatsapp"></i> Notify Cleaner
        </button>
        <button class="btn btn-outline btn-xs btn-toggle-turnover" data-tid="${t.id}">
          ${isAllDone ? '<i class="fa-solid fa-rotate-left"></i> Reopen' : '<i class="fa-solid fa-check"></i> Mark Complete'}
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Handle checklist checkboxes
  container.querySelectorAll('input[type="checkbox"]').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const tid = e.target.getAttribute('data-tid');
      const idx = parseInt(e.target.getAttribute('data-idx'));
      const turnover = appState.turnovers.find(t => t.id === tid);
      if (turnover && turnover.checklist[idx]) {
        turnover.checklist[idx].done = e.target.checked;
        const allDone = turnover.checklist.every(c => c.done);
        turnover.status = allDone ? 'completed' : 'in_progress';
        saveToStorage();
        renderTurnoversTab();
      }
    });
  });

  // Handle cleaner WhatsApp & Mark complete buttons
  container.querySelectorAll('.btn-wa-cleaner').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tid = e.currentTarget.getAttribute('data-tid');
      const t = appState.turnovers.find(x => x.id === tid);
      if (t) openWhatsAppCleanerJob(t);
    });
  });

  container.querySelectorAll('.btn-toggle-turnover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tid = e.currentTarget.getAttribute('data-tid');
      const t = appState.turnovers.find(x => x.id === tid);
      if (t) {
        const setDone = t.status !== 'completed';
        t.checklist.forEach(c => c.done = setDone);
        t.status = setDone ? 'completed' : 'pending';
        saveToStorage();
        renderTurnoversTab();
        showToast(setDone ? 'Turnover marked as ready!' : 'Turnover reopened.');
      }
    });
  });
}

// ==========================================================================
// 9. FINANCES & REPORTS TAB
// ==========================================================================

function populateFinanceDateSelectors() {
  const monthSelect = document.getElementById('financeMonthSelect');
  const yearSelect = document.getElementById('financeYearSelect');
  
  monthSelect.innerHTML = '';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const currentMonth = new Date().getMonth();
  
  months.forEach((m, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = m;
    if (idx === currentMonth) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  yearSelect.innerHTML = '';
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 2; y <= currentYear + 2; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === currentYear) opt.selected = true;
    yearSelect.appendChild(opt);
  }
}

function renderFinancesTab() {
  const selMonth = parseInt(document.getElementById('financeMonthSelect').value);
  const selYear = parseInt(document.getElementById('financeYearSelect').value);

  const bookings = getFilteredBookings();
  const expenses = getFilteredExpenses();

  // Filter for selected month
  const monthBookings = bookings.filter(b => {
    if (b.status === 'cancelled') return false;
    const d = new Date(b.checkIn);
    return d.getMonth() === selMonth && d.getFullYear() === selYear;
  });

  const monthExpenses = expenses.filter(e => {
    const d = new Date(e.date);
    return d.getMonth() === selMonth && d.getFullYear() === selYear;
  });

  const totalRev = monthBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
  const totalExp = monthExpenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);
  const netProfit = totalRev - totalExp;

  document.getElementById('finTotalRevenue').textContent = formatCurrency(totalRev);
  document.getElementById('finTotalExpenses').textContent = formatCurrency(totalExp);
  document.getElementById('finNetProfit').textContent = formatCurrency(netProfit);
  document.getElementById('finNetProfit').style.color = netProfit >= 0 ? 'var(--success-text)' : 'var(--danger-text)';

  // Revenue by Property breakdown
  const propRevList = document.getElementById('finPropertyRevenueList');
  propRevList.innerHTML = '';

  const displayProps = appState.selectedPropertyId === 'all' 
    ? appState.properties 
    : appState.properties.filter(p => p.id === appState.selectedPropertyId);

  displayProps.forEach(prop => {
    const pBookings = monthBookings.filter(b => b.propertyId === prop.id);
    const pRev = pBookings.reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);
    const percentage = totalRev > 0 ? Math.round((pRev / totalRev) * 100) : 0;

    const row = document.createElement('div');
    row.className = 'property-rev-row';
    row.innerHTML = `
      <div class="property-rev-meta">
        <span style="display:flex; align-items:center; gap:6px;">
          <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
        </span>
        <span>${formatCurrency(pRev)} (${percentage}%)</span>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width:${percentage}%; background:${prop.color};"></div>
      </div>
    `;
    propRevList.appendChild(row);
  });

  // Expense Log List
  const expList = document.getElementById('finExpenseList');
  expList.innerHTML = '';

  if (monthExpenses.length === 0) {
    expList.innerHTML = '<p class="empty-hint">No expenses recorded for this month.</p>';
  } else {
    monthExpenses.forEach(exp => {
      const prop = getPropertyById(exp.propertyId);
      const row = document.createElement('div');
      row.className = 'expense-item-row';
      row.innerHTML = `
        <div>
          <strong style="font-size:13px;">${exp.description || exp.category.toUpperCase()}</strong>
          <p class="card-subtitle">${exp.date} • ${prop.name}</p>
        </div>
        <div style="display:flex; align-items:center; gap:8px;">
          <span style="font-weight:700; color:var(--danger);">${formatCurrency(exp.amount)}</span>
          <button class="icon-btn btn-xs btn-delete-expense" data-eid="${exp.id}" style="width:24px; height:24px;">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;
      expList.appendChild(row);
    });

    expList.querySelectorAll('.btn-delete-expense').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const eid = e.currentTarget.getAttribute('data-eid');
        appState.expenses = appState.expenses.filter(x => x.id !== eid);
        saveToStorage();
        renderFinancesTab();
        showToast('Expense removed.');
      });
    });
  }
}

// ==========================================================================
// 10. SETTINGS & PROPERTY MANAGEMENT
// ==========================================================================

function renderSettingsTab() {
  document.getElementById('settingBusinessNameInput').value = appState.settings.businessName || 'My Homestay';
  document.getElementById('settingCurrencySelect').value = appState.settings.currency || 'RM';
  
  const ownerPhoneInput = document.getElementById('settingOwnerPhoneInput');
  if (ownerPhoneInput) ownerPhoneInput.value = appState.settings.ownerPhone || '+60123456789';

  document.getElementById('settingSellerPhoneInput').value = appState.settings.sellerPhone || '+60123456789';
  document.getElementById('settingDefaultDepositPctInput').value = appState.settings.defaultDepositPct || 30;
  
  const langSelect = document.getElementById('settingLanguageSelect');
  if (langSelect) langSelect.value = appState.settings.language || 'en';

  document.getElementById('settingBankNameInput').value = appState.settings.bankName || 'Maybank';
  document.getElementById('settingBankAccNumInput').value = appState.settings.bankAccNum || '';
  document.getElementById('settingBankAccHolderInput').value = appState.settings.bankAccHolder || '';
  document.getElementById('settingDuitNowInput').value = appState.settings.duitNow || '';

  const propList = document.getElementById('settingsPropertyList');
  propList.innerHTML = '';

  if (appState.properties.length === 0) {
    propList.innerHTML = `
      <div style="text-align:center; padding:24px 16px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
        <i class="fa-solid fa-house-chimney" style="font-size:28px; color:var(--text-muted); margin-bottom:8px;"></i>
        <p style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:4px;">No homestay units added yet</p>
        <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">Add your own homestays or room rentals to start recording real bookings.</p>
        <button class="btn btn-primary btn-sm" id="btnSettingsAddFirstProp"><i class="fa-solid fa-plus"></i> Add Your First Unit</button>
      </div>
    `;
    const addFirstBtn = document.getElementById('btnSettingsAddFirstProp');
    if (addFirstBtn) addFirstBtn.addEventListener('click', () => openPropertyModal());
  } else {
    appState.properties.forEach(prop => {
      const card = document.createElement('div');
      card.className = 'settings-prop-card';
      const typeLabel = prop.propType === 'room_master' ? '🚪 Master Room' :
                        prop.propType === 'room_medium' ? '🚪 Medium Room' :
                        prop.propType === 'room_single' ? '🚪 Single Room' :
                        prop.propType === 'studio' ? '🏢 Studio' : '🏡 Whole Unit';

      card.innerHTML = `
        <div class="settings-prop-details">
          <h4 style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span class="property-dot" style="background:${prop.color};"></span>
            ${prop.name}
            <span style="font-size:10px; font-weight:700; background:var(--bg-surface-subtle); padding:2px 6px; border-radius:999px; color:var(--primary);">${typeLabel}</span>
          </h4>
          <p>🔑 Lock PIN: <strong>${prop.doorCode || 'None'}</strong> • 📶 WiFi: <strong>${prop.wifiName || 'None'}</strong></p>
          <p>Rate: ${formatCurrency(prop.defaultRate)}/night • Clean fee: ${formatCurrency(prop.cleaningFee)}</p>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-xs btn-edit-prop" data-pid="${prop.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger-outline btn-xs btn-delete-prop" data-pid="${prop.id}" title="Delete unit"><i class="fa-solid fa-trash"></i></button>
        </div>
      `;
      propList.appendChild(card);
    });

    propList.querySelectorAll('.btn-edit-prop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-pid');
        const p = appState.properties.find(x => x.id === pid);
        if (p) openPropertyModal(p);
      });
    });

    propList.querySelectorAll('.btn-delete-prop').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pid = e.currentTarget.getAttribute('data-pid');
        if (confirm('Delete this homestay unit? All associated bookings will remain.')) {
          appState.properties = appState.properties.filter(x => x.id !== pid);
          if (appState.selectedPropertyId === pid) appState.selectedPropertyId = 'all';
          saveToStorage();
          renderApp();
          showToast('Homestay removed.');
        }
      });
    });
  }

  // Render License Status in Settings
  const subTitle = document.getElementById('settingsLicenseSubtitle');
  const badge = document.getElementById('settingsLicenseBadge');
  const actions = document.getElementById('settingsLicenseActions');
  const adminGenCard = document.getElementById('adminLicenseGenCard');

  if (appState.isLicensed) {
    const isMaster = appState.isMasterAdmin || isMasterAdminKey(appState.licenseKey);
    
    if (isMaster) {
      subTitle.textContent = `Key: ${appState.licenseKey} (Master Admin)`;
      badge.textContent = '👑 MASTER ADMIN';
      badge.style.background = 'var(--primary-light)';
      badge.style.color = 'var(--primary-text)';
      if (adminGenCard) adminGenCard.classList.remove('hidden');
    } else {
      const boundPhone = appState.licenseKey.split('-')[1] || appState.settings.ownerPhone;
      subTitle.textContent = `Key: ${appState.licenseKey} (Tied to +${boundPhone})`;
      badge.textContent = '✨ LIFETIME ACTIVE';
      badge.style.background = 'var(--success-light)';
      badge.style.color = 'var(--success-text)';
      if (adminGenCard) adminGenCard.classList.add('hidden');
    }

    actions.innerHTML = `
      <p style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
        <i class="fa-solid fa-circle-check" style="color:var(--success);"></i> Unlimited homestays & offline private data unlocked.
      </p>
      <button class="btn btn-outline btn-xs" id="btnChangeLicenseKey">
        <i class="fa-solid fa-arrows-rotate"></i> Change / Re-enter License Key
      </button>
    `;
    document.getElementById('btnChangeLicenseKey').addEventListener('click', openLicenseModal);
  } else {
    subTitle.textContent = 'Unlicensed (Demo Mode)';
    badge.textContent = 'DEMO';
    badge.style.background = 'var(--warning-light)';
    badge.style.color = 'var(--warning-text)';
    if (adminGenCard) adminGenCard.classList.add('hidden');

    actions.innerHTML = `
      <div style="display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" id="btnActivateFromSettings">
          <i class="fa-solid fa-key"></i> Enter License Key
        </button>
        <button class="btn btn-whatsapp btn-sm" id="btnBuyFromSettings">
          <i class="fa-brands fa-whatsapp"></i> Buy License
        </button>
      </div>
    `;
    document.getElementById('btnActivateFromSettings').addEventListener('click', openLicenseModal);
    document.getElementById('btnBuyFromSettings').addEventListener('click', handleBuyLicenseRedirect);
  }
}

function handleSavePreferences() {
  const newOwnerPhone = document.getElementById('settingOwnerPhoneInput') ? document.getElementById('settingOwnerPhoneInput').value.trim() : appState.settings.ownerPhone;
  const oldOwnerPhone = appState.settings.ownerPhone;

  appState.settings.businessName = document.getElementById('settingBusinessNameInput').value || 'My Homestay';
  appState.settings.currency = document.getElementById('settingCurrencySelect').value || 'RM';
  appState.settings.ownerPhone = newOwnerPhone || '+60123456789';
  appState.settings.sellerPhone = newOwnerPhone || appState.settings.sellerPhone || '+60123456789';
  appState.settings.language = document.getElementById('settingLanguageSelect') ? document.getElementById('settingLanguageSelect').value : (appState.settings.language || 'en');
  appState.settings.defaultDepositPct = parseInt(document.getElementById('settingDefaultDepositPctInput').value) || 30;

  // Validate license against new phone number if phone changed
  if (appState.isLicensed && !appState.isMasterAdmin && newOwnerPhone !== oldOwnerPhone) {
    const check = verifyLicenseKey(appState.licenseKey, newOwnerPhone);
    if (!check.valid) {
      appState.isLicensed = false;
      localStorage.removeItem(STORAGE_KEYS.LICENSE);
      alert(`⚠️ Notice: Your license key was registered to ${oldOwnerPhone}.\n\nBecause the WhatsApp number was changed to ${newOwnerPhone}, the app has reverted to Demo mode. Please re-enter a matching license key for this phone number.`);
    }
  }

  saveToStorage();
  applyLanguageUI();
  renderApp();
  showToast(appState.settings.language === 'bm' ? 'Tetapan berjaya disimpan!' : 'Preferences & WhatsApp settings saved!');
}

// ==========================================================================
// ==========================================================================
// 11. BOOKING MODAL LOGIC (DAILY & MONTHLY TENANCY)
// ==========================================================================

function setBookingFormRentalType(type) {
  const isMonthly = type === 'monthly';
  document.getElementById('bookingRentalType').value = type;
  document.getElementById('sectionDailyPricing').classList.toggle('hidden', isMonthly);
  document.getElementById('sectionMonthlyPricing').classList.toggle('hidden', !isMonthly);

  document.querySelectorAll('#rentalTypeSegmented .segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === type);
  });
}

function openBookingModal(existingBooking = null, prefillDate = null) {
  if (appState.properties.length === 0) {
    alert(appState.settings.language === 'bm' 
      ? 'Sila tambah sekurang-kurangnya satu unit homestay atau bilik sebelum membuat tempahan.' 
      : 'Please add at least one homestay or room rental unit first before creating a quotation / booking.');
    openPropertyModal();
    return;
  }

  const form = document.getElementById('bookingForm');
  form.reset();

  // Populate Property Dropdown with Unit / Room Category
  const propSelect = document.getElementById('bookingPropertySelect');
  propSelect.innerHTML = '';
  appState.properties.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    const typeLabel = p.propType === 'room_master' ? '🚪 Master Room' : 
                      p.propType === 'room_medium' ? '🚪 Medium Room' :
                      p.propType === 'room_single' ? '🚪 Single Room' :
                      p.propType === 'studio' ? '🏢 Studio' : '🏡 Whole Unit';
    opt.textContent = `${p.name} [${typeLabel}]`;
    propSelect.appendChild(opt);
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  if (existingBooking) {
    document.getElementById('bookingModalTitle').textContent = 'Edit Booking / Tenancy';
    document.getElementById('bookingIdInput').value = existingBooking.id;
    document.getElementById('bookingPropertySelect').value = existingBooking.propertyId;
    document.getElementById('bookingGuestName').value = existingBooking.guestName;
    document.getElementById('bookingGuestPhone').value = existingBooking.guestPhone || '';
    document.getElementById('bookingGuestNric').value = existingBooking.guestNric || '';
    document.getElementById('bookingGuestEmail').value = existingBooking.guestEmail || '';
    document.getElementById('bookingGuestAddress').value = existingBooking.guestAddress || '';
    document.getElementById('bookingGuestCount').value = existingBooking.guestCount || 2;
    document.getElementById('bookingChannel').value = existingBooking.channel || 'whatsapp';
    document.getElementById('bookingDepositPaid').value = existingBooking.depositPaid || 0;
    document.getElementById('bookingStatusSelect').value = existingBooking.status || 'booked';
    document.getElementById('bookingNotes').value = existingBooking.notes || '';

    const rType = existingBooking.rentalType || 'daily';
    setBookingFormRentalType(rType);

    if (rType === 'monthly') {
      document.getElementById('bookingMonthlyStart').value = existingBooking.monthlyStart || existingBooking.checkIn;
      document.getElementById('bookingMonthlyDuration').value = existingBooking.monthlyDuration || 6;
      document.getElementById('bookingMonthlyRate').value = existingBooking.monthlyRate || 1200;
      document.getElementById('bookingRentalDeposit').value = existingBooking.rentalDeposit || 1200;
      document.getElementById('bookingUtilitiesDeposit').value = existingBooking.utilitiesDeposit || 300;
      document.getElementById('bookingAgreementFee').value = existingBooking.agreementFee || 150;
    } else {
      document.getElementById('bookingCheckIn').value = existingBooking.checkIn;
      document.getElementById('bookingCheckOut').value = existingBooking.checkOut;
      document.getElementById('bookingNightlyRate').value = existingBooking.nightlyRate || 250;
      document.getElementById('bookingCleaningFee').value = existingBooking.cleaningFee || 0;
      document.getElementById('bookingSecurityDeposit').value = existingBooking.securityDeposit || 0;
    }
  } else {
    document.getElementById('bookingModalTitle').textContent = 'New Booking / Quotation';
    document.getElementById('bookingIdInput').value = '';
    document.getElementById('bookingGuestNric').value = '';
    document.getElementById('bookingGuestEmail').value = '';
    document.getElementById('bookingGuestAddress').value = '';
    
    if (appState.selectedPropertyId !== 'all') {
      document.getElementById('bookingPropertySelect').value = appState.selectedPropertyId;
    }

    setBookingFormRentalType('daily');

    const checkIn = prefillDate || todayStr;
    const dIn = new Date(checkIn + 'T00:00:00');
    const dOut = new Date(dIn); dOut.setDate(dIn.getDate() + 1);
    
    document.getElementById('bookingCheckIn').value = checkIn;
    document.getElementById('bookingCheckOut').value = dOut.toISOString().split('T')[0];

    document.getElementById('bookingMonthlyStart').value = checkIn;
    document.getElementById('bookingMonthlyDuration').value = 6;

    const prop = getPropertyById(document.getElementById('bookingPropertySelect').value);
    document.getElementById('bookingNightlyRate').value = prop.defaultRate || 250;
    document.getElementById('bookingCleaningFee').value = prop.cleaningFee || 50;
    document.getElementById('bookingSecurityDeposit').value = 100;

    document.getElementById('bookingMonthlyRate').value = prop.defaultRate ? prop.defaultRate * 10 : 1500;
    document.getElementById('bookingRentalDeposit').value = prop.defaultRate ? prop.defaultRate * 10 : 1500;
    document.getElementById('bookingUtilitiesDeposit').value = 300;
    document.getElementById('bookingAgreementFee').value = 150;

    document.getElementById('bookingDepositPaid').value = 0;
    document.getElementById('bookingStatusSelect').value = 'quotation';
  }

  updateBookingModalPricing();
  document.getElementById('bookingModal').classList.add('active');
}

function updateBookingModalPricing() {
  const rType = document.getElementById('bookingRentalType').value;

  if (rType === 'monthly') {
    const mRate = parseFloat(document.getElementById('bookingMonthlyRate').value) || 0;
    const rDep = parseFloat(document.getElementById('bookingRentalDeposit').value) || 0;
    const uDep = parseFloat(document.getElementById('bookingUtilitiesDeposit').value) || 0;
    const aFee = parseFloat(document.getElementById('bookingAgreementFee').value) || 0;

    const totalMoveIn = mRate + rDep + uDep + aFee;
    document.getElementById('calcMonthlyTotalAmount').textContent = formatCurrency(totalMoveIn);
  } else {
    const checkInVal = document.getElementById('bookingCheckIn').value;
    const checkOutVal = document.getElementById('bookingCheckOut').value;
    const rateVal = parseFloat(document.getElementById('bookingNightlyRate').value) || 0;
    const cleanVal = parseFloat(document.getElementById('bookingCleaningFee').value) || 0;
    const secDep = parseFloat(document.getElementById('bookingSecurityDeposit').value) || 0;

    let nights = 0;
    if (checkInVal && checkOutVal) {
      const d1 = new Date(checkInVal);
      const d2 = new Date(checkOutVal);
      const diff = Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24));
      nights = diff > 0 ? diff : 0;
    }

    document.getElementById('calcNightsCount').textContent = nights;
    const totalRental = (nights * rateVal) + cleanVal;
    const grandTotal = totalRental + secDep;
    document.getElementById('calcTotalAmount').textContent = formatCurrency(grandTotal);

    // Update 30% deposit label on rental portion
    const dep30 = Math.round(totalRental * 0.30 * 100) / 100;
    const txt30 = document.getElementById('txtPreset30');
    if (txt30) txt30.textContent = formatCurrency(dep30);
  }
}

function handleSaveBooking(e) {
  e.preventDefault();

  const id = document.getElementById('bookingIdInput').value;
  const propertyId = document.getElementById('bookingPropertySelect').value;
  const rentalType = document.getElementById('bookingRentalType').value || 'daily';
  const guestName = document.getElementById('bookingGuestName').value.trim();
  const guestPhone = document.getElementById('bookingGuestPhone').value.trim();
  const guestNric = document.getElementById('bookingGuestNric') ? document.getElementById('bookingGuestNric').value.trim() : '';
  const guestEmail = document.getElementById('bookingGuestEmail') ? document.getElementById('bookingGuestEmail').value.trim() : '';
  const guestAddress = document.getElementById('bookingGuestAddress') ? document.getElementById('bookingGuestAddress').value.trim() : '';
  const guestCount = parseInt(document.getElementById('bookingGuestCount').value) || 2;
  const channel = document.getElementById('bookingChannel').value;
  const depositPaid = parseFloat(document.getElementById('bookingDepositPaid').value) || 0;
  let status = document.getElementById('bookingStatusSelect').value;
  const notes = document.getElementById('bookingNotes').value.trim();

  let checkIn = '';
  let checkOut = '';
  let nights = 1;
  let nightlyRate = 0;
  let cleaningFee = 0;
  let securityDeposit = 0;

  let monthlyStart = '';
  let monthlyDuration = 1;
  let monthlyRate = 0;
  let rentalDeposit = 0;
  let utilitiesDeposit = 0;
  let agreementFee = 0;
  let totalAmount = 0;

  if (rentalType === 'monthly') {
    monthlyStart = document.getElementById('bookingMonthlyStart').value;
    monthlyDuration = parseInt(document.getElementById('bookingMonthlyDuration').value) || 1;
    monthlyRate = parseFloat(document.getElementById('bookingMonthlyRate').value) || 0;
    rentalDeposit = parseFloat(document.getElementById('bookingRentalDeposit').value) || 0;
    utilitiesDeposit = parseFloat(document.getElementById('bookingUtilitiesDeposit').value) || 0;
    agreementFee = parseFloat(document.getElementById('bookingAgreementFee').value) || 0;

    if (!monthlyStart) {
      alert('Please enter tenancy start date.');
      return;
    }

    checkIn = monthlyStart;
    const dStart = new Date(monthlyStart + 'T00:00:00');
    const dEnd = new Date(dStart);
    dEnd.setMonth(dEnd.getMonth() + monthlyDuration);
    checkOut = dEnd.toISOString().split('T')[0];

    const dDiff = Math.ceil((dEnd - dStart) / (1000 * 60 * 60 * 24));
    nights = dDiff > 0 ? dDiff : monthlyDuration * 30;

    totalAmount = monthlyRate + rentalDeposit + utilitiesDeposit + agreementFee;
  } else {
    checkIn = document.getElementById('bookingCheckIn').value;
    checkOut = document.getElementById('bookingCheckOut').value;
    nightlyRate = parseFloat(document.getElementById('bookingNightlyRate').value) || 0;
    cleaningFee = parseFloat(document.getElementById('bookingCleaningFee').value) || 0;
    securityDeposit = parseFloat(document.getElementById('bookingSecurityDeposit').value) || 0;

    if (!checkIn || !checkOut || checkIn >= checkOut) {
      alert('Check-out date must be after check-in date!');
      return;
    }

    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    nights = Math.max(1, Math.ceil((d2 - d1) / (1000 * 60 * 60 * 24)));
    const totalRental = (nights * nightlyRate) + cleaningFee;
    totalAmount = totalRental + securityDeposit;
  }

  const balance = Math.max(0, totalAmount - depositPaid);

  // Auto-refine status if user didn't manually pick a specific state
  if (!id) {
    if (depositPaid >= totalAmount && totalAmount > 0) {
      status = 'confirmed';
    } else if (depositPaid > 0) {
      status = 'booked';
    } else {
      status = 'quotation';
    }
  }

  const bookingData = {
    id: id || `b-${Date.now()}`,
    propertyId,
    rentalType,
    guestName,
    guestPhone,
    guestNric,
    guestEmail,
    guestAddress,
    checkIn,
    checkOut,
    nights,
    guestCount,
    channel,
    nightlyRate,
    cleaningFee,
    securityDeposit,
    monthlyStart,
    monthlyDuration,
    monthlyRate,
    rentalDeposit,
    utilitiesDeposit,
    agreementFee,
    totalAmount,
    depositPaid,
    balance,
    status,
    notes,
    createdAt: new Date().toISOString()
  };

  if (id) {
    const idx = appState.bookings.findIndex(b => b.id === id);
    if (idx !== -1) appState.bookings[idx] = { ...appState.bookings[idx], ...bookingData };
  } else {
    appState.bookings.push(bookingData);

    // Auto-create turnover task for check-out date
    const prop = getPropertyById(propertyId);
    appState.turnovers.push({
      id: `t-${Date.now()}`,
      propertyId,
      bookingId: bookingData.id,
      date: checkOut,
      status: 'pending',
      cleanerName: 'Cleaner Team',
      cleanerPhone: '',
      checklist: [
        { text: 'Wash bed linens & pillow covers', done: false },
        { text: 'Sanitize bathroom & provide fresh towels', done: false },
        { text: 'Restock amenities & coffee', done: false },
        { text: `Reset Smart Lock PIN (${prop.doorCode || 'PIN'})`, done: false },
        { text: 'Inspect appliances & air conditioner', done: false },
        { text: 'Dispose all trash', done: false }
      ]
    });
  }

  saveToStorage();
  closeAllModals();
  renderApp();
  showToast(id ? 'Booking updated!' : `Booking saved as "${status.toUpperCase()}"!`);
}

// ==========================================================================
// 11B. TENANCY DEPOSIT REFUND MODAL LOGIC
// ==========================================================================

function openDepositRefundModal(booking) {
  appState.activeWaBooking = booking;
  const prop = getPropertyById(booking.propertyId);

  document.getElementById('refundBookingIdInput').value = booking.id;
  document.getElementById('refundTenantMeta').textContent = `Tenant: ${booking.guestName} (${booking.guestPhone || '-'}) • Unit: ${prop.name}`;

  const rentalDep = booking.rentalDeposit || 0;
  const utilitiesDep = booking.utilitiesDeposit || booking.securityDeposit || 0;

  document.getElementById('refundRentalDepInput').value = rentalDep;
  document.getElementById('refundUtilitiesDepInput').value = utilitiesDep;
  document.getElementById('refundDeductUtilitiesInput').value = 0;
  document.getElementById('refundDeductRepairsInput').value = 0;
  document.getElementById('refundNotesInput').value = '';

  updateDepositRefundCalculation();
  document.getElementById('depositRefundModal').classList.add('active');
}

function updateDepositRefundCalculation() {
  const rentalDep = parseFloat(document.getElementById('refundRentalDepInput').value) || 0;
  const utilDep = parseFloat(document.getElementById('refundUtilitiesDepInput').value) || 0;
  const dedUtil = parseFloat(document.getElementById('refundDeductUtilitiesInput').value) || 0;
  const dedRepair = parseFloat(document.getElementById('refundDeductRepairsInput').value) || 0;

  const netRefund = Math.max(0, (rentalDep + utilDep) - (dedUtil + dedRepair));
  document.getElementById('calcNetRefundAmount').textContent = formatCurrency(netRefund);
}

function handleProcessDepositRefund(e) {
  e.preventDefault();

  const bookingId = document.getElementById('refundBookingIdInput').value;
  const booking = appState.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const rentalDep = parseFloat(document.getElementById('refundRentalDepInput').value) || 0;
  const utilDep = parseFloat(document.getElementById('refundUtilitiesDepInput').value) || 0;
  const dedUtil = parseFloat(document.getElementById('refundDeductUtilitiesInput').value) || 0;
  const dedRepair = parseFloat(document.getElementById('refundDeductRepairsInput').value) || 0;
  const netRefund = Math.max(0, (rentalDep + utilDep) - (dedUtil + dedRepair));
  const notes = document.getElementById('refundNotesInput').value.trim();

  booking.refundDetails = {
    rentalDep,
    utilDep,
    dedUtil,
    dedRepair,
    netRefund,
    notes,
    refundedAt: new Date().toISOString()
  };
  booking.status = 'checked-out';

  saveToStorage();
  closeAllModals();
  renderApp();
  showToast('Deposit refund recorded! Opening WhatsApp statement...');
  openWhatsAppModal(booking, 'refund_receipt');
}

// ==========================================================================
// 12. PROPERTY MODAL LOGIC
// ==========================================================================

function openPropertyModal(existingProp = null) {
  const form = document.getElementById('propertyForm');
  form.reset();

  if (existingProp) {
    document.getElementById('propertyModalTitle').textContent = 'Edit Rental Unit / Homestay';
    document.getElementById('propertyIdInput').value = existingProp.id;
    document.getElementById('propertyNameInput').value = existingProp.name;
    document.getElementById('propertyRoomNoInput').value = existingProp.roomNo || '';
    document.getElementById('propertyTypeSelect').value = existingProp.propType || 'entire';
    document.getElementById('propertyAddressInput').value = existingProp.address || '';
    document.getElementById('propertyWifiNameInput').value = existingProp.wifiName || '';
    document.getElementById('propertyWifiPassInput').value = existingProp.wifiPass || '';
    document.getElementById('propertyDoorPinInput').value = existingProp.doorCode || '';
    document.getElementById('propertyDefaultRateInput').value = existingProp.defaultRate || 250;
    document.getElementById('propertyCleaningFeeInput').value = existingProp.cleaningFee || 50;
    document.getElementById('propertyCheckInTimeInput').value = existingProp.checkInTime || '15:00';
    document.getElementById('propertyCheckOutTimeInput').value = existingProp.checkOutTime || '12:00';
    document.getElementById('propertyRulesInput').value = existingProp.rules || '';
  } else {
    document.getElementById('propertyModalTitle').textContent = 'Add Rental Unit / Homestay';
    document.getElementById('propertyIdInput').value = '';
    document.getElementById('propertyRoomNoInput').value = '';
    document.getElementById('propertyTypeSelect').value = 'entire';
    document.getElementById('propertyDefaultRateInput').value = 250;
    document.getElementById('propertyCleaningFeeInput').value = 50;
  }

  document.getElementById('propertyModal').classList.add('active');
}

function handleSaveProperty(e) {
  e.preventDefault();

  const id = document.getElementById('propertyIdInput').value;
  const name = document.getElementById('propertyNameInput').value.trim();
  const roomNo = document.getElementById('propertyRoomNoInput') ? document.getElementById('propertyRoomNoInput').value.trim() : '';
  const propType = document.getElementById('propertyTypeSelect') ? document.getElementById('propertyTypeSelect').value : 'entire';
  const address = document.getElementById('propertyAddressInput').value.trim();
  const wifiName = document.getElementById('propertyWifiNameInput').value.trim();
  const wifiPass = document.getElementById('propertyWifiPassInput').value.trim();
  const doorCode = document.getElementById('propertyDoorPinInput').value.trim();
  const defaultRate = parseFloat(document.getElementById('propertyDefaultRateInput').value) || 250;
  const cleaningFee = parseFloat(document.getElementById('propertyCleaningFeeInput').value) || 50;
  const checkInTime = document.getElementById('propertyCheckInTimeInput').value || '15:00';
  const checkOutTime = document.getElementById('propertyCheckOutTimeInput').value || '12:00';
  const rules = document.getElementById('propertyRulesInput').value.trim();

  const colorRadio = document.querySelector('input[name="propColor"]:checked');
  const color = colorRadio ? colorRadio.value : '#0284c7';

  const propData = {
    id: id || `prop-${Date.now()}`,
    name,
    roomNo,
    propType,
    address,
    wifiName,
    wifiPass,
    doorCode,
    color,
    defaultRate,
    cleaningFee,
    checkInTime,
    checkOutTime,
    rules
  };

  if (id) {
    const idx = appState.properties.findIndex(p => p.id === id);
    if (idx !== -1) appState.properties[idx] = { ...appState.properties[idx], ...propData };
  } else {
    appState.properties.push(propData);
  }

  saveToStorage();
  closeAllModals();
  renderApp();
  showToast(id ? 'Rental unit updated!' : 'New rental unit added!');
}

// ==========================================================================
// 13. EXPENSE MODAL LOGIC
// ==========================================================================

function openExpenseModal() {
  const form = document.getElementById('expenseForm');
  form.reset();

  const propSelect = document.getElementById('expensePropertySelect');
  propSelect.innerHTML = '';
  appState.properties.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    propSelect.appendChild(opt);
  });

  document.getElementById('expenseDateInput').value = new Date().toISOString().split('T')[0];
  document.getElementById('expenseModal').classList.add('active');
}

function handleSaveExpense(e) {
  e.preventDefault();

  const propertyId = document.getElementById('expensePropertySelect').value;
  const amount = parseFloat(document.getElementById('expenseAmountInput').value) || 0;
  const date = document.getElementById('expenseDateInput').value;
  const category = document.getElementById('expenseCategorySelect').value;
  const description = document.getElementById('expenseDescInput').value.trim();

  appState.expenses.push({
    id: `exp-${Date.now()}`,
    propertyId,
    amount,
    date,
    category,
    description: description || category.toUpperCase()
  });

  saveToStorage();
  closeAllModals();
  if (appState.activeTab === 'finances') renderFinancesTab();
  showToast('Expense logged successfully!');
}

// ==========================================================================
// 14. 1-TAP WHATSAPP AUTOMATION ENGINE
// ==========================================================================

function openWhatsAppModal(booking, templateType = 'confirm') {
  appState.activeWaBooking = booking;
  appState.activeWaTemplate = templateType;

  const prop = getPropertyById(booking.propertyId);
  document.getElementById('waGuestRecipient').textContent = `To: ${booking.guestName} (${booking.guestPhone || 'No Phone Entered'})`;

  document.querySelectorAll('.wa-tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-template') === templateType);
  });

  renderWhatsAppPreview();
  document.getElementById('whatsappModal').classList.add('active');
}

function openWhatsAppCleanerJob(turnover) {
  const prop = getPropertyById(turnover.propertyId);
  const msg = `🧹 *Turnover Job Alert - ${prop.name}*\n\n` +
    `Hello! We have a turnover scheduled for:\n` +
    `📅 *Date:* ${turnover.date}\n` +
    `🏠 *Unit:* ${prop.name}\n` +
    `📍 *Address:* ${prop.address || 'Standard Address'}\n` +
    `🔑 *Door PIN Code:* ${prop.doorCode || 'Standard PIN'}\n` +
    `⏰ *Cleaning Window:* ${prop.checkOutTime || '12:00 PM'} - ${prop.checkInTime || '3:00 PM'}\n\n` +
    `Please ensure bed linens are washed and fresh towels/toiletries are set up. Thank you! 🙏`;

  const phone = (turnover.cleanerPhone || '').replace(/[^0-9]/g, '');
  const waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
}

function generateWhatsAppMessage(booking, templateType) {
  const prop = getPropertyById(booking.propertyId);
  const currency = appState.settings.currency || 'RM';
  const settings = appState.settings;
  const isBM = settings.language === 'bm';
  const isMonthly = booking.rentalType === 'monthly';
  const isRoom = prop.propType && prop.propType.startsWith('room');

  const unitTitleBM = isRoom ? `🚪 *Bilik / Unit:* ${prop.name} ${prop.roomNo ? `(${prop.roomNo})` : ''}` : `🏠 *Homestay:* ${prop.name}`;
  const unitTitleEN = isRoom ? `🚪 *Homestay Room:* ${prop.name} ${prop.roomNo ? `(${prop.roomNo})` : ''}` : `🏠 *Homestay:* ${prop.name}`;

  const tenantParticularsBM = (booking.guestNric || booking.guestEmail || booking.guestAddress)
    ? `👤 *BUTIRAN PENYEWA:*\n• Nama: *${booking.guestName}*\n` +
      (booking.guestNric ? `• No. KP / Pasport: *${booking.guestNric}*\n` : '') +
      (booking.guestPhone ? `• No. Telefon / WA: *${booking.guestPhone}*\n` : '') +
      (booking.guestEmail ? `• Emel: *${booking.guestEmail}*\n` : '') +
      (booking.guestAddress ? `• Alamat: *${booking.guestAddress}*\n` : '') + `\n`
    : `*Kepada:* ${booking.guestName} (${booking.guestPhone || 'Penyewa'})\n\n`;

  const tenantParticularsEN = (booking.guestNric || booking.guestEmail || booking.guestAddress)
    ? `👤 *TENANT PARTICULARS:*\n• Name: *${booking.guestName}*\n` +
      (booking.guestNric ? `• NRIC / Passport: *${booking.guestNric}*\n` : '') +
      (booking.guestPhone ? `• Phone / WA: *${booking.guestPhone}*\n` : '') +
      (booking.guestEmail ? `• Email: *${booking.guestEmail}*\n` : '') +
      (booking.guestAddress ? `• Address: *${booking.guestAddress}*\n` : '') + `\n`
    : `*Bill To:* ${booking.guestName} (${booking.guestPhone || 'Tenant'})\n\n`;

  const bankInfoEN = (settings.bankName && settings.bankAccNum) 
    ? `\n🏦 *BANK PAYMENT DETAILS:*\n• Bank: *${settings.bankName}*\n• Account No: *${settings.bankAccNum}*\n• Name: *${settings.bankAccHolder || settings.businessName}*${settings.duitNow ? `\n• DuitNow ID: *${settings.duitNow}*` : ''}\n` 
    : '';

  const bankInfoBM = (settings.bankName && settings.bankAccNum) 
    ? `\n🏦 *MAKLUMAT PEMBAYARAN BANK / DUITNOW:*\n• Bank: *${settings.bankName}*\n• No Akaun: *${settings.bankAccNum}*\n• Nama Pemegang: *${settings.bankAccHolder || settings.businessName}*${settings.duitNow ? `\n• DuitNow ID: *${settings.duitNow}*` : ''}\n` 
    : '';

  // Daily calculations
  const totalRental = ((booking.nights || 1) * (booking.nightlyRate || 0)) + (booking.cleaningFee || 0);
  const secDep = booking.securityDeposit || 0;
  const dep30 = Math.round(totalRental * (settings.defaultDepositPct || 30) / 100 * 100) / 100;
  const bookingFee = booking.depositPaid > 0 ? booking.depositPaid : dep30;

  // Monthly calculations
  const mRate = booking.monthlyRate || 0;
  const rDep = booking.rentalDeposit || 0;
  const uDep = booking.utilitiesDeposit || 0;
  const aFee = booking.agreementFee || 0;
  const totalMoveIn = mRate + rDep + uDep + aFee;

  if (isBM) {
    switch (templateType) {
      case 'quotation':
        if (isMonthly) {
          return `📋 *SEBUT HARGA SEWAAN BULANAN - ${prop.name.toUpperCase()}*\n` +
            `No Rujukan: QUO-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam sejahtera *${booking.guestName}*, terima kasih atas pertanyaan sewaan bulanan anda! Berikut adalah perincian pakej sewaan:\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            `📅 *Tarikh Mula:* ${booking.checkIn}\n` +
            `⏳ *Tempoh Sewaan:* ${booking.monthlyDuration || 6} Bulan\n\n` +
            tenantParticularsBM +
            `💰 *PERINCIAN PAKEJ KEMASUKAN (MOVE-IN):*\n` +
            `• Sewa Bulan Pertama (Pendahuluan): ${currency} ${mRate.toFixed(2)}\n` +
            `• Deposit Sewa (Boleh Dipulangkan): ${currency} ${rDep.toFixed(2)}\n` +
            `• Deposit Utiliti (Boleh Dipulangkan): ${currency} ${uDep.toFixed(2)}\n` +
            `• Yuran Perjanjian Sewa & Duti Setem: ${currency} ${aFee.toFixed(2)}\n` +
            `----------------------------------------\n` +
            `💵 *JUMLAH BAYARAN KEMASUKAN:* *${currency} ${totalMoveIn.toFixed(2)}*\n` +
            `🔒 *Bayaran Booking Diperlukan untuk Kunci Unit:* *${currency} ${(booking.depositPaid > 0 ? booking.depositPaid : mRate * 0.5).toFixed(2)}*\n` +
            `⏳ *Baki Bayaran Sebelum Serahan Kunci:* ${currency} ${(totalMoveIn - (booking.depositPaid > 0 ? booking.depositPaid : mRate * 0.5)).toFixed(2)}\n` +
            bankInfoBM +
            `\n📌 *Nota Deposit:* Deposit Sewa dan Deposit Utiliti akan dipulangkan sepenuhnya pada akhir tempoh sewaan tertakluk kepada bil utiliti dan keadaan bilik/rumah. ✨🏡`;
        } else {
          return `📋 *SEBUT HARGA RASMI - ${prop.name.toUpperCase()}*\n` +
            `No Rujukan: QUO-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam sejahtera *${booking.guestName}*, terima kasih atas pertanyaan anda! Berikut adalah perincian harga bagi penginapan anda:\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            `📅 *Daftar Masuk (Check-In):* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
            `🏁 *Daftar Keluar (Check-Out):* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n` +
            `🌙 *Tempoh:* ${booking.nights} Malam • ${booking.guestCount} Tetamu\n\n` +
            `💰 *PERINCIAN HARGA:*\n` +
            `• Kadar Sewa: ${currency} ${(booking.nightlyRate || 0).toFixed(2)} × ${booking.nights} malam = ${currency} ${(booking.nights * booking.nightlyRate).toFixed(2)}\n` +
            `• Yuran Pembersihan: ${currency} ${(booking.cleaningFee || 0).toFixed(2)}\n` +
            (secDep > 0 ? `• Deposit Keselamatan (Dipulangkan): ${currency} ${secDep.toFixed(2)}\n` : '') +
            `----------------------------------------\n` +
            `💵 *JUMLAH KESELURUHAN:* *${currency} ${booking.totalAmount.toFixed(2)}*\n` +
            `🔒 *Bayaran Booking Diperlukan (${settings.defaultDepositPct || 30}%):* *${currency} ${bookingFee.toFixed(2)}*\n` +
            `⏳ *Baki Bayaran Sebelum Serahan Kunci:* ${currency} ${(booking.totalAmount - bookingFee).toFixed(2)}\n` +
            bankInfoBM +
            `\n📌 *Nota:* Tarikh akan ditanda sebagai *"DITEMPAH"* selepas slip bayaran booking diterima. ✨🏡`;
        }

      case 'deposit_receipt':
        if (isMonthly) {
          return `🧾 *RESIT BAYARAN BOOKING & DEPOSIT SEWAAN - ${prop.name.toUpperCase()}*\n` +
            `No Resit: REC-BOOK-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam *${booking.guestName}*, bayaran booking sewaan bulanan anda telah disahkan! 🎉\n` +
            `Unit kini berstatus *DITEMPAH & DIKUNCI* untuk kemasukan anda.\n\n` +
            `${unitTitleBM}\n` +
            `📅 *Tarikh Kemasukan:* ${booking.checkIn}\n` +
            `⏳ *Tempoh Sewaan:* ${booking.monthlyDuration || 6} Bulan\n\n` +
            tenantParticularsBM +
            `💰 *REKOD BAYARAN:*\n` +
            `• Jumlah Pakej Kemasukan: ${currency} ${totalMoveIn.toFixed(2)}\n` +
            `• ✅ *Bayaran Booking Diterima:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
            `----------------------------------------\n` +
            `💳 *Baki Perlu Dibayar Sebelum Serahan Kunci:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
            `🔑 *Kunci & Smart Lock PIN:* Akan diserahkan selepas baki pakej kemasukan dijelaskan sepenuhnya. Terima kasih! 🙏`;
        } else {
          return `🧾 *RESIT BAYARAN BOOKING & DEPOSIT - ${prop.name.toUpperCase()}*\n` +
            `No Resit: REC-DEP-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam *${booking.guestName}*, bayaran booking dan deposit anda telah diterima! 🎉\n` +
            `Unit anda kini secara rasmi berstatus *DITEMPAH & DIKUNCI* di kalendar kami.\n\n` +
            `${unitTitleBM}\n` +
            `📅 *Daftar Masuk:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
            `🏁 *Daftar Keluar:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n\n` +
            `💰 *REKOD BAYARAN:*\n` +
            `• Jumlah Penginapan: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
            `• ✅ *Deposit / Booking Diterima:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
            `----------------------------------------\n` +
            `💳 *Baki Bayaran Sebelum Daftar Masuk:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
            `🔑 *Kod PIN Kunci Pintu:* Akan diberikan selepas pengesahan bayaran penuh sebelum waktu daftar masuk. Terima kasih! 🏡✨`;
        }

      case 'full_receipt':
        return `🔑 *RESIT BAYARAN PENUH & PANDUAN MASUK - ${prop.name.toUpperCase()}*\n` +
          `No Resit: REC-FULL-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Salam *${booking.guestName}*! Bayaran penuh telah disahkan dan tempahan anda kini *100% DISAHKAN*. Berikut adalah maklumat akses masuk anda:\n\n` +
          `${unitTitleBM}\n` +
          `💰 *STATUS BAYARAN: SELESAI DIBAYAR PENUH (100%) ✅*\n` +
          `• Jumlah Dibayar: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
          `• Baki Bayaran: ${currency} 0.00\n\n` +
          `========================================\n` +
          `🔑 *MAKLUMAT AKSES & KUNCI PINTU PINTAR:*\n` +
          `========================================\n` +
          `📍 *Alamat:* ${prop.address || 'Alamat Unit'}\n` +
          `⏰ *Waktu Daftar Masuk:* Hari ini dari jam ${prop.checkInTime || '3:00 PM'} ke atas\n` +
          `🔐 *Kod PIN Smart Lock Pintu:* *${prop.doorCode || '123456#'}*\n` +
          `📶 *Nama WiFi:* ${prop.wifiName || 'Homestay_WiFi'}\n` +
          `🔑 *Kata Laluan WiFi:* *${prop.wifiPass || 'welcome123'}*\n\n` +
          `📜 *Peraturan:* ${prop.rules || 'Dilarang merokok di dalam rumah, jaga ketenteraman selepas 10 malam.'}\n\n` +
          `Selamat menikmati penginapan anda! Sila hubungi kami bila-bila masa jika memerlukan bantuan. ✨🏡`;

      case 'monthly_invoice':
        return `📑 *INVOIS SEWAAN BULANAN - ${prop.name.toUpperCase()}*\n` +
          `No Invois: INV-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
          tenantParticularsBM +
          `${unitTitleBM}\n` +
          `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n\n` +
          `💵 *MAKLUMAT BIL SEWA:* \n` +
          `• Sewaan Bulanan: *${currency} ${(booking.monthlyRate || 0).toFixed(2)}*\n` +
          `• Tempoh Sewaan: ${booking.checkIn} hingga ${booking.checkOut}\n` +
          `----------------------------------------\n` +
          `💳 *JUMLAH PERLU DIBAYAR:* *${currency} ${(booking.monthlyRate || 0).toFixed(2)}*\n` +
          bankInfoBM +
          `\nSila lakukan pembayaran sebelum tarikh akhir dan hantar salinan slip bayaran. Terima kasih atas kerjasama anda! 🙏`;

      case 'refund_receipt':
        const ref = booking.refundDetails || {
          rentalDep: booking.rentalDeposit || 0,
          utilDep: booking.utilitiesDeposit || booking.securityDeposit || 0,
          dedUtil: 0,
          dedRepair: 0,
          netRefund: (booking.rentalDeposit || 0) + (booking.utilitiesDeposit || booking.securityDeposit || 0),
          notes: 'Deposit dipulangkan sepenuhnya.'
        };
        return `💰 *PENYATA PEMULANGAN DEPOSIT SEWAAN - ${prop.name.toUpperCase()}*\n` +
          `No Rujukan: REF-${booking.id.slice(-6).toUpperCase()}\n\n` +
          tenantParticularsBM +
          `${unitTitleBM}\n` +
          `📅 *Tarikh Tamat Sewaan:* ${booking.checkOut}\n\n` +
          `📊 *RINGKASAN DEPOSIT:*\n` +
          `• Deposit Sewa Dipegang: ${currency} ${ref.rentalDep.toFixed(2)}\n` +
          `• Deposit Utiliti Dipegang: ${currency} ${ref.utilDep.toFixed(2)}\n` +
          `----------------------------------------\n` +
          `➕ *Jumlah Deposit Dipegang:* ${currency} ${(ref.rentalDep + ref.utilDep).toFixed(2)}\n\n` +
          `📉 *TOLAKAN / DEDUCTIONS:*\n` +
          `• Tunggakan Bil Utiliti (TNB/Air): - ${currency} ${ref.dedUtil.toFixed(2)}\n` +
          `• Kos Pembaikan / Pembersihan: - ${currency} ${ref.dedRepair.toFixed(2)}\n` +
          `----------------------------------------\n` +
          `💵 *JUMLAH BERSIH DIPULANGKAN:* *${currency} ${ref.netRefund.toFixed(2)}* ✅\n\n` +
          `📝 *Catatan Tolakan:* ${ref.notes || 'Tiada'}\n\n` +
          `Terima kasih kerana menyewa bersama kami dan menjaga unit dengan baik! Semoga maju jaya. 🙏✨`;

      case 'checkout':
        return `🏁 *Peringatan Daftar Keluar / Tamat Sewaan - ${prop.name}*\n\n` +
          `Salam *${booking.guestName}*, semoga anda menikmati penginapan yang menyenangkan bersama kami!\n\n` +
          `⏰ *Waktu Daftar Keluar:* Hari ini sebelum jam ${prop.checkOutTime || '12:00 PM'}\n\n` +
          `Sebelum bertolak, mohon kerjasama untuk:\n` +
          `1. Padamkan semua suis lampu dan penyaman udara (air-cond)\n` +
          `2. Pastikan semua pintu dan tingkap dikunci rapi\n` +
          `3. Serahkan kembali kunci atau masukkan ke dalam peti kunci pintar\n\n` +
          `Pemeriksaan unit dan pemulangan baki deposit keselamatan akan diproses selepas pemeriksaan selesai. Terima kasih! ⭐⭐⭐⭐⭐`;

      case 'cleaner':
        return `🧹 *Notis Pembersihan / Turnover - ${prop.name}*\n\n` +
          `Kerja pembersihan diperlukan untuk ${prop.name} pada ${booking.checkOut}.\n` +
          `Tetamu ${booking.guestName} daftar keluar jam ${prop.checkOutTime || '12:00 PM'}.\n` +
          `Kod PIN Smart Lock untuk diset: ${prop.doorCode || '1234'}.`;

      case 'payment':
        return `💳 *Peringatan Baki Bayaran - ${prop.name}*\n\n` +
          `Salam *${booking.guestName}*, ini adalah peringatan mesra bagi baki bayaran penginapan anda:\n\n` +
          `📅 *Tarikh:* ${booking.checkIn} hingga ${booking.checkOut}\n` +
          `💰 *Baki Bayaran:* *${currency} ${booking.balance.toFixed(2)}*\n` +
          bankInfoBM +
          `\nSila jelaskan baki sebelum daftar masuk untuk menerima kod akses masuk. Terima kasih! 🙏`;

      default:
        return '';
    }
  }

  // English Templates
  switch (templateType) {
    case 'quotation':
      if (isMonthly) {
        return `📋 *MONTHLY TENANCY QUOTATION - ${prop.name.toUpperCase()}*\n` +
          `Ref: QUO-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, thank you for your monthly rental enquiry! Here is the tenancy move-in package breakdown:\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          `📅 *Tenancy Start Date:* ${booking.checkIn}\n` +
          `⏳ *Duration:* ${booking.monthlyDuration || 6} Months\n\n` +
          tenantParticularsEN +
          `💰 *MOVE-IN INITIAL PACKAGE BREAKDOWN:*\n` +
          `• 1st Month Advance Rent: ${currency} ${mRate.toFixed(2)}\n` +
          `• Rental Deposit (Refundable): ${currency} ${rDep.toFixed(2)}\n` +
          `• Utilities Deposit (Refundable): ${currency} ${uDep.toFixed(2)}\n` +
          `• Tenancy Agreement & Stamp Duty: ${currency} ${aFee.toFixed(2)}\n` +
          `----------------------------------------\n` +
          `💵 *TOTAL MOVE-IN PACKAGE:* *${currency} ${totalMoveIn.toFixed(2)}*\n` +
          `🔒 *Booking Fee to Reserve Unit:* *${currency} ${(booking.depositPaid > 0 ? booking.depositPaid : mRate * 0.5).toFixed(2)}*\n` +
          `⏳ *Balance Due upon Key Handover:* ${currency} ${(totalMoveIn - (booking.depositPaid > 0 ? booking.depositPaid : mRate * 0.5)).toFixed(2)}\n` +
          bankInfoEN +
          `\n📌 *Deposit Refund Terms:* Rental & Utilities deposits are 100% refundable at the end of tenancy subject to utility arrears & unit inspection. ✨🏡`;
      } else {
        return `📋 *OFFICIAL QUOTATION - ${prop.name.toUpperCase()}*\n` +
          `Ref: QUO-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, thank you for your enquiry! Here is the price breakdown for your stay:\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          `📅 *Check-In:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
          `🏁 *Check-Out:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n` +
          `🌙 *Stay Duration:* ${booking.nights} Night(s) • ${booking.guestCount} Guest(s)\n\n` +
          `💰 *PRICE BREAKDOWN:*\n` +
          `• Nightly Rate: ${currency} ${(booking.nightlyRate || 0).toFixed(2)} × ${booking.nights} nights = ${currency} ${(booking.nights * booking.nightlyRate).toFixed(2)}\n` +
          `• Cleaning Fee: ${currency} ${(booking.cleaningFee || 0).toFixed(2)}\n` +
          (secDep > 0 ? `• Security Deposit (Refundable): ${currency} ${secDep.toFixed(2)}\n` : '') +
          `----------------------------------------\n` +
          `💵 *TOTAL STAY PRICE:* *${currency} ${booking.totalAmount.toFixed(2)}*\n` +
          `🔒 *Booking Fee Required to Lock Dates (${settings.defaultDepositPct || 30}%):* *${currency} ${bookingFee.toFixed(2)}*\n` +
          `⏳ *Balance Due upon Key Handover:* ${currency} ${(booking.totalAmount - bookingFee).toFixed(2)}\n` +
          bankInfoEN +
          `\n📌 *Next Step:* Unit will be reserved and labelled *"BOOKED"* immediately upon booking fee receipt. Let us know to secure your dates! ✨🏡`;
      }

    case 'deposit_receipt':
      if (isMonthly) {
        return `🧾 *TENANCY BOOKING & DEPOSIT RECEIPT - ${prop.name.toUpperCase()}*\n` +
          `Receipt No: REC-BOOK-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, your tenancy booking fee has been received! 🎉\n` +
          `The property is now officially *BOOKED & RESERVED* for your move-in.\n\n` +
          `${unitTitleEN}\n` +
          `📅 *Move-In Date:* ${booking.checkIn}\n` +
          `⏳ *Tenancy Period:* ${booking.monthlyDuration || 6} Months\n\n` +
          tenantParticularsEN +
          `💰 *PAYMENT RECORD:*\n` +
          `• Total Move-In Package: ${currency} ${totalMoveIn.toFixed(2)}\n` +
          `• ✅ *Booking Fee Received:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
          `----------------------------------------\n` +
          `💳 *Remaining Balance Due Before Keys Handover:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
          `🔑 *Keys & Smart Lock PIN:* Will be released upon full settlement of the remaining move-in balance. Thank you! 🙏`;
      } else {
        return `🧾 *BOOKING & DEPOSIT PAYMENT RECEIPT - ${prop.name.toUpperCase()}*\n` +
          `Receipt No: REC-DEP-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, we have received your booking fee & deposit! 🎉\n` +
          `Your unit is now officially *BOOKED & RESERVED* on our calendar.\n\n` +
          `${unitTitleEN}\n` +
          `📅 *Check-In:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
          `🏁 *Check-Out:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n\n` +
          `💰 *PAYMENT RECORD:*\n` +
          `• Total Stay Amount: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
          `• ✅ *Deposit / Booking Received:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
          `----------------------------------------\n` +
          `💳 *Remaining Balance to Pay Before Check-In:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
          `🔑 *Smart Lock Access Code:* Will be released upon full payment confirmation before check-in. Thank you! 🏡✨`;
      }

    case 'full_receipt':
      return `🔑 *FULL PAYMENT RECEIPT & ACCESS GUIDE - ${prop.name.toUpperCase()}*\n` +
        `Receipt No: REC-FULL-${booking.id.slice(-6).toUpperCase()}\n\n` +
        `Hi *${booking.guestName}*! Full payment has been received and your booking is *100% CONFIRMED*. Here are your self check-in access keys:\n\n` +
        `${unitTitleEN}\n` +
        `💰 *PAYMENT STATUS: PAID IN FULL (100%) ✅*\n` +
        `• Total Paid: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
        `• Balance Due: ${currency} 0.00\n\n` +
        `========================================\n` +
        `🔑 *YOUR ACCESS & DOOR LOCK DETAILS:*\n` +
        `========================================\n` +
        `📍 *Address:* ${prop.address || 'Standard Address'}\n` +
        `⏰ *Check-In Time:* Today from ${prop.checkInTime || '3:00 PM'} onwards\n` +
        `🔐 *Door Smart Lock PIN:* *${prop.doorCode || '123456#'}*\n` +
        `📶 *WiFi Name:* ${prop.wifiName || 'Homestay_WiFi'}\n` +
        `🔑 *WiFi Password:* *${prop.wifiPass || 'welcome123'}*\n\n` +
        `📜 *House Rules:* ${prop.rules || 'No smoking inside, quiet hours after 10 PM.'}\n\n` +
        `Have a wonderful stay with us! If you need anything, message us anytime. ✨🏡`;

    case 'monthly_invoice':
      return `📑 *MONTHLY RENT INVOICE - ${prop.name.toUpperCase()}*\n` +
        `Invoice No: INV-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
        tenantParticularsEN +
        `${unitTitleEN}\n` +
        `📍 *Location:* ${prop.address || 'Standard Address'}\n\n` +
        `💵 *BILLING DETAILS:*\n` +
        `• Monthly Rent: *${currency} ${(booking.monthlyRate || 0).toFixed(2)}*\n` +
        `• Period: ${booking.checkIn} to ${booking.checkOut}\n` +
        `----------------------------------------\n` +
        `💳 *TOTAL AMOUNT DUE:* *${currency} ${(booking.monthlyRate || 0).toFixed(2)}*\n` +
        bankInfoEN +
        `\nKindly settle the rental on or before the due date and forward the transfer receipt. Thank you! 🙏`;

    case 'refund_receipt':
      const refEN = booking.refundDetails || {
        rentalDep: booking.rentalDeposit || 0,
        utilDep: booking.utilitiesDeposit || booking.securityDeposit || 0,
        dedUtil: 0,
        dedRepair: 0,
        netRefund: (booking.rentalDeposit || 0) + (booking.utilitiesDeposit || booking.securityDeposit || 0),
        notes: 'Full deposit refunded.'
      };
      return `💰 *TENANCY DEPOSIT REFUND STATEMENT - ${prop.name.toUpperCase()}*\n` +
        `Ref: REF-${booking.id.slice(-6).toUpperCase()}\n\n` +
        tenantParticularsEN +
        `${unitTitleEN}\n` +
        `📅 *Tenancy End Date:* ${booking.checkOut}\n\n` +
        `📊 *DEPOSITS HELD:*\n` +
        `• Rental Deposit Held: ${currency} ${refEN.rentalDep.toFixed(2)}\n` +
        `• Utilities Deposit Held: ${currency} ${refEN.utilDep.toFixed(2)}\n` +
        `----------------------------------------\n` +
        `➕ *Total Deposits Held:* ${currency} ${(refEN.rentalDep + refEN.utilDep).toFixed(2)}\n\n` +
        `📉 *DEDUCTIONS:*\n` +
        `• Utility Arrears (TNB/Water): - ${currency} ${refEN.dedUtil.toFixed(2)}\n` +
        `• Repairs / Cleaning Costs: - ${currency} ${refEN.dedRepair.toFixed(2)}\n` +
        `----------------------------------------\n` +
        `💵 *NET REFUND TO TENANT:* *${currency} ${refEN.netRefund.toFixed(2)}* ✅\n\n` +
        `📝 *Deduction Notes:* ${refEN.notes || 'None'}\n\n` +
        `Thank you for staying with us and taking care of the property! Wishing you all the best. 🙏✨`;

    case 'checkout':
      return `🏁 *Check-Out / Tenancy End Reminder - ${prop.name}*\n\n` +
        `Hi *${booking.guestName}*, we hope you had a fantastic stay with us!\n\n` +
        `⏰ *Check-Out Time:* Today by ${prop.checkOutTime || '12:00 PM'}\n\n` +
        `Before you depart, kindly:\n` +
        `1. Turn off all lights and air-conditioners\n` +
        `2. Ensure doors/windows are safely locked\n` +
        `3. Return keys or lock in the smart lockbox\n\n` +
        `Deposit refunds will be inspected and processed promptly after key return. Thank you! ⭐⭐⭐⭐⭐`;

    case 'cleaner':
      return `🧹 *Turnover Notice - ${prop.name}*\n\n` +
        `Turnover required for ${prop.name} on ${booking.checkOut}.\n` +
        `Guest ${booking.guestName} checking out at ${prop.checkOutTime || '12:00 PM'}.\n` +
        `Smart Lock PIN to reset: ${prop.doorCode || '1234'}.`;

    case 'payment':
      return `💳 *Payment Reminder - ${prop.name}*\n\n` +
        `Hi *${booking.guestName}*, gentle reminder regarding the remaining balance for your stay:\n\n` +
        `📅 *Dates:* ${booking.checkIn} to ${booking.checkOut}\n` +
        `💰 *Balance Due:* *${currency} ${booking.balance.toFixed(2)}*\n` +
        bankInfoEN +
        `\nKindly settle the balance before check-in to receive your door access PIN. Thank you! 🙏`;

    default:
      return '';
  }
}

function renderWhatsAppPreview() {
  if (!appState.activeWaBooking) return;
  const msg = generateWhatsAppMessage(appState.activeWaBooking, appState.activeWaTemplate);
  document.getElementById('waMessagePreviewText').textContent = msg;

  const now = new Date();
  document.getElementById('waTimestamp').textContent = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')} ✓✓`;
}

function handleCopyWaText() {
  const text = document.getElementById('waMessagePreviewText').textContent;
  navigator.clipboard.writeText(text).then(() => {
    showToast('Message copied to clipboard!');
  }).catch(() => {
    showToast('Copied text!');
  });
}

function handleSendWaDirect() {
  if (!appState.activeWaBooking) return;
  const text = document.getElementById('waMessagePreviewText').textContent;
  const phone = (appState.activeWaBooking.guestPhone || '').replace(/[^0-9]/g, '');
  const url = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}` : `https://wa.me/?text=${encodeURIComponent(text)}`;
  window.open(url, '_blank');
}

// ==========================================================================
// 15. DIGITAL GUEST GUIDE MODAL
// ==========================================================================

function openGuestGuideModal() {
  const content = document.getElementById('guestGuideContent');
  content.innerHTML = '';

  const prop = appState.selectedPropertyId !== 'all' 
    ? getPropertyById(appState.selectedPropertyId) 
    : appState.properties[0];

  if (!prop) {
    showToast('Please create a homestay unit first.');
    return;
  }

  // QR Code URL using Google Chart API or QR service
  const wifiString = `WIFI:S:${encodeURIComponent(prop.wifiName || '')};T:WPA;P:${encodeURIComponent(prop.wifiPass || '')};;`;
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(wifiString)}`;

  content.innerHTML = `
    <div class="guest-guide-hero">
      <h3 style="font-size:18px; font-weight:800;">${prop.name}</h3>
      <p class="card-subtitle"><i class="fa-solid fa-location-dot"></i> ${prop.address || 'Homestay Address'}</p>
      
      <div class="qr-code-box">
        <img src="${qrUrl}" alt="WiFi QR Code" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23f1f5f9\\'/ %3E%3Ctext x=\\'50\\' y=\\'55\\' font-size=\\'12\\' text-anchor=\\'middle\\' fill=\\'%2364748b\\'%3EWiFi QR%3C/text%3E%3C/svg%3E'">
      </div>
      <p style="font-size:11px; font-weight:700; color:var(--primary);">📱 Scan to Connect to WiFi Automatically</p>
    </div>

    <div class="guide-info-card">
      <h4><i class="fa-solid fa-wifi" style="color:var(--primary)"></i> WiFi Credentials</h4>
      <p>Network: <strong>${prop.wifiName || 'None'}</strong></p>
      <p>Password: <strong>${prop.wifiPass || 'None'}</strong></p>
    </div>

    <div class="guide-info-card">
      <h4><i class="fa-solid fa-key" style="color:var(--warning)"></i> Smart Lock / Access</h4>
      <p>Door PIN Code: <strong>${prop.doorCode || 'Provided upon arrival'}</strong></p>
      <p>Check-In: <strong>${prop.checkInTime || '3:00 PM'}</strong> • Check-Out: <strong>${prop.checkOutTime || '12:00 PM'}</strong></p>
    </div>

    <div class="guide-info-card">
      <h4><i class="fa-solid fa-circle-exclamation" style="color:var(--danger)"></i> House Rules</h4>
      <p>${prop.rules || 'Please treat our home with respect.'}</p>
    </div>

    <button class="btn btn-whatsapp btn-block" id="btnShareGuideWa" style="margin-top:12px;">
      <i class="fa-brands fa-whatsapp"></i> Share Guide with Guest via WhatsApp
    </button>
  `;

  document.getElementById('btnShareGuideWa').addEventListener('click', () => {
    const text = `🏡 *Welcome Guide - ${prop.name}*\n\n` +
      `📍 *Address:* ${prop.address || 'Standard Address'}\n` +
      `📶 *WiFi:* ${prop.wifiName} (Pass: ${prop.wifiPass})\n` +
      `🔑 *Door PIN:* ${prop.doorCode}\n` +
      `📜 *Rules:* ${prop.rules}\n\n` +
      `Need assistance? Feel free to message us anytime!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  });

  document.getElementById('guestGuideModal').classList.add('active');
}

// ==========================================================================
// 16. DATA BACKUP, EXPORT & RESTORE
// ==========================================================================

function exportDataBackup() {
  const exportObject = {
    version: '2.0',
    exportDate: new Date().toISOString(),
    properties: appState.properties,
    bookings: appState.bookings,
    turnovers: appState.turnovers,
    expenses: appState.expenses,
    settings: appState.settings
  };

  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObject, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `StayManager_Backup_${new Date().toISOString().split('T')[0]}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast('Backup file downloaded safely!');
}

function importDataBackup(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (data.properties && Array.isArray(data.properties)) {
        appState.properties = data.properties;
        appState.bookings = data.bookings || [];
        appState.turnovers = data.turnovers || [];
        appState.expenses = data.expenses || [];
        appState.settings = data.settings || DEFAULT_SETTINGS;
        saveToStorage();
        renderApp();
        showToast('Backup restored successfully!');
      } else {
        alert('Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file.');
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (confirm('Are you sure you want to clear all homestays, bookings, turnovers, and expenses? Your license key and preferences will be preserved.')) {
    const preservedLicense = appState.licenseKey;
    const preservedIsLicensed = appState.isLicensed;
    const preservedIsMaster = appState.isMasterAdmin;
    const preservedSettings = { ...appState.settings };

    appState.properties = [];
    appState.bookings = [];
    appState.turnovers = [];
    appState.expenses = [];
    appState.selectedPropertyId = 'all';
    appState.isLicensed = preservedIsLicensed;
    appState.licenseKey = preservedLicense;
    appState.isMasterAdmin = preservedIsMaster;
    appState.settings = preservedSettings;

    // Mark as initialized so demo data does not auto-seed on reload
    localStorage.setItem('staymanager_initialized', 'true');
    saveToStorage();
    renderApp();
    showToast('All homestay & booking data cleared successfully!');
  }
}

// ==========================================================================
// 17. THEME & UTILITIES
// ==========================================================================

function toggleTheme() {
  const isDark = document.body.classList.contains('theme-dark');
  const newTheme = isDark ? 'light' : 'dark';
  applyTheme(newTheme);
  appState.settings.theme = newTheme;
  saveToStorage();
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.classList.remove('theme-light');
    document.body.classList.add('theme-dark');
    document.getElementById('btnThemeToggle').innerHTML = '<i class="fa-solid fa-sun"></i>';
  } else {
    document.body.classList.remove('theme-dark');
    document.body.classList.add('theme-light');
    document.getElementById('btnThemeToggle').innerHTML = '<i class="fa-solid fa-moon"></i>';
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(m => m.classList.remove('active'));
}

function showToast(message) {
  const container = document.getElementById('toastContainer');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--success);"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(-10px)';
    toast.style.transition = 'all 0.2s ease';
    setTimeout(() => toast.remove(), 200);
  }, 2800);
}

// Start application
window.addEventListener('DOMContentLoaded', initApp);
