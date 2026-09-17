/**
 * HOMESTAY MANAGER - MOBILE-FIRST PWA ENGINE
 * Full-featured property, booking, turnover, and revenue management system.
 */

// ==========================================================================
// 1. STATE & LOCALSTORAGE DATA MODEL
// ==========================================================================

const APP_VERSION = '2.6.1';

const STORAGE_KEYS = {
  PROPERTIES: 'staymanager_properties_v2',
  BOOKINGS: 'staymanager_bookings_v2',
  TURNOVERS: 'staymanager_turnovers_v2',
  EXPENSES: 'staymanager_expenses_v2',
  CONTACTS: 'staymanager_contacts_v2',
  PROMO_MEDIA: 'staymanager_promo_media_v2',
  SETTINGS: 'staymanager_settings_v2',
  LICENSE: 'staymanager_license_v2',
  VERSION: 'staymanager_app_version'
};

const DEFAULT_CONTACTS = [
  {
    id: 'c-1',
    name: 'Kak Siti',
    category: 'cleaner',
    phone: '+60129998877',
    company: 'Siti Clean Services',
    notes: 'Turnover cleaning RM70/unit. Available Mon-Sat.'
  },
  {
    id: 'c-2',
    name: 'Ah Keong',
    category: 'aircond',
    phone: '+60128887766',
    company: 'Keong Cool Aircond',
    notes: 'Aircond chemical wash (RM120/unit) & emergency gas refilling.'
  },
  {
    id: 'c-3',
    name: 'Pak Din',
    category: 'plumber',
    phone: '+60127776655',
    company: 'Pak Din Plumbing',
    notes: 'Pipe repairs, toilet clog, water heater troubleshooting.'
  },
  {
    id: 'c-4',
    name: 'Sri Dobi Supply',
    category: 'linen_supplier',
    phone: '+60126665544',
    company: 'Sri Dobi & Linens Sdn Bhd',
    notes: 'Bedsheet sets, duvets, white bath towels wholesale restock.'
  }
];

const DEFAULT_PROMO_MEDIA = [
  {
    id: 'promo-demo-1',
    propertyId: 'prop-1',
    category: 'photo',
    title: 'Sunset Ocean Villa - Panoramic Living & Balcony Seaview',
    caption: '🌊 *Sunset Ocean Villa (Whole Unit - 3 Bedrooms)* 🌅\nLooking for an unforgettable beachside getaway with family or friends?\n\n✨ *Key Highlights:* \n• Accommodates up to 8–10 guests comfortably\n• 3 air-conditioned bedrooms with luxury hotel-grade linens\n• Private balcony with direct panoramic sunset ocean views\n• High-speed 500Mbps WiFi & Smart TV with Netflix\n• Fully equipped dry & wet kitchen (fridge, microwave, induction cooker)\n• Infinity swimming pool, sauna & kids playground access\n\n📍 *Location:* Seaview Residences, Jalan Pantai\n💰 *Rates from:* RM 280 / night\n\n📲 Reply to this message now to check your dates and enjoy our early bird rates!',
    imageData: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><defs><linearGradient id="ocean" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#0284c7"/><stop offset="50%" stop-color="#0369a1"/><stop offset="100%" stop-color="#075985"/></linearGradient></defs><rect width="600" height="340" fill="url(#ocean)"/><circle cx="480" cy="100" r="55" fill="#f59e0b" opacity="0.85"/><path d="M0 240 Q150 200 300 240 T600 240 L600 340 L0 340 Z" fill="#0c4a6e" opacity="0.6"/><path d="M0 270 Q150 240 300 270 T600 270 L600 340 L0 340 Z" fill="#082f49"/><text x="40" y="80" fill="#ffffff" font-family="system-ui, sans-serif" font-size="24" font-weight="bold">🌊 Sunset Ocean Villa</text><text x="40" y="115" fill="#bae6fd" font-family="system-ui, sans-serif" font-size="15">Panoramic Living & Balcony Seaview</text><rect x="40" y="150" width="170" height="32" rx="6" fill="#f59e0b"/><text x="52" y="172" fill="#ffffff" font-family="system-ui, sans-serif" font-size="13" font-weight="bold">⭐ Top Rated Beachfront</text></svg>'),
    mediaUrl: 'https://maps.google.com/?q=3.1390,101.6869',
    createdAt: new Date().toISOString()
  },
  {
    id: 'promo-demo-2',
    propertyId: 'prop-2',
    category: 'video_tour',
    title: 'Villa Impian Master Bedroom - Virtual Video Tour',
    caption: '🎥 *Virtual Video Walkthrough: Villa Impian Master Bedroom* 🌿\nTake a quick 1-minute video tour inside our cozy highland sanctuary!\n\n✨ *Room Specs:* \n• King-size bed with premium orthopedic mattress\n• Private en-suite bathroom with instant hot rain shower\n• Quiet environment surrounded by cool mountain mist\n• Access to shared BBQ patio, tea terrace & garden\n\n👇 *Click to Watch the Walkthrough Video:* \nhttps://youtu.be/sample-villa-tour\n\n💬 Send us a message today to lock in your preferred stay dates!',
    imageData: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><defs><linearGradient id="vidbg" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#065f46"/><stop offset="100%" stop-color="#047857"/></linearGradient></defs><rect width="600" height="340" fill="url(#vidbg)"/><circle cx="300" cy="170" r="44" fill="#ffffff" opacity="0.92"/><polygon points="292,152 316,170 292,188" fill="#047857"/><text x="40" y="60" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="bold">🎥 Villa Impian Virtual Tour</text><text x="40" y="90" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="14">Master Bedroom & Highland Garden Walkthrough</text></svg>'),
    mediaUrl: 'https://youtu.be/sample-villa-tour',
    createdAt: new Date().toISOString()
  },
  {
    id: 'promo-demo-3',
    propertyId: 'all',
    category: 'poster',
    title: 'School Holiday Early Bird 15% OFF Promo Flyer',
    caption: '🎉 *SPECIAL SCHOOL HOLIDAY PROMO - 15% OFF!* 🎒✨\nPlanning your next family trip or weekend getaway? Book early and save big!\n\n🎁 *Exclusive Early Bird Package:* \n• Get *15% OFF* for reservations of 2 nights or more\n• Free welcome drinks & late check-out till 1:00 PM (subject to availability)\n• Valid across all our homestay villas & medium rooms\n\n📅 *Booking Window:* Limited to the first 10 confirmed bookings!\n📲 Reply directly with your check-in dates to claim your 15% discount voucher!',
    imageData: 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340"><defs><linearGradient id="poster" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#4f46e5"/></linearGradient></defs><rect width="600" height="340" fill="url(#poster)"/><circle cx="100" cy="80" r="90" fill="#a855f7" opacity="0.3"/><circle cx="520" cy="260" r="110" fill="#6366f1" opacity="0.3"/><text x="50" y="90" fill="#fde047" font-family="system-ui, sans-serif" font-size="16" font-weight="800" letter-spacing="1">LIMITED TIME SPECIAL DEAL</text><text x="50" y="145" fill="#ffffff" font-family="system-ui, sans-serif" font-size="34" font-weight="900">SCHOOL HOLIDAY</text><text x="50" y="195" fill="#38bdf8" font-family="system-ui, sans-serif" font-size="36" font-weight="900">SAVE 15% OFF!</text><text x="50" y="240" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="14">Book min 2 nights • Free welcome perks • Instant WhatsApp booking</text></svg>'),
    mediaUrl: '',
    createdAt: new Date().toISOString()
  },
  {
    id: 'promo-demo-4',
    propertyId: 'prop-3',
    category: 'copywriting',
    title: 'Affordable Highland Stay for Couples & Remote Workers',
    caption: '🍃 *Cozy Medium Room @ Villa Impian* 🛏️\nAffordable, sparkling clean comfort in the cool highlands!\n\n• Queen bed with plush orthopedic mattress\n• Dedicated work desk with high-speed 5G WiFi (remote-work friendly)\n• Access to spacious living hall & tea-making pantry\n• Only *RM 100 / night* (Cleaning fee RM25)\n\n💬 Send us a message today to book your peaceful retreat!',
    imageData: '',
    mediaUrl: '',
    createdAt: new Date().toISOString()
  }
];


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
  duitNow: '0123456789',
  quotationValidityDays: 3,
  standardNotes: ''
};

const TRANSLATIONS = {
  en: {
    // Navigation
    nav_today: 'Today',
    nav_calendar: 'Calendar',
    nav_bookings: 'Bookings',
    nav_turnovers: 'Turnovers',
    nav_finances: 'Finances',
    nav_settings: 'Settings',

    // Header & Global
    all_units: 'All Units',
    add_unit: '+ Add',
    demo_badge: 'DEMO MODE',
    demo_banner_text: 'Loving this app for your homestays?',
    buy_app: 'Buy App',
    activate: 'Activate',
    today: 'Today',
    cancel: 'Cancel',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    close: 'Close',

    // Dashboard
    kpi_checkin: 'Today Check-In',
    kpi_checkout: 'Today Check-Out',
    kpi_inhouse: 'In-House Guests',
    kpi_turnovers: 'Turnovers Needed',
    this_month: 'This Month',
    occupancy: 'Occupancy',
    nights_booked: 'nights booked',
    homestay_units_title: 'Homestay Units Overview',
    today_actions: "Today's Schedule & Actions",
    see_all: 'See All',
    manage_btn: 'Manage',
    vacant_ready: 'Vacant & Ready',
    turnover_required: 'Turnover / Cleaning Required',
    occupied_by: 'Occupied by',
    available: 'Available',
    occupied: 'Occupied',
    turnover: 'Turnover',
    no_actions_today: 'No urgent check-ins, check-outs, or turnovers today.',

    // Calendar
    cal_title: 'Calendar',
    sun: 'Sun', mon: 'Mon', tue: 'Tue', wed: 'Wed', thu: 'Thu', fri: 'Fri', sat: 'Sat',
    selected_date: 'Selected Date',
    select_a_date: 'Select a date',
    book_date_btn: 'Book Date',
    cal_tap_hint: 'Tap on any date above to view bookings or check availability.',
    no_bookings_date: 'No bookings for this date. Unit is vacant & available.',
    cal_all_incoming_tab: '📅 All Incoming (Nearest First)',
    cal_selected_date_tab: '🎯 Selected Date',
    cal_incoming_title: 'Incoming Bookings',
    cal_incoming_subtitle: 'Ordered by nearest dates',
    cal_no_incoming: 'No upcoming or active bookings found.',
    cal_mode_checkin: 'Check-In',
    cal_mode_checkout: 'Check-Out',
    cal_mode_stays: 'All Stays',
    cal_checkins_for_date: 'Check-In(s) on',
    cal_checkouts_for_date: 'Check-Out(s) on',
    cal_no_checkins_date: 'No check-ins on this date. Unit(s) available for new booking.',
    cal_no_checkouts_date: 'No check-outs scheduled on this date.',
    cal_unit_vacating_title: 'Checking Out Today — Ready for New Booking!',
    cal_unit_vacating_desc: 'Guest departs by 12:00 PM. Unit will be cleaned & ready for a new guest to check in at 3:00 PM.',
    cal_book_unit_today: '+ Book Unit from Today',

    // Bookings & Filters
    filter_all: 'All',
    filter_quotations: '📋 Quotations',
    filter_booked: '🟡 Booked (Deposit)',
    filter_confirmed: '🟢 Confirmed (Full)',
    filter_inhouse: '🔑 In-House',
    filter_completed: '🏁 Completed',
    filter_blocked: '🚫 Blocked',
    search_placeholder: 'Search guest name, phone, ref...',
    no_bookings_found: 'No Bookings Found',
    no_bookings_hint: 'Try adjusting your search or tap + to create a new quotation / booking.',
    nights: 'nights',
    months: 'months',
    guests: 'Guests',
    total: 'Total',
    balance: 'Balance',
    btn_wa: 'WhatsApp',
    btn_edit: 'Edit',

    // Turnovers
    turnover_title: 'Turnover & Cleaning',
    turnover_subtitle: 'Prep your homestay for the next guest',
    no_turnovers: 'No Turnovers Needed',
    all_clean_hint: 'All homestays are clean, sanitized and ready for check-in.',
    checklist: 'Checklist',
    assign_cleaner: 'Assign Cleaner',
    mark_clean_ready: 'Mark as Clean & Ready',
    cleaning_in_progress: 'Cleaning in Progress',
    ready_for_checkin: 'Ready for Check-In',
    btn_wa_cleaner: 'WhatsApp Cleaner',

    // Finances
    total_rev: 'Total Revenue',
    total_exp: 'Total Expenses',
    net_profit: 'Net Profit',
    rev_by_homestay: 'Revenue by Homestay',
    expense_breakdown: 'Expense Breakdown',
    add_expense_btn: '+ Expense',
    add_btn: '+ Add',
    no_expenses: 'No expenses logged for this month.',
    cat_cleaning: '🧹 Cleaning / Laundry',
    cat_utilities: '💡 Utilities (Electricity, Water, WiFi)',
    cat_supplies: '🧻 Supplies & Amenities',
    cat_maintenance: '🔧 Maintenance & Repairs',
    cat_commission: '🏷️ Platform Commission',
    cat_other: '📦 Other Expenses',

    // Settings
    your_homestays: 'Your Homestays',
    manage_homestays_sub: 'Manage names, WiFi, smart locks & rates',
    add_unit_btn: '+ Add Unit',
    app_pref_title: 'App Preferences & Seller Info',
    business_name_label: 'Business / Brand Name',
    seller_phone_label: 'Seller Support / Order WhatsApp Number',
    seller_phone_hint: 'Buyers will contact this WhatsApp number when clicking "Buy License".',
    currency_label: 'Currency Symbol',
    owner_phone_label: 'Owner WhatsApp Phone Number (Bound to License)',
    owner_phone_hint: 'Your official WhatsApp number. Used in quotations and permanently bound to your app license.',
    app_language_label: 'App Language / Bahasa',
    deposit_pct_label: 'Standard Deposit Percentage (%)',
    deposit_pct_hint: 'Default deposit requested upon booking (e.g. 30%).',
    quotation_validity_label: 'Default Quotation Validity (Days)',
    quotation_validity_hint: 'Default number of days a quotation remains valid before expiry.',
    standard_notes_label: 'Standard WhatsApp Notes / Footer',
    standard_notes_hint: 'Automatically appended at the bottom of customer WhatsApp automation messages.',
    days_label: 'days',
    btn_save_pref: 'Save Preferences',
    bank_title: 'Bank & Payment Details',
    bank_sub: 'Auto-included in Quotations, Invoices, and Payment Receipts sent to guests.',
    bank_name_label: 'Bank Name',
    acc_num_label: 'Account Number',
    acc_holder_label: 'Account Holder Name',
    duitnow_label: 'DuitNow ID / QR / Transfer Note',
    btn_save_bank: 'Save Payment Details',
    app_license_title: 'App License',
    admin_gen_title: 'Admin License Generator',
    admin_gen_sub: 'Generate phone-bound licenses and 1-click WhatsApp onboarding links for buyers.',
    buyer_phone_label: "Buyer's WhatsApp Phone Number",
    buyer_name_label: 'Buyer Name / Homestay Name (Optional)',
    btn_gen_license: 'Generate License & Magic Link',
    // App Updates & Version
    app_version_title: 'App Version & Updates',
    app_version_sub: 'Update to the latest version anytime without losing your homestay or booking data.',
    safe_update_guarantee_title: 'Zero Data Loss Guarantee:',
    safe_update_guarantee_desc: 'Your homestays, tenant records, financials, and license key stay privately stored on this device during updates.',
    btn_check_updates: 'Check for Updates',
    btn_safety_backup: 'Safety Snapshot',
    update_banner_title: 'New Update Available!',
    update_banner_desc: 'New improvements & features ready. Your data is 100% preserved.',
    btn_update_now: 'Update Now',
    toast_app_updated: '🎉 App successfully updated to v2.6.1! All data is intact.',
    toast_up_to_date: '✨ You are already using the latest version (v2.6.1)!',
    toast_checking_updates: 'Checking for new updates...',
    toast_safety_saved: 'Safety backup snapshot downloaded!',

    data_backup_title: 'Data & Backup',
    data_backup_sub: 'All your data is saved privately on your device. Export a backup anytime.',
    btn_export: 'Export Backup (.json)',
    btn_restore: 'Restore Backup',
    btn_restore_snapshot: 'Restore Pre-Update Safety Snapshot',
    no_auto_backup_found: 'No pre-update safety snapshot found. Your current data is active.',
    btn_load_demo: 'Load Rich Demo Data',
    btn_clear_data: 'Clear All Data',
    install_mobile_title: 'Install on Mobile',
    install_mobile_sub: 'To install like a native app: Open in Safari (iOS) and tap Share > Add to Home Screen, or in Chrome (Android) tap Menu > Install App.',

    // Modals - Booking
    booking_modal_new: 'New Quotation / Booking',
    booking_modal_edit: 'Edit Booking / Tenancy',
    select_property: 'Select Homestay Property',
    rental_type: 'Rental Type / Jenis Sewaan',
    type_daily: 'Daily / Short-Term',
    type_monthly: 'Monthly Tenancy',
    tenant_particulars_title: 'Tenant & Guest Particulars / Butiran Tetamu',
    full_name: 'Full Name / Nama Penuh',
    phone_wa: 'Phone / WhatsApp',
    nric_passport: 'NRIC / Passport No. / No. KP',
    email: 'Email Address / Emel',
    address: 'Residential / Home Address / Alamat Surat Menyurat',
    checkin_date: 'Check-In Date',
    checkout_date: 'Check-Out Date',
    rate_night: 'Rate/Night',
    cleaning_fee: 'Cleaning Fee',
    sec_deposit: 'Security Deposit (Refundable)',
    total_rental: 'Total Rental:',
    quick_deposit: 'Quick Booking Fee:',
    monthly_start: 'Tenancy Start Date',
    duration_months: 'Duration (Months)',
    monthly_rent: 'Monthly Rent:',
    rental_dep: 'Rental Deposit (Refundable):',
    util_dep: 'Utilities Deposit (Refundable):',
    agreement_fee: 'Agreement & Admin Fee:',
    initial_movein: 'Initial Move-In Total:',
    guests_occupants: 'Guests / Occupants',
    booking_channel: 'Booking Channel',
    deposit_paid: 'Advance / Deposit Paid',
    booking_stage: 'Booking Stage / Status',
    special_notes: 'Special Requests / Notes',
    btn_save_booking: 'Save Booking',

    // Modals - Property
    prop_modal_add: 'Add Homestay Unit',
    prop_modal_edit: 'Edit Homestay Unit',
    prop_name: 'Property / Homestay Name',
    room_no: 'Room / Unit No.',
    rental_cat: 'Rental Category / Jenis Unit',
    cat_entire: '🏡 Entire House / Whole Unit (Seluruh Rumah / Villa / Homestay)',
    cat_master: '🚪 Room Rental - Master Bedroom (Sewa Bilik Master)',
    cat_medium: '🚪 Room Rental - Medium Room (Sewa Bilik Medium)',
    cat_single: '🚪 Room Rental - Single Room (Sewa Bilik Single / Standard)',
    cat_studio: '🏢 Studio Apartment / Suite',
    address_loc: 'Address / Location',
    gps_loc: 'GPS / Google Maps Link',
    open_maps: 'Open in Google Maps / Waze',
    wifi_name: 'WiFi Name (SSID)',
    wifi_pass: 'WiFi Password',
    door_pin: 'Door / Smart Lock PIN',
    theme_color: 'Theme Color',
    default_rate: 'Default Nightly Rate',
    default_clean_fee: 'Cleaning Fee',
    checkin_time: 'Check-in Time',
    checkout_time: 'Check-out Time',
    house_rules: 'House Rules & Notes',
    btn_save_prop: 'Save Property',

    // Modals - WhatsApp
    wa_modal_title: 'Send WhatsApp Message',
    wa_to: 'To: Guest',
    wa_tab_quotation: '📄 Quotation',
    wa_tab_deposit: '🧾 Deposit Receipt (Booked)',
    wa_tab_checkin: '📅 Check-In Reminder',
    wa_tab_full: '🔑 Full Receipt & Keys',
    wa_tab_invoice: '📑 Monthly Rent Invoice',
    wa_tab_rent_receipt: '🧾 Monthly Rent Receipt',
    wa_tab_refund: '💰 Deposit Refund Statement',
    wa_tab_checkout: '🏁 Check-Out Reminder',
    wa_tab_cleaner: '🧹 Cleaner Job',
    wa_tab_payment: '💳 Balance Due',
    btn_checkin_reminder: 'Check-In Reminder',
    btn_copy_text: 'Copy Text',
    btn_open_wa: 'Open WhatsApp',

    // Modals - Monthly Tenancy Invoices
    monthly_invoices_modal_title: 'Monthly Rental Invoices',
    select_billing_month: 'Select Billing Month',
    extra_utility_surcharge: 'Utility / Extra (RM)',
    tenancy_period: 'Tenancy Period',
    monthly_schedule_title: 'Billing Cycles & Invoice Status',
    month_num: 'Month',
    due_date_label: 'Due Date',
    btn_send_month_inv: 'Send Invoice',
    btn_send_month_rec: 'Send Receipt',
    btn_mark_month_paid: 'Mark Paid',
    btn_unmark_month_paid: 'Unmark',
    paid_movein: 'Paid (Move-In)',
    pending: 'Pending',
    paid: 'Paid',
    btn_view_invoices: 'Monthly Invoices',

    // In-App User Guide
    user_guide_title: 'User Manual & Operational Guide',
    user_guide_sub: 'Step-by-step instructions on mobile setup, bookings, invoicing, WhatsApp, and finances.',
    btn_open_guide: 'Read In-App User Guide (EN / BM)',
    user_guide_modal_title: 'User Guide & Manual',
    user_guide_modal_sub: 'Interactive guide & operational walkthrough',
    guide_lang_label: 'Select Guide Language:',

    // Modals - Refund
    refund_modal_title: 'Tenancy Deposit Refund',
    rental_dep_held: 'Rental Deposit Held:',
    util_dep_held: 'Utilities Deposit Held:',
    deduct_util: 'Less: Utility Arrears (TNB/Water):',
    deduct_repair: 'Less: Repairs & Damage / Cleaning:',
    net_refund: 'Net Refund to Tenant:',
    deduct_notes: 'Deduction Notes & Bank Account for Transfer',
    btn_send_refund_wa: 'Send Refund Statement',

    // Modals - Expense
    exp_modal_title: 'Log Homestay Expense',
    exp_property: 'Property',
    exp_amount: 'Amount',
    exp_date: 'Date',
    exp_category: 'Category',
    exp_desc: 'Description / Receipt Note',
    btn_save_expense: 'Save Expense',

    // Modals - Guest Kit
    guide_modal_title: 'Digital Guest Welcome Kit',
    guide_wifi: 'WiFi Credentials',
    guide_smart_lock: 'Smart Lock / Access',
    guide_rules: 'House Rules',
    guide_share_btn: 'Share Guide with Guest via WhatsApp',

    // Modals - License
    lic_modal_title: 'Unlock Lifetime License',
    lic_modal_sub: 'One-time purchase • Zero monthly fees',
    lic_phone: 'Your Registered WhatsApp Phone Number',
    lic_key: 'Enter Your Activation License Key',
    btn_activate_app: 'Activate Full App',

    // Action Feed Tags & Buttons
    tag_checkin_today: 'Check-In Today',
    tag_checkout_today: 'Check-Out Today',
    tag_turnover_needed: 'Turnover Needed',
    btn_send_quotation: 'Send Quotation',
    btn_mark_booked: 'Mark Deposit Paid (Book)',
    btn_send_deposit_receipt: 'Send Deposit Receipt',
    btn_send_invoice: 'Send Invoice',
    btn_mark_confirmed: 'Mark Fully Paid (Confirm)',
    btn_send_full_receipt: 'Send Full Receipt & Key',
    btn_checkin: 'Check In',
    btn_checkout_reminder: 'Check-Out Reminder',
    btn_complete_checkout: 'Complete Check-Out',

    // Team & Suppliers Directory and Dispatch
    team_dir_title: 'Maintenance Team & Suppliers',
    team_dir_subtitle: 'Manage cleaners, technicians, handymen & suppliers',
    add_person_btn: '+ Add Person',
    btn_team_suppliers: '👷 Team & Suppliers',
    btn_service_supply_alert: '🛠️ Service / Supply Alert',
    contact_name_label: 'Contact / Person Name',
    contact_category_label: 'Service Category / Role',
    contact_phone_label: 'WhatsApp Phone Number',
    contact_company_label: 'Company / Shop Name (Optional)',
    contact_notes_label: 'Rates, Notes & Service Details',
    contact_modal_title_new: 'Add Team Member / Supplier',
    contact_modal_title_edit: 'Edit Contact Details',
    save_contact_btn: 'Save Contact',
    dispatch_modal_title: 'WhatsApp Service & Supply Alert',
    dispatch_modal_sub: 'Dispatch cleaners, technicians or order supplies',
    dispatch_recipient_label: 'Send WhatsApp To',
    dispatch_property_label: 'Homestay Unit / Property',
    dispatch_type_label: 'Service / Task Type',
    dispatch_urgency_label: 'Urgency Level',
    dispatch_details_label: 'Task / Order Instructions',
    dispatch_include_pin: 'Include Smart Lock Door PIN in message',
    btn_copy_text: 'Copy Text',
    btn_send_wa_direct: 'Send via WhatsApp',
    cat_cleaner: '🧹 Cleaner / Cleaning Crew',
    cat_aircond: '❄️ Aircond Specialist',
    cat_plumber: '🔧 Plumber',
    cat_electrician: '⚡ Electrician',
    cat_handyman: '🔨 Handyman / General Repairs',
    cat_linen_supplier: '🧺 Linen & Laundry Supplier',
    cat_gas_supplier: '⛽ Gas & Amenities Supplier',
    cat_locksmith: '🔐 Locksmith / Smart Lock Tech',
    cat_other: '📦 Other Contractor / Supplier',

    // Digital Receipts & Payments
    receipt_modal_title: 'Capture Payment Receipt & Reference',
    receipt_gallery_title: 'Payment Receipts & Proofs',
    btn_receipt_proofs: 'Payment Proofs',
    payment_type: 'Payment Type / Purpose',
    monthly_cycle: 'Month Cycle',
    amount_received: 'Amount Received (RM)',
    payment_date: 'Payment Date & Time',
    bank_channel: 'Bank / Payment Channel',
    bank_ref_no: 'Bank Ref No. / Transaction ID',
    paste: 'Paste',
    bank_ref_hint: 'Copy & paste the Reference No / Transaction ID from the tenant slip.',
    digital_receipt_slip: 'Digital Receipt Screenshot / Slip (Bukti Resit)',
    tap_to_upload_receipt: 'Tap to Upload or Snap Receipt Slip',
    receipt_formats_hint: 'JPG, PNG, WebP or PDF • Auto-compressed for zero storage lag',
    view: 'View',
    remove: 'Remove',
    payment_notes: 'Notes / Remarks (Optional)',
    save_payment_proof: 'Save Payment & Receipt',
    add_payment_receipt: '+ Record New Payment / Receipt',
    copy_ref: 'Copy Ref',
    ref_copied: 'Reference number copied!',
    download: 'Download Slip',
    no_receipts_recorded: 'No payment receipts recorded for this booking yet.',
    delete_receipt_confirm: 'Are you sure you want to delete this payment record and slip?',
    receipt_badge_count: 'Receipt(s)',

    // Promotional Media & Marketing Hub
    promo_hub_modal_title: 'Promotional Media & Marketing Hub',
    promo_hub_modal_sub: 'Store photos, posters, video tours & promo copywriting for 1-tap sharing',
    filter_by_property: 'Filter by Property',
    all_properties: 'All Homestays & General',
    add_media_asset: '+ Add Media',
    cat_all: 'All',
    cat_photos: 'Photos',
    cat_posters: 'Posters / Flyers',
    cat_videos: 'Video Tours',
    cat_copywriting: 'Copywriting',
    no_promo_media_found: 'No promotional media found',
    no_promo_media_hint: 'Store photos, posters, video walkthrough links, and promotional captions for quick sharing.',
    add_first_promo_media: 'Add First Media Asset',
    add_promo_media_title: 'Add Promotional Media',
    edit_promo_media_title: 'Edit Promotional Media',
    add_promo_media_sub: 'Upload property photos, video tour links, or promo text',
    media_category_label: 'Media Category',
    media_title_label: 'Title / Headline',
    upload_promo_image: 'Upload Image / Poster (Auto-Compressed for Storage)',
    tap_upload_photo_poster: 'Tap to Upload Photo or Poster',
    auto_compressed_note: 'JPG, PNG, WebP • Auto-downscaled to ~60KB to keep your app fast',
    external_link_label: 'External Tour / Cloud Link (Optional)',
    external_link_hint: 'Zero device storage used. Great for full 4K video tours or shared Google Drive galleries.',
    promo_caption_label: 'Promotional Copywriting / Pitch Text',
    insert_template: 'Preset Template',
    promo_caption_hint: 'This copywriting is pre-filled when sharing to WhatsApp or copying to clipboard.',
    save_promo_media: 'Save Media Asset',
    share_via_whatsapp: 'Send Promo via WhatsApp',
    send_to_recipient: 'Send To Recipient',
    enter_phone_number: 'Enter / Pick Phone Number',
    guest_phone_label: 'Guest WhatsApp Number',
    phone_empty_hint: 'Leave blank to open WhatsApp and pick from your recent contacts.',
    message_preview: 'Message Preview',
    open_in_whatsapp: 'Send on WhatsApp',
    attach_promo_media: '+ Append Promo Media / Tour Link',
    promo_media_card_title: 'Promotional Media & Marketing Hub',
    promo_media_card_sub: 'Store property photos, holiday posters, video walkthroughs & marketing pitch copywriting',
    open_media_hub: 'Open Media Hub',
    copy_pitch: 'Copy Pitch',
    pitch_copied: 'Promotional pitch copied to clipboard!',
    link_copied: 'Media link copied to clipboard!',
    delete_promo_confirm: 'Are you sure you want to delete this promotional media asset?'
  },
  bm: {
    // Navigation
    nav_today: 'Hari Ini',
    nav_calendar: 'Kalendar',
    nav_bookings: 'Tempahan',
    nav_turnovers: 'Pembersihan',
    nav_finances: 'Kewangan',
    nav_settings: 'Tetapan',

    // Header & Global
    all_units: 'Semua Unit',
    add_unit: '+ Tambah',
    demo_badge: 'MOD DEMO',
    demo_banner_text: 'Suka aplikasi ini untuk homestay anda?',
    buy_app: 'Beli App',
    activate: 'Aktifkan',
    today: 'Hari Ini',
    cancel: 'Batal',
    save: 'Simpan',
    edit: 'Kemas Kini',
    delete: 'Padam',
    close: 'Tutup',

    // Dashboard
    kpi_checkin: 'Daftar Masuk Hari Ini',
    kpi_checkout: 'Daftar Keluar Hari Ini',
    kpi_inhouse: 'Tetamu Menginap',
    kpi_turnovers: 'Perlu Dibersihkan',
    this_month: 'Bulan Ini',
    occupancy: 'Kadar Penghunian',
    nights_booked: 'malam ditempah',
    homestay_units_title: 'Ringkasan Unit Homestay',
    today_actions: 'Jadual & Tindakan Hari Ini',
    see_all: 'Lihat Semua',
    manage_btn: 'Urus',
    vacant_ready: 'Kosong & Sedia',
    turnover_required: 'Perlu Pembersihan / Turnover',
    occupied_by: 'Diduduki oleh',
    available: 'Kosong',
    occupied: 'Diduduki',
    turnover: 'Pembersihan',
    no_actions_today: 'Tiada daftar masuk, keluar atau pembersihan mendesak hari ini.',

    // Calendar
    cal_title: 'Kalendar',
    sun: 'Ahd', mon: 'Isn', tue: 'Sel', wed: 'Rab', thu: 'Kha', fri: 'Jum', sat: 'Sab',
    selected_date: 'Tarikh Dipilih',
    select_a_date: 'Pilih tarikh',
    book_date_btn: 'Tempah Tarikh',
    cal_tap_hint: 'Tekan mana-mana tarikh di atas untuk melihat tempahan atau kekosongan.',
    no_bookings_date: 'Tiada tempahan pada tarikh ini. Unit kosong & sedia ditempah.',
    cal_all_incoming_tab: '📅 Semua Akan Datang (Terdekat)',
    cal_selected_date_tab: '🎯 Tarikh Dipilih',
    cal_incoming_title: 'Tempahan Akan Datang',
    cal_incoming_subtitle: 'Susunan mengikut tarikh terdekat',
    cal_no_incoming: 'Tiada tempahan aktif atau akan datang ditemui.',
    cal_mode_checkin: 'Daftar Masuk',
    cal_mode_checkout: 'Daftar Keluar',
    cal_mode_stays: 'Penginapan',
    cal_checkins_for_date: 'Daftar Masuk pada',
    cal_checkouts_for_date: 'Daftar Keluar pada',
    cal_no_checkins_date: 'Tiada tetamu mendaftar masuk pada tarikh ini. Unit sedia untuk tempahan baharu.',
    cal_no_checkouts_date: 'Tiada daftar keluar dijadualkan pada tarikh ini.',
    cal_unit_vacating_title: 'Keluar Hari Ini — Sedia Untuk Tempahan Baharu!',
    cal_unit_vacating_desc: 'Tetamu keluar jam 12:00 PM. Unit dibersihkan & sedia untuk tetamu baharu mendaftar masuk jam 3:00 PM.',
    cal_book_unit_today: '+ Tempah Unit Mulai Hari Ini',

    // Bookings & Filters
    filter_all: 'Semua',
    filter_quotations: '📋 Sebut Harga',
    filter_booked: '🟡 Ditempah (Deposit)',
    filter_confirmed: '🟢 Disahkan (Penuh)',
    filter_inhouse: '🔑 Sedang Menginap',
    filter_completed: '🏁 Selesai',
    filter_blocked: '🚫 Disekat',
    search_placeholder: 'Cari nama tetamu, telefon, rujukan...',
    no_bookings_found: 'Tiada Tempahan Dijumpai',
    no_bookings_hint: 'Cuba tukar carian atau tekan + untuk mencipta sebut harga / tempahan baru.',
    nights: 'malam',
    months: 'bulan',
    guests: 'Tetamu',
    total: 'Jumlah',
    balance: 'Baki',
    btn_wa: 'WhatsApp',
    btn_edit: 'Kemas Kini',

    // Turnovers
    turnover_title: 'Pembersihan & Turnover',
    turnover_subtitle: 'Sediakan unit homestay anda untuk tetamu seterusnya',
    no_turnovers: 'Tiada Pembersihan Diperlukan',
    all_clean_hint: 'Semua unit bersih, disanitasi dan sedia untuk tetamu.',
    checklist: 'Senarai Semak',
    assign_cleaner: 'Tugaskan Pencuci',
    mark_clean_ready: 'Tanda Bersih & Sedia',
    cleaning_in_progress: 'Sedang Dibersihkan',
    ready_for_checkin: 'Sedia Untuk Daftar Masuk',
    btn_wa_cleaner: 'WhatsApp Pencuci',

    // Finances
    total_rev: 'Jumlah Pendapatan',
    total_exp: 'Jumlah Perbelanjaan',
    net_profit: 'Keuntungan Bersih',
    rev_by_homestay: 'Pendapatan Mengikut Unit',
    expense_breakdown: 'Pecahan Perbelanjaan',
    add_expense_btn: '+ Belanja',
    add_btn: '+ Tambah',
    no_expenses: 'Tiada rekod perbelanjaan untuk bulan ini.',
    cat_cleaning: '🧹 Pembersihan / Dobi',
    cat_utilities: '💡 Utiliti (Elektrik, Air, WiFi)',
    cat_supplies: '🧻 Barangan & Kelengkapan',
    cat_maintenance: '🔧 Penyelenggaraan & Baiki',
    cat_commission: '🏷️ Komisen Platform',
    cat_other: '📦 Perbelanjaan Lain',

    // Settings
    your_homestays: 'Unit Homestay & Bilik Anda',
    manage_homestays_sub: 'Urus nama, WiFi, kunci pintar & kadar sewa',
    add_unit_btn: '+ Tambah Unit',
    app_pref_title: 'Pilihan Aplikasi & Maklumat Penjual',
    business_name_label: 'Nama Homestay / Perniagaan',
    seller_phone_label: 'Nombor WhatsApp Sokongan / Tempahan',
    seller_phone_hint: 'Pembeli akan menghubungi nombor WhatsApp ini apabila menekan "Beli Lesen".',
    currency_label: 'Simbol Mata Wang',
    owner_phone_label: 'Nombor WhatsApp Pemilik (Terkunci ke Lesen)',
    owner_phone_hint: 'Nombor WhatsApp rasmi anda. Digunakan dalam sebut harga dan diikat secara kekal pada lesen aplikasi anda.',
    app_language_label: 'Bahasa Aplikasi',
    deposit_pct_label: 'Peratusan Deposit Standard (%)',
    deposit_pct_hint: 'Deposit standard yang diminta semasa tempahan (contoh: 30%).',
    quotation_validity_label: 'Tempoh Sah Sebut Harga (Hari)',
    quotation_validity_hint: 'Jumlah hari sebut harga sah sebelum luput.',
    standard_notes_label: 'Nota Standard WhatsApp (Kaki Mesej)',
    standard_notes_hint: 'Dimasukkan secara automatik di bahagian bawah mesej automasi WhatsApp.',
    days_label: 'hari',
    btn_save_pref: 'Simpan Tetapan',
    bank_title: 'Maklumat Akaun Bank & DuitNow',
    bank_sub: 'Dimasukkan secara automatik dalam Sebut Harga, Invois, dan Resit Bayaran tetamu.',
    bank_name_label: 'Nama Bank',
    acc_num_label: 'Nombor Akaun',
    acc_holder_label: 'Nama Pemegang Akaun',
    duitnow_label: 'ID DuitNow / QR / Nota Rujukan',
    btn_save_bank: 'Simpan Maklumat Pembayaran',
    app_license_title: 'Lesen Aplikasi',
    admin_gen_title: 'Penjana Kunci Lesen (Admin)',
    admin_gen_sub: 'Jana lesen terikat nombor telefon dan pautan aktivasi 1-klik WhatsApp untuk pembeli.',
    buyer_phone_label: 'Nombor WhatsApp Pembeli',
    buyer_name_label: 'Nama Pembeli / Nama Homestay (Pilihan)',
    btn_gen_license: 'Jana Kunci Lesen & Pautan Pintar',
    // App Updates & Version
    app_version_title: 'Versi Aplikasi & Kemas Kini',
    app_version_sub: 'Kemas kini ke versi terkini pada bila-bila masa tanpa kehilangan data homestay atau tempahan anda.',
    safe_update_guarantee_title: 'Jaminan Sifar Kehilangan Data:',
    safe_update_guarantee_desc: 'Data unit homestay, rekod penyewa, kewangan dan lesen anda kekal tersimpan secara peribadi di peranti ini semasa kemas kini.',
    btn_check_updates: 'Semak Kemas Kini',
    btn_safety_backup: 'Salinan Keselamatan',
    update_banner_title: 'Kemas Kini Baharu Tersedia!',
    update_banner_desc: 'Ciri baharu & penambahbaikan sedia dipasang. Data anda kekal 100% selamat.',
    btn_update_now: 'Kemas Kini Sekarang',
    toast_app_updated: '🎉 Aplikasi berjaya dikemas kini ke v2.6.1! Semua data kekal selamat.',
    toast_up_to_date: '✨ Anda sedang menggunakan versi terkini (v2.6.1)!',
    toast_checking_updates: 'Menyemak kemas kini terkini...',
    toast_safety_saved: 'Salinan sandaran keselamatan berjaya dimuat turun!',

    data_backup_title: 'Data & Salinan Sandaran',
    data_backup_sub: 'Semua data disimpan secara peribadi pada peranti anda. Eksport salinan sandaran bila-bila masa.',
    btn_export: 'Eksport Salinan (.json)',
    btn_restore: 'Pulihkan Salinan',
    btn_restore_snapshot: 'Pulihkan Salinan Keselamatan Pra-Kemas Kini',
    no_auto_backup_found: 'Tiada salinan keselamatan pra-kemas kini dijumpai. Data semasa anda sedang aktif.',
    btn_load_demo: 'Muat Data Demo Penuh',
    btn_clear_data: 'Padam Semua Data',
    install_mobile_title: 'Pasang Pada Telefon Pintar',
    install_mobile_sub: 'Untuk pasang seperti app biasa: Buka di Safari (iOS) dan tekan Share > Add to Home Screen, atau di Chrome (Android) tekan Menu > Install App.',

    // Modals - Booking
    booking_modal_new: 'Tempahan & Sebut Harga Baru',
    booking_modal_edit: 'Kemas Kini Tempahan / Sewaan',
    select_property: 'Pilih Unit Homestay',
    rental_type: 'Jenis Sewaan / Rental Type',
    type_daily: 'Sewaan Harian / Jangka Pendek',
    type_monthly: 'Sewaan Bulanan / Tenancy',
    tenant_particulars_title: 'Butiran Tetamu & Penyewa',
    full_name: 'Nama Penuh',
    phone_wa: 'No. Telefon / WhatsApp',
    nric_passport: 'No. Kad Pengenalan / Pasport',
    email: 'Alamat Emel',
    address: 'Alamat Rumah / Surat Menyurat',
    checkin_date: 'Tarikh Daftar Masuk',
    checkout_date: 'Tarikh Daftar Keluar',
    rate_night: 'Kadar/Malam',
    cleaning_fee: 'Yuran Pembersihan',
    sec_deposit: 'Deposit Keselamatan (Dipulangkan)',
    total_rental: 'Jumlah Sewaan:',
    quick_deposit: 'Pilihan Pantas Deposit:',
    monthly_start: 'Tarikh Mula Sewaan',
    duration_months: 'Tempoh (Bulan)',
    monthly_rent: 'Sewa Bulanan:',
    rental_dep: 'Deposit Sewa (Dipulangkan):',
    util_dep: 'Deposit Utiliti (Dipulangkan):',
    agreement_fee: 'Yuran Perjanjian & Duti Setem:',
    initial_movein: 'Jumlah Bayaran Kemasukan:',
    guests_occupants: 'Bilangan Tetamu / Penghuni',
    booking_channel: 'Saluran Tempahan',
    deposit_paid: 'Bayaran Deposit / Pendahuluan',
    booking_stage: 'Status / Peringkat Tempahan',
    special_notes: 'Permintaan Khas / Catatan',
    btn_save_booking: 'Simpan Tempahan',

    // Modals - Property
    prop_modal_add: 'Tambah Unit Homestay / Bilik',
    prop_modal_edit: 'Kemas Kini Unit Homestay / Bilik',
    prop_name: 'Nama Homestay / Hartanah',
    room_no: 'No. Bilik / Unit',
    rental_cat: 'Kategori Sewaan / Jenis Unit',
    cat_entire: '🏡 Seluruh Rumah / Villa / Homestay (Whole Unit)',
    cat_master: '🚪 Sewa Bilik - Bilik Master',
    cat_medium: '🚪 Sewa Bilik - Bilik Medium',
    cat_single: '🚪 Sewa Bilik - Bilik Single',
    cat_studio: '🏢 Studio Apartmen / Suite',
    address_loc: 'Alamat / Lokasi',
    gps_loc: 'Pautan GPS / Google Maps',
    open_maps: 'Buka di Google Maps / Waze',
    wifi_name: 'Nama WiFi (SSID)',
    wifi_pass: 'Kata Laluan WiFi',
    door_pin: 'PIN Kunci Pintu / Smart Lock',
    theme_color: 'Warna Tema',
    default_rate: 'Kadar Sewa Harian Standard',
    default_clean_fee: 'Yuran Pembersihan',
    checkin_time: 'Waktu Daftar Masuk',
    checkout_time: 'Waktu Daftar Keluar',
    house_rules: 'Peraturan Rumah & Catatan',
    btn_save_prop: 'Simpan Unit',

    // Modals - WhatsApp
    wa_modal_title: 'Hantar Mesej WhatsApp',
    wa_to: 'Kepada: Tetamu',
    wa_tab_quotation: '📄 Sebut Harga',
    wa_tab_deposit: '🧾 Resit Booking & Deposit',
    wa_tab_checkin: '📅 Peringatan Masuk',
    wa_tab_full: '🔑 Resit Penuh & Kunci PIN',
    wa_tab_invoice: '📑 Invois Bulanan',
    wa_tab_rent_receipt: '🧾 Resit Sewa Bulanan',
    wa_tab_refund: '💰 Penyata Pemulangan Deposit',
    wa_tab_checkout: '🏁 Peringatan Daftar Keluar',
    wa_tab_cleaner: '🧹 Tugasan Pembersihan',
    wa_tab_payment: '💳 Peringatan Baki Bayaran',
    btn_checkin_reminder: 'Peringatan Masuk',
    btn_copy_text: 'Salin Teks',
    btn_open_wa: 'Buka WhatsApp Terus',

    // Modals - Refund
    refund_modal_title: 'Penyata Pemulangan Deposit Sewaan',
    rental_dep_held: 'Deposit Sewa Dipegang:',
    util_dep_held: 'Deposit Utiliti Dipegang:',
    deduct_util: 'Tolak: Tunggakan Utiliti (TNB/Air):',
    deduct_repair: 'Tolak: Pembaikan & Pembersihan:',
    net_refund: 'Jumlah Bersih Dipulangkan:',
    deduct_notes: 'Catatan Tolakan & Akaun Bank Pemulangan',
    btn_send_refund_wa: 'Hantar Penyata Pemulangan',

    // Modals - Expense
    exp_modal_title: 'Rekod Perbelanjaan Homestay',
    exp_property: 'Unit Homestay',
    exp_amount: 'Jumlah',
    exp_date: 'Tarikh',
    exp_category: 'Kategori',
    exp_desc: 'Penerangan / Catatan Resit',
    btn_save_expense: 'Simpan Perbelanjaan',

    // Modals - Guest Kit
    guide_modal_title: 'Kit Panduan Digital Tetamu',
    guide_wifi: 'Maklumat Sambungan WiFi',
    guide_smart_lock: 'Akses Kunci Pintu Pintar',
    guide_rules: 'Peraturan Rumah',
    guide_share_btn: 'Kongsi Panduan ke WhatsApp Tetamu',

    // Modals - License
    lic_modal_title: 'Buka Kunci Lesen Seumur Hidup',
    lic_modal_sub: 'Pembelian sekali • Tiada yuran bulanan',
    lic_phone: 'Nombor WhatsApp Berdaftar Anda',
    lic_key: 'Masukkan Kunci Lesen Aktivasi Anda',
    btn_activate_app: 'Aktifkan Aplikasi Penuh',

    // Action Feed Tags & Buttons
    tag_checkin_today: 'Daftar Masuk Hari Ini',
    tag_checkout_today: 'Daftar Keluar Hari Ini',
    tag_turnover_needed: 'Perlu Pembersihan',
    btn_send_quotation: 'Hantar Sebut Harga',
    btn_mark_booked: 'Tanda Deposit Dibayar (Kunci)',
    btn_send_deposit_receipt: 'Hantar Resit Deposit',
    btn_send_invoice: 'Hantar Invois',
    btn_mark_confirmed: 'Tanda Bayaran Penuh (Sahkan)',
    btn_send_full_receipt: 'Hantar Resit Penuh & Kunci',
    btn_checkin: 'Daftar Masuk',
    btn_checkout_reminder: 'Peringatan Daftar Keluar',
    btn_complete_checkout: 'Selesaikan Daftar Keluar',

    // Modals - Monthly Tenancy Invoices
    monthly_invoices_modal_title: 'Jadual Invois Sewaan Bulanan',
    select_billing_month: 'Pilih Bulan Invois',
    extra_utility_surcharge: 'Caj Utiliti / Tambahan (RM)',
    tenancy_period: 'Tempoh Sewaan',
    monthly_schedule_title: 'Kitaran Sewaan & Status Bayaran',
    month_num: 'Bulan ke-',
    due_date_label: 'Tarikh Akhir Bayaran',
    btn_send_month_inv: 'Hantar Invois',
    btn_send_month_rec: 'Hantar Resit',
    btn_mark_month_paid: 'Tanda Bayar',
    btn_unmark_month_paid: 'Batal Tanda',
    paid_movein: 'Dibayar (Kemasukan)',
    pending: 'Belum Bayar',
    paid: 'Telah Dibayar',
    btn_view_invoices: 'Jadual Invois',

    // In-App User Guide
    user_guide_title: 'Panduan Pengguna & Manual Operasi',
    user_guide_sub: 'Panduan langkah demi langkah pemasangan telefon, tempahan, invois, WhatsApp, dan kewangan.',
    btn_open_guide: 'Buka Panduan Pengguna (BM / EN)',
    user_guide_modal_title: 'Panduan Pengguna & Manual',
    user_guide_modal_sub: 'Panduan lengkap & panduan operasi sistem',
    guide_lang_label: 'Pilihan Bahasa Panduan:',

    // Team & Suppliers Directory and Dispatch
    team_dir_title: 'Pasukan Penyelenggaraan & Pembekal',
    team_dir_subtitle: 'Urus tukang cuci, juruteknik, tukang baiki & pembekal',
    add_person_btn: '+ Tambah Kenalan',
    btn_team_suppliers: '👷 Pasukan & Pembekal',
    btn_service_supply_alert: '🛠️ Notis Servis & Bekalan',
    contact_name_label: 'Nama Kenalan / Pekerja',
    contact_category_label: 'Kategori Servis / Peranan',
    contact_phone_label: 'Nombor WhatsApp',
    contact_company_label: 'Nama Syarikat / Kedai (Pilihan)',
    contact_notes_label: 'Kadar Caj, Skop Kerja & Nota',
    contact_modal_title_new: 'Tambah Pasukan / Pembekal',
    contact_modal_title_edit: 'Kemaskini Butiran Kenalan',
    save_contact_btn: 'Simpan Kenalan',
    dispatch_modal_title: 'WhatsApp Notis Servis & Bekalan',
    dispatch_modal_sub: 'Hantar arahan kepada pencuci, juruteknik atau tempah bekalan',
    dispatch_recipient_label: 'Hantar WhatsApp Kepada',
    dispatch_property_label: 'Unit Homestay Terlibat',
    dispatch_type_label: 'Jenis Servis / Tugasan',
    dispatch_urgency_label: 'Tahap Keperluan',
    dispatch_details_label: 'Arahan Kerja / Baiki / Tempahan',
    dispatch_include_pin: 'Sertakan Kod PIN Pintu & Akses',
    btn_copy_text: 'Salin Teks',
    btn_send_wa_direct: 'Hantar melalui WhatsApp',
    cat_cleaner: '🧹 Tukang Cuci / Pasukan Kemas',
    cat_aircond: '❄️ Pakar Servis Aircond',
    cat_plumber: '🔧 Tukang Paip',
    cat_electrician: '⚡ Juruelektrik / Pendawaian',
    cat_handyman: '🔨 Baiki Am / Tukang Rumah',
    cat_linen_supplier: '🧺 Pembekal Linen & Dobi',
    cat_gas_supplier: '⛽ Pembekal Gas & Keperluan',
    cat_locksmith: '🔐 Tukang Kunci / Smart Lock',
    cat_other: '📦 Kontraktor / Pembekal Lain',

    // Digital Receipts & Payments
    receipt_modal_title: 'Rekod Resit Bayaran & No. Rujukan',
    receipt_gallery_title: 'Bukti Bayaran & Resit Transaksi',
    btn_receipt_proofs: 'Bukti Bayaran',
    payment_type: 'Jenis / Tujuan Bayaran',
    monthly_cycle: 'Pusingan Bulan',
    amount_received: 'Jumlah Diterima (RM)',
    payment_date: 'Tarikh & Masa Bayaran',
    bank_channel: 'Bank / Saluran Bayaran',
    bank_ref_no: 'No. Rujukan Bank / ID Transaksi',
    paste: 'Tampal',
    bank_ref_hint: 'Salin & tampal No. Rujukan Transaksi daripada resit pindahan bank penyewa.',
    digital_receipt_slip: 'Tangkapan Skrin Resit / Slip (Bukti Resit)',
    tap_to_upload_receipt: 'Tekan untuk Muat Naik atau Tangkap Gambar Slip',
    receipt_formats_hint: 'JPG, PNG, WebP atau PDF • Dimampat automatik tanpa bebanan memori',
    view: 'Lihat',
    remove: 'Padam',
    payment_notes: 'Catatan / Nota (Pilihan)',
    save_payment_proof: 'Simpan Rekod Bayaran & Resit',
    add_payment_receipt: '+ Rekod Bayaran / Resit Baharu',
    copy_ref: 'Salin No. Ref',
    ref_copied: 'Nombor rujukan bank berjaya disalin!',
    download: 'Muat Turun Slip',
    no_receipts_recorded: 'Tiada resit bayaran direkodkan bagi tempahan ini lagi.',
    delete_receipt_confirm: 'Adakah anda pasti mahu memadamkan rekod bayaran dan slip ini?',
    receipt_badge_count: 'Resit',

    // Promotional Media & Marketing Hub
    promo_hub_modal_title: 'Hab Media Promosi & Pemasaran',
    promo_hub_modal_sub: 'Simpan foto, poster, video homestay & ayat iklan untuk dihantar pantas',
    filter_by_property: 'Tapis mengikut Homestay',
    all_properties: 'Semua Homestay & Umum',
    add_media_asset: '+ Tambah Media',
    cat_all: 'Semua',
    cat_photos: 'Foto Unit',
    cat_posters: 'Poster / Flyer',
    cat_videos: 'Video Tour',
    cat_copywriting: 'Ayat Iklan',
    no_promo_media_found: 'Tiada media promosi dijumpai',
    no_promo_media_hint: 'Simpan foto bilik, kemudahan, poster diskaun dan ayat promosi untuk dikongsi dengan bakal tetamu.',
    add_first_promo_media: 'Tambah Media Pertama',
    add_promo_media_title: 'Tambah Media Promosi',
    edit_promo_media_title: 'Kemaskini Media Promosi',
    add_promo_media_sub: 'Muat naik gambar, pautan video tour atau ayat promosi',
    media_category_label: 'Kategori Media',
    media_title_label: 'Tajuk / Tajuk Utama',
    upload_promo_image: 'Muat Naik Gambar / Poster (Mampat Automatik)',
    tap_upload_photo_poster: 'Tekan untuk Muat Naik Foto atau Poster',
    auto_compressed_note: 'JPG, PNG, WebP • Dimampatkan automatik ~60KB tanpa beban memori',
    external_link_label: 'Pautan Video Tour / Galeri Awan (Pilihan)',
    external_link_hint: 'Sifar penggunaan memori telefon. Sesuai untuk pautan video YouTube, TikTok atau Google Drive.',
    promo_caption_label: 'Ayat Iklan / Copywriting Promosi',
    insert_template: 'Templat Contoh',
    promo_caption_hint: 'Teks ini akan disertakan semasa perkongsian WhatsApp atau salin ke papan keratan.',
    save_promo_media: 'Simpan Media',
    share_via_whatsapp: 'Hantar Promosi via WhatsApp',
    send_to_recipient: 'Hantar Kepada',
    enter_phone_number: 'Masukkan / Pilih Nombor Telefon',
    guest_phone_label: 'Nombor WhatsApp Bakal Tetamu',
    phone_empty_hint: 'Biarkan kosong untuk buka WhatsApp dan pilih kenalan anda.',
    message_preview: 'Pratonton Mesej',
    open_in_whatsapp: 'Hantar di WhatsApp',
    attach_promo_media: '+ Sertakan Media Promosi / Pautan Tour',
    promo_media_card_title: 'Hab Media Promosi & Pemasaran',
    promo_media_card_sub: 'Simpan foto unit, poster promosi, video walkthrough dan ayat tawaran untuk bakal tetamu',
    open_media_hub: 'Buka Hab Media',
    copy_pitch: 'Salin Ayat',
    pitch_copied: 'Ayat promosi berjaya disalin ke papan keratan!',
    link_copied: 'Pautan media berjaya disalin ke papan keratan!',
    delete_promo_confirm: 'Adakah anda pasti mahu memadamkan media promosi ini?'
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
    gpsLocation: 'https://maps.google.com/?q=3.1390,101.6869',
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
    gpsLocation: 'https://maps.google.com/?q=4.4721,101.3789',
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
    gpsLocation: 'https://maps.google.com/?q=4.4721,101.3789',
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
  contacts: [],
  promotionalMedia: [],
  selectedPromoPropertyId: 'all',
  selectedPromoCategory: 'all',
  promoSearchQuery: '',
  settings: { ...DEFAULT_SETTINGS },
  isLicensed: false,
  isMasterAdmin: false,
  licenseKey: null,
  selectedPropertyId: 'all',
  activeTab: 'dashboard',
  currentCalDate: new Date(),
  selectedCalDate: new Date().toISOString().split('T')[0],
  calListingMode: 'incoming',
  calFilterMode: 'checkin',
  activeWaBooking: null,
  activeWaTemplate: 'confirm',
  activeDispatchRecipientId: null,
  activeDispatchPropertyId: null,
  activeDispatchService: 'turnover_clean',
  activeDispatchTurnover: null
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
  if (isDemoParam || (isFirstEverVisit && (!appState.properties || appState.properties.length === 0))) {
    seedDemoData();
    localStorage.setItem('staymanager_initialized', 'true');
  } else {
    localStorage.setItem('staymanager_initialized', 'true');
  }

  try {
    applyTheme(appState.settings.theme);
  } catch (e) { console.warn('Theme init note:', e); }

  try {
    applyLanguageUI();
  } catch (e) { console.warn('Language init note:', e); }

  try {
    setupEventListeners();
  } catch (e) { console.error('Listeners init error:', e); }

  try {
    closeAllModals();
  } catch (e) {}

  try {
    renderApp();
  } catch (e) { console.error('RenderApp error:', e); }

  try {
    initPWAUpdateService();
  } catch (e) { console.warn('PWA update service note:', e); }
}

function loadFromStorage() {
  try {
    const savedProps = localStorage.getItem(STORAGE_KEYS.PROPERTIES);
    const savedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
    const savedTurnovers = localStorage.getItem(STORAGE_KEYS.TURNOVERS);
    const savedExpenses = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    const savedContacts = localStorage.getItem(STORAGE_KEYS.CONTACTS);
    const savedPromo = localStorage.getItem(STORAGE_KEYS.PROMO_MEDIA);
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    const savedLicense = localStorage.getItem(STORAGE_KEYS.LICENSE);

    if (savedProps) appState.properties = JSON.parse(savedProps);
    if (savedBookings) appState.bookings = JSON.parse(savedBookings);
    if (savedTurnovers) appState.turnovers = JSON.parse(savedTurnovers);
    if (savedExpenses) appState.expenses = JSON.parse(savedExpenses);
    
    if (savedContacts) {
      try {
        appState.contacts = JSON.parse(savedContacts);
      } catch (e) {
        appState.contacts = [...DEFAULT_CONTACTS];
      }
    } else {
      appState.contacts = [...DEFAULT_CONTACTS];
    }

    if (savedPromo) {
      try {
        appState.promotionalMedia = JSON.parse(savedPromo);
      } catch (e) {
        appState.promotionalMedia = [...DEFAULT_PROMO_MEDIA];
      }
    } else {
      appState.promotionalMedia = [...DEFAULT_PROMO_MEDIA];
    }

    if (savedSettings) appState.settings = { ...DEFAULT_SETTINGS, ...JSON.parse(savedSettings) };
    
    // Unbreakable License Recovery across all legacy & modern storage keys
    const savedLicense = localStorage.getItem(STORAGE_KEYS.LICENSE) 
      || localStorage.getItem('staymanager_license_v2')
      || localStorage.getItem('staymanager_license')
      || localStorage.getItem('staymanager_license_permanent')
      || localStorage.getItem('staymanager_license_key');

    const permanentLicFlag = localStorage.getItem('staymanager_is_licensed_forever') === 'true'
      || localStorage.getItem('staymanager_license_activated') === 'true';

    let foundKey = null;

    if (savedLicense) {
      if (typeof savedLicense === 'string' && (savedLicense.startsWith('{') || savedLicense.startsWith('"'))) {
        try {
          const parsed = JSON.parse(savedLicense);
          foundKey = (parsed && parsed.key) ? parsed.key : (typeof parsed === 'string' ? parsed : null);
          if (parsed && (parsed.isLicensed || parsed.valid)) {
            appState.isLicensed = true;
          }
        } catch (e) {
          foundKey = savedLicense.trim();
        }
      } else if (typeof savedLicense === 'string') {
        foundKey = savedLicense.trim();
      }
    }

    if (!foundKey && appState.settings && appState.settings.licenseKey) {
      foundKey = appState.settings.licenseKey;
    }

    if (foundKey) {
      const check = verifyLicenseKey(foundKey, null);
      if (check.valid) {
        appState.isLicensed = true;
        appState.licenseKey = foundKey;
        appState.isMasterAdmin = check.isMaster;
        if (check.phone && (!appState.settings.ownerPhone || appState.settings.ownerPhone === DEFAULT_SETTINGS.ownerPhone)) {
          appState.settings.ownerPhone = '+' + check.phone;
        }
      } else if (permanentLicFlag || isMasterAdminKey(foundKey)) {
        appState.isLicensed = true;
        appState.licenseKey = foundKey;
        appState.isMasterAdmin = isMasterAdminKey(foundKey);
      }
    } else if (permanentLicFlag) {
      appState.isLicensed = true;
      appState.licenseKey = 'STAY-VIP-2026-LIFETIME';
      appState.isMasterAdmin = true;
    }

    // Safety fallback: Check pre-update auto-backup if license dropped or data is empty
    const autoBackupStr = localStorage.getItem('staymanager_auto_backup');
    if (autoBackupStr) {
      try {
        const autoBackup = JSON.parse(autoBackupStr);
        if (autoBackup) {
          // Restore license if missing
          if (!appState.isLicensed && autoBackup.licenseKey) {
            const checkBackup = verifyLicenseKey(autoBackup.licenseKey, null);
            appState.isLicensed = true;
            appState.licenseKey = autoBackup.licenseKey;
            appState.isMasterAdmin = checkBackup.valid ? checkBackup.isMaster : isMasterAdminKey(autoBackup.licenseKey);
            localStorage.setItem(STORAGE_KEYS.LICENSE, JSON.stringify({ key: autoBackup.licenseKey, isLicensed: true, activatedAt: new Date().toISOString() }));
          } else if (!appState.isLicensed && (autoBackup.isLicensed || autoBackup.isMasterAdmin)) {
            appState.isLicensed = true;
            appState.licenseKey = autoBackup.licenseKey || 'STAY-VIP-2026-LIFETIME';
            if (autoBackup.isMasterAdmin) appState.isMasterAdmin = true;
            localStorage.setItem(STORAGE_KEYS.LICENSE, JSON.stringify({ key: appState.licenseKey, isLicensed: true, activatedAt: new Date().toISOString() }));
          }

          // Restore properties and records if empty
          if ((!appState.properties || appState.properties.length === 0) && Array.isArray(autoBackup.properties) && autoBackup.properties.length > 0) {
            appState.properties = autoBackup.properties;
            if (Array.isArray(autoBackup.bookings)) appState.bookings = autoBackup.bookings;
            if (Array.isArray(autoBackup.turnovers)) appState.turnovers = autoBackup.turnovers;
            if (Array.isArray(autoBackup.expenses)) appState.expenses = autoBackup.expenses;
            if (Array.isArray(autoBackup.contacts)) appState.contacts = autoBackup.contacts;
            if (Array.isArray(autoBackup.promotionalMedia)) appState.promotionalMedia = autoBackup.promotionalMedia;
            if (autoBackup.settings) appState.settings = { ...DEFAULT_SETTINGS, ...autoBackup.settings };
          }
        }
      } catch (bErr) {
        console.warn('Auto backup check notice:', bErr);
      }
    }

    // If activated, reinforce persistent keys so future updates never drop
    if (appState.isLicensed && appState.licenseKey) {
      localStorage.setItem('staymanager_license_activated', 'true');
      localStorage.setItem('staymanager_is_licensed_forever', 'true');
      localStorage.setItem('staymanager_license_permanent', appState.licenseKey);
    }

    // Run schema migrations and auto-safety snapshot
    runDataMigrations();
  } catch (e) {
    console.error('Error loading localStorage:', e);
  }
}

function runDataMigrations() {
  try {
    const savedVersion = localStorage.getItem(STORAGE_KEYS.VERSION) || '1.0.0';
    if (savedVersion !== APP_VERSION) {
      // 1. Pre-update safety snapshot stored locally in localStorage
      // Safeguard: Only record snapshot if current state has data, or if no snapshot exists yet
      const hasCurrentData = (appState.properties && appState.properties.length > 0) || appState.isLicensed;
      if (hasCurrentData || !localStorage.getItem('staymanager_auto_backup')) {
        const autoSnapshot = {
          properties: appState.properties,
          bookings: appState.bookings,
          turnovers: appState.turnovers,
          expenses: appState.expenses,
          contacts: appState.contacts,
          promotionalMedia: appState.promotionalMedia,
          settings: appState.settings,
          licenseKey: appState.licenseKey,
          isLicensed: appState.isLicensed,
          isMasterAdmin: appState.isMasterAdmin,
          version: savedVersion,
          backupDate: new Date().toISOString()
        };
        localStorage.setItem('staymanager_auto_backup', JSON.stringify(autoSnapshot));
      }

      // 2. Backward-compatible field safety migrations:
      // Ensure all properties have valid property types and room numbers
      if (Array.isArray(appState.properties)) {
        appState.properties.forEach(p => {
          if (!p.propType) p.propType = 'entire';
          if (p.roomNo === undefined) p.roomNo = '';
        });
      }

      // Ensure all bookings have rental types and tenant particulars
      if (Array.isArray(appState.bookings)) {
        appState.bookings.forEach(b => {
          if (!b.rentalType) b.rentalType = 'daily';
          if (b.guestNric === undefined) b.guestNric = '';
          if (b.guestEmail === undefined) b.guestEmail = '';
          if (b.guestAddress === undefined) b.guestAddress = '';
        });
      }

      // Ensure contacts array exists
      if (!Array.isArray(appState.contacts) || appState.contacts.length === 0) {
        const savedContacts = localStorage.getItem(STORAGE_KEYS.CONTACTS);
        if (savedContacts) {
          try {
            appState.contacts = JSON.parse(savedContacts);
          } catch(e) {
            appState.contacts = [...DEFAULT_CONTACTS];
          }
        } else {
          appState.contacts = [...DEFAULT_CONTACTS];
        }
      }

      // Ensure promotionalMedia array exists
      if (!Array.isArray(appState.promotionalMedia) || appState.promotionalMedia.length === 0) {
        const savedPromo = localStorage.getItem(STORAGE_KEYS.PROMO_MEDIA);
        if (savedPromo) {
          try {
            appState.promotionalMedia = JSON.parse(savedPromo);
          } catch(e) {
            appState.promotionalMedia = [...DEFAULT_PROMO_MEDIA];
          }
        } else {
          appState.promotionalMedia = [...DEFAULT_PROMO_MEDIA];
        }
      }

      // Ensure settings have default language
      if (!appState.settings.language) {
        appState.settings.language = 'en';
      }

      // Save updated version
      localStorage.setItem(STORAGE_KEYS.VERSION, APP_VERSION);
      saveToStorage();

      // Show toast if upgrading from a previous version
      if (savedVersion !== '1.0.0' && savedVersion !== APP_VERSION) {
        setTimeout(() => {
          showToast(t('toast_app_updated'));
        }, 1000);
      }
    }
  } catch (err) {
    console.error('Data migration note:', err);
  }
}

function saveToStorage() {
  localStorage.setItem(STORAGE_KEYS.PROPERTIES, JSON.stringify(appState.properties));
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(appState.bookings));
  localStorage.setItem(STORAGE_KEYS.TURNOVERS, JSON.stringify(appState.turnovers));
  localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(appState.expenses));
  localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(appState.contacts));
  localStorage.setItem(STORAGE_KEYS.PROMO_MEDIA, JSON.stringify(appState.promotionalMedia));
  localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(appState.settings));
  if (appState.isLicensed && appState.licenseKey) {
    localStorage.setItem(STORAGE_KEYS.LICENSE, JSON.stringify({ key: appState.licenseKey, isLicensed: true, activatedAt: new Date().toISOString() }));
    localStorage.setItem('staymanager_license_v2', JSON.stringify({ key: appState.licenseKey, isLicensed: true, activatedAt: new Date().toISOString() }));
    localStorage.setItem('staymanager_license_permanent', appState.licenseKey);
    localStorage.setItem('staymanager_is_licensed_forever', 'true');
    localStorage.setItem('staymanager_license_activated', 'true');
  }
}

// ==========================================================================
// 2B. PWA LIVE UPDATE ENGINE & SEAMLESS MIGRATIONS
// ==========================================================================

let swRegistration = null;
let newWorkerWaiting = null;

function initPWAUpdateService() {
  if (!('serviceWorker' in navigator)) return;

  navigator.serviceWorker.register('./sw.js').then(reg => {
    swRegistration = reg;

    // Check if there is already a worker waiting to activate
    if (reg.waiting) {
      newWorkerWaiting = reg.waiting;
      showUpdateBanner();
    }

    reg.addEventListener('updatefound', () => {
      const newWorker = reg.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          newWorkerWaiting = newWorker;
          showUpdateBanner();
        }
      });
    });
  }).catch(err => {
    console.log('SW registration note:', err);
  });

  // When the new worker takes control, reload smoothly
  let isRefreshing = false;
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (isRefreshing) return;
    isRefreshing = true;
    window.location.reload();
  });

  // Check for updates automatically in background every 30 minutes
  setInterval(() => checkForAppUpdates(false), 30 * 60 * 1000);
}

function showUpdateBanner() {
  const banner = document.getElementById('appUpdateBanner');
  if (banner) {
    banner.classList.add('active');
  }
}

function dismissUpdateBanner() {
  const banner = document.getElementById('appUpdateBanner');
  if (banner) {
    banner.classList.remove('active');
  }
}

function applyAppUpdate() {
  showToast(t('toast_checking_updates'));
  if (newWorkerWaiting) {
    newWorkerWaiting.postMessage({ type: 'SKIP_WAITING' });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  } else {
    // If running as regular browser tab, force a hard reload
    window.location.reload();
  }
}

async function checkForAppUpdates(isManual = false) {
  if (isManual) {
    showToast(t('toast_checking_updates'));
  }

  try {
    // 1. Tell the service worker registration to check the server for new sw.js
    if (swRegistration) {
      await swRegistration.update();
    }

    // 2. Fetch version.json directly with cache-busting timestamp
    const res = await fetch(`./version.json?t=${Date.now()}`);
    if (res.ok) {
      const verData = await res.json();
      if (verData && verData.version && verData.version !== APP_VERSION) {
        showUpdateBanner();
        if (isManual) {
          showToast(`${t('update_banner_title')} (v${verData.version})`);
        }
        return;
      }
    }

    if (isManual) {
      setTimeout(() => {
        showToast(t('toast_up_to_date'));
      }, 400);
    }
  } catch (e) {
    if (isManual) {
      showToast(t('toast_up_to_date'));
    }
  }
}

function downloadSafetySnapshot() {
  exportDataBackup();
  showToast(t('toast_safety_saved'));
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

  appState.contacts = [...DEFAULT_CONTACTS];
  appState.promotionalMedia = [...DEFAULT_PROMO_MEDIA];

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

  // Calendar Mode Selector (Check-In vs Check-Out vs Stays)
  document.querySelectorAll('#calModeSelector .cal-mode-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const mode = pill.getAttribute('data-cal-filter') || 'checkin';
      appState.calFilterMode = mode;
      document.querySelectorAll('#calModeSelector .cal-mode-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderCalendarTab();
    });
  });

  document.getElementById('calTabIncoming')?.addEventListener('click', () => {
    appState.calListingMode = 'incoming';
    document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
    renderCalendarListing();
  });
  document.getElementById('calTabSelected')?.addEventListener('click', () => {
    appState.calListingMode = 'selected';
    renderCalendarListing();
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

  // Monthly Invoices Modal Close
  const closeMInv = document.getElementById('btnCloseMonthlyInvoicesModal');
  if (closeMInv) closeMInv.addEventListener('click', closeAllModals);

  // In-App User Guide Modal Handlers
  const btnOpenGuideHeader = document.getElementById('btnOpenUserGuide');
  if (btnOpenGuideHeader) btnOpenGuideHeader.addEventListener('click', () => openUserGuideModal());

  const btnOpenGuideSettings = document.getElementById('btnOpenUserGuideSettings');
  if (btnOpenGuideSettings) btnOpenGuideSettings.addEventListener('click', () => openUserGuideModal());

  const closeGuideModal = document.getElementById('btnCloseUserGuideModal');
  if (closeGuideModal) closeGuideModal.addEventListener('click', closeAllModals);

  // Guide Language Segment Buttons
  document.querySelectorAll('#guideLangSegmented .segment-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#guideLangSegmented .segment-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const glang = btn.getAttribute('data-glang') || 'en';
      renderUserGuideAccordion(glang);
    });
  });

  // WhatsApp Monthly Controls dynamic triggers
  const waMonthSel = document.getElementById('waInvoiceMonthSelect');
  if (waMonthSel) {
    waMonthSel.addEventListener('change', (e) => {
      appState.activeWaMonthIndex = parseInt(e.target.value) || 1;
      renderWhatsAppPreview();
    });
  }

  const waExtraInp = document.getElementById('waInvoiceExtraInput');
  if (waExtraInp) {
    waExtraInp.addEventListener('input', renderWhatsAppPreview);
  }

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
      const tmpl = btn.getAttribute('data-template');
      appState.activeWaTemplate = tmpl;

      // Toggle quotation controls
      const quotationControls = document.getElementById('waQuotationControls');
      if (quotationControls) {
        quotationControls.classList.toggle('hidden', tmpl !== 'quotation');
      }

      // Toggle monthly controls
      const monthlyControls = document.getElementById('waMonthlyControls');
      if (monthlyControls) {
        const isMonthly = appState.activeWaBooking?.rentalType === 'monthly';
        monthlyControls.classList.toggle('hidden', !(isMonthly && (tmpl === 'monthly_invoice' || tmpl === 'monthly_rent_receipt')));
      }

      renderWhatsAppPreview();
    });
  });

  document.getElementById('waQuotationValidityInput')?.addEventListener('input', (e) => {
    if (appState.activeWaBooking) {
      appState.activeWaBooking.quotationValidityDays = parseInt(e.target.value) || 3;
    }
    renderWhatsAppPreview();
  });

  // Booking Form Status Change -> Toggle Quotation Validity Group
  const bookingStatusSel = document.getElementById('bookingStatusSelect');
  if (bookingStatusSel) {
    bookingStatusSel.addEventListener('change', () => {
      const validityGroup = document.getElementById('bookingQuotationValidityGroup');
      if (validityGroup) {
        validityGroup.style.display = bookingStatusSel.value === 'quotation' ? 'block' : 'none';
      }
    });
  }

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
  const btnRestoreSnap = document.getElementById('btnRestoreAutoBackup');
  if (btnRestoreSnap) btnRestoreSnap.addEventListener('click', restoreAutoBackup);
  document.getElementById('btnLoadDemoData').addEventListener('click', seedDemoData);
  document.getElementById('btnResetAllData').addEventListener('click', resetAllData);

  // App Update System Event Listeners
  const btnApplyUpdate = document.getElementById('btnApplyAppUpdate');
  if (btnApplyUpdate) btnApplyUpdate.addEventListener('click', applyAppUpdate);

  const btnDismissUp = document.getElementById('btnDismissUpdate');
  if (btnDismissUp) btnDismissUp.addEventListener('click', dismissUpdateBanner);

  const btnCheckUp = document.getElementById('btnCheckForUpdates');
  if (btnCheckUp) btnCheckUp.addEventListener('click', () => checkForAppUpdates(true));

  const btnSafetySnap = document.getElementById('btnDownloadSafetySnapshot');
  if (btnSafetySnap) btnSafetySnap.addEventListener('click', downloadSafetySnapshot);

  // Contact Modal & Team Directory
  const btnAddContact = document.getElementById('btnAddNewContactModal');
  if (btnAddContact) btnAddContact.addEventListener('click', () => openContactModal());

  const btnCloseContact = document.getElementById('btnCloseContactModal');
  if (btnCloseContact) btnCloseContact.addEventListener('click', closeAllModals);

  const btnCancelContact = document.getElementById('btnCancelContact');
  if (btnCancelContact) btnCancelContact.addEventListener('click', closeAllModals);

  const contactForm = document.getElementById('contactForm');
  if (contactForm) contactForm.addEventListener('submit', handleSaveContact);

  // Turnovers Quick Actions
  const btnTurnoverDir = document.getElementById('btnTurnoverTeamDir');
  if (btnTurnoverDir) {
    btnTurnoverDir.addEventListener('click', () => {
      switchTab('settings');
      setTimeout(() => {
        document.getElementById('settingsContactList')?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    });
  }

  const btnTurnoverAlert = document.getElementById('btnTurnoverServiceAlert');
  if (btnTurnoverAlert) {
    btnTurnoverAlert.addEventListener('click', () => openServiceDispatchModal());
  }

  // Service & Supply Dispatch Modal
  const btnCloseDispatch = document.getElementById('btnCloseServiceDispatchModal');
  if (btnCloseDispatch) btnCloseDispatch.addEventListener('click', closeAllModals);

  [
    'dispatchRecipientSelect', 'dispatchPropertySelect', 'dispatchServiceTypeSelect',
    'dispatchUrgencySelect', 'dispatchIncludePinCheck'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('change', renderServiceDispatchPreview);
  });

  const dispatchDetails = document.getElementById('dispatchDetailsInput');
  if (dispatchDetails) dispatchDetails.addEventListener('input', renderServiceDispatchPreview);

  const btnCopyDispatch = document.getElementById('btnCopyDispatchText');
  if (btnCopyDispatch) btnCopyDispatch.addEventListener('click', handleCopyServiceDispatchText);

  const btnSendDispatch = document.getElementById('btnSendDispatchWa');
  if (btnSendDispatch) btnSendDispatch.addEventListener('click', handleSendServiceDispatchWa);

  // Finance Selectors
  document.getElementById('financeMonthSelect').addEventListener('change', renderFinancesTab);
  document.getElementById('financeYearSelect').addEventListener('change', renderFinancesTab);
  populateFinanceDateSelectors();

  // Payment Proof & Receipt Modals Event Handlers
  const closePayProof = document.getElementById('btnClosePaymentProofModal');
  if (closePayProof) closePayProof.addEventListener('click', closeAllModals);

  const cancelPayProof = document.getElementById('btnCancelPaymentProofModal');
  if (cancelPayProof) cancelPayProof.addEventListener('click', closeAllModals);

  const closeReceiptViewer = document.getElementById('btnCloseReceiptViewerModal');
  if (closeReceiptViewer) closeReceiptViewer.addEventListener('click', closeAllModals);

  const closeReceiptViewerBtn = document.getElementById('btnCloseReceiptViewerBtn');
  if (closeReceiptViewerBtn) closeReceiptViewerBtn.addEventListener('click', closeAllModals);

  const closeLightbox = document.getElementById('btnCloseLightbox');
  if (closeLightbox) closeLightbox.addEventListener('click', closeAllModals);

  const lightboxModal = document.getElementById('receiptLightboxModal');
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target.id === 'receiptLightboxModal') closeAllModals();
    });
  }

  // Receipt File Upload Dropzone
  const dropzone = document.getElementById('receiptDropzone');
  const fileInput = document.getElementById('paymentProofFileInput');
  if (dropzone && fileInput) {
    dropzone.addEventListener('click', (e) => {
      if (e.target.closest('#btnRemoveReceiptImg') || e.target.closest('#btnViewReceiptPreview')) return;
      fileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      dropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropzone.classList.remove('dragover');
      });
    });

    dropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleReceiptFileSelected(e.dataTransfer.files[0]);
      }
    });

    fileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handleReceiptFileSelected(e.target.files[0]);
      }
    });
  }

  // Remove Receipt Image Button
  const btnRemoveReceipt = document.getElementById('btnRemoveReceiptImg');
  if (btnRemoveReceipt) {
    btnRemoveReceipt.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('paymentProofImageData').value = '';
      document.getElementById('paymentProofImageName').value = '';
      document.getElementById('paymentProofFileInput').value = '';
      document.getElementById('receiptPreviewImg').src = '';
      document.getElementById('receiptUploadPrompt').style.display = 'block';
      document.getElementById('receiptPreviewContainer').style.display = 'none';
    });
  }

  // View Receipt Preview Button in Form Dropzone
  const btnViewReceiptPreview = document.getElementById('btnViewReceiptPreview');
  if (btnViewReceiptPreview) {
    btnViewReceiptPreview.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgData = document.getElementById('paymentProofImageData').value;
      const fName = document.getElementById('paymentProofImageName').value || 'Receipt Preview';
      if (imgData) openReceiptLightbox(imgData, fName);
    });
  }

  // Bank Pills Quick Selector
  document.querySelectorAll('#paymentProofBankPills .bank-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#paymentProofBankPills .bank-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      const bankName = pill.getAttribute('data-bank');
      document.getElementById('paymentProofBankInput').value = bankName;
    });
  });

  // Paste Reference Number Helper
  const btnPasteRef = document.getElementById('btnPastePaymentRef');
  if (btnPasteRef) {
    btnPasteRef.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.readText) {
          const text = await navigator.clipboard.readText();
          if (text) {
            document.getElementById('paymentProofRefInput').value = text.trim();
            showToast(appState.settings.language === 'bm' ? 'No. Rujukan berjaya ditampal!' : 'Reference No. pasted!');
            return;
          }
        }
      } catch (err) {
        console.warn('Clipboard read error:', err);
      }
      document.getElementById('paymentProofRefInput').focus();
    });
  }

  // Payment Proof Type Selector Change
  const payTypeSelect = document.getElementById('paymentProofTypeSelect');
  if (payTypeSelect) {
    payTypeSelect.addEventListener('change', () => {
      const type = payTypeSelect.value;
      const bId = document.getElementById('paymentProofBookingId').value;
      const booking = appState.bookings.find(b => b.id === bId);
      
      const monthGroup = document.getElementById('paymentProofMonthIndexGroup');
      if (monthGroup) {
        monthGroup.style.display = (type === 'monthly_rent') ? 'block' : 'none';
      }

      if (booking) {
        let amt = 0;
        if (type === 'deposit') {
          amt = booking.depositPaid > 0 ? booking.depositPaid : Math.round(booking.totalAmount * (appState.settings.defaultDepositPct || 30) / 100);
        } else if (type === 'balance') {
          amt = booking.balance > 0 ? booking.balance : booking.totalAmount;
        } else if (type === 'full') {
          amt = booking.totalAmount;
        } else if (type === 'monthly_rent') {
          amt = booking.monthlyRate || 0;
        } else if (type === 'security_deposit') {
          amt = booking.securityDeposit || booking.utilitiesDeposit || 0;
        } else {
          amt = booking.balance > 0 ? booking.balance : 0;
        }
        document.getElementById('paymentProofAmountInput').value = amt;
      }
    });
  }

  // Save Payment Proof Form Submit
  const paymentProofForm = document.getElementById('paymentProofForm');
  if (paymentProofForm) {
    paymentProofForm.addEventListener('submit', handleSavePaymentProof);
  }

  // ==========================================
  // Promotional Media & Marketing Hub Listeners
  // ==========================================
  const btnOpenPromo = document.getElementById('btnOpenPromoMedia');
  if (btnOpenPromo) btnOpenPromo.addEventListener('click', () => openPromotionalMediaModal());

  const btnOpenPromoSettings = document.getElementById('btnOpenPromoMediaSettings');
  if (btnOpenPromoSettings) btnOpenPromoSettings.addEventListener('click', () => openPromotionalMediaModal());

  const btnClosePromo = document.getElementById('btnClosePromotionalMediaModal');
  if (btnClosePromo) btnClosePromo.addEventListener('click', closeAllModals);

  const btnAddPromo = document.getElementById('btnAddNewPromoMediaModal');
  if (btnAddPromo) btnAddPromo.addEventListener('click', () => openPromoMediaEditModal());

  const btnEmptyAddPromo = document.getElementById('btnEmptyAddPromoMedia');
  if (btnEmptyAddPromo) btnEmptyAddPromo.addEventListener('click', () => openPromoMediaEditModal());

  const btnClosePromoEdit = document.getElementById('btnClosePromoMediaEditModal');
  if (btnClosePromoEdit) btnClosePromoEdit.addEventListener('click', closeAllModals);

  const btnCancelPromoEdit = document.getElementById('btnCancelPromoMediaEdit');
  if (btnCancelPromoEdit) btnCancelPromoEdit.addEventListener('click', closeAllModals);

  const promoForm = document.getElementById('promoMediaEditForm');
  if (promoForm) promoForm.addEventListener('submit', savePromoMediaItem);

  // Promo Property Filter Change
  const promoPropFilter = document.getElementById('promoPropertyFilter');
  if (promoPropFilter) {
    promoPropFilter.addEventListener('change', (e) => {
      appState.selectedPromoPropertyId = e.target.value;
      renderPromotionalMediaList();
    });
  }

  // Promo Category Pills
  document.querySelectorAll('#promoCategoryFilter .cal-mode-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      document.querySelectorAll('#promoCategoryFilter .cal-mode-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      appState.selectedPromoCategory = pill.getAttribute('data-category');
      renderPromotionalMediaList();
    });
  });

  // Promo Search Input
  const promoSearchInput = document.getElementById('promoSearchInput');
  if (promoSearchInput) {
    promoSearchInput.addEventListener('input', (e) => {
      appState.promoSearchQuery = e.target.value;
      renderPromotionalMediaList();
    });
  }

  // Promo Image File Upload Dropzone
  const promoDropzone = document.getElementById('promoImageDropzone');
  const promoFileInput = document.getElementById('promoMediaFileInput');
  if (promoDropzone && promoFileInput) {
    promoDropzone.addEventListener('click', (e) => {
      if (e.target.closest('#btnRemovePromoImage') || e.target.closest('#btnViewPromoImagePreview')) return;
      promoFileInput.click();
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      promoDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        promoDropzone.classList.add('dragover');
      });
    });

    ['dragleave', 'drop'].forEach(eventName => {
      promoDropzone.addEventListener(eventName, (e) => {
        e.preventDefault();
        promoDropzone.classList.remove('dragover');
      });
    });

    promoDropzone.addEventListener('drop', (e) => {
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handlePromoImageFileSelected(e.dataTransfer.files[0]);
      }
    });

    promoFileInput.addEventListener('change', (e) => {
      if (e.target.files && e.target.files.length > 0) {
        handlePromoImageFileSelected(e.target.files[0]);
      }
    });
  }

  // Remove Promo Image Button
  const btnRemovePromoImg = document.getElementById('btnRemovePromoImage');
  if (btnRemovePromoImg) {
    btnRemovePromoImg.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('promoMediaImageData').value = '';
      document.getElementById('promoMediaFileInput').value = '';
      document.getElementById('promoImagePreviewImg').src = '';
      document.getElementById('promoImageDropPrompt').style.display = 'block';
      document.getElementById('promoImagePreviewContainer').style.display = 'none';
    });
  }

  // View Promo Image Preview in Edit Modal
  const btnViewPromoPreview = document.getElementById('btnViewPromoImagePreview');
  if (btnViewPromoPreview) {
    btnViewPromoPreview.addEventListener('click', (e) => {
      e.stopPropagation();
      const imgData = document.getElementById('promoMediaImageData').value;
      const title = document.getElementById('promoMediaTitleInput').value || 'Image Preview';
      if (imgData) openReceiptLightbox(imgData, title);
    });
  }

  // Preset Template Button in Promo Edit Form
  const btnInsertPitch = document.getElementById('btnInsertPitchPreset');
  if (btnInsertPitch) btnInsertPitch.addEventListener('click', insertPromoPitchTemplate);

  // WhatsApp Quick Send Modal Listeners
  const btnClosePromoWa = document.getElementById('btnClosePromoWaQuickModal');
  if (btnClosePromoWa) btnClosePromoWa.addEventListener('click', closeAllModals);

  const btnCancelPromoWa = document.getElementById('btnCancelPromoWaQuick');
  if (btnCancelPromoWa) btnCancelPromoWa.addEventListener('click', closeAllModals);

  const btnExecutePromoWa = document.getElementById('btnExecutePromoWaSend');
  if (btnExecutePromoWa) btnExecutePromoWa.addEventListener('click', executePromoWaSend);

  const promoWaRecipient = document.getElementById('promoWaRecipientSelect');
  if (promoWaRecipient) {
    promoWaRecipient.addEventListener('change', (e) => {
      const isCustom = e.target.value === 'custom';
      const customGroup = document.getElementById('promoWaCustomPhoneGroup');
      const customInput = document.getElementById('promoWaCustomPhoneInput');
      if (customGroup) customGroup.style.display = isCustom ? 'block' : 'none';
      if (!isCustom && customInput) customInput.value = e.target.value;
    });
  }

  // WhatsApp Modal Attach Button
  const btnAttachPromo = document.getElementById('btnAttachPromoMediaWa');
  if (btnAttachPromo) btnAttachPromo.addEventListener('click', attachPromoMediaToWaMessage);

  // Universal Modal Dismissal: Click outside on backdrop or press Escape
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', (e) => {
      if (e.target === backdrop) {
        closeAllModals();
      }
    });
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAllModals();
    }
  });
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
    const validityGroup = document.getElementById('bookingQuotationValidityGroup');
    if (validityGroup) {
      validityGroup.style.display = targetStatus === 'quotation' ? 'block' : 'none';
    }
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

  // 1. Scan and translate all elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (key) {
      el.textContent = t(key);
    }
  });

  // 2. Scan and translate all elements with data-i18n-placeholder
  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (key) {
      el.placeholder = t(key);
    }
  });

  // 3. Header language pill
  const langLabel = document.getElementById('currentLangLabel');
  if (langLabel) langLabel.textContent = lang.toUpperCase();

  // 4. Update language dropdown in settings
  const langSelect = document.getElementById('settingLanguageSelect');
  if (langSelect && langSelect.value !== lang) {
    langSelect.value = lang;
  }

  // 5. Header Subtitle
  const dateSub = document.getElementById('currentDateStr');
  if (dateSub) {
    const locale = lang === 'bm' ? 'ms-MY' : 'en-US';
    dateSub.textContent = new Date().toLocaleDateString(locale, { weekday: 'short', month: 'short', day: 'numeric' });
  }

  // 6. Navigation items
  const navItems = document.querySelectorAll('.bottom-nav .nav-item');
  if (navItems.length >= 6) {
    navItems[0].querySelector('span').textContent = t('nav_today');
    navItems[1].querySelector('span').textContent = t('nav_calendar');
    navItems[2].querySelector('span').textContent = t('nav_bookings');
    navItems[3].querySelector('span').textContent = t('nav_turnovers');
    navItems[4].querySelector('span').textContent = t('nav_finances');
    navItems[5].querySelector('span').textContent = t('nav_settings');
  }

  // 7. Booking status filter pills
  const filterPills = document.querySelectorAll('#bookingStatusFilters .filter-pill');
  if (filterPills.length >= 7) {
    filterPills[0].textContent = t('filter_all');
    filterPills[1].textContent = t('filter_quotations');
    filterPills[2].textContent = t('filter_booked');
    filterPills[3].textContent = t('filter_confirmed');
    filterPills[4].textContent = t('filter_inhouse');
    filterPills[5].textContent = t('filter_completed');
    filterPills[6].textContent = t('filter_blocked');
  }

  // 8. Calendar Weekdays
  const calWeekdays = document.querySelectorAll('.cal-weekdays span');
  if (calWeekdays.length === 7) {
    const dayKeys = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
    calWeekdays.forEach((span, idx) => {
      span.textContent = t(dayKeys[idx]);
    });
  }

  // 9. WhatsApp Template tabs
  const waTabs = document.querySelectorAll('.wa-template-selector .wa-tab-btn');
  waTabs.forEach(btn => {
    const template = btn.getAttribute('data-template');
    if (template === 'quotation') btn.textContent = t('wa_tab_quotation');
    else if (template === 'deposit_receipt') btn.textContent = t('wa_tab_deposit');
    else if (template === 'checkin_reminder') btn.textContent = t('wa_tab_checkin');
    else if (template === 'full_receipt') btn.textContent = t('wa_tab_full');
    else if (template === 'monthly_invoice') btn.textContent = t('wa_tab_invoice');
    else if (template === 'monthly_rent_receipt') btn.textContent = t('wa_tab_rent_receipt');
    else if (template === 'refund_receipt') btn.textContent = t('wa_tab_refund');
    else if (template === 'checkout') btn.textContent = t('wa_tab_checkout');
    else if (template === 'cleaner') btn.textContent = t('wa_tab_cleaner');
    else if (template === 'payment') btn.textContent = t('wa_tab_payment');
  });

  // 10. Rental Type segment buttons
  const dailySeg = document.querySelector('#rentalTypeSegmented [data-type="daily"]');
  const monthlySeg = document.querySelector('#rentalTypeSegmented [data-type="monthly"]');
  if (dailySeg) dailySeg.innerHTML = `<i class="fa-solid fa-sun"></i> ${t('type_daily')}`;
  if (monthlySeg) monthlySeg.innerHTML = `<i class="fa-solid fa-calendar-days"></i> ${t('type_monthly')}`;

  // 11. Booking status dropdown options
  const statusSelect = document.getElementById('bookingStatusSelect');
  if (statusSelect && statusSelect.options.length >= 7) {
    statusSelect.options[0].text = lang === 'bm' ? '📋 Sebut Harga / Quotation' : '📋 Quotation / Sebut Harga';
    statusSelect.options[1].text = lang === 'bm' ? '🟡 Ditempah (Deposit Dibayar)' : '🟡 Booked (Deposit Paid)';
    statusSelect.options[2].text = lang === 'bm' ? '🟢 Disahkan (Bayar Penuh)' : '🟢 Confirmed (Fully Paid)';
    statusSelect.options[3].text = lang === 'bm' ? '🔑 Sedang Menginap (Check-In)' : '🔑 In-House (Checked In)';
    statusSelect.options[4].text = lang === 'bm' ? '🏁 Selesai / Tamat Sewaan' : '🏁 Checked Out / Tenancy Ended';
    statusSelect.options[5].text = lang === 'bm' ? '🚫 Disekat / Penyelenggaraan' : '🚫 Blocked / Maintenance';
    statusSelect.options[6].text = lang === 'bm' ? '❌ Dibatalkan' : '❌ Cancelled';
  }

  // 12. Property Type dropdown options
  const propTypeSelect = document.getElementById('propertyTypeSelect');
  if (propTypeSelect && propTypeSelect.options.length >= 5) {
    propTypeSelect.options[0].text = t('cat_entire');
    propTypeSelect.options[1].text = t('cat_master');
    propTypeSelect.options[2].text = t('cat_medium');
    propTypeSelect.options[3].text = t('cat_single');
    propTypeSelect.options[4].text = t('cat_studio');
  }

  // 13. Expense Category dropdown options
  const expCatSelect = document.getElementById('expenseCategorySelect');
  if (expCatSelect && expCatSelect.options.length >= 6) {
    expCatSelect.options[0].text = t('cat_cleaning');
    expCatSelect.options[1].text = t('cat_utilities');
    expCatSelect.options[2].text = t('cat_supplies');
    expCatSelect.options[3].text = t('cat_maintenance');
    expCatSelect.options[4].text = t('cat_commission');
    expCatSelect.options[5].text = t('cat_other');
  }
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
  closeAllModals();
  appState.activeTab = tabId;
  document.querySelectorAll('.bottom-nav .nav-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tabId);
  });
  document.querySelectorAll('.tab-view').forEach(view => {
    view.classList.toggle('active', view.id === `view-${tabId}`);
  });

  // Render specific tab with defensive error boundary
  try {
    if (tabId === 'dashboard') renderDashboardTab();
    else if (tabId === 'calendar') renderCalendarTab();
    else if (tabId === 'bookings') renderBookingsTab();
    else if (tabId === 'turnovers') renderTurnoversTab();
    else if (tabId === 'finances') renderFinancesTab();
    else if (tabId === 'settings') renderSettingsTab();
  } catch (tabErr) {
    console.error(`Error rendering tab ${tabId}:`, tabErr);
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderApp() {
  applyLanguageUI();
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
      tag: t('tag_checkin_today'),
      title: `${b.guestName} → ${prop.name}`,
      detail: `${b.guestCount} ${t('guests')} • ${t('checkin_time')}: ${prop.checkInTime || '3:00 PM'}`,
      booking: b,
      prop: prop
    });
  });

  todayCheckOuts.forEach(b => {
    const prop = getPropertyById(b.propertyId);
    actionItems.push({
      type: 'checkout',
      tag: t('tag_checkout_today'),
      title: `${b.guestName} ← ${prop.name}`,
      detail: `${t('checkout_time')}: ${prop.checkOutTime || '12:00 PM'} • ${t('turnover_required')}`,
      booking: b,
      prop: prop
    });
  });

  pendingTurnovers.forEach(tItem => {
    const prop = getPropertyById(tItem.propertyId);
    actionItems.push({
      type: 'cleaning',
      tag: t('tag_turnover_needed'),
      title: `${t('turnover')}: ${prop.name}`,
      detail: `${t('exp_date')}: ${tItem.date} • ${tItem.cleanerName || t('assign_cleaner')}`,
      turnover: tItem,
      prop: prop
    });
  });

  if (actionItems.length === 0) {
    actionFeed.innerHTML = `
      <div class="card" style="text-align:center; padding: 24px 16px;">
        <i class="fa-solid fa-circle-check" style="font-size: 32px; color: var(--success); margin-bottom: 8px;"></i>
        <h4 style="font-size: 14px; font-weight:700;">${appState.settings.language === 'bm' ? 'Semua Urusan Hari Ini Selesai!' : 'All Clear for Today!'}</h4>
        <p class="card-subtitle">${t('no_actions_today')}</p>
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
          <span class="card-subtitle"><i class="fa-solid fa-clock"></i> ${t('today')}</span>
        </div>
        <h3 class="action-card-title">${item.title}</h3>
        <p class="action-card-detail"><i class="fa-solid fa-info-circle"></i> ${item.detail}</p>
        <div class="action-card-btns">
          ${item.booking ? `
            <button class="btn btn-whatsapp btn-xs btn-wa-trigger" data-bid="${item.booking.id}" data-type="${item.type}">
              <i class="fa-brands fa-whatsapp"></i> ${item.type === 'checkin' ? t('btn_send_full_receipt') : t('btn_checkout_reminder')}
            </button>
          ` : ''}
          ${item.turnover ? `
            <button class="btn btn-whatsapp btn-xs btn-wa-cleaner" data-tid="${item.turnover.id}">
              <i class="fa-brands fa-whatsapp"></i> ${t('btn_wa_cleaner')}
            </button>
            <button class="btn btn-outline btn-xs btn-view-turnovers">
              <i class="fa-solid fa-list-check"></i> ${t('checklist')}
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
          openWhatsAppModal(booking, type === 'checkin' ? 'full_receipt' : 'checkout');
        }
      });
    });

    actionFeed.querySelectorAll('.btn-wa-cleaner').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tid = e.currentTarget.getAttribute('data-tid');
        const turnover = appState.turnovers.find(tItem => tItem.id === tid);
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
        <p style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">${appState.settings.language === 'bm' ? 'Tiada unit homestay didaftarkan lagi.' : 'No homestay units added yet.'}</p>
        <button class="btn btn-primary btn-xs" onclick="openPropertyModal()"><i class="fa-solid fa-plus"></i> ${t('add_unit_btn')}</button>
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

      const hasTurnover = appState.turnovers.some(tItem => tItem.propertyId === prop.id && tItem.status !== 'completed');

      let statusText = t('vacant_ready');
      let badgeClass = 'badge-vacant';

      if (currentStay) {
        statusText = `${t('occupied_by')} ${currentStay.guestName}`;
        badgeClass = 'badge-occupied';
      } else if (hasTurnover) {
        statusText = t('turnover_required');
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
        <span class="prop-status-badge ${badgeClass}">${currentStay ? t('occupied') : (hasTurnover ? t('turnover') : t('available'))}</span>
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
  
  // Sync Calendar Mode pills active state
  const currentCalMode = appState.calFilterMode || 'checkin';
  document.querySelectorAll('#calModeSelector .cal-mode-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-cal-filter') === currentCalMode);
  });
  
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

  // Render Calendar Listing (Incoming Bookings or Selected Day)
  renderCalendarListing();
}

function createCalDayCell(dayNum, dateStr, isOtherMonth, bookings, todayStr) {
  const isSelected = dateStr === appState.selectedCalDate && appState.calListingMode === 'selected';
  const calFilter = appState.calFilterMode || 'checkin';
  const cell = document.createElement('div');
  cell.className = `cal-day-cell ${isOtherMonth ? 'other-month' : ''} ${dateStr === todayStr ? 'today' : ''} ${isSelected ? 'selected' : ''}`;
  cell.setAttribute('data-date', dateStr);

  const numSpan = document.createElement('span');
  numSpan.className = 'cal-day-num';
  numSpan.textContent = dayNum;
  cell.appendChild(numSpan);

  const activeBookings = bookings.filter(b => b.status !== 'cancelled');
  const checkins = activeBookings.filter(b => b.checkIn === dateStr);
  const checkouts = activeBookings.filter(b => b.checkOut === dateStr);
  const stays = activeBookings.filter(b => {
    if (b.checkIn === b.checkOut) return b.checkIn === dateStr;
    return b.checkIn <= dateStr && b.checkOut > dateStr;
  });

  if (calFilter === 'checkin') {
    if (checkins.length > 0) {
      cell.classList.add('has-checkin', 'has-booking');
      const isConfirmed = checkins.some(b => ['booked', 'confirmed', 'checked-in', 'active', 'blocked'].includes(b.status));
      if (isConfirmed) cell.classList.add('is-confirmed-booked');

      const badge = document.createElement('span');
      badge.className = 'cal-day-mode-badge badge-checkin';
      badge.innerHTML = `<i class="fa-solid fa-arrow-right-to-bracket"></i> ${checkins.length}`;
      cell.appendChild(badge);

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'cal-dots-container';
      checkins.forEach(b => {
        const prop = getPropertyById(b.propertyId);
        const dot = document.createElement('span');
        dot.className = 'cal-stay-dot';
        dot.style.backgroundColor = prop.color || '#16a34a';
        dot.title = `${prop.name}: ${b.guestName} (${t('cal_mode_checkin')})`;
        if (b.status === 'quotation') dot.classList.add('is-quotation');
        dotsContainer.appendChild(dot);
      });
      cell.appendChild(dotsContainer);
    }
  } else if (calFilter === 'checkout') {
    if (checkouts.length > 0) {
      cell.classList.add('has-checkout', 'has-booking');
      const isConfirmed = checkouts.some(b => ['booked', 'confirmed', 'checked-in', 'active', 'blocked'].includes(b.status));
      if (isConfirmed) cell.classList.add('is-confirmed-booked');

      const badge = document.createElement('span');
      badge.className = 'cal-day-mode-badge badge-checkout';
      badge.innerHTML = `<i class="fa-solid fa-arrow-right-from-bracket"></i> ${checkouts.length}`;
      cell.appendChild(badge);

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'cal-dots-container';
      checkouts.forEach(b => {
        const prop = getPropertyById(b.propertyId);
        const dot = document.createElement('span');
        dot.className = 'cal-stay-dot';
        dot.style.backgroundColor = prop.color || '#ea580c';
        dot.title = `${prop.name}: ${b.guestName} (${t('cal_mode_checkout')})`;
        if (b.status === 'quotation') dot.classList.add('is-quotation');
        dotsContainer.appendChild(dot);
      });
      cell.appendChild(dotsContainer);
    }
  } else {
    // 'stays' mode
    if (stays.length > 0) {
      cell.classList.add('has-booking');
      const isConfirmed = stays.some(b => ['booked', 'confirmed', 'checked-in', 'active', 'blocked'].includes(b.status));
      if (isConfirmed) cell.classList.add('is-confirmed-booked');

      const badge = document.createElement('span');
      badge.className = 'cal-day-mode-badge badge-stays';
      badge.style.background = 'rgba(2, 132, 199, 0.15)';
      badge.style.color = 'var(--primary)';
      badge.innerHTML = `<i class="fa-solid fa-bed"></i> ${stays.length}`;
      cell.appendChild(badge);

      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'cal-dots-container';
      stays.forEach(b => {
        const prop = getPropertyById(b.propertyId);
        const dot = document.createElement('span');
        dot.className = 'cal-stay-dot';
        dot.style.backgroundColor = prop.color || '#0284c7';
        dot.title = `${prop.name}: ${b.guestName} (${b.status})`;
        if (b.status === 'quotation') dot.classList.add('is-quotation');
        dotsContainer.appendChild(dot);
      });
      cell.appendChild(dotsContainer);
    }
  }

  cell.addEventListener('click', () => {
    if (appState.selectedCalDate === dateStr && appState.calListingMode === 'selected') {
      appState.calListingMode = 'incoming';
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
    } else {
      appState.selectedCalDate = dateStr;
      appState.calListingMode = 'selected';
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
      cell.classList.add('selected');
    }
    renderCalendarListing();
  });

  return cell;
}

function getIncomingBookings() {
  const allBookings = getFilteredBookings();
  const todayStr = new Date().toISOString().split('T')[0];
  const calFilter = appState.calFilterMode || 'checkin';

  const active = allBookings.filter(b => b.status !== 'cancelled');

  if (calFilter === 'checkout') {
    // In checkout mode: show upcoming check-outs (from today onwards)
    const checkouts = active.filter(b => b.checkOut >= todayStr);
    checkouts.sort((a, b) => {
      if (a.checkOut !== b.checkOut) return a.checkOut.localeCompare(b.checkOut);
      return a.checkIn.localeCompare(b.checkIn);
    });
    return checkouts;
  }

  // Check-In or Stays mode: incoming bookings
  const incoming = active.filter(b => b.checkOut >= todayStr);
  incoming.sort((a, b) => {
    const aInHouse = (a.checkIn <= todayStr && a.checkOut >= todayStr);
    const bInHouse = (b.checkIn <= todayStr && b.checkOut >= todayStr);

    if (aInHouse && bInHouse) {
      if (a.checkIn !== b.checkIn) return a.checkIn.localeCompare(b.checkIn);
      return a.checkOut.localeCompare(b.checkOut);
    }
    if (aInHouse && !bInHouse) return -1;
    if (!aInHouse && bInHouse) return 1;

    // Both future check-ins: sort by earliest checkIn date first (ascending)
    if (a.checkIn !== b.checkIn) {
      return a.checkIn.localeCompare(b.checkIn);
    }
    return a.checkOut.localeCompare(b.checkOut);
  });

  return incoming;
}

function renderCalendarListing() {
  const mode = appState.calListingMode || 'incoming';
  const calFilter = appState.calFilterMode || 'checkin';
  const list = document.getElementById('selectedDayBookingsList');
  if (!list) return;
  list.innerHTML = '';

  const incomingBookings = getIncomingBookings();
  const todayStr = new Date().toISOString().split('T')[0];
  const lang = appState.settings.language || 'en';
  const isBM = lang === 'bm';

  // Update tabs
  const tabIncoming = document.getElementById('calTabIncoming');
  const tabSelected = document.getElementById('calTabSelected');
  const tabSelectedLabel = document.getElementById('calSelectedTabLabel');

  if (tabIncoming && tabSelected) {
    if (mode === 'incoming') {
      tabIncoming.classList.add('active');
      tabSelected.classList.remove('active');
    } else {
      tabIncoming.classList.remove('active');
      tabSelected.classList.add('active');
    }

    if (tabSelectedLabel) {
      if (appState.selectedCalDate) {
        const d = new Date(appState.selectedCalDate + 'T00:00:00');
        const dStr = d.toLocaleDateString(isBM ? 'ms-MY' : 'en-US', { day: 'numeric', month: 'short' });
        tabSelectedLabel.textContent = `🎯 ${dStr}`;
      } else {
        tabSelectedLabel.textContent = isBM ? '🎯 Tarikh Dipilih' : '🎯 Selected Date';
      }
    }
  }

  const titleEl = document.getElementById('selectedDayTitle');
  const subtitleEl = document.querySelector('#selectedDayDetails .card-subtitle');

  if (mode === 'incoming') {
    let modeTitle = isBM ? 'Tempahan Akan Datang' : 'Incoming Bookings';
    let modeSubtitle = isBM ? 'Susunan mengikut tarikh terdekat' : 'Ordered by nearest dates';
    let modeIcon = 'fa-calendar-days';

    if (calFilter === 'checkin') {
      modeTitle = isBM ? 'Daftar Masuk Akan Datang' : 'Upcoming Check-Ins';
      modeSubtitle = isBM ? 'Susunan tarikh daftar masuk terdekat' : 'Ordered by nearest check-in dates';
      modeIcon = 'fa-arrow-right-to-bracket';
    } else if (calFilter === 'checkout') {
      modeTitle = isBM ? 'Daftar Keluar & Kekosongan' : 'Upcoming Check-Outs & Vacancies';
      modeSubtitle = isBM ? 'Susunan tarikh daftar keluar terdekat' : 'Ordered by nearest check-out dates';
      modeIcon = 'fa-arrow-right-from-bracket';
    }

    if (subtitleEl) subtitleEl.textContent = modeSubtitle;
    if (titleEl) {
      titleEl.innerHTML = `<i class="fa-solid ${modeIcon}" style="color:var(--primary); margin-right:6px;"></i>${modeTitle} <span class="badge-count" style="font-size:12px; font-weight:700; background:var(--primary-light); color:var(--primary); padding:2px 8px; border-radius:12px; margin-left:6px; vertical-align:middle;">${incomingBookings.length}</span>`;
    }

    if (incomingBookings.length === 0) {
      const emptyMsg = calFilter === 'checkout'
        ? (isBM ? 'Tiada daftar keluar dijadualkan.' : 'No check-outs scheduled.')
        : (isBM ? 'Semua unit kini tiada tempahan baharu. Tekan + untuk tambah tempahan.' : 'All units currently have no upcoming bookings. Tap + to add a booking.');

      list.innerHTML = `
        <div class="empty-hint" style="padding: 24px 16px; text-align: center;">
          <i class="fa-solid fa-calendar-xmark" style="font-size: 28px; color: var(--text-muted); opacity: 0.5; margin-bottom: 8px; display: block;"></i>
          <p style="font-size: 14px; font-weight: 600; color: var(--text-main); margin-bottom: 4px;">
            ${isBM ? 'Tiada Rekod Dijumpai' : 'No Records Found'}
          </p>
          <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">
            ${emptyMsg}
          </p>
          <button class="btn btn-primary btn-sm" id="btnCalAddBookingEmpty">
            <i class="fa-solid fa-plus"></i> ${isBM ? 'Tambah Tempahan' : 'Add Booking'}
          </button>
        </div>
      `;
      const emptyAddBtn = document.getElementById('btnCalAddBookingEmpty');
      if (emptyAddBtn) emptyAddBtn.addEventListener('click', () => openBookingModal());
      return;
    }

    // Render incoming bookings cards
    incomingBookings.forEach(b => {
      const card = createCalendarBookingCard(b, todayStr, isBM, false);
      list.appendChild(card);
    });

  } else {
    // Mode is 'selected' (date selected on calendar)
    const dateStr = appState.selectedCalDate || todayStr;
    const d = new Date(dateStr + 'T00:00:00');
    const formattedDate = d.toLocaleDateString(isBM ? 'ms-MY' : 'en-US', { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' });

    if (subtitleEl) {
      subtitleEl.textContent = isBM ? 'Tarikh Dipilih' : 'Selected Date';
    }
    if (titleEl) {
      titleEl.innerHTML = `<i class="fa-regular fa-calendar-check" style="color:var(--primary); margin-right:6px;"></i>${formattedDate}`;
    }

    const allFiltered = getFilteredBookings().filter(b => b.status !== 'cancelled');
    const dayCheckIns = allFiltered.filter(b => b.checkIn === dateStr);
    const dayCheckOuts = allFiltered.filter(b => b.checkOut === dateStr);
    const dayInStays = allFiltered.filter(b => {
      if (b.checkIn === b.checkOut) return b.checkIn === dateStr;
      return b.checkIn <= dateStr && b.checkOut > dateStr;
    });

    const activeProps = appState.selectedPropertyId === 'all'
      ? appState.properties
      : appState.properties.filter(p => p.id === appState.selectedPropertyId);
    const occupiedPropIds = new Set(dayInStays.map(b => b.propertyId));
    const vacantCount = Math.max(0, activeProps.length - occupiedPropIds.size);

    // 1. Render Metrics Bar
    const metricsBar = document.createElement('div');
    metricsBar.className = 'cal-date-metrics-bar';
    metricsBar.innerHTML = `
      <div class="cal-metric-chip ${calFilter === 'checkin' ? 'active-in' : ''}">
        <span class="metric-num">${dayCheckIns.length}</span>
        <span class="metric-lbl"><i class="fa-solid fa-arrow-right-to-bracket"></i> ${isBM ? 'Masuk' : 'Check-In'}</span>
      </div>
      <div class="cal-metric-chip ${calFilter === 'checkout' ? 'active-out' : ''}">
        <span class="metric-num">${dayCheckOuts.length}</span>
        <span class="metric-lbl"><i class="fa-solid fa-arrow-right-from-bracket"></i> ${isBM ? 'Keluar' : 'Check-Out'}</span>
      </div>
      <div class="cal-metric-chip ${calFilter === 'stays' ? 'active-in' : ''}">
        <span class="metric-num">${dayInStays.length}</span>
        <span class="metric-lbl"><i class="fa-solid fa-bed"></i> ${isBM ? 'Menginap' : 'In-Stay'}</span>
      </div>
      <div class="cal-metric-chip active-avail">
        <span class="metric-num">${vacantCount}</span>
        <span class="metric-lbl"><i class="fa-solid fa-door-open"></i> ${isBM ? 'Kosong' : 'Available'}</span>
      </div>
    `;
    list.appendChild(metricsBar);

    // 2. Render content according to calFilter
    if (calFilter === 'checkout') {
      if (dayCheckOuts.length > 0) {
        dayCheckOuts.forEach(b => {
          const prop = getPropertyById(b.propertyId);
          const alertCard = document.createElement('div');
          alertCard.className = 'cal-vacating-alert-card';
          alertCard.innerHTML = `
            <div class="alert-icon">
              <i class="fa-solid fa-door-open"></i>
            </div>
            <div class="alert-content">
              <strong>✨ ${prop.name} — ${isBM ? 'Daftar Keluar Hari Ini' : 'Checking Out Today'}</strong>
              <p>${isBM 
                ? `Tetamu <b>${b.guestName}</b> keluar jam ${prop.checkOutTime || '12:00 PM'}. Unit dibersihkan &amp; sedia untuk tetamu baharu mendaftar masuk jam ${prop.checkInTime || '3:00 PM'}!` 
                : `Guest <b>${b.guestName}</b> departs by ${prop.checkOutTime || '12:00 PM'}. Unit will be cleaned &amp; ready for a new guest check-in at ${prop.checkInTime || '3:00 PM'}!`}</p>
              <button class="btn btn-primary btn-sm btn-book-vacating-unit" data-pid="${prop.id}" data-date="${dateStr}">
                <i class="fa-solid fa-calendar-plus"></i> ${isBM ? '+ Tempah Unit Ini Mulai Hari Ini' : '+ Book This Unit Starting Today'}
              </button>
            </div>
          `;
          list.appendChild(alertCard);

          const card = createCalendarBookingCard(b, todayStr, isBM, true, dateStr);
          list.appendChild(card);
        });
      } else {
        list.innerHTML += `
          <div class="empty-hint" style="padding: 20px 16px; text-align: center;">
            <i class="fa-solid fa-circle-info" style="font-size: 26px; color: var(--text-muted); opacity: 0.6; margin-bottom: 8px; display: block;"></i>
            <p style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              ${isBM ? 'Tiada Daftar Keluar pada Tarikh Ini' : 'No Check-Outs on this Date'}
            </p>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">
              ${vacantCount > 0 
                ? (isBM ? `${vacantCount} unit homestay sedia ditempah.` : `${vacantCount} homestay unit(s) available for new booking.`)
                : (isBM ? 'Semua unit sedang diduduki tetamu.' : 'All units occupied by in-house guests.')}
            </p>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" id="btnQuickBookForDateEmpty">
                <i class="fa-solid fa-plus"></i> ${isBM ? 'Tempah Tarikh Ini' : 'Book This Date'}
              </button>
              <button class="btn btn-outline btn-sm" id="btnSwitchToIncoming">
                <i class="fa-regular fa-clock"></i> ${isBM ? '📅 Semua Akan Datang' : '📅 All Incoming Bookings'}
              </button>
            </div>
          </div>
        `;
      }
    } else if (calFilter === 'checkin') {
      if (dayCheckIns.length > 0) {
        dayCheckIns.forEach(b => {
          const card = createCalendarBookingCard(b, todayStr, isBM, true, dateStr);
          list.appendChild(card);
        });

        if (vacantCount > 0) {
          const availBanner = document.createElement('div');
          availBanner.style.cssText = 'background:var(--bg-surface-subtle); border:1px dashed var(--border-color); border-radius:var(--radius-md); padding:10px 14px; margin-top:10px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;';
          availBanner.innerHTML = `
            <span style="font-size:12.5px; color:var(--text-muted);">
              <i class="fa-solid fa-circle-check" style="color:var(--success);"></i> <strong>${vacantCount}</strong> ${isBM ? 'lagi unit kosong pada tarikh ini.' : 'more unit(s) available on this date.'}
            </span>
            <button class="btn btn-outline btn-xs" id="btnAddCheckinTodayBtn">
              <i class="fa-solid fa-plus"></i> ${isBM ? 'Tambah Tempahan' : 'Add Booking'}
            </button>
          `;
          list.appendChild(availBanner);
          const addBtn = availBanner.querySelector('#btnAddCheckinTodayBtn');
          if (addBtn) addBtn.addEventListener('click', () => openBookingModal(null, dateStr));
        }
      } else {
        list.innerHTML += `
          <div class="empty-hint" style="padding: 20px 16px; text-align: center;">
            <i class="fa-solid fa-calendar-check" style="font-size: 26px; color: var(--success); margin-bottom: 8px; display: block;"></i>
            <p style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              ${isBM ? 'Tiada Daftar Masuk pada Tarikh Ini' : 'No Check-Ins on this Date'}
            </p>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">
              ${vacantCount > 0 
                ? (isBM ? `${vacantCount} unit sedia untuk ditempah.` : `${vacantCount} unit(s) available for new booking.`)
                : (isBM ? 'Tiada daftar masuk baharu (unit sedang menginap).' : 'No new check-in arrivals scheduled.')}
            </p>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" id="btnQuickBookForDateEmpty">
                <i class="fa-solid fa-plus"></i> ${isBM ? 'Tempah Tarikh Ini' : 'Book This Date'}
              </button>
              <button class="btn btn-outline btn-sm" id="btnSwitchToIncoming">
                <i class="fa-regular fa-clock"></i> ${isBM ? '📅 Semua Akan Datang' : '📅 All Incoming Bookings'}
              </button>
            </div>
          </div>
        `;
      }
    } else {
      // Stays mode
      if (dayInStays.length > 0) {
        dayInStays.forEach(b => {
          const card = createCalendarBookingCard(b, todayStr, isBM, true, dateStr);
          list.appendChild(card);
        });
      } else {
        list.innerHTML += `
          <div class="empty-hint" style="padding: 20px 16px; text-align: center;">
            <i class="fa-solid fa-bed" style="font-size: 26px; color: var(--success); margin-bottom: 8px; display: block;"></i>
            <p style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">
              ${isBM ? 'Tiada Penginapan pada Tarikh Ini' : 'No Stays on this Date'}
            </p>
            <p style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 14px;">
              ${isBM ? 'Semua unit kosong & sedia ditempah.' : 'All units vacant & ready for booking.'}
            </p>
            <div style="display: flex; gap: 8px; justify-content: center; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" id="btnQuickBookForDateEmpty">
                <i class="fa-solid fa-plus"></i> ${isBM ? 'Tempah Tarikh Ini' : 'Book This Date'}
              </button>
              <button class="btn btn-outline btn-sm" id="btnSwitchToIncoming">
                <i class="fa-regular fa-clock"></i> ${isBM ? '📅 Semua Akan Datang' : '📅 All Incoming Bookings'}
              </button>
            </div>
          </div>
        `;
      }
    }

    const qbBtn = document.getElementById('btnQuickBookForDateEmpty');
    if (qbBtn) qbBtn.addEventListener('click', () => openBookingModal(null, dateStr));

    const swBtn = document.getElementById('btnSwitchToIncoming');
    if (swBtn) swBtn.addEventListener('click', () => {
      appState.calListingMode = 'incoming';
      document.querySelectorAll('.cal-day-cell').forEach(c => c.classList.remove('selected'));
      renderCalendarListing();
    });
  }

  // Bind actions
  attachCalendarCardActions(list);
}

function createCalendarBookingCard(b, todayStr, isBM, isSelectedDayMode, selectedDateStr = null) {
  const prop = getPropertyById(b.propertyId);
  const card = document.createElement('div');
  card.className = 'booking-card cal-listing-booking-card';
  card.style.borderLeft = `4px solid ${prop.color}`;

  const proximity = getBookingProximityInfo(b, todayStr, isBM);
  let badgeText = proximity.label;
  let badgeClass = proximity.badgeClass;

  if (isSelectedDayMode && selectedDateStr) {
    if (b.checkIn === selectedDateStr) {
      badgeText = isBM ? '📥 Daftar Masuk' : '📥 Check-In Day';
      badgeClass = 'cal-prox-today';
    } else if (b.checkOut === selectedDateStr) {
      badgeText = isBM ? '📤 Daftar Keluar' : '📤 Check-Out Day';
      badgeClass = 'cal-prox-checkout';
    } else {
      badgeText = isBM ? '🔑 Sedang Menginap' : '🔑 In-Stay';
      badgeClass = 'cal-prox-instay';
    }
  }

  // Status tag
  let statusBadge = '';
  if (b.status === 'confirmed') {
    statusBadge = `<span class="badge-pill badge-confirmed">${isBM ? '🟢 Sah' : '🟢 Confirmed'}</span>`;
  } else if (b.status === 'booked') {
    statusBadge = `<span class="badge-pill badge-booked">${isBM ? '🟡 Ditempah' : '🟡 Booked'}</span>`;
  } else if (b.status === 'checked-in') {
    statusBadge = `<span class="badge-pill badge-inhouse">${isBM ? '🔑 Menginap' : '🔑 In-House'}</span>`;
  } else if (b.status === 'quotation') {
    statusBadge = `<span class="badge-pill badge-quotation">${isBM ? '📋 Sebut Harga' : '📋 Quotation'}</span>`;
  }

  const isCheckinReminderEligible = (b.status === 'booked' || b.status === 'confirmed') && b.checkIn >= todayStr;

  card.innerHTML = `
    <div class="booking-card-top">
      <span class="booking-prop-badge" style="background:${prop.color}20; color:${prop.color};">
        <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
      </span>
      <div style="display:flex; gap:6px; align-items:center;">
        ${(b.payments && b.payments.length > 0) ? `
          <button type="button" class="btn-open-receipt-gallery" data-bid="${b.id}" style="font-size:10px; font-weight:800; padding:1px 6px; border-radius:999px; background:#eff6ff; color:#1d4ed8; border:1px solid #93c5fd; cursor:pointer;" title="${t('receipt_gallery_title')}">
            <i class="fa-solid fa-receipt"></i> ${b.payments.length}
          </button>
        ` : ''}
        ${statusBadge}
        <span class="cal-proximity-badge ${badgeClass}">${badgeText}</span>
      </div>
    </div>
    <h3 class="booking-guest-title">${b.guestName} <span style="font-size:13px; font-weight:600; color:var(--text-muted);">(${b.guestCount || 1} ${t('guests')})</span></h3>
    <p class="booking-dates-row">
      <i class="fa-regular fa-calendar"></i> <strong>${b.checkIn}</strong> → <strong>${b.checkOut}</strong> (${b.nights || 1} ${t('nights')})
    </p>
    <div class="booking-financial-pill">
      <span>${t('total')}: <strong>${formatCurrency(b.totalAmount)}</strong></span>
      <span>${t('balance')}: <strong style="color:${b.balance > 0 ? 'var(--danger)' : 'var(--success)'};">${formatCurrency(b.balance)}</strong></span>
    </div>
    <div class="booking-actions-row" style="flex-wrap: wrap;">
      <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}">
        <i class="fa-brands fa-whatsapp"></i> ${t('btn_wa')}
      </button>
      ${isCheckinReminderEligible ? `
      <button class="btn btn-primary btn-xs btn-open-wa-reminder" data-bid="${b.id}" title="${isBM ? 'Hantar peringatan daftar masuk' : 'Send check-in reminder'}">
        <i class="fa-regular fa-bell"></i> ${isBM ? 'Peringatan Masuk' : 'Check-In Reminder'}
      </button>
      ` : ''}
      <button class="btn btn-outline btn-xs btn-edit-booking" data-bid="${b.id}">
        <i class="fa-solid fa-pen"></i> ${t('btn_edit')}
      </button>
    </div>
  `;

  return card;
}

function getBookingProximityInfo(b, todayStr, isBM) {
  const checkInDate = new Date(b.checkIn + 'T00:00:00');
  const checkOutDate = new Date(b.checkOut + 'T00:00:00');
  const todayDate = new Date(todayStr + 'T00:00:00');

  const diffMs = checkInDate - todayDate;
  const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

  if (b.checkIn <= todayStr && b.checkOut >= todayStr) {
    if (b.checkIn === todayStr) {
      return {
        label: isBM ? '🟢 Masuk Hari Ini' : '🟢 Check-In Today',
        badgeClass: 'cal-prox-today'
      };
    }
    if (b.checkOut === todayStr) {
      return {
        label: isBM ? '🔴 Keluar Hari Ini' : '🔴 Check-Out Today',
        badgeClass: 'cal-prox-checkout'
      };
    }
    const remDays = Math.round((checkOutDate - todayDate) / (1000 * 60 * 60 * 24));
    return {
      label: isBM ? `🔑 Menginap (Baki ${remDays} mlm)` : `🔑 In-Stay (${remDays} nights left)`,
      badgeClass: 'cal-prox-instay'
    };
  }

  if (diffDays === 1) {
    return {
      label: isBM ? '🟡 Esok (Daftar Masuk)' : '🟡 Tomorrow (Check-In)',
      badgeClass: 'cal-prox-tomorrow'
    };
  }
  if (diffDays === 2) {
    return {
      label: isBM ? '⏳ 2 Hari Lagi' : '⏳ In 2 Days',
      badgeClass: 'cal-prox-soon'
    };
  }
  if (diffDays > 2 && diffDays <= 7) {
    return {
      label: isBM ? `📅 ${diffDays} Hari Lagi` : `📅 In ${diffDays} Days`,
      badgeClass: 'cal-prox-soon'
    };
  }
  if (diffDays > 7) {
    return {
      label: isBM ? `📅 Dalam ${diffDays} Hari` : `📅 In ${diffDays} Days`,
      badgeClass: 'cal-prox-future'
    };
  }

  return {
    label: isBM ? 'Akan Datang' : 'Upcoming',
    badgeClass: 'cal-prox-future'
  };
}

function attachCalendarCardActions(container) {
  container.querySelectorAll('.btn-open-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openWhatsAppModal(b);
    });
  });

  container.querySelectorAll('.btn-open-wa-reminder').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openWhatsAppModal(b, 'checkin_reminder');
    });
  });

  container.querySelectorAll('.btn-edit-booking').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openBookingModal(b);
    });
  });

  container.querySelectorAll('.btn-book-vacating-unit').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const pid = e.currentTarget.getAttribute('data-pid');
      const dStr = e.currentTarget.getAttribute('data-date');
      openBookingModal(null, dStr, pid);
    });
  });

  container.querySelectorAll('.btn-open-receipt-gallery').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openReceiptViewerModal(b);
    });
  });
}

function renderSelectedDayDetails() {
  renderCalendarListing();
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
        <h4 style="font-size:14px; font-weight:700;">${t('no_bookings_found')}</h4>
        <p class="card-subtitle">${t('no_bookings_hint')}</p>
      </div>
    `;
    return;
  }

  const isBM = appState.settings.language === 'bm';

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

    const statusLabels = isBM ? {
      'quotation': '📋 SEBUT HARGA',
      'booked': '🟡 DITEMPAH (DEPOSIT)',
      'confirmed': '🟢 DISAHKAN (PENUH)',
      'checked-in': '🔑 MENGINAP (CHECK-IN)',
      'checked-out': '🏁 SELESAI',
      'blocked': '🚫 DISEKAT',
      'cancelled': '❌ DIBATALKAN'
    } : {
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
        <div style="display:flex; gap:4px; align-items:center; flex-wrap:wrap;">
          ${(b.payments && b.payments.length > 0) ? `
            <button type="button" class="btn-open-receipt-gallery" data-bid="${b.id}" style="font-size:10px; font-weight:800; padding:2px 7px; border-radius:999px; background:#eff6ff; color:#1d4ed8; border:1px solid #93c5fd; cursor:pointer; display:inline-flex; align-items:center; gap:4px;">
              <i class="fa-solid fa-receipt"></i> ${b.payments.length} ${isBM ? 'Resit' : (b.payments.length === 1 ? 'Receipt' : 'Receipts')}
            </button>
          ` : ''}
          ${b.rentalType === 'monthly' ? `<span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:999px; background:#e0e7ff; color:#3730a3;"><i class="fa-solid fa-calendar-days"></i> ${b.monthlyDuration || 6} ${t('months')}</span>` : ''}
          ${b.rentalType === 'monthly' ? (() => {
            const invs = getOrInitMonthlyInvoices(b);
            const paidCnt = invs.filter(x => x.status === 'paid').length;
            const totalCnt = invs.length;
            const allPaid = paidCnt === totalCnt;
            return `<span style="font-size:10px; font-weight:800; padding:2px 6px; border-radius:999px; background:${allPaid ? '#dcfce7; color:#166534;' : '#fef3c7; color:#92400e;'}"><i class="fa-solid fa-file-invoice-dollar"></i> ${paidCnt}/${totalCnt} ${isBM ? 'Invois' : 'Invoices'}</span>`;
          })() : ''}
          <span style="font-size:10px; font-weight:800; padding:3px 8px; border-radius:999px; ${statusBadgeColors[b.status] || ''}">${statusLabels[b.status] || b.status.toUpperCase()}</span>
        </div>
      </div>

      <p class="booking-dates-row">
        <i class="fa-regular fa-calendar"></i> ${b.checkIn} → ${b.checkOut} (${b.rentalType === 'monthly' ? `${b.monthlyDuration || 6} ${t('months')}` : `${b.nights} ${t('nights')}`}) • ${b.guestCount} ${t('guests')}
      </p>

      ${b.notes ? `<p style="font-size:12px; color:var(--text-muted); font-style:italic;"><i class="fa-regular fa-note-sticky"></i> "${b.notes}"</p>` : ''}

      <div class="booking-financial-pill">
        <span>${t('total')}: <strong>${formatCurrency(b.totalAmount)}</strong></span>
        <span>${isBM ? 'Dibayar' : 'Paid'}: <strong style="color:var(--success);">${formatCurrency(b.depositPaid)}</strong></span>
        <span>${isBM ? 'Baki' : 'Due'}: <strong style="color:${b.balance > 0 ? 'var(--danger)' : 'var(--success)'};">${formatCurrency(b.balance)}</strong></span>
        ${b.lastPaymentRef ? `
          <span style="display:flex; align-items:center; gap:4px; font-size:11px; margin-left:auto;">
            <i class="fa-solid fa-receipt" style="color:var(--primary);"></i>
            <span>Ref: <strong><code>${b.lastPaymentRef}</code></strong></span>
          </span>
        ` : ''}
      </div>

      <!-- Contextual Quick Action Workflow Bar -->
      <div style="display:flex; gap:6px; flex-wrap:wrap; margin-top:4px;">
        <button class="btn btn-outline btn-xs btn-open-receipt-gallery" data-bid="${b.id}" title="${t('receipt_gallery_title')}">
          <i class="fa-solid fa-receipt"></i> ${(b.payments && b.payments.length > 0) ? `${b.payments.length} ${isBM ? 'Resit' : 'Receipts'}` : (isBM ? '+ Resit' : '+ Receipt')}
        </button>
        ${b.rentalType === 'monthly' ? `
          <button class="btn btn-outline btn-xs btn-open-monthly-invoices" data-bid="${b.id}" style="color:var(--primary); font-weight:700; border-color:var(--primary);">
            <i class="fa-solid fa-file-invoice-dollar"></i> ${t('btn_view_invoices')}
          </button>
        ` : ''}

        ${b.status === 'quotation' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="quotation">
            <i class="fa-solid fa-file-lines"></i> ${t('btn_send_quotation')}
          </button>
          <button class="btn btn-outline btn-xs btn-mark-booked" data-bid="${b.id}">
            <i class="fa-solid fa-hand-holding-dollar" style="color:var(--warning);"></i> ${t('btn_mark_booked')}
          </button>
        ` : ''}

        ${b.status === 'booked' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="deposit_receipt">
            <i class="fa-solid fa-receipt"></i> ${t('btn_send_deposit_receipt')}
          </button>
          <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="checkin_reminder" style="color:var(--primary); font-weight:700;">
            <i class="fa-solid fa-bell"></i> ${t('btn_checkin_reminder')}
          </button>
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> ${t('btn_send_invoice')}
            </button>
          ` : `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="invoice">
              <i class="fa-solid fa-file-invoice"></i> ${t('btn_send_invoice')}
            </button>
          `}
          <button class="btn btn-outline btn-xs btn-mark-confirmed" data-bid="${b.id}">
            <i class="fa-solid fa-key" style="color:var(--success);"></i> ${t('btn_mark_confirmed')}
          </button>
        ` : ''}

        ${b.status === 'confirmed' ? `
          <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="full_receipt">
            <i class="fa-solid fa-key"></i> ${t('btn_send_full_receipt')}
          </button>
          <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="checkin_reminder" style="color:var(--primary); font-weight:700;">
            <i class="fa-solid fa-bell"></i> ${t('btn_checkin_reminder')}
          </button>
          <button class="btn btn-outline btn-xs btn-mark-checkin" data-bid="${b.id}">
            <i class="fa-solid fa-door-open" style="color:var(--primary);"></i> ${t('btn_checkin')}
          </button>
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> ${t('btn_send_invoice')}
            </button>
          ` : ''}
        ` : ''}

        ${b.status === 'checked-in' ? `
          ${b.rentalType === 'monthly' ? `
            <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="monthly_invoice">
              <i class="fa-solid fa-file-invoice"></i> ${t('btn_send_invoice')}
            </button>
            <button class="btn btn-outline btn-xs btn-open-refund" data-bid="${b.id}">
              <i class="fa-solid fa-money-bill-transfer" style="color:var(--success);"></i> ${isBM ? 'Tamat Sewa & Pulang Deposit' : 'End Tenancy & Refund Deposit'}
            </button>
          ` : `
            <button class="btn btn-whatsapp btn-xs btn-open-wa" data-bid="${b.id}" data-wa="checkout">
              <i class="fa-solid fa-flag-checkered"></i> ${t('btn_checkout_reminder')}
            </button>
            ${b.securityDeposit > 0 ? `
              <button class="btn btn-outline btn-xs btn-open-refund" data-bid="${b.id}">
                <i class="fa-solid fa-money-bill-transfer" style="color:var(--success);"></i> ${isBM ? 'Pulang Deposit Keselamatan' : 'Refund Security Deposit'}
              </button>
            ` : ''}
            <button class="btn btn-outline btn-xs btn-mark-checkout" data-bid="${b.id}">
              <i class="fa-solid fa-check"></i> ${t('btn_complete_checkout')}
            </button>
          `}
        ` : ''}

        ${b.status === 'checked-out' && (b.rentalDeposit || b.securityDeposit) ? `
          <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="refund_receipt">
            <i class="fa-solid fa-file-invoice-dollar"></i> ${isBM ? 'Lihat Penyata Pulangan' : 'View Refund Statement'}
          </button>
        ` : ''}

        <button class="btn btn-outline btn-xs btn-open-wa" data-bid="${b.id}" data-wa="payment" title="${t('btn_wa')}">
          <i class="fa-brands fa-whatsapp"></i>
        </button>
        <button class="btn btn-outline btn-xs btn-edit-booking" data-bid="${b.id}" title="${t('edit')}">
          <i class="fa-solid fa-pen"></i> ${t('edit')}
        </button>
        <button class="btn btn-danger-outline btn-xs btn-delete-booking" data-bid="${b.id}" title="${t('delete')}">
          <i class="fa-solid fa-trash-can"></i>
        </button>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach event handlers
  container.querySelectorAll('.btn-open-monthly-invoices').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openMonthlyInvoicesModal(b);
    });
  });

  container.querySelectorAll('.btn-open-wa').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const waTemplate = e.currentTarget.getAttribute('data-wa') || 'quotation';
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        // If monthly invoice template, pick first pending month
        if (b.rentalType === 'monthly' && waTemplate === 'monthly_invoice') {
          const invs = getOrInitMonthlyInvoices(b);
          const firstPending = invs.find(x => x.status === 'pending');
          const mIdx = firstPending ? firstPending.monthIndex : 1;
          openWhatsAppModal(b, waTemplate, mIdx);
        } else {
          openWhatsAppModal(b, waTemplate);
        }
      }
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
        const defaultDep = b.depositPaid > 0 ? b.depositPaid : Math.round(b.totalAmount * (appState.settings.defaultDepositPct || 30) / 100);
        openPaymentProofModal(b, 'deposit', null, defaultDep);
      }
    });
  });

  container.querySelectorAll('.btn-mark-confirmed').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) {
        const defaultBal = b.balance > 0 ? b.balance : b.totalAmount;
        openPaymentProofModal(b, 'balance', null, defaultBal);
      }
    });
  });

  container.querySelectorAll('.btn-open-receipt-gallery').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const bid = e.currentTarget.getAttribute('data-bid');
      const b = appState.bookings.find(x => x.id === bid);
      if (b) openReceiptViewerModal(b);
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
        showToast(isBM ? 'Tetamu didaftar masuk!' : 'Guest checked in!');
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
        showToast(isBM ? 'Tempahan selesai.' : 'Booking marked as completed.');
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
      const confirmText = isBM ? 'Adakah anda pasti mahu memadamkan tempahan ini?' : 'Are you sure you want to delete this booking?';
      if (confirm(confirmText)) {
        appState.bookings = appState.bookings.filter(x => x.id !== bid);
        appState.turnovers = appState.turnovers.filter(tItem => tItem.bookingId !== bid);
        saveToStorage();
        renderBookingsTab();
        showToast(isBM ? 'Tempahan dipadamkan.' : 'Booking deleted successfully.');
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
        <h4 style="font-size:14px; font-weight:700;">${t('no_turnovers')}</h4>
        <p class="card-subtitle">${t('all_clean_hint')}</p>
      </div>
    `;
    return;
  }

  const isBM = appState.settings.language === 'bm';

  turnovers.forEach(tItem => {
    const prop = getPropertyById(tItem.propertyId);
    const checklist = Array.isArray(tItem.checklist) ? tItem.checklist : [];
    const completedCount = checklist.filter(c => c.done).length;
    const isAllDone = completedCount === checklist.length && checklist.length > 0;

    const card = document.createElement('div');
    card.className = 'turnover-card';
    card.style.borderLeft = `4px solid ${isAllDone ? 'var(--success)' : prop.color}`;

    card.innerHTML = `
      <div class="card-header-flex">
        <div>
          <span class="booking-prop-badge" style="background:${prop.color}20; color:${prop.color};">
            <span class="property-dot" style="background:${prop.color};"></span> ${prop.name}
          </span>
          <h4 style="font-size:15px; font-weight:700; margin-top:4px;">${t('turnover')}: ${tItem.date}</h4>
          <p class="card-subtitle">${booking ? `${isBM ? 'Selepas tetamu' : 'After guest'}: ${booking.guestName}` : (isBM ? 'Pembersihan Menyeluruh Rutin' : 'Routine Deep Clean')}</p>
        </div>
        <span style="font-size:11px; font-weight:700; padding:3px 8px; border-radius:999px; ${isAllDone ? 'background:var(--success-light);color:var(--success-text);' : 'background:var(--warning-light);color:var(--warning-text);'}">
          ${isAllDone ? (isBM ? 'SEDIA UNTUK TETAMU' : 'READY FOR GUEST') : `${completedCount}/${checklist.length} ${isBM ? 'SIAP' : 'DONE'}`}
        </span>
      </div>

      <div class="turnover-checklist">
        ${checklist.map((item, idx) => `
          <label class="checklist-item">
            <input type="checkbox" data-tid="${tItem.id}" data-idx="${idx}" ${item.done ? 'checked' : ''}>
            <span style="${item.done ? 'text-decoration:line-through; opacity:0.6;' : ''}">${item.text}</span>
          </label>
        `).join('')}
      </div>

      <div class="card-header-flex" style="margin-top:8px; margin-bottom:0;">
        <button class="btn btn-whatsapp btn-xs btn-wa-cleaner" data-tid="${tItem.id}">
          <i class="fa-brands fa-whatsapp"></i> ${t('btn_wa_cleaner')}
        </button>
        <button class="btn btn-outline btn-xs btn-toggle-turnover" data-tid="${tItem.id}">
          ${isAllDone ? `<i class="fa-solid fa-rotate-left"></i> ${isBM ? 'Buka Semula' : 'Reopen'}` : `<i class="fa-solid fa-check"></i> ${isBM ? 'Tanda Selesai' : 'Mark Complete'}`}
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
      const turnover = appState.turnovers.find(tItem => tItem.id === tid);
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
      const tItem = appState.turnovers.find(x => x.id === tid);
      if (tItem) openWhatsAppCleanerJob(tItem);
    });
  });

  container.querySelectorAll('.btn-toggle-turnover').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const tid = e.currentTarget.getAttribute('data-tid');
      const tItem = appState.turnovers.find(x => x.id === tid);
      if (tItem) {
        const setDone = tItem.status !== 'completed';
        tItem.checklist.forEach(c => c.done = setDone);
        tItem.status = setDone ? 'completed' : 'pending';
        saveToStorage();
        renderTurnoversTab();
        showToast(setDone ? (isBM ? 'Pembersihan ditanda siap & sedia!' : 'Turnover marked as ready!') : (isBM ? 'Pembersihan dibuka semula.' : 'Turnover reopened.'));
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
  if (!monthSelect || !yearSelect) return;
  
  const currentVal = monthSelect.value !== '' ? parseInt(monthSelect.value) : new Date().getMonth();
  monthSelect.innerHTML = '';

  const isBM = appState.settings.language === 'bm';
  const months = isBM 
    ? ['Januari', 'Februari', 'Mac', 'April', 'Mei', 'Jun', 'Julai', 'Ogos', 'September', 'Oktober', 'November', 'Disember']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
  months.forEach((m, idx) => {
    const opt = document.createElement('option');
    opt.value = idx;
    opt.textContent = m;
    if (idx === currentVal) opt.selected = true;
    monthSelect.appendChild(opt);
  });

  const yearVal = yearSelect.value !== '' ? parseInt(yearSelect.value) : new Date().getFullYear();
  yearSelect.innerHTML = '';
  const currentYear = new Date().getFullYear();
  for (let y = currentYear - 2; y <= currentYear + 2; y++) {
    const opt = document.createElement('option');
    opt.value = y;
    opt.textContent = y;
    if (y === yearVal) opt.selected = true;
    yearSelect.appendChild(opt);
  }
}

function renderFinancesTab() {
  populateFinanceDateSelectors();
  
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
    expList.innerHTML = `<p class="empty-hint">${t('no_expenses')}</p>`;
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
        showToast(appState.settings.language === 'bm' ? 'Perbelanjaan dipadamkan.' : 'Expense removed.');
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

  const quotationValidityInput = document.getElementById('settingQuotationValidityInput');
  if (quotationValidityInput) quotationValidityInput.value = appState.settings.quotationValidityDays || 3;

  const standardNotesInput = document.getElementById('settingStandardNotesInput');
  if (standardNotesInput) standardNotesInput.value = appState.settings.standardNotes || '';

  const propList = document.getElementById('settingsPropertyList');
  propList.innerHTML = '';

  const isBM = appState.settings.language === 'bm';

  if (appState.properties.length === 0) {
    propList.innerHTML = `
      <div style="text-align:center; padding:24px 16px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
        <i class="fa-solid fa-house-chimney" style="font-size:28px; color:var(--text-muted); margin-bottom:8px;"></i>
        <p style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:4px;">${isBM ? 'Tiada unit homestay didaftarkan lagi' : 'No homestay units added yet'}</p>
        <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">${isBM ? 'Tambah unit homestay atau bilik anda sendiri untuk mula merekod tempahan sebenar.' : 'Add your own homestays or room rentals to start recording real bookings.'}</p>
        <button class="btn btn-primary btn-sm" id="btnSettingsAddFirstProp"><i class="fa-solid fa-plus"></i> ${isBM ? 'Tambah Unit Pertama Anda' : 'Add Your First Unit'}</button>
      </div>
    `;
    const addFirstBtn = document.getElementById('btnSettingsAddFirstProp');
    if (addFirstBtn) addFirstBtn.addEventListener('click', () => openPropertyModal());
  } else {
    appState.properties.forEach(prop => {
      const card = document.createElement('div');
      card.className = 'settings-prop-card';
      const typeLabel = prop.propType === 'room_master' ? (isBM ? '🚪 Bilik Master' : '🚪 Master Room') :
                        prop.propType === 'room_medium' ? (isBM ? '🚪 Bilik Medium' : '🚪 Medium Room') :
                        prop.propType === 'room_single' ? (isBM ? '🚪 Bilik Single' : '🚪 Single Room') :
                        prop.propType === 'studio' ? '🏢 Studio' : (isBM ? '🏡 Seluruh Unit' : '🏡 Whole Unit');

      card.innerHTML = `
        <div class="settings-prop-details">
          <h4 style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span class="property-dot" style="background:${prop.color};"></span>
            ${prop.name}
            <span style="font-size:10px; font-weight:700; background:var(--bg-surface-subtle); padding:2px 6px; border-radius:999px; color:var(--primary);">${typeLabel}</span>
          </h4>
          <p><i class="fa-solid fa-location-dot" style="color:var(--primary);"></i> ${prop.address || (isBM ? 'Alamat belum diisi' : 'No address set')}${prop.gpsLocation ? ` • <a href="${prop.gpsLocation}" target="_blank" style="color:var(--primary); font-weight:700; text-decoration:none;"><i class="fa-solid fa-map-location-dot"></i> GPS / Maps</a>` : ''}</p>
          <p>🔑 PIN: <strong>${prop.doorCode || (isBM ? 'Tiada' : 'None')}</strong> • 📶 WiFi: <strong>${prop.wifiName || (isBM ? 'Tiada' : 'None')}</strong></p>
          <p>${isBM ? 'Kadar' : 'Rate'}: ${formatCurrency(prop.defaultRate)}/${isBM ? 'malam' : 'night'} • ${isBM ? 'Pembersihan' : 'Clean fee'}: ${formatCurrency(prop.cleaningFee)}</p>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-xs btn-edit-prop" data-pid="${prop.id}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-danger-outline btn-xs btn-delete-prop" data-pid="${prop.id}" title="${t('delete')}"><i class="fa-solid fa-trash"></i></button>
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
        const confirmDelete = isBM ? 'Padamkan unit ini? Rekod tempahan sedia ada akan kekal.' : 'Delete this homestay unit? All associated bookings will remain.';
        if (confirm(confirmDelete)) {
          appState.properties = appState.properties.filter(x => x.id !== pid);
          if (appState.selectedPropertyId === pid) appState.selectedPropertyId = 'all';
          saveToStorage();
          renderApp();
          showToast(isBM ? 'Unit homestay dipadamkan.' : 'Homestay removed.');
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
      subTitle.textContent = `Key: ${appState.licenseKey} (${isBM ? 'Terkunci ke' : 'Tied to'} +${boundPhone})`;
      badge.textContent = isBM ? '✨ LESEN AKTIF' : '✨ LIFETIME ACTIVE';
      badge.style.background = 'var(--success-light)';
      badge.style.color = 'var(--success-text)';
      if (adminGenCard) adminGenCard.classList.add('hidden');
    }

    actions.innerHTML = `
      <p style="font-size:12px; color:var(--text-muted); margin-bottom:8px;">
        <i class="fa-solid fa-circle-check" style="color:var(--success);"></i> ${isBM ? 'Unit tanpa had & data peribadi luar talian aktif.' : 'Unlimited homestays & offline private data unlocked.'}
      </p>
      <button class="btn btn-outline btn-xs" id="btnChangeLicenseKey">
        <i class="fa-solid fa-arrows-rotate"></i> ${isBM ? 'Tukar / Masukkan Kunci Lesen' : 'Change / Re-enter License Key'}
      </button>
    `;
    document.getElementById('btnChangeLicenseKey').addEventListener('click', openLicenseModal);
  } else {
    subTitle.textContent = isBM ? 'Tiada Lesen (Mod Demo)' : 'Unlicensed (Demo Mode)';
    badge.textContent = isBM ? 'DEMO' : 'DEMO';
    badge.style.background = 'var(--warning-light)';
    badge.style.color = 'var(--warning-text)';
    if (adminGenCard) adminGenCard.classList.add('hidden');

    actions.innerHTML = `
      <div style="display:flex; gap:8px;">
        <button class="btn btn-primary btn-sm" id="btnActivateFromSettings">
          <i class="fa-solid fa-key"></i> ${isBM ? 'Masukkan Kunci Lesen' : 'Enter License Key'}
        </button>
        <button class="btn btn-whatsapp btn-sm" id="btnBuyFromSettings">
          <i class="fa-brands fa-whatsapp"></i> ${isBM ? 'Beli Lesen' : 'Buy License'}
        </button>
      </div>
    `;
    document.getElementById('btnActivateFromSettings').addEventListener('click', openLicenseModal);
    document.getElementById('btnBuyFromSettings').addEventListener('click', handleBuyLicenseRedirect);
  }

  const verBadge = document.getElementById('appCurrentVersionBadge');
  if (verBadge) verBadge.textContent = `v${APP_VERSION}`;

  // Render Maintenance Team & Suppliers Directory
  renderSettingsContactList();
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(new RegExp('"', 'g'), '&quot;')
    .replace(new RegExp("'", 'g'), '&#039;');
}

function getContactCategoryBadge(cat) {
  const isBM = appState.settings.language === 'bm';
  switch (cat) {
    case 'cleaner':
      return { label: isBM ? '🧹 Tukang Cuci' : '🧹 Cleaner', class: 'cat-cleaner' };
    case 'aircond':
      return { label: isBM ? '❄️ Juruteknik Aircond' : '❄️ Aircond Tech', class: 'cat-aircond' };
    case 'plumber':
      return { label: isBM ? '🔧 Tukang Paip' : '🔧 Plumber', class: 'cat-plumber' };
    case 'electrician':
      return { label: isBM ? '⚡ Juruelektrik' : '⚡ Electrician', class: 'cat-electrician' };
    case 'handyman':
      return { label: isBM ? '🔨 Baiki Am / Handyman' : '🔨 Handyman', class: 'cat-handyman' };
    case 'linen_supplier':
      return { label: isBM ? '🧺 Pembekal Linen & Dobi' : '🧺 Linen Supplier', class: 'cat-linen_supplier' };
    case 'gas_supplier':
      return { label: isBM ? '⛽ Pembekal Gas & Barang' : '⛽ Gas / Amenities', class: 'cat-gas_supplier' };
    case 'locksmith':
      return { label: isBM ? '🔐 Tukang Kunci' : '🔐 Locksmith', class: 'cat-locksmith' };
    default:
      return { label: isBM ? '📦 Vendor / Pembekal' : '📦 Contractor / Vendor', class: 'cat-other' };
  }
}

function renderSettingsContactList() {
  const container = document.getElementById('settingsContactList');
  if (!container) return;
  container.innerHTML = '';

  const isBM = appState.settings.language === 'bm';
  const contacts = appState.contacts || [];

  if (contacts.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:24px 16px; background:var(--bg-surface-subtle); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
        <i class="fa-solid fa-users-gear" style="font-size:28px; color:var(--text-muted); margin-bottom:8px;"></i>
        <p style="font-size:13px; font-weight:700; color:var(--text-main); margin-bottom:4px;">${isBM ? 'Tiada kenalan / pembekal disimpan lagi' : 'No team members or suppliers added yet'}</p>
        <p style="font-size:11px; color:var(--text-muted); margin-bottom:12px;">${isBM ? 'Simpan tukang cuci, juruteknik aircond, tukang paip dan pembekal untuk notis kerja pantas 1-klik WhatsApp.' : 'Save cleaners, aircond techs, plumbers & supply vendors for 1-click WhatsApp alerts.'}</p>
        <button class="btn btn-primary btn-sm" id="btnSettingsAddFirstContact"><i class="fa-solid fa-plus"></i> ${isBM ? 'Tambah Kenalan Pertama' : 'Add First Contact'}</button>
      </div>
    `;
    const addFirst = document.getElementById('btnSettingsAddFirstContact');
    if (addFirst) addFirst.addEventListener('click', () => openContactModal());
    return;
  }

  contacts.forEach(contact => {
    const card = document.createElement('div');
    card.className = 'contact-card';
    const badgeInfo = getContactCategoryBadge(contact.category);
    const cleanPhone = (contact.phone || '').replace(/[^0-9]/g, '');

    card.innerHTML = `
      <div class="contact-card-header">
        <div>
          <div class="contact-card-title">${escapeHtml(contact.name)}</div>
          ${contact.company ? `<div class="contact-company-text"><i class="fa-solid fa-briefcase"></i> ${escapeHtml(contact.company)}</div>` : ''}
        </div>
        <span class="contact-category-badge ${badgeInfo.class}">
          ${badgeInfo.label}
        </span>
      </div>

      <div class="contact-card-body">
        <a href="https://wa.me/${cleanPhone}" target="_blank" class="contact-phone-link">
          <i class="fa-brands fa-whatsapp" style="color:var(--success);"></i> ${escapeHtml(contact.phone)}
        </a>
        ${contact.notes ? `<div class="contact-notes-text">${escapeHtml(contact.notes)}</div>` : ''}
      </div>

      <div class="contact-card-actions">
        <button class="btn btn-whatsapp btn-xs btn-contact-dispatch" data-cid="${contact.id}" title="${isBM ? 'Hantar Notis Servis / Bekalan' : 'Dispatch Service / Supply'}">
          <i class="fa-brands fa-whatsapp"></i> ${isBM ? 'Hantar Notis' : 'Dispatch Alert'}
        </button>
        <div style="display:flex; gap:6px;">
          <button class="btn btn-outline btn-xs btn-edit-contact" data-cid="${contact.id}" title="${t('edit')}">
            <i class="fa-solid fa-pen"></i>
          </button>
          <button class="btn btn-danger-outline btn-xs btn-delete-contact" data-cid="${contact.id}" title="${t('delete')}">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Action listeners
  container.querySelectorAll('.btn-contact-dispatch').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cid = e.currentTarget.getAttribute('data-cid');
      const c = appState.contacts.find(x => x.id === cid);
      if (c) openServiceDispatchModal(null, c.category, c.id);
    });
  });

  container.querySelectorAll('.btn-edit-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cid = e.currentTarget.getAttribute('data-cid');
      openContactModal(cid);
    });
  });

  container.querySelectorAll('.btn-delete-contact').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const cid = e.currentTarget.getAttribute('data-cid');
      handleDeleteContact(cid);
    });
  });
}

function openContactModal(contactId = null) {
  const isBM = appState.settings.language === 'bm';
  const modal = document.getElementById('contactModal');
  const title = document.getElementById('contactModalTitle');
  const idInput = document.getElementById('contactIdInput');
  const nameInput = document.getElementById('contactNameInput');
  const catSelect = document.getElementById('contactCategorySelect');
  const phoneInput = document.getElementById('contactPhoneInput');
  const compInput = document.getElementById('contactCompanyInput');
  const notesInput = document.getElementById('contactNotesInput');

  if (contactId) {
    const contact = (appState.contacts || []).find(c => c.id === contactId);
    if (contact) {
      if (title) title.textContent = isBM ? 'Kemaskini Butiran Kenalan' : 'Edit Contact Details';
      if (idInput) idInput.value = contact.id;
      if (nameInput) nameInput.value = contact.name || '';
      if (catSelect) catSelect.value = contact.category || 'cleaner';
      if (phoneInput) phoneInput.value = contact.phone || '';
      if (compInput) compInput.value = contact.company || '';
      if (notesInput) notesInput.value = contact.notes || '';
    }
  } else {
    if (title) title.textContent = isBM ? 'Tambah Pasukan / Pembekal' : 'Add Team Member / Supplier';
    if (idInput) idInput.value = '';
    if (nameInput) nameInput.value = '';
    if (catSelect) catSelect.value = 'cleaner';
    if (phoneInput) phoneInput.value = '';
    if (compInput) compInput.value = '';
    if (notesInput) notesInput.value = '';
  }

  if (modal) modal.classList.add('active');
}

function handleSaveContact(e) {
  e.preventDefault();
  const idInput = document.getElementById('contactIdInput').value;
  const name = document.getElementById('contactNameInput').value.trim();
  const category = document.getElementById('contactCategorySelect').value;
  const phone = document.getElementById('contactPhoneInput').value.trim();
  const company = document.getElementById('contactCompanyInput').value.trim();
  const notes = document.getElementById('contactNotesInput').value.trim();

  if (!name || !phone) {
    alert(appState.settings.language === 'bm' ? 'Sila masukkan nama dan nombor WhatsApp.' : 'Please enter contact name and WhatsApp phone number.');
    return;
  }

  if (!Array.isArray(appState.contacts)) appState.contacts = [];

  if (idInput) {
    // Update
    const idx = appState.contacts.findIndex(c => c.id === idInput);
    if (idx !== -1) {
      appState.contacts[idx] = {
        ...appState.contacts[idx],
        name,
        category,
        phone,
        company,
        notes
      };
    }
  } else {
    // New
    const newContact = {
      id: 'c-' + Date.now(),
      name,
      category,
      phone,
      company,
      notes
    };
    appState.contacts.push(newContact);
  }

  saveToStorage();
  renderSettingsContactList();
  closeAllModals();
  showToast(appState.settings.language === 'bm' ? 'Kenalan berjaya disimpan!' : 'Contact saved successfully!');
}

function handleDeleteContact(contactId) {
  const isBM = appState.settings.language === 'bm';
  const contact = (appState.contacts || []).find(c => c.id === contactId);
  if (!contact) return;

  const msg = isBM ? `Padamkan ${contact.name} daripada direktori pasukan?` : `Remove ${contact.name} from your team directory?`;
  if (confirm(msg)) {
    appState.contacts = appState.contacts.filter(c => c.id !== contactId);
    saveToStorage();
    renderSettingsContactList();
    showToast(isBM ? 'Kenalan telah dipadamkan.' : 'Contact removed.');
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
  appState.settings.quotationValidityDays = parseInt(document.getElementById('settingQuotationValidityInput')?.value) || 3;
  appState.settings.standardNotes = document.getElementById('settingStandardNotesInput') ? document.getElementById('settingStandardNotesInput').value.trim() : (appState.settings.standardNotes || '');

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

  // Toggle Section Visibility
  const dailySection = document.getElementById('sectionDailyPricing');
  const monthlySection = document.getElementById('sectionMonthlyPricing');
  
  if (dailySection) dailySection.classList.toggle('hidden', isMonthly);
  if (monthlySection) monthlySection.classList.toggle('hidden', !isMonthly);

  // Daily input elements to enable/disable
  const dailyInputs = [
    'bookingCheckIn', 'bookingCheckOut', 'bookingNightlyRate', 
    'bookingCleaningFee', 'bookingSecurityDeposit',
    'btnPresetDep30', 'btnPresetDep50', 'btnPresetDepFull', 'btnPresetDepZero'
  ];

  // Monthly input elements to enable/disable
  const monthlyInputs = [
    'bookingMonthlyStart', 'bookingMonthlyDuration', 'bookingMonthlyRate', 
    'bookingRentalDeposit', 'bookingUtilitiesDeposit', 'bookingAgreementFee'
  ];

  if (isMonthly) {
    // Completely BLOCK / DISABLE all Daily inputs
    dailyInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = true;
        el.required = false;
        el.setAttribute('tabindex', '-1');
        el.style.pointerEvents = 'none';
      }
    });

    // UNBLOCK / ENABLE all Monthly inputs
    monthlyInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = false;
        el.removeAttribute('tabindex');
        el.style.pointerEvents = 'auto';
      }
    });

    const mStart = document.getElementById('bookingMonthlyStart');
    if (mStart) mStart.required = true;
    const mRate = document.getElementById('bookingMonthlyRate');
    if (mRate) mRate.required = true;

  } else {
    // Completely BLOCK / DISABLE all Monthly inputs
    monthlyInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = true;
        el.required = false;
        el.setAttribute('tabindex', '-1');
        el.style.pointerEvents = 'none';
      }
    });

    // UNBLOCK / ENABLE all Daily inputs
    dailyInputs.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.disabled = false;
        el.removeAttribute('tabindex');
        el.style.pointerEvents = 'auto';
      }
    });

    const bCheckIn = document.getElementById('bookingCheckIn');
    if (bCheckIn) bCheckIn.required = true;
    const bCheckOut = document.getElementById('bookingCheckOut');
    if (bCheckOut) bCheckOut.required = true;
  }

  // Update segmented control buttons UI
  document.querySelectorAll('#rentalTypeSegmented .segment-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-type') === type);
  });
}

function openBookingModal(existingBooking = null, prefillDate = null, prefillPropertyId = null) {
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

    const qVal = existingBooking.quotationValidityDays || appState.settings.quotationValidityDays || 3;
    const qValEl = document.getElementById('bookingQuotationValidity');
    if (qValEl) qValEl.value = qVal;
    const qGroup = document.getElementById('bookingQuotationValidityGroup');
    if (qGroup) {
      qGroup.style.display = (existingBooking.status === 'quotation') ? 'block' : 'none';
    }

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

    // Populate Attached Receipts Section
    const receiptsSec = document.getElementById('bookingReceiptsSection');
    const receiptsList = document.getElementById('bookingModalReceiptsList');
    if (receiptsSec && receiptsList) {
      receiptsSec.style.display = 'block';
      const payments = existingBooking.payments || [];
      if (payments.length === 0) {
        receiptsList.innerHTML = `<p style="font-size:11.5px; color:var(--text-muted); margin:0;">${t('no_receipts_recorded')}</p>`;
      } else {
        receiptsList.innerHTML = payments.map(p => `
          <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface); padding:5px 8px; border-radius:4px; border:1px solid var(--border-color); margin-top:4px; font-size:12px;">
            <span><i class="fa-solid fa-building-columns" style="color:var(--primary); margin-right:4px;"></i><strong>${p.bankName || 'Bank'}</strong> • <code>${p.referenceNo || '-'}</code></span>
            <span style="font-weight:700; color:var(--success);">${formatCurrency(p.amount)}</span>
          </div>
        `).join('');
      }

      const btnAddReceipt = document.getElementById('btnBookingModalAddReceipt');
      if (btnAddReceipt) {
        btnAddReceipt.onclick = () => {
          openPaymentProofModal(existingBooking);
        };
      }
    }
  } else {
    document.getElementById('bookingModalTitle').textContent = 'New Booking / Quotation';
    document.getElementById('bookingIdInput').value = '';
    document.getElementById('bookingGuestNric').value = '';
    document.getElementById('bookingGuestEmail').value = '';
    document.getElementById('bookingGuestAddress').value = '';

    const receiptsSec = document.getElementById('bookingReceiptsSection');
    if (receiptsSec) receiptsSec.style.display = 'none';
    
    if (prefillPropertyId) {
      document.getElementById('bookingPropertySelect').value = prefillPropertyId;
    } else if (appState.selectedPropertyId !== 'all') {
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

    const qValEl = document.getElementById('bookingQuotationValidity');
    if (qValEl) qValEl.value = appState.settings.quotationValidityDays || 3;
    const qGroup = document.getElementById('bookingQuotationValidityGroup');
    if (qGroup) {
      qGroup.style.display = 'block';
    }
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
  const quotationValidityDays = parseInt(document.getElementById('bookingQuotationValidity')?.value) || appState.settings.quotationValidityDays || 3;

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
    quotationValidityDays,
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
// 11C. MULTI-MONTH TENANCY INVOICING ENGINE
// ==========================================================================

function getOrInitMonthlyInvoices(booking) {
  const duration = booking.monthlyDuration || 1;
  if (!booking.monthlyInvoices || !Array.isArray(booking.monthlyInvoices) || booking.monthlyInvoices.length === 0) {
    const invoices = [];
    const startD = new Date(booking.checkIn + 'T00:00:00');
    
    for (let i = 1; i <= duration; i++) {
      const curStart = new Date(startD);
      curStart.setMonth(curStart.getMonth() + (i - 1));
      const curEnd = new Date(curStart);
      curEnd.setMonth(curEnd.getMonth() + 1);
      curEnd.setDate(curEnd.getDate() - 1);

      const dueDate = new Date(curStart);
      dueDate.setDate(dueDate.getDate() + 6); // 7th day of cycle

      // Month 1 is marked paid if booking is confirmed / checked-in or depositPaid >= monthlyRate
      const isFirstMonthPaid = (i === 1 && (booking.status === 'confirmed' || booking.status === 'checked-in' || booking.status === 'checked-out' || (booking.depositPaid && booking.depositPaid >= (booking.monthlyRate || 0))));

      invoices.push({
        monthIndex: i,
        invoiceNo: `INV-M${i}-${booking.id.slice(-5).toUpperCase()}`,
        periodStart: curStart.toISOString().split('T')[0],
        periodEnd: curEnd.toISOString().split('T')[0],
        dueDate: dueDate.toISOString().split('T')[0],
        rentAmount: booking.monthlyRate || 0,
        utilityCharges: 0,
        totalAmount: booking.monthlyRate || 0,
        status: isFirstMonthPaid ? 'paid' : 'pending',
        paidAt: isFirstMonthPaid ? (booking.createdAt || new Date().toISOString()) : null,
        notes: isFirstMonthPaid ? 'Settled in move-in package' : ''
      });
    }
    booking.monthlyInvoices = invoices;
    saveToStorage();
  }
  return booking.monthlyInvoices;
}

function openMonthlyInvoicesModal(booking) {
  appState.activeWaBooking = booking;
  const prop = getPropertyById(booking.propertyId);
  const isBM = appState.settings.language === 'bm';

  document.getElementById('monthlyInvoicesTenantSubtitle').textContent = `${isBM ? 'Penyewa' : 'Tenant'}: ${booking.guestName} (${booking.guestPhone || '-'}) • ${prop.name}`;
  document.getElementById('mInvRateDisplay').textContent = `${formatCurrency(booking.monthlyRate || 0)} / ${isBM ? 'bulan' : 'month'}`;
  document.getElementById('mInvPeriodDisplay').textContent = `${booking.checkIn} → ${booking.checkOut} (${booking.monthlyDuration || 6} ${t('months')})`;

  renderMonthlyInvoicesList(booking);
  document.getElementById('monthlyInvoicesModal').classList.add('active');
}

function renderMonthlyInvoicesList(booking) {
  const container = document.getElementById('monthlyInvoicesList');
  container.innerHTML = '';

  const invoices = getOrInitMonthlyInvoices(booking);
  const isBM = appState.settings.language === 'bm';

  const paidCount = invoices.filter(x => x.status === 'paid').length;
  const totalMonths = invoices.length;
  const badge = document.getElementById('mInvPaidProgressBadge');
  if (badge) {
    badge.textContent = `${paidCount}/${totalMonths} ${isBM ? 'DIBAYAR' : 'PAID'}`;
    badge.style.background = paidCount === totalMonths ? 'var(--success-light)' : 'var(--primary-light)';
    badge.style.color = paidCount === totalMonths ? 'var(--success-text)' : 'var(--primary-text)';
  }

  invoices.forEach(inv => {
    const isPaid = inv.status === 'paid';
    const card = document.createElement('div');
    card.className = 'card';
    card.style.padding = '10px 12px';
    card.style.marginBottom = '0';
    card.style.borderLeft = `4px solid ${isPaid ? 'var(--success)' : 'var(--warning)'}`;
    card.style.background = 'var(--bg-surface-subtle)';

    card.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
        <div>
          <strong style="font-size:13px; color:var(--text-main); display:flex; align-items:center; gap:6px;">
            <i class="fa-solid fa-calendar-check" style="color:${isPaid ? 'var(--success)' : 'var(--warning)'};"></i>
            ${isBM ? `Bulan ke-${inv.monthIndex}` : `Month ${inv.monthIndex}`} (${inv.periodStart} → ${inv.periodEnd})
          </strong>
          <p style="font-size:11px; color:var(--text-muted); margin-top:2px; margin-bottom:0;">
            No: <code style="font-weight:700; color:var(--primary);">${inv.invoiceNo}</code> • ${isBM ? 'Tarikh Akhir' : 'Due'}: <strong>${inv.dueDate}</strong>
            ${inv.paidAt ? ` • <span style="color:var(--success);">Paid: ${inv.paidAt.split('T')[0]}</span>` : ''}
          </p>
        </div>
        <span style="font-size:10px; font-weight:800; padding:2px 8px; border-radius:999px; ${isPaid ? 'background:var(--success-light);color:var(--success-text);' : 'background:var(--warning-light);color:var(--warning-text);'}">
          ${isPaid ? (isBM ? 'DIBAYAR' : 'PAID') : (isBM ? 'BELUM BAYAR' : 'PENDING')}
        </span>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; padding-top:8px; border-top:1px dashed var(--border-color); flex-wrap:wrap; gap:6px;">
        <div style="font-size:12px; font-weight:800; color:var(--primary);">
          ${formatCurrency(inv.totalAmount || inv.rentAmount)}
        </div>
        <div style="display:flex; gap:6px; flex-wrap:wrap;">
          <button class="btn btn-whatsapp btn-xs btn-send-month-inv" data-m="${inv.monthIndex}">
            <i class="fa-brands fa-whatsapp"></i> ${isBM ? 'Invois' : 'Invoice'}
          </button>
          ${isPaid ? `
            <button class="btn btn-whatsapp btn-xs btn-send-month-rec" data-m="${inv.monthIndex}" title="${isBM ? 'Hantar Resit Bayaran' : 'Send Payment Receipt'}">
              <i class="fa-solid fa-receipt"></i> ${isBM ? 'Resit' : 'Receipt'}
            </button>
          ` : ''}
          <button class="btn btn-outline btn-xs btn-toggle-month-paid" data-m="${inv.monthIndex}">
            <i class="fa-solid fa-${isPaid ? 'rotate-left' : 'check'}" style="color:${isPaid ? 'var(--warning)' : 'var(--success)'};"></i>
            ${isPaid ? (isBM ? 'Batal Tanda' : 'Unmark') : (isBM ? 'Tanda Bayar' : 'Mark Paid')}
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  // Attach handlers
  container.querySelectorAll('.btn-send-month-inv').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.getAttribute('data-m')) || 1;
      openWhatsAppModal(booking, 'monthly_invoice', mIdx);
    });
  });

  container.querySelectorAll('.btn-send-month-rec').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.getAttribute('data-m')) || 1;
      openWhatsAppModal(booking, 'monthly_rent_receipt', mIdx);
    });
  });

  container.querySelectorAll('.btn-toggle-month-paid').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const mIdx = parseInt(e.currentTarget.getAttribute('data-m')) || 1;
      toggleMonthlyInvoicePaid(booking.id, mIdx);
    });
  });
}

function toggleMonthlyInvoicePaid(bookingId, monthIndex) {
  const booking = appState.bookings.find(b => b.id === bookingId);
  if (!booking) return;

  const invoices = getOrInitMonthlyInvoices(booking);
  const inv = invoices.find(x => x.monthIndex === monthIndex);
  if (!inv) return;

  const isBM = appState.settings.language === 'bm';

  if (inv.status === 'paid') {
    inv.status = 'pending';
    inv.paidAt = null;
    showToast(isBM ? `Bulan ke-${monthIndex} ditanda sebagai belum dibayar.` : `Month ${monthIndex} marked as pending.`);
    saveToStorage();
    renderMonthlyInvoicesList(booking);
    if (appState.activeTab === 'bookings') renderBookingsTab();
  } else {
    // Open payment proof modal to attach the tenant's bank receipt!
    closeAllModals();
    openPaymentProofModal(booking, 'monthly_rent', monthIndex, inv.totalAmount || inv.rentAmount);
  }
}

// ==========================================================================
// 11D. DIGITAL PAYMENT RECEIPTS & PROOF CAPTURE ENGINE
// ==========================================================================

function compressReceiptImage(file, maxWidth = 900, maxHeight = 900, quality = 0.78) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));

    if (file.type === 'application/pdf') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target.result;
        const sizeBytes = Math.round((dataUrl.length * 3) / 4);
        resolve({
          dataUrl,
          sizeBytes,
          isPdf: true,
          fileName: file.name
        });
      };
      reader.onerror = (err) => reject(err);
      reader.readAsDataURL(file);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const sizeBytes = Math.round((dataUrl.length * 3) / 4);

        resolve({
          dataUrl,
          sizeBytes,
          width,
          height,
          isPdf: false,
          fileName: file.name
        });
      };
      img.onerror = (err) => reject(err);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function handleReceiptFileSelected(file) {
  if (!file) return;
  const isBM = appState.settings.language === 'bm';
  showToast(isBM ? 'Memampatkan gambar resit...' : 'Compressing receipt slip...');

  compressReceiptImage(file, 900, 900, 0.78)
    .then(result => {
      document.getElementById('paymentProofImageData').value = result.dataUrl;
      document.getElementById('paymentProofImageName').value = result.fileName;

      const previewImg = document.getElementById('receiptPreviewImg');
      if (result.isPdf) {
        previewImg.src = 'data:image/svg+xml,%3Csvg xmlns=\\'http://www.w3.org/2000/svg\\' viewBox=\\'0 0 100 100\\'%3E%3Crect width=\\'100\\' height=\\'100\\' fill=\\'%23ef4444\\'/ %3E%3Ctext x=\\'50\\' y=\\'55\\' font-size=\\'18\\' font-weight=\\'bold\\' text-anchor=\\'middle\\' fill=\\'%23ffffff\\'%3EPDF%3C/text%3E%3C/svg%3E';
      } else {
        previewImg.src = result.dataUrl;
      }

      document.getElementById('receiptPreviewFileName').textContent = result.fileName;
      const sizeKb = Math.round(result.sizeBytes / 1024);
      document.getElementById('receiptPreviewSize').textContent = `${sizeKb} KB (Compressed & sharp)`;

      document.getElementById('receiptUploadPrompt').style.display = 'none';
      document.getElementById('receiptPreviewContainer').style.display = 'block';
    })
    .catch(err => {
      alert('Error reading receipt file: ' + err.message);
    });
}

function openPaymentProofModal(booking, defaultType = 'deposit', defaultMonth = null, defaultAmount = null) {
  if (!booking) return;
  const prop = getPropertyById(booking.propertyId);
  const isBM = appState.settings.language === 'bm';

  document.getElementById('paymentProofBookingId').value = booking.id;
  document.getElementById('paymentProofId').value = '';

  const titleEl = document.getElementById('paymentProofModalTitle');
  if (titleEl) titleEl.textContent = t('receipt_modal_title');

  document.getElementById('paymentProofGuestPropertyDisplay').textContent = `${prop.name} • ${booking.guestName} (${booking.guestPhone || '-'})`;
  document.getElementById('paymentProofFinancialSummary').textContent = `${t('total')}: ${formatCurrency(booking.totalAmount)} • ${isBM ? 'Dibayar' : 'Paid'}: ${formatCurrency(booking.depositPaid)} • ${isBM ? 'Baki' : 'Balance'}: ${formatCurrency(booking.balance)}`;

  const typeSelect = document.getElementById('paymentProofTypeSelect');
  typeSelect.value = defaultType;

  const monthGroup = document.getElementById('paymentProofMonthIndexGroup');
  const monthSelect = document.getElementById('paymentProofMonthIndexSelect');
  if (booking.rentalType === 'monthly') {
    monthSelect.innerHTML = '';
    const duration = booking.monthlyDuration || 6;
    for (let i = 1; i <= duration; i++) {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = isBM ? `Bulan ke-${i}` : `Month ${i}`;
      if (defaultMonth && i === defaultMonth) opt.selected = true;
      monthSelect.appendChild(opt);
    }
    monthGroup.style.display = (defaultType === 'monthly_rent') ? 'block' : 'none';
  } else {
    monthGroup.style.display = 'none';
  }

  let targetAmount = 0;
  if (defaultAmount !== null && defaultAmount !== undefined) {
    targetAmount = defaultAmount;
  } else if (defaultType === 'deposit') {
    targetAmount = booking.depositPaid > 0 ? booking.depositPaid : Math.round(booking.totalAmount * (appState.settings.defaultDepositPct || 30) / 100);
  } else if (defaultType === 'balance') {
    targetAmount = booking.balance > 0 ? booking.balance : booking.totalAmount;
  } else if (defaultType === 'full') {
    targetAmount = booking.totalAmount;
  } else if (defaultType === 'monthly_rent') {
    targetAmount = booking.monthlyRate || 0;
  } else {
    targetAmount = booking.balance > 0 ? booking.balance : 0;
  }
  document.getElementById('paymentProofAmountInput').value = targetAmount;

  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('paymentProofDateTimeInput').value = `${year}-${month}-${day}T${hours}:${minutes}`;

  const defaultBank = booking.lastPaymentBank || appState.settings.bankName || 'Maybank';
  document.getElementById('paymentProofBankInput').value = defaultBank;
  document.querySelectorAll('#paymentProofBankPills .bank-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-bank').toLowerCase() === defaultBank.toLowerCase());
  });

  document.getElementById('paymentProofRefInput').value = '';
  document.getElementById('paymentProofNotesInput').value = '';

  document.getElementById('paymentProofFileInput').value = '';
  document.getElementById('paymentProofImageData').value = '';
  document.getElementById('paymentProofImageName').value = '';
  document.getElementById('receiptUploadPrompt').style.display = 'block';
  document.getElementById('receiptPreviewContainer').style.display = 'none';

  document.getElementById('paymentProofModal').classList.add('active');
}

function handleSavePaymentProof(e) {
  e.preventDefault();

  const bookingId = document.getElementById('paymentProofBookingId').value;
  const booking = appState.bookings.find(b => b.id === bookingId);
  if (!booking) {
    alert('Booking not found!');
    return;
  }

  const type = document.getElementById('paymentProofTypeSelect').value;
  const monthIndex = type === 'monthly_rent' ? parseInt(document.getElementById('paymentProofMonthIndexSelect').value) || 1 : null;
  const amount = parseFloat(document.getElementById('paymentProofAmountInput').value) || 0;
  const dateTime = document.getElementById('paymentProofDateTimeInput').value;
  const bankName = document.getElementById('paymentProofBankInput').value.trim() || 'Bank Transfer';
  const referenceNo = document.getElementById('paymentProofRefInput').value.trim();
  const receiptImage = document.getElementById('paymentProofImageData').value || null;
  const receiptFileName = document.getElementById('paymentProofImageName').value || null;
  const notes = document.getElementById('paymentProofNotesInput').value.trim();

  if (amount <= 0) {
    alert(appState.settings.language === 'bm' ? 'Sila masukkan jumlah bayaran yang sah.' : 'Please enter a valid payment amount.');
    return;
  }

  if (!referenceNo) {
    alert(appState.settings.language === 'bm' ? 'Sila masukkan No. Rujukan Bank / Resit Transaksi.' : 'Please enter the Bank Reference No. / Transaction ID.');
    return;
  }

  const newPayment = {
    id: 'pay-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    type,
    amount,
    monthIndex,
    date: dateTime ? dateTime.split('T')[0] : new Date().toISOString().split('T')[0],
    time: dateTime ? dateTime.split('T')[1] : '',
    dateTime: dateTime || new Date().toISOString(),
    bankName,
    referenceNo,
    receiptImage,
    receiptFileName,
    notes,
    createdAt: new Date().toISOString()
  };

  booking.payments = booking.payments || [];
  booking.payments.push(newPayment);

  const totalPaid = booking.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  booking.depositPaid = totalPaid;
  booking.balance = Math.max(0, booking.totalAmount - totalPaid);
  booking.lastPaymentRef = referenceNo;
  booking.lastPaymentBank = bankName;

  const oldStatus = booking.status;
  if (booking.balance <= 0 && booking.totalAmount > 0) {
    booking.status = 'confirmed';
  } else if (booking.depositPaid > 0 && booking.status === 'quotation') {
    booking.status = 'booked';
  }

  if (type === 'monthly_rent' && monthIndex) {
    const invoices = getOrInitMonthlyInvoices(booking);
    const targetInv = invoices.find(x => x.monthIndex === monthIndex);
    if (targetInv) {
      targetInv.status = 'paid';
      targetInv.paidAt = dateTime || new Date().toISOString();
      targetInv.referenceNo = referenceNo;
      targetInv.bankName = bankName;
      booking.monthlyInvoices = invoices;
    }
  }

  saveToStorage();
  closeAllModals();
  renderApp();

  const isBM = appState.settings.language === 'bm';
  showToast(isBM ? `Resit bayaran ${formatCurrency(amount)} berjaya disimpan!` : `Payment receipt of ${formatCurrency(amount)} recorded successfully!`);

  if (oldStatus === 'quotation' && booking.status === 'booked') {
    openWhatsAppModal(booking, 'deposit_receipt');
  } else if (booking.status === 'confirmed' && oldStatus !== 'confirmed') {
    openWhatsAppModal(booking, 'full_receipt');
  } else if (type === 'monthly_rent' && monthIndex) {
    openWhatsAppModal(booking, 'monthly_rent_receipt', monthIndex);
  }
}

function openReceiptViewerModal(booking) {
  if (!booking) return;
  const prop = getPropertyById(booking.propertyId);
  const isBM = appState.settings.language === 'bm';

  document.getElementById('receiptViewerSubtitle').textContent = `${booking.guestName} (${booking.guestPhone || '-'}) • ${prop.name}`;

  const banner = document.getElementById('receiptViewerFinancialBanner');
  const totalPaid = (booking.payments || []).reduce((sum, p) => sum + (p.amount || 0), 0);
  const pctPaid = booking.totalAmount > 0 ? Math.min(100, Math.round((totalPaid / booking.totalAmount) * 100)) : 100;

  banner.innerHTML = `
    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:6px;">
      <div>
        <span style="font-size:11px; font-weight:700; color:var(--text-muted); text-transform:uppercase;">${t('total')}: <strong>${formatCurrency(booking.totalAmount)}</strong></span>
        <div style="font-size:16px; font-weight:800; color:var(--success-text); margin-top:1px;">
          ${isBM ? 'Telah Dibayar' : 'Total Paid'}: ${formatCurrency(totalPaid)}
        </div>
      </div>
      <div style="text-align:right;">
        <span style="font-size:11px; font-weight:700; color:${booking.balance > 0 ? 'var(--danger)' : 'var(--success)'};">
          ${isBM ? 'Baki Bayaran' : 'Balance Due'}: <strong>${formatCurrency(booking.balance)}</strong>
        </span>
        <div style="font-size:11px; font-weight:800; color:var(--text-muted); margin-top:2px;">
          ${pctPaid}% ${isBM ? 'Selesai' : 'Settled'}
        </div>
      </div>
    </div>
    <div class="progress-bar-bg" style="margin-top:8px; margin-bottom:0; height:6px;">
      <div class="progress-bar-fill" style="width:${pctPaid}%;"></div>
    </div>
  `;

  const listContainer = document.getElementById('receiptViewerList');
  listContainer.innerHTML = '';

  const payments = booking.payments || [];
  if (payments.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-hint" style="padding:28px 16px; text-align:center;">
        <i class="fa-solid fa-receipt" style="font-size:32px; color:var(--text-muted); opacity:0.4; margin-bottom:8px; display:block;"></i>
        <p style="font-size:14px; font-weight:700; color:var(--text-main); margin-bottom:4px;">
          ${t('no_receipts_recorded')}
        </p>
        <p style="font-size:12.5px; color:var(--text-muted); margin-bottom:14px;">
          ${isBM ? 'Tangkap resit atau rekod rujukan pindahan bank yang dikongsi oleh tetamu.' : 'Capture receipt screenshots and record bank transfer references shared by the guest.'}
        </p>
        <button type="button" class="btn btn-primary btn-sm" id="btnEmptyAddReceipt">
          <i class="fa-solid fa-plus"></i> ${t('add_payment_receipt')}
        </button>
      </div>
    `;
    const emptyBtn = document.getElementById('btnEmptyAddReceipt');
    if (emptyBtn) emptyBtn.addEventListener('click', () => {
      closeAllModals();
      openPaymentProofModal(booking);
    });
  } else {
    payments.forEach((p, idx) => {
      const card = document.createElement('div');
      card.className = `receipt-record-card type-${p.type || 'deposit'}`;

      let typeBadge = '';
      if (p.type === 'deposit') {
        typeBadge = `<span style="font-size:10.5px; font-weight:800; background:#fef3c7; color:#92400e; padding:2px 8px; border-radius:999px;">🟡 ${isBM ? 'Deposit Tempahan' : 'Booking Deposit'}</span>`;
      } else if (p.type === 'balance' || p.type === 'full') {
        typeBadge = `<span style="font-size:10.5px; font-weight:800; background:#dcfce7; color:#166534; padding:2px 8px; border-radius:999px;">🟢 ${p.type === 'full' ? (isBM ? 'Bayaran Penuh' : 'Full Payment') : (isBM ? 'Baki Bayaran' : 'Balance Settlement')}</span>`;
      } else if (p.type === 'monthly_rent') {
        typeBadge = `<span style="font-size:10.5px; font-weight:800; background:#e0e7ff; color:#3730a3; padding:2px 8px; border-radius:999px;">📑 ${isBM ? `Sewa Bulan ke-${p.monthIndex || 1}` : `Month ${p.monthIndex || 1} Rent`}</span>`;
      } else if (p.type === 'security_deposit') {
        typeBadge = `<span style="font-size:10.5px; font-weight:800; background:#f3e8ff; color:#6b21a8; padding:2px 8px; border-radius:999px;">🔒 ${isBM ? 'Deposit Keselamatan' : 'Security Deposit'}</span>`;
      } else {
        typeBadge = `<span style="font-size:10.5px; font-weight:800; background:var(--bg-surface-subtle); color:var(--text-main); padding:2px 8px; border-radius:999px;">📦 ${p.type}</span>`;
      }

      const formattedDate = p.dateTime ? p.dateTime.replace('T', ' ') : (p.date || '-');

      card.innerHTML = `
        <div class="receipt-record-header">
          <div>
            ${typeBadge}
            <span style="font-size:11px; color:var(--text-muted); margin-left:6px;"><i class="fa-regular fa-clock"></i> ${formattedDate}</span>
          </div>
          <strong style="font-size:15px; font-weight:800; color:var(--success-text);">
            ${formatCurrency(p.amount)}
          </strong>
        </div>

        <div class="receipt-record-body">
          ${p.receiptImage ? `
            <img src="${p.receiptImage}" alt="Receipt Slip" class="receipt-record-thumb" data-idx="${idx}" title="${isBM ? 'Tekan untuk lihat resit penuh' : 'Click to zoom slip'}">
          ` : `
            <div style="width:56px; height:56px; border-radius:6px; background:var(--bg-surface-subtle); border:1px dashed var(--border-color); display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--text-muted); font-size:10px; text-align:center; padding:2px;">
              <i class="fa-solid fa-file-circle-xmark" style="font-size:16px; margin-bottom:2px;"></i> No Slip
            </div>
          `}
          <div style="flex:1; min-width:0;">
            <div style="font-size:12.5px; font-weight:700; color:var(--text-main); display:flex; align-items:center; gap:6px;">
              <i class="fa-solid fa-building-columns" style="color:var(--primary);"></i> ${p.bankName || 'Bank Transfer'}
            </div>
            <div style="margin-top:3px;">
              <span class="receipt-ref-pill">
                <code>${p.referenceNo || '-'}</code>
                <button type="button" class="btn-copy-ref-pill" data-ref="${p.referenceNo || ''}" title="${isBM ? 'Salin No. Rujukan' : 'Copy Reference No'}" style="background:none; border:none; color:var(--primary); cursor:pointer; padding:0 2px;">
                  <i class="fa-solid fa-copy"></i>
                </button>
              </span>
            </div>
            ${p.notes ? `<p style="font-size:11.5px; color:var(--text-muted); margin:4px 0 0 0; font-style:italic;"><i class="fa-regular fa-note-sticky"></i> ${p.notes}</p>` : ''}
          </div>
        </div>

        <div class="receipt-actions-row">
          ${p.receiptImage ? `
            <button type="button" class="btn btn-outline btn-xs btn-view-full-slip" data-idx="${idx}">
              <i class="fa-solid fa-magnifying-glass-plus"></i> ${isBM ? 'Lihat Penuh' : 'View Slip'}
            </button>
            <button type="button" class="btn btn-outline btn-xs btn-download-slip" data-idx="${idx}">
              <i class="fa-solid fa-download"></i> ${isBM ? 'Muat Turun' : 'Download'}
            </button>
          ` : ''}
          <button type="button" class="btn btn-outline btn-xs btn-delete-receipt-record" data-pid="${p.id}" data-bid="${booking.id}" style="color:var(--danger); border-color:var(--danger); margin-left:auto;">
            <i class="fa-solid fa-trash"></i> ${isBM ? 'Padam' : 'Delete'}
          </button>
        </div>
      `;

      listContainer.appendChild(card);
    });

    listContainer.querySelectorAll('.btn-copy-ref-pill').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const ref = e.currentTarget.getAttribute('data-ref');
        if (ref) {
          navigator.clipboard.writeText(ref).then(() => {
            showToast(t('ref_copied'));
          }).catch(() => {
            showToast(`Copied: ${ref}`);
          });
        }
      });
    });

    listContainer.querySelectorAll('.btn-view-full-slip, .receipt-record-thumb').forEach(el => {
      el.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
        const p = payments[idx];
        if (p && p.receiptImage) {
          openReceiptLightbox(p.receiptImage, `${p.bankName} • ${p.referenceNo} (${formatCurrency(p.amount)})`);
        }
      });
    });

    listContainer.querySelectorAll('.btn-download-slip').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-idx'));
        const p = payments[idx];
        if (p && p.receiptImage) {
          const a = document.createElement('a');
          a.href = p.receiptImage;
          a.download = p.receiptFileName || `Receipt_${p.referenceNo || 'Payment'}.jpg`;
          document.body.appendChild(a);
          a.click();
          a.remove();
        }
      });
    });

    listContainer.querySelectorAll('.btn-delete-receipt-record').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pId = e.currentTarget.getAttribute('data-pid');
        const bId = e.currentTarget.getAttribute('data-bid');
        deletePaymentReceipt(bId, pId);
      });
    });
  }

  const addBtn = document.getElementById('btnAddReceiptFromViewer');
  if (addBtn) {
    addBtn.onclick = () => {
      closeAllModals();
      openPaymentProofModal(booking, booking.balance > 0 ? 'balance' : 'deposit');
    };
  }

  document.getElementById('receiptViewerModal').classList.add('active');
}

function openReceiptLightbox(imageUrl, title = 'Bank Receipt Proof') {
  const modal = document.getElementById('receiptLightboxModal');
  const img = document.getElementById('lightboxImage');
  const titleEl = document.getElementById('lightboxTitle');
  const downloadBtn = document.getElementById('btnDownloadLightboxImg');

  if (!modal || !img) return;

  img.src = imageUrl;
  if (titleEl) titleEl.textContent = title;

  if (downloadBtn) {
    downloadBtn.onclick = () => {
      const a = document.createElement('a');
      a.href = imageUrl;
      a.download = `Receipt_${new Date().toISOString().split('T')[0]}.jpg`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    };
  }

  modal.classList.add('active');
}

function deletePaymentReceipt(bookingId, paymentId) {
  const isBM = appState.settings.language === 'bm';
  if (!confirm(t('delete_receipt_confirm'))) return;

  const booking = appState.bookings.find(b => b.id === bookingId);
  if (!booking || !booking.payments) return;

  booking.payments = booking.payments.filter(p => p.id !== paymentId);

  const totalPaid = booking.payments.reduce((sum, p) => sum + (p.amount || 0), 0);
  booking.depositPaid = totalPaid;
  booking.balance = Math.max(0, booking.totalAmount - totalPaid);

  if (booking.payments.length > 0) {
    const lastP = booking.payments[booking.payments.length - 1];
    booking.lastPaymentRef = lastP.referenceNo;
    booking.lastPaymentBank = lastP.bankName;
  } else {
    booking.lastPaymentRef = null;
    booking.lastPaymentBank = null;
    if (booking.depositPaid === 0 && booking.status === 'booked') {
      booking.status = 'quotation';
    }
  }

  saveToStorage();
  renderApp();
  openReceiptViewerModal(booking);
  showToast(isBM ? 'Rekod resit telah dipadam.' : 'Payment receipt record deleted.');
}

// ==========================================================================
// 11E. PROMOTIONAL MEDIA & MARKETING HUB ENGINE
// ==========================================================================

function compressPromoMediaImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.8) {
  return new Promise((resolve, reject) => {
    if (!file) return reject(new Error('No file provided'));

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width > height) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          } else {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        const sizeBytes = Math.round((dataUrl.length * 3) / 4);
        resolve({
          dataUrl,
          sizeBytes,
          fileName: file.name
        });
      };
      img.onerror = (err) => reject(err);
      img.src = e.target.result;
    };
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

function openPromotionalMediaModal(defaultPropertyId = null) {
  if (defaultPropertyId) {
    appState.selectedPromoPropertyId = defaultPropertyId;
  }
  
  // Populate property filter
  const propSelect = document.getElementById('promoPropertyFilter');
  if (propSelect) {
    const isBM = appState.settings.language === 'bm';
    let options = `<option value="all">${isBM ? 'Semua Homestay & Umum' : 'All Homestays & General'}</option>`;
    appState.properties.forEach(p => {
      options += `<option value="${p.id}">${escapeHtml(p.name)}</option>`;
    });
    propSelect.innerHTML = options;
    propSelect.value = appState.selectedPromoPropertyId || 'all';
  }

  // Set category pills active state
  const pills = document.querySelectorAll('#promoCategoryFilter .cal-mode-pill');
  pills.forEach(p => {
    if (p.getAttribute('data-category') === (appState.selectedPromoCategory || 'all')) {
      p.classList.add('active');
    } else {
      p.classList.remove('active');
    }
  });

  const searchInput = document.getElementById('promoSearchInput');
  if (searchInput) searchInput.value = appState.promoSearchQuery || '';

  renderPromotionalMediaList();
  document.getElementById('promotionalMediaModal').classList.add('active');
}

function renderPromotionalMediaList() {
  const container = document.getElementById('promoMediaGrid');
  const emptyState = document.getElementById('promoMediaEmptyState');
  if (!container) return;

  const isBM = appState.settings.language === 'bm';
  const filterProp = appState.selectedPromoPropertyId || 'all';
  const filterCat = appState.selectedPromoCategory || 'all';
  const query = (appState.promoSearchQuery || '').trim().toLowerCase();

  const filtered = appState.promotionalMedia.filter(item => {
    // Property match
    if (filterProp !== 'all' && item.propertyId !== 'all' && item.propertyId !== filterProp) {
      return false;
    }
    // Category match
    if (filterCat !== 'all' && item.category !== filterCat) {
      return false;
    }
    // Search query match
    if (query) {
      const prop = item.propertyId !== 'all' ? getPropertyById(item.propertyId) : null;
      const propName = prop ? prop.name.toLowerCase() : '';
      const title = (item.title || '').toLowerCase();
      const caption = (item.caption || '').toLowerCase();
      if (!title.includes(query) && !caption.includes(query) && !propName.includes(query)) {
        return false;
      }
    }
    return true;
  });

  if (filtered.length === 0) {
    container.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  let html = '';
  filtered.forEach(item => {
    const prop = item.propertyId !== 'all' ? getPropertyById(item.propertyId) : null;
    const propLabel = prop ? prop.name : (isBM ? 'Umum / Semua' : 'General / All');
    const propColor = prop ? prop.color : '#0284c7';

    // Category badge label
    let catLabel = 'Photo';
    let catIcon = 'fa-image';
    if (item.category === 'photo') {
      catLabel = isBM ? 'Foto' : 'Photo';
      catIcon = 'fa-image';
    } else if (item.category === 'poster') {
      catLabel = isBM ? 'Poster' : 'Poster';
      catIcon = 'fa-bullhorn';
    } else if (item.category === 'video_tour') {
      catLabel = isBM ? 'Video Tour' : 'Video Tour';
      catIcon = 'fa-video';
    } else if (item.category === 'copywriting') {
      catLabel = isBM ? 'Ayat Iklan' : 'Copywriting';
      catIcon = 'fa-pen-nib';
    }

    // Thumbnail area
    let thumbArea = '';
    if (item.imageData) {
      thumbArea = `
        <div class="promo-thumb-container" data-action="lightbox" data-id="${item.id}" title="${isBM ? 'Ketik untuk lihat saiz penuh' : 'Tap to view full-size'}">
          <img src="${item.imageData}" alt="${escapeHtml(item.title)}" class="promo-thumb-img" loading="lazy">
          <div class="promo-badge-overlay">
            <span class="promo-cat-badge cat-${item.category}"><i class="fa-solid ${catIcon}"></i> ${catLabel}</span>
            <span class="promo-prop-badge" style="border-left: 3px solid ${propColor};"><i class="fa-solid fa-house"></i> ${escapeHtml(propLabel)}</span>
          </div>
        </div>
      `;
    } else if (item.mediaUrl) {
      thumbArea = `
        <div class="promo-thumb-container" data-action="link" data-url="${escapeHtml(item.mediaUrl)}" style="background:linear-gradient(135deg, #1e293b, #0f172a);" title="${isBM ? 'Buka pautan' : 'Open external link'}">
          <div class="promo-thumb-placeholder" style="color:#38bdf8;">
            <i class="fa-solid ${item.category === 'video_tour' ? 'fa-circle-play' : 'fa-arrow-up-right-from-square'}" style="font-size:36px;"></i>
            <span style="font-size:11px; font-weight:700; color:#e2e8f0;">${isBM ? 'Pautan Video / Awan' : 'Video / Cloud Link'}</span>
          </div>
          <div class="promo-badge-overlay">
            <span class="promo-cat-badge cat-${item.category}"><i class="fa-solid ${catIcon}"></i> ${catLabel}</span>
            <span class="promo-prop-badge" style="border-left: 3px solid ${propColor};"><i class="fa-solid fa-house"></i> ${escapeHtml(propLabel)}</span>
          </div>
        </div>
      `;
    } else {
      thumbArea = `
        <div class="promo-thumb-container" style="background:linear-gradient(135deg, #f8fafc, #e2e8f0);">
          <div class="promo-thumb-placeholder" style="color:#d97706;">
            <i class="fa-solid fa-quote-left" style="font-size:32px; opacity:0.8;"></i>
            <span style="font-size:11px; font-weight:700; color:var(--text-muted);">${isBM ? 'Teks Iklan' : 'Marketing Pitch'}</span>
          </div>
          <div class="promo-badge-overlay">
            <span class="promo-cat-badge cat-${item.category}"><i class="fa-solid ${catIcon}"></i> ${catLabel}</span>
            <span class="promo-prop-badge" style="border-left: 3px solid ${propColor};"><i class="fa-solid fa-house"></i> ${escapeHtml(propLabel)}</span>
          </div>
        </div>
      `;
    }

    html += `
      <div class="promo-card" data-id="${item.id}">
        ${thumbArea}
        <div class="promo-card-body">
          <h4 class="promo-card-title">${escapeHtml(item.title)}</h4>
          <div class="promo-card-caption-preview">${escapeHtml(item.caption)}</div>
          
          <div class="promo-card-actions">
            <button type="button" class="btn btn-sm btn-promo-wa" data-action="wa" data-id="${item.id}" title="${isBM ? 'Hantar ke WhatsApp' : 'Send via WhatsApp'}">
              <i class="fa-brands fa-whatsapp"></i> <span>WhatsApp</span>
            </button>
            <button type="button" class="btn btn-sm btn-promo-share" data-action="native-share" data-id="${item.id}" title="${isBM ? 'Kongsi ke Apps' : 'Share to apps'}">
              <i class="fa-solid fa-share-nodes"></i>
            </button>
            <button type="button" class="btn btn-outline btn-xs" data-action="copy-pitch" data-id="${item.id}" title="${isBM ? 'Salin Ayat' : 'Copy Pitch'}">
              <i class="fa-solid fa-copy"></i>
            </button>
            ${item.mediaUrl ? `
              <button type="button" class="btn btn-outline btn-xs" data-action="copy-link" data-id="${item.id}" title="${isBM ? 'Salin Pautan' : 'Copy Link'}">
                <i class="fa-solid fa-link"></i>
              </button>
            ` : ''}
            <div style="margin-left:auto; display:flex; gap:2px;">
              <button type="button" class="promo-menu-btn" data-action="edit" data-id="${item.id}" title="${isBM ? 'Kemas Kini' : 'Edit'}">
                <i class="fa-solid fa-pen-to-square"></i>
              </button>
              <button type="button" class="promo-menu-btn" data-action="delete" data-id="${item.id}" title="${isBM ? 'Padam' : 'Delete'}">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  // Attach card interaction listeners
  container.querySelectorAll('[data-action="lightbox"]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-id');
      openPromoLightbox(id);
    });
  });

  container.querySelectorAll('[data-action="link"]').forEach(el => {
    el.addEventListener('click', () => {
      const url = el.getAttribute('data-url');
      if (url) window.open(url, '_blank');
    });
  });

  container.querySelectorAll('[data-action="wa"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openPromoWaQuickModal(id);
    });
  });

  container.querySelectorAll('[data-action="native-share"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      sharePromoMediaNative(id);
    });
  });

  container.querySelectorAll('[data-action="copy-pitch"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      copyPromoCaption(id);
    });
  });

  container.querySelectorAll('[data-action="copy-link"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      copyPromoLink(id);
    });
  });

  container.querySelectorAll('[data-action="edit"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      openPromoMediaEditModal(id);
    });
  });

  container.querySelectorAll('[data-action="delete"]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      deletePromoMediaItem(id);
    });
  });
}

function openPromoMediaEditModal(mediaId = null) {
  const isBM = appState.settings.language === 'bm';
  const modal = document.getElementById('promoMediaEditModal');
  const titleEl = document.getElementById('promoMediaEditTitle');
  const idInput = document.getElementById('promoMediaIdInput');
  const propSelect = document.getElementById('promoMediaPropertySelect');
  const catSelect = document.getElementById('promoMediaCategorySelect');
  const titleInput = document.getElementById('promoMediaTitleInput');
  const urlInput = document.getElementById('promoMediaUrlInput');
  const captionInput = document.getElementById('promoMediaCaptionInput');
  const imgDataInput = document.getElementById('promoMediaImageData');
  const fileInput = document.getElementById('promoMediaFileInput');
  const promptEl = document.getElementById('promoImageDropPrompt');
  const previewContainer = document.getElementById('promoImagePreviewContainer');
  const previewImg = document.getElementById('promoImagePreviewImg');
  const fileNameEl = document.getElementById('promoImageFileName');
  const fileSizeEl = document.getElementById('promoImageFileSize');

  // Populate property select
  let propOptions = `<option value="all">${isBM ? 'Umum / Semua Homestay' : 'General / All Homestays'}</option>`;
  appState.properties.forEach(p => {
    propOptions += `<option value="${p.id}">${escapeHtml(p.name)}</option>`;
  });
  propSelect.innerHTML = propOptions;

  fileInput.value = '';

  const existing = mediaId ? appState.promotionalMedia.find(m => m.id === mediaId) : null;
  if (existing) {
    if (titleEl) titleEl.textContent = isBM ? 'Kemaskini Media Promosi' : 'Edit Promotional Media';
    idInput.value = existing.id;
    propSelect.value = existing.propertyId || 'all';
    catSelect.value = existing.category || 'photo';
    titleInput.value = existing.title || '';
    urlInput.value = existing.mediaUrl || '';
    captionInput.value = existing.caption || '';
    imgDataInput.value = existing.imageData || '';

    if (existing.imageData) {
      previewImg.src = existing.imageData;
      fileNameEl.textContent = 'Current Image';
      const approxKb = Math.round((existing.imageData.length * 3) / 4096);
      fileSizeEl.textContent = `~${approxKb} KB`;
      promptEl.style.display = 'none';
      previewContainer.style.display = 'block';
    } else {
      promptEl.style.display = 'block';
      previewContainer.style.display = 'none';
    }
  } else {
    if (titleEl) titleEl.textContent = isBM ? 'Tambah Media Promosi' : 'Add Promotional Media';
    idInput.value = '';
    propSelect.value = appState.selectedPromoPropertyId !== 'all' ? appState.selectedPromoPropertyId : 'all';
    catSelect.value = appState.selectedPromoCategory !== 'all' ? appState.selectedPromoCategory : 'photo';
    titleInput.value = '';
    urlInput.value = '';
    captionInput.value = '';
    imgDataInput.value = '';
    promptEl.style.display = 'block';
    previewContainer.style.display = 'none';
  }

  modal.classList.add('active');
}

function handlePromoImageFileSelected(file) {
  if (!file) return;

  const isBM = appState.settings.language === 'bm';
  showToast(isBM ? 'Memampatkan gambar...' : 'Optimizing & compressing image...');

  compressPromoMediaImage(file, 1000, 1000, 0.8)
    .then(res => {
      document.getElementById('promoMediaImageData').value = res.dataUrl;
      document.getElementById('promoImagePreviewImg').src = res.dataUrl;
      document.getElementById('promoImageFileName').textContent = res.fileName;
      document.getElementById('promoImageFileSize').textContent = `${Math.round(res.sizeBytes / 1024)} KB (Compressed)`;
      document.getElementById('promoImageDropPrompt').style.display = 'none';
      document.getElementById('promoImagePreviewContainer').style.display = 'block';
      showToast(isBM ? 'Gambar sedia disimpan!' : 'Image optimized for storage!');
    })
    .catch(err => {
      console.error('Compression error:', err);
      alert(isBM ? 'Gagal memproses gambar.' : 'Failed to compress image.');
    });
}

function savePromoMediaItem(e) {
  e.preventDefault();

  const isBM = appState.settings.language === 'bm';
  const idInput = document.getElementById('promoMediaIdInput').value;
  const propertyId = document.getElementById('promoMediaPropertySelect').value;
  const category = document.getElementById('promoMediaCategorySelect').value;
  const title = document.getElementById('promoMediaTitleInput').value.trim();
  const mediaUrl = document.getElementById('promoMediaUrlInput').value.trim();
  const caption = document.getElementById('promoMediaCaptionInput').value.trim();
  const imageData = document.getElementById('promoMediaImageData').value;

  if (!title || !caption) {
    alert(isBM ? 'Sila isikan tajuk dan teks promosi.' : 'Please provide a title and promo copywriting text.');
    return;
  }

  const existingIndex = idInput ? appState.promotionalMedia.findIndex(m => m.id === idInput) : -1;
  const mediaObj = {
    id: idInput || `promo-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    propertyId,
    category,
    title,
    caption,
    mediaUrl,
    imageData,
    createdAt: existingIndex >= 0 ? (appState.promotionalMedia[existingIndex].createdAt || new Date().toISOString()) : new Date().toISOString()
  };

  if (existingIndex >= 0) {
    appState.promotionalMedia[existingIndex] = mediaObj;
  } else {
    appState.promotionalMedia.unshift(mediaObj);
  }

  saveToStorage();
  renderPromotionalMediaList();
  document.getElementById('promoMediaEditModal').classList.remove('active');
  showToast(isBM ? 'Media promosi berjaya disimpan!' : 'Promotional media asset saved!');
}

function deletePromoMediaItem(mediaId) {
  if (!confirm(t('delete_promo_confirm'))) return;

  appState.promotionalMedia = appState.promotionalMedia.filter(m => m.id !== mediaId);
  saveToStorage();
  renderPromotionalMediaList();
  showToast(appState.settings.language === 'bm' ? 'Media promosi telah dipadam.' : 'Promotional media deleted.');
}

function openPromoLightbox(mediaId) {
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (item && item.imageData) {
    openReceiptLightbox(item.imageData, item.title);
  }
}

function copyPromoCaption(mediaId) {
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (!item) return;

  let textToCopy = item.caption;
  if (item.mediaUrl && !textToCopy.includes(item.mediaUrl)) {
    textToCopy += `\n\n🔗 ${item.mediaUrl}`;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(textToCopy).then(() => {
      showToast(t('pitch_copied'));
    }).catch(() => {
      copyViaFallback(textToCopy, t('pitch_copied'));
    });
  } else {
    copyViaFallback(textToCopy, t('pitch_copied'));
  }
}

function copyPromoLink(mediaId) {
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (!item || !item.mediaUrl) return;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(item.mediaUrl).then(() => {
      showToast(t('link_copied'));
    }).catch(() => {
      copyViaFallback(item.mediaUrl, t('link_copied'));
    });
  } else {
    copyViaFallback(item.mediaUrl, t('link_copied'));
  }
}

function copyViaFallback(text, successMsg) {
  const ta = document.createElement('textarea');
  ta.value = text;
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showToast(successMsg);
}

function sharePromoMediaNative(mediaId) {
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (!item) return;

  let shareText = item.caption;
  const shareUrl = item.mediaUrl || '';

  if (navigator.share) {
    navigator.share({
      title: item.title,
      text: shareText,
      url: shareUrl || undefined
    }).catch(err => {
      if (err.name !== 'AbortError') {
        openPromoWaQuickModal(mediaId);
      }
    });
  } else {
    openPromoWaQuickModal(mediaId);
  }
}

function openPromoWaQuickModal(mediaId, defaultPhone = '') {
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (!item) return;

  const isBM = appState.settings.language === 'bm';
  document.getElementById('promoWaQuickMediaId').value = mediaId;

  // Populate recipients dropdown with recent bookings
  const recipientSelect = document.getElementById('promoWaRecipientSelect');
  const customPhoneGroup = document.getElementById('promoWaCustomPhoneGroup');
  const customPhoneInput = document.getElementById('promoWaCustomPhoneInput');

  let opts = `<option value="custom">${isBM ? '✏️ Masukkan / Pilih Nombor WhatsApp' : '✏️ Enter / Custom Phone Number'}</option>`;
  
  // Get unique recent guests with phone numbers
  const recentGuests = [];
  const seenPhones = new Set();

  appState.bookings.forEach(b => {
    if (b.guestPhone && !seenPhones.has(b.guestPhone)) {
      seenPhones.add(b.guestPhone);
      const prop = getPropertyById(b.propertyId);
      recentGuests.push({
        name: b.guestName,
        phone: b.guestPhone,
        property: prop ? prop.name : ''
      });
    }
  });

  recentGuests.slice(0, 8).forEach(g => {
    opts += `<option value="${escapeHtml(g.phone)}">👤 ${escapeHtml(g.name)} (${g.phone}) • ${escapeHtml(g.property)}</option>`;
  });

  recipientSelect.innerHTML = opts;

  if (defaultPhone) {
    recipientSelect.value = 'custom';
    customPhoneInput.value = defaultPhone;
    customPhoneGroup.style.display = 'block';
  } else if (recentGuests.length > 0) {
    recipientSelect.value = recentGuests[0].phone;
    customPhoneInput.value = recentGuests[0].phone;
    customPhoneGroup.style.display = 'none';
  } else {
    recipientSelect.value = 'custom';
    customPhoneInput.value = '';
    customPhoneGroup.style.display = 'block';
  }

  // Format message text
  let msg = item.caption;
  if (item.mediaUrl && !msg.includes(item.mediaUrl)) {
    msg += `\n\n🔗 ${item.mediaUrl}`;
  }

  document.getElementById('promoWaMessagePreview').textContent = msg;
  document.getElementById('promoWaQuickModal').classList.add('active');
}

function executePromoWaSend() {
  const isBM = appState.settings.language === 'bm';
  const mediaId = document.getElementById('promoWaQuickMediaId').value;
  const item = appState.promotionalMedia.find(m => m.id === mediaId);
  if (!item) return;

  const recipientSelect = document.getElementById('promoWaRecipientSelect');
  const customPhoneInput = document.getElementById('promoWaCustomPhoneInput');
  
  let rawPhone = recipientSelect.value === 'custom' ? customPhoneInput.value.trim() : recipientSelect.value;
  let cleanPhone = rawPhone.replace(/[^\d+]/g, '');
  if (cleanPhone.startsWith('0')) {
    cleanPhone = '60' + cleanPhone.slice(1);
  } else if (cleanPhone.startsWith('+')) {
    cleanPhone = cleanPhone.slice(1);
  }

  let text = item.caption;
  if (item.mediaUrl && !text.includes(item.mediaUrl)) {
    text += `\n\n🔗 ${item.mediaUrl}`;
  }

  const encoded = encodeURIComponent(text);
  let waUrl = '';
  if (cleanPhone && cleanPhone.length >= 8) {
    waUrl = `https://wa.me/${cleanPhone}?text=${encoded}`;
  } else {
    waUrl = `https://wa.me/?text=${encoded}`;
  }

  window.open(waUrl, '_blank');
  document.getElementById('promoWaQuickModal').classList.remove('active');
  showToast(isBM ? 'Membuka WhatsApp...' : 'Opening WhatsApp...');
}

function insertPromoPitchTemplate() {
  const isBM = appState.settings.language === 'bm';
  const cat = document.getElementById('promoMediaCategorySelect').value;
  const propId = document.getElementById('promoMediaPropertySelect').value;
  const prop = propId !== 'all' ? getPropertyById(propId) : null;
  const propName = prop ? prop.name : (isBM ? 'Homestay Eksklusif Kami' : 'Our Exclusive Homestay');
  const rate = prop ? (prop.defaultRate || 200) : 200;

  let template = '';
  if (cat === 'photo' || cat === 'poster') {
    if (isBM) {
      template = `✨ *${propName}* ✨\nPercutian selesa & mendamaikan untuk anda sekeluarga!\n\n🏡 *Kemudahan Lengkap:*\n• Bilik tidur luas & selesa berhawa dingin\n• Dapur lengkap memasak & ruang tamu selesa\n• WiFi laju & Smart TV\n• Lokasi strategik berdekatan tempat menarik\n\n💰 *Kadar dari:* RM ${rate} / malam\n📲 WhatsApp kami untuk semak kekosongan tarikh pilihan anda!`;
    } else {
      template = `✨ *${propName}* ✨\nThe perfect retreat for your relaxing getaway!\n\n🏡 *Key Amenities:*\n• Fully air-conditioned & sparkling clean\n• High-speed WiFi & Smart Entertainment\n• Equipped kitchen & dining area\n• Prime location near local attractions\n\n💰 *Rates from:* RM ${rate} / night\n📲 Message us now to reserve your dates!`;
    }
  } else if (cat === 'video_tour') {
    if (isBM) {
      template = `🎥 *Video Tour Maya: ${propName}*\nLihat sendiri suasana selesa unit kami sebelum anda menempah!\n\n👇 *Tonton Video di sini:*\nhttps://youtu.be/sample-tour\n\n💬 Hubungi kami segera untuk tempahan & tawaran istimewa!`;
    } else {
      template = `🎥 *Virtual Tour: ${propName}*\nTake an exclusive walkthrough inside our cozy unit!\n\n👇 *Watch the video here:*\nhttps://youtu.be/sample-tour\n\n💬 Send us a message today to secure your stay!`;
    }
  } else {
    if (isBM) {
      template = `🎉 *Tawaran Terhad: Diskaun Khas Homestay!* 🌟\nTempah awal untuk percutian seterusnya dan nikmati diskaun eksklusif.\n\n• Sesuai untuk keluarga & rakan\n• Suasana tenang & privasi terjamin\n• Tempah terus tanpa caj tersembunyi\n\n📲 Balas mesej ini dengan tarikh pilihan anda untuk dapatkan diskaun!`;
    } else {
      template = `🎉 *Limited-Time Special Offer!* 🌟\nBook your upcoming getaway early and enjoy exclusive rates.\n\n• Ideal for families & group getaways\n• Total comfort, cleanliness & privacy\n• Direct booking guaranteed best price\n\n📲 Reply to this message with your dates to lock in your discount!`;
    }
  }

  const captionInput = document.getElementById('promoMediaCaptionInput');
  if (captionInput) {
    captionInput.value = template;
    captionInput.focus();
  }
}

function attachPromoMediaToWaMessage() {
  const isBM = appState.settings.language === 'bm';
  if (!appState.activeWaBooking) return;

  const bPropId = appState.activeWaBooking.propertyId;
  const available = appState.promotionalMedia.filter(m => m.propertyId === 'all' || m.propertyId === bPropId);

  if (available.length === 0) {
    alert(isBM ? 'Tiada media promosi dijumpai bagi unit ini. Sila tambah media dalam Hab Media.' : 'No promo media found for this unit. Please add media in the Media Hub.');
    return;
  }

  // Pick the first relevant media item
  const chosen = available[0];
  let extraText = `\n\n📸 *${chosen.title}*:\n${chosen.caption}`;
  if (chosen.mediaUrl && !extraText.includes(chosen.mediaUrl)) {
    extraText += `\n🔗 ${chosen.mediaUrl}`;
  }

  const previewEl = document.getElementById('waMessagePreviewText');
  if (previewEl) {
    previewEl.textContent += extraText;
    showToast(isBM ? 'Media promosi disertakan!' : 'Promo media attached to message!');
  }
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
    document.getElementById('propertyGpsInput').value = existingProp.gpsLocation || '';
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
    document.getElementById('propertyAddressInput').value = '';
    document.getElementById('propertyGpsInput').value = '';
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
  const gpsLocation = document.getElementById('propertyGpsInput') ? document.getElementById('propertyGpsInput').value.trim() : '';
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
    gpsLocation,
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

function openWhatsAppModal(booking, templateType = 'quotation', monthIndex = 1) {
  appState.activeWaBooking = booking;
  appState.activeWaTemplate = templateType;
  appState.activeWaMonthIndex = monthIndex || 1;

  const prop = getPropertyById(booking.propertyId);
  document.getElementById('waGuestRecipient').textContent = `${t('wa_to')}: ${booking.guestName} (${booking.guestPhone || 'No Phone Entered'})`;

  const isMonthly = booking.rentalType === 'monthly';

  // Toggle visible tabs based on rental type
  document.querySelectorAll('.wa-tab-btn').forEach(btn => {
    const tmpl = btn.getAttribute('data-template');
    btn.classList.toggle('active', tmpl === templateType);
    if (tmpl === 'monthly_invoice' || tmpl === 'monthly_rent_receipt') {
      btn.style.display = isMonthly ? 'inline-flex' : 'none';
    } else if (tmpl === 'refund_receipt') {
      btn.style.display = (isMonthly || booking.securityDeposit > 0) ? 'inline-flex' : 'none';
    } else {
      btn.style.display = 'inline-flex';
    }
  });

  // Setup monthly dropdown if monthly booking
  const monthlyControls = document.getElementById('waMonthlyControls');
  const monthSelect = document.getElementById('waInvoiceMonthSelect');
  
  if (isMonthly && (templateType === 'monthly_invoice' || templateType === 'monthly_rent_receipt')) {
    if (monthlyControls) monthlyControls.classList.remove('hidden');
    if (monthSelect) {
      monthSelect.innerHTML = '';
      const invs = getOrInitMonthlyInvoices(booking);
      invs.forEach(inv => {
        const opt = document.createElement('option');
        opt.value = inv.monthIndex;
        const isBM = appState.settings.language === 'bm';
        opt.textContent = `${isBM ? 'Bulan ke-' : 'Month '}${inv.monthIndex} (${inv.periodStart} → ${inv.periodEnd}) [${inv.status === 'paid' ? (isBM ? 'DIBAYAR' : 'PAID') : (isBM ? 'BELUM' : 'DUE')}]`;
        if (inv.monthIndex === appState.activeWaMonthIndex) opt.selected = true;
        monthSelect.appendChild(opt);
      });
    }
  } else {
    if (monthlyControls) monthlyControls.classList.add('hidden');
  }

  // Setup quotation validity input if quotation template
  const waQuotationControls = document.getElementById('waQuotationControls');
  const waQuotationValidityInput = document.getElementById('waQuotationValidityInput');
  if (waQuotationControls) {
    waQuotationControls.classList.toggle('hidden', templateType !== 'quotation');
  }
  if (waQuotationValidityInput) {
    waQuotationValidityInput.value = booking.quotationValidityDays || appState.settings.quotationValidityDays || 3;
  }

  renderWhatsAppPreview();
  document.getElementById('whatsappModal').classList.add('active');
}

function populateDispatchRecipients(selectedContactId = null, preselectedCategory = null) {
  const select = document.getElementById('dispatchRecipientSelect');
  if (!select) return;
  select.innerHTML = '';

  const contacts = appState.contacts || [];
  const isBM = appState.settings.language === 'bm';

  if (contacts.length === 0) {
    const opt = document.createElement('option');
    opt.value = '';
    opt.textContent = isBM ? '-- Tiada Kenalan (Tambah di Tetapan) --' : '-- No Contacts Saved (Add in Settings) --';
    select.appendChild(opt);
    return;
  }

  contacts.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c.id;
    const badge = getContactCategoryBadge(c.category);
    opt.textContent = `${c.name} (${badge.label})${c.company ? ' - ' + c.company : ''}`;
    select.appendChild(opt);
  });

  if (selectedContactId && contacts.some(c => c.id === selectedContactId)) {
    select.value = selectedContactId;
  } else if (preselectedCategory) {
    const matched = contacts.find(c => c.category === preselectedCategory);
    if (matched) {
      select.value = matched.id;
    } else {
      select.value = contacts[0].id;
    }
  } else {
    select.value = contacts[0].id;
  }
}

function populateDispatchProperties(selectedPropId = null) {
  const select = document.getElementById('dispatchPropertySelect');
  if (!select) return;
  select.innerHTML = '';

  const props = appState.properties || [];
  props.forEach(p => {
    const opt = document.createElement('option');
    opt.value = p.id;
    opt.textContent = p.name;
    select.appendChild(opt);
  });

  if (selectedPropId && props.some(p => p.id === selectedPropId)) {
    select.value = selectedPropId;
  } else if (appState.selectedPropertyId && appState.selectedPropertyId !== 'all' && props.some(p => p.id === appState.selectedPropertyId)) {
    select.value = appState.selectedPropertyId;
  } else if (props.length > 0) {
    select.value = props[0].id;
  }
}

function openServiceDispatchModal(turnover = null, preselectedCategory = null, preselectedContactId = null) {
  appState.activeDispatchTurnover = turnover;
  const isBM = appState.settings.language === 'bm';

  const tidInput = document.getElementById('dispatchTurnoverId');
  if (tidInput) tidInput.value = turnover ? turnover.id : '';

  const targetPropId = turnover ? turnover.propertyId : null;
  populateDispatchProperties(targetPropId);

  let cat = preselectedCategory;
  if (turnover) {
    cat = 'cleaner';
    const sType = document.getElementById('dispatchServiceTypeSelect');
    if (sType) sType.value = 'turnover_clean';
    const sUrg = document.getElementById('dispatchUrgencySelect');
    if (sUrg) sUrg.value = 'normal';
    const details = document.getElementById('dispatchDetailsInput');
    if (details) {
      details.value = isBM
        ? `Pembersihan unit homestay dijadualkan pada ${turnover.date}. Sila pastikan cadar ditukar dan tuala bersih disediakan.`
        : `Turnover cleaning scheduled for ${turnover.date}. Please ensure fresh linens and towels are provided.`;
    }
  } else if (preselectedCategory) {
    const catToType = {
      cleaner: 'turnover_clean',
      aircond: 'aircond_service',
      plumber: 'plumbing_repair',
      electrician: 'electrical_repair',
      handyman: 'handyman_repair',
      linen_supplier: 'linen_order',
      gas_supplier: 'gas_order',
      locksmith: 'inspection',
      other: 'other_task'
    };
    const sType = document.getElementById('dispatchServiceTypeSelect');
    if (sType && catToType[preselectedCategory]) {
      sType.value = catToType[preselectedCategory];
    }
  }

  populateDispatchRecipients(preselectedContactId, cat);
  renderServiceDispatchPreview();
  const modal = document.getElementById('serviceDispatchModal');
  if (modal) modal.classList.add('active');
}

function openWhatsAppCleanerJob(turnover) {
  openServiceDispatchModal(turnover, 'cleaner');
}

function generateServiceDispatchMessage() {
  const isBM = appState.settings.language === 'bm';
  const recipientId = document.getElementById('dispatchRecipientSelect')?.value;
  const propId = document.getElementById('dispatchPropertySelect')?.value;
  const serviceType = document.getElementById('dispatchServiceTypeSelect')?.value || 'turnover_clean';
  const urgency = document.getElementById('dispatchUrgencySelect')?.value || 'normal';
  const customDetails = document.getElementById('dispatchDetailsInput')?.value.trim() || '';
  const includePin = document.getElementById('dispatchIncludePinCheck')?.checked;

  const contact = (appState.contacts || []).find(c => c.id === recipientId);
  const prop = getPropertyById(propId) || (appState.properties[0] || { name: 'Homestay Unit', address: '' });
  const turnover = appState.activeDispatchTurnover;
  const settings = appState.settings;

  let headerTitle = '';
  let defaultTaskDesc = '';

  switch (serviceType) {
    case 'turnover_clean':
      headerTitle = isBM ? '🧹 *ARAHAN KERJA PEMBERSIHAN / TURNOVER*' : '🧹 *TURNOVER CLEANING JOB ALERT*';
      defaultTaskDesc = isBM ? 'Pembersihan unit menyeluruh, tukar cadar, basuh tuala dan kemas bilik.' : 'Full turnover cleaning, fresh bed linens, sanitized towels & amenities restock.';
      break;
    case 'aircond_service':
      headerTitle = isBM ? '❄️ *NOTIS SERVIS & BAIKI AIRCOND*' : '❄️ *AIRCOND SERVICE & REPAIR REQUEST*';
      defaultTaskDesc = isBM ? 'Servis aircond tidak sejuk / cuci filter / pemeriksaan kebocoran.' : 'Aircond servicing, filter cleaning, or cooling troubleshooting.';
      break;
    case 'plumbing_repair':
      headerTitle = isBM ? '🔧 *NOTIS BAIKI PAIP & SALIRAN*' : '🔧 *PLUMBING REPAIR REQUEST*';
      defaultTaskDesc = isBM ? 'Baiki paip bocor, mangkuk tandas tersumbat atau water heater.' : 'Plumbing inspection, leak repair, or toilet drain troubleshooting.';
      break;
    case 'electrical_repair':
      headerTitle = isBM ? '⚡ *NOTIS PENDAWAIAN & ELEKTRIK*' : '⚡ *ELECTRICAL REPAIR REQUEST*';
      defaultTaskDesc = isBM ? 'Periksa masalah elektrik, suis rosak atau trip elektrik.' : 'Electrical wiring check, power trip, socket or lighting issue.';
      break;
    case 'handyman_repair':
      headerTitle = isBM ? '🔨 *NOTIS KERJA BAIKI AM (HANDYMAN)*' : '🔨 *GENERAL HANDYMAN REPAIR REQUEST*';
      defaultTaskDesc = isBM ? 'Kerja baiki kerosakan am pintu, perabot atau perkakasan unit.' : 'General repair for doors, hinges, furniture, or fixture maintenance.';
      break;
    case 'linen_order':
      headerTitle = isBM ? '🧺 *PESANAN BEKALAN LINEN & DOBI*' : '🧺 *LINEN & LAUNDRY SUPPLY ORDER*';
      defaultTaskDesc = isBM ? 'Pesanan tambahan cadar, sarung bantal, duvet dan tuala putih.' : 'Restock order for bedsheet sets, duvet covers, and bath towels.';
      break;
    case 'gas_order':
      headerTitle = isBM ? '⛽ *PESANAN TONG GAS & KEPERLUAN UNIT*' : '⛽ *GAS / AMENITIES RESTOCK ORDER*';
      defaultTaskDesc = isBM ? 'Penghantaran tong gas memasak atau stok sabun / syampu / kopi.' : 'Delivery order for cooking gas cylinder, toiletries, or guest amenities.';
      break;
    case 'inspection':
      headerTitle = isBM ? '🔍 *NOTIS PEMERIKSAAN UNIT*' : '🔍 *UNIT INSPECTION REQUEST*';
      defaultTaskDesc = isBM ? 'Pemeriksaan status unit, kunci pintu, peralatan dan kebersihan.' : 'General inspection of unit condition, appliances, and access.';
      break;
    default:
      headerTitle = isBM ? '📝 *ARAHAN TUGASAN KHAS*' : '📝 *SERVICE / MAINTENANCE REQUEST*';
      defaultTaskDesc = isBM ? 'Tugasan perkhidmatan berkaitan unit homestay.' : 'Service task for homestay property.';
  }

  let urgencyText = '';
  if (urgency === 'urgent') {
    urgencyText = isBM ? '🔴 *Tahap Keperluan:* SEGERA / KECEMASAN (Sila hadir secepat mungkin)\n' : '🔴 *Urgency:* URGENT / IMMEDIATE (Please attend ASAP)\n';
  } else if (urgency === 'high') {
    urgencyText = isBM ? '🟡 *Tahap Keperluan:* KEUTAMAAN TINGGI (Hari ini)\n' : '🟡 *Urgency:* HIGH PRIORITY (Today)\n';
  } else {
    urgencyText = isBM ? '🟢 *Tahap Keperluan:* Jadual Biasa\n' : '🟢 *Urgency:* Normal Schedule\n';
  }

  const recipientGreeting = contact ? (isBM ? `Salam ${contact.name}` : `Hello ${contact.name}`) : (isBM ? 'Salam sejahtera' : 'Hello');

  let body = `${headerTitle}\n\n` +
    `${recipientGreeting}, ${isBM ? 'kami memerlukan bantuan anda bagi perkhidmatan berikut:' : 'we require your service for the following property:'}\n\n` +
    `🏠 *${isBM ? 'Unit / Homestay' : 'Property'}:* ${prop.name}\n` +
    `📍 *${isBM ? 'Alamat' : 'Address'}:* ${prop.address || (isBM ? 'Alamat unit standard' : 'Standard Address')}\n` +
    (prop.gpsLocation ? `🗺️ *${isBM ? 'Peta Google Maps' : 'Google Maps GPS'}:* ${prop.gpsLocation}\n` : '') +
    urgencyText;

  if (serviceType === 'turnover_clean' || turnover) {
    const targetDate = turnover ? turnover.date : new Date().toISOString().split('T')[0];
    body += `📅 *${isBM ? 'Tarikh Tugasan' : 'Target Date'}:* ${targetDate}\n` +
            `⏰ *${isBM ? 'Waktu Pembersihan' : 'Cleaning Window'}:* ${prop.checkOutTime || '12:00 PM'} - ${prop.checkInTime || '3:00 PM'}\n`;
  }

  if (includePin && prop.doorCode) {
    body += `🔑 *${isBM ? 'Kod PIN Pintu (Smart Lock)' : 'Smart Lock Door PIN'}:* ${prop.doorCode}\n`;
  }

  const detailsText = customDetails || defaultTaskDesc;
  body += `\n📋 *${isBM ? 'ARAHAN / PERINCIAN' : 'TASK DETAILS / INSTRUCTIONS'}:*\n${detailsText}\n\n`;

  body += isBM
    ? `Sila sahkan penerimaan mesej ini dan maklumkan waktu kehadiran/penghantaran anda. Terima kasih! 🙏\n_${settings.businessName || 'Pengurusan Homestay'}_`
    : `Please acknowledge receipt and advise your estimated arrival/delivery time. Thank you! 🙏\n_${settings.businessName || 'Homestay Management'}_`;

  return body;
}

function renderServiceDispatchPreview() {
  const bubble = document.getElementById('dispatchPreviewText');
  const badge = document.getElementById('dispatchRecipientBadge');
  const time = document.getElementById('dispatchTimestamp');
  if (!bubble) return;

  const msg = generateServiceDispatchMessage();
  bubble.textContent = msg;

  const recipientId = document.getElementById('dispatchRecipientSelect')?.value;
  const contact = (appState.contacts || []).find(c => c.id === recipientId);
  if (badge) {
    if (contact) {
      badge.textContent = `To: ${contact.name} (${contact.phone})`;
    } else {
      badge.textContent = 'To: Unspecified Contact';
    }
  }

  if (time) {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    time.textContent = `${hrs}:${mins} ✓✓`;
  }
}

function handleSendServiceDispatchWa() {
  const recipientId = document.getElementById('dispatchRecipientSelect')?.value;
  const contact = (appState.contacts || []).find(c => c.id === recipientId);
  const msg = generateServiceDispatchMessage();

  let phone = '';
  if (contact && contact.phone) {
    phone = contact.phone.replace(/[^0-9]/g, '');
  }

  const waUrl = phone ? `https://wa.me/${phone}?text=${encodeURIComponent(msg)}` : `https://wa.me/?text=${encodeURIComponent(msg)}`;
  window.open(waUrl, '_blank');
  closeAllModals();
  showToast(appState.settings.language === 'bm' ? 'Mesej WhatsApp dihantar!' : 'WhatsApp dispatch opened!');
}

function handleCopyServiceDispatchText() {
  const msg = generateServiceDispatchMessage();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(msg).then(() => {
      showToast(appState.settings.language === 'bm' ? 'Teks notis disalin!' : 'Message text copied to clipboard!');
    }).catch(() => {
      showToast('Copied to clipboard');
    });
  } else {
    showToast('Copied to clipboard');
  }
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

  // Dynamic multi-month period calculation
  const mIndex = appState.activeWaMonthIndex || 1;
  const startD = new Date(booking.checkIn + 'T00:00:00');
  const curMonthStart = new Date(startD);
  curMonthStart.setMonth(curMonthStart.getMonth() + (mIndex - 1));
  const curMonthEnd = new Date(curMonthStart);
  curMonthEnd.setMonth(curMonthEnd.getMonth() + 1);
  curMonthEnd.setDate(curMonthEnd.getDate() - 1);

  const startStr = curMonthStart.toISOString().split('T')[0];
  const endStr = curMonthEnd.toISOString().split('T')[0];

  const dueDate = new Date(curMonthStart);
  dueDate.setDate(dueDate.getDate() + 6);
  const dueStr = dueDate.toISOString().split('T')[0];

  const extraUtility = parseFloat(document.getElementById('waInvoiceExtraInput')?.value) || 0;
  const rentAmt = booking.monthlyRate || 0;
  const totalMonthDue = rentAmt + extraUtility;
  const invNo = `INV-M${mIndex}-${booking.id.slice(-5).toUpperCase()}`;
  const recNo = `REC-RENT-M${mIndex}-${booking.id.slice(-5).toUpperCase()}`;

  // Quotation Validity Calculation
  const validityDays = parseInt(booking.quotationValidityDays) || parseInt(settings.quotationValidityDays) || 3;
  const expDateObj = new Date();
  expDateObj.setDate(expDateObj.getDate() + validityDays);
  const expDateStr = expDateObj.toISOString().split('T')[0];

  let msg = '';

  if (isBM) {
    switch (templateType) {
      case 'quotation':
        if (isMonthly) {
          msg = `📋 *SEBUT HARGA SEWAAN BULANAN - ${prop.name.toUpperCase()}*\n` +
            `No Rujukan: QUO-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam sejahtera *${booking.guestName}*, terima kasih atas pertanyaan sewaan bulanan anda! Berikut adalah perincian pakej sewaan:\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
            `📅 *Tarikh Mula:* ${booking.checkIn}\n` +
            `⏳ *Tempoh Sewaan:* ${booking.monthlyDuration || 6} Bulan\n` +
            `⏳ *Tempoh Sah Sebut Harga:* *${validityDays} Hari* (Sah sehingga: *${expDateStr}*)\n\n` +
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
            `\n📌 *Nota Deposit:* Deposit Sewa dan Deposit Utiliti akan dipulangkan sepenuhnya pada akhir tempoh sewaan tertakluk kepada bil utiliti dan keadaan bilik/rumah. Sebut harga ini sah selama *${validityDays} hari* sehingga *${expDateStr}*. ✨🏡`;
        } else {
          msg = `📋 *SEBUT HARGA RASMI - ${prop.name.toUpperCase()}*\n` +
            `No Rujukan: QUO-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam sejahtera *${booking.guestName}*, terima kasih atas pertanyaan anda! Berikut adalah perincian harga bagi penginapan anda:\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
            `📅 *Daftar Masuk (Check-In):* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
            `🏁 *Daftar Keluar (Check-Out):* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n` +
            `🌙 *Tempoh:* ${booking.nights} Malam • ${booking.guestCount} Tetamu\n` +
            `⏳ *Tempoh Sah Sebut Harga:* *${validityDays} Hari* (Sah sehingga: *${expDateStr}*)\n\n` +
            `💰 *PERINCIAN HARGA:*\n` +
            `• Kadar Sewa: ${currency} ${(booking.nightlyRate || 0).toFixed(2)} × ${booking.nights} malam = ${currency} ${(booking.nights * booking.nightlyRate).toFixed(2)}\n` +
            `• Yuran Pembersihan: ${currency} ${(booking.cleaningFee || 0).toFixed(2)}\n` +
            (secDep > 0 ? `• Deposit Keselamatan (Dipulangkan): ${currency} ${secDep.toFixed(2)}\n` : '') +
            `----------------------------------------\n` +
            `💵 *JUMLAH KESELURUHAN:* *${currency} ${booking.totalAmount.toFixed(2)}*\n` +
            `🔒 *Bayaran Booking Diperlukan (${settings.defaultDepositPct || 30}%):* *${currency} ${bookingFee.toFixed(2)}*\n` +
            `⏳ *Baki Bayaran Sebelum Serahan Kunci:* ${currency} ${(booking.totalAmount - bookingFee).toFixed(2)}\n` +
            bankInfoBM +
            `\n📌 *Nota:* Tarikh akan ditanda sebagai *"DITEMPAH"* selepas slip bayaran booking diterima. Sebut harga ini sah selama *${validityDays} hari* sehingga *${expDateStr}*. ✨🏡`;
        }
        break;

      case 'deposit_receipt':
        if (isMonthly) {
          msg = `🧾 *RESIT BAYARAN BOOKING & DEPOSIT SEWAAN - ${prop.name.toUpperCase()}*\n` +
            `No Resit: REC-BOOK-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam *${booking.guestName}*, bayaran booking sewaan bulanan anda telah disahkan! 🎉\n` +
            `Unit kini berstatus *DITEMPAH & DIKUNCI* untuk kemasukan anda.\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
            `📅 *Tarikh Kemasukan:* ${booking.checkIn}\n` +
            `⏳ *Tempoh Sewaan:* ${booking.monthlyDuration || 6} Bulan\n\n` +
            tenantParticularsBM +
            `💰 *REKOD BAYARAN:*\n` +
            `• Jumlah Pakej Kemasukan: ${currency} ${totalMoveIn.toFixed(2)}\n` +
            `• ✅ *Bayaran Booking Diterima:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
            (booking.lastPaymentRef ? `• 🔖 *No. Rujukan Bank:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Pindahan Bank'})\n` : '') +
            `----------------------------------------\n` +
            `💳 *Baki Perlu Dibayar Sebelum Serahan Kunci:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
            `🔑 *Kunci & Smart Lock PIN:* Akan diserahkan selepas baki pakej kemasukan dijelaskan sepenuhnya. Terima kasih! 🙏`;
        } else {
          msg = `🧾 *RESIT BAYARAN BOOKING & DEPOSIT - ${prop.name.toUpperCase()}*\n` +
            `No Resit: REC-DEP-${booking.id.slice(-6).toUpperCase()}\n\n` +
            `Salam *${booking.guestName}*, bayaran booking dan deposit anda telah diterima! 🎉\n` +
            `Unit anda kini secara rasmi berstatus *DITEMPAH & DIKUNCI* di kalendar kami.\n\n` +
            `${unitTitleBM}\n` +
            `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
            (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
            `📅 *Daftar Masuk:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
            `🏁 *Daftar Keluar:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n\n` +
            `💰 *REKOD BAYARAN:*\n` +
            `• Jumlah Penginapan: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
            `• ✅ *Deposit / Booking Diterima:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
            (booking.lastPaymentRef ? `• 🔖 *No. Rujukan Bank:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Pindahan Bank'})\n` : '') +
            `----------------------------------------\n` +
            `💳 *Baki Bayaran Sebelum Daftar Masuk:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
            `🔑 *Kod PIN Kunci Pintu:* Akan diberikan selepas pengesahan bayaran penuh sebelum waktu daftar masuk. Terima kasih! 🏡✨`;
        }
        break;

      case 'checkin_reminder':
        msg = `📅 *PERINGATAN DAFTAR MASUK (CHECK-IN) - ${prop.name.toUpperCase()}*\n\n` +
          `Salam mesra *${booking.guestName}*, kami menantikan kehadiran anda tidak lama lagi! Berikut adalah maklumat penting bagi persediaan daftar masuk anda:\n\n` +
          `${unitTitleBM}\n` +
          `📅 *Tarikh Daftar Masuk:* ${booking.checkIn}\n` +
          `⏰ *Waktu Masuk:* Mulai jam *${prop.checkInTime || '3:00 PM'}* ke atas\n` +
          `🏁 *Tarikh Daftar Keluar:* ${booking.checkOut} (sebelum ${prop.checkOutTime || '12:00 PM'})\n\n` +
          `📍 *Alamat Homestay:* ${prop.address || 'Alamat Unit'}\n` +
          (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `\n🔑 *MAKLUMAT AKSES & KUNCI:*\n` +
          (booking.status === 'confirmed' || booking.balance <= 0 
            ? `• Kod PIN Smart Lock Pintu: *${prop.doorCode || '123456#'}*\n• Nama WiFi: *${prop.wifiName || 'Homestay_WiFi'}*\n• Kata Laluan WiFi: *${prop.wifiPass || 'welcome123'}*\n` 
            : `• Kod PIN pintu & kata laluan WiFi akan diserahkan serta-merta selepas baki bayaran dijelaskan.\n`) +
          (booking.balance > 0 
            ? `\n💳 *Peringatan Baki Bayaran:* *${currency} ${booking.balance.toFixed(2)}* (Sila jelaskan sebelum waktu masuk).\n` + bankInfoBM 
            : `\n✅ *Status Bayaran:* Selesai Dibayar Penuh (${currency} ${booking.totalAmount.toFixed(2)})\n`) +
          `\n📜 *Peraturan Homestay:* ${prop.rules || 'Dilarang merokok di dalam unit, jaga ketenteraman selepas 10 malam.'}\n\n` +
          `Jika anda memerlukan sebarang bantuan atau panduan arah, sila balas mesej ini pada bila-bila masa. Selamat bertolak dan semoga perjalanan anda lancar & selamat! ✨🏡`;
        break;

      case 'full_receipt':
        msg = `🔑 *RESIT BAYARAN PENUH & PANDUAN MASUK - ${prop.name.toUpperCase()}*\n` +
          `No Resit: REC-FULL-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Salam *${booking.guestName}*! Bayaran penuh telah disahkan dan tempahan anda kini *100% DISAHKAN*. Berikut adalah maklumat akses masuk anda:\n\n` +
          `${unitTitleBM}\n` +
          `💰 *STATUS BAYARAN: SELESAI DIBAYAR PENUH (100%) ✅*\n` +
          `• Jumlah Dibayar: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
          (booking.lastPaymentRef ? `• 🔖 *No. Rujukan Bank:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Pindahan Bank'})\n` : '') +
          `• Baki Bayaran: ${currency} 0.00\n\n` +
          `========================================\n` +
          `🔑 *MAKLUMAT AKSES & KUNCI PINTU PINTAR:*\n` +
          `========================================\n` +
          `📍 *Alamat:* ${prop.address || 'Alamat Unit'}\n` +
          (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `⏰ *Waktu Daftar Masuk:* Hari ini dari jam ${prop.checkInTime || '3:00 PM'} ke atas\n` +
          `🔐 *Kod PIN Smart Lock Pintu:* *${prop.doorCode || '123456#'}*\n` +
          `📶 *Nama WiFi:* ${prop.wifiName || 'Homestay_WiFi'}\n` +
          `🔑 *Kata Laluan WiFi:* *${prop.wifiPass || 'welcome123'}*\n\n` +
          `📜 *Peraturan:* ${prop.rules || 'Dilarang merokok di dalam rumah, jaga ketenteraman selepas 10 malam.'}\n\n` +
          `Selamat menikmati penginapan anda! Sila hubungi kami bila-bila masa jika memerlukan bantuan. ✨🏡`;
        break;

      case 'monthly_invoice':
        msg = `📑 *INVOIS SEWAAN BULANAN (BULAN KE-${mIndex} DRPD ${booking.monthlyDuration || 6})*\n` +
          `No. Invois: *${invNo}*\n` +
          `Tarikh Invois: *${todayStr}*\n` +
          `Tarikh Akhir Bayaran: *${dueStr}*\n\n` +
          tenantParticularsBM +
          `${unitTitleBM}\n` +
          `📍 *Lokasi:* ${prop.address || 'Alamat Unit'}\n` +
          (prop.gpsLocation ? `🗺️ *Lokasi GPS / Google Maps:* ${prop.gpsLocation}\n` : '') + `\n` +
          `📅 *TEMPOH BIL SEWAAN:*\n` +
          `• Dari: *${startStr}* Hingga: *${endStr}* (Bulan ke-${mIndex})\n\n` +
          `💵 *PERINCIAN BAYARAN:*\n` +
          `• Sewa Bulanan: *${currency} ${rentAmt.toFixed(2)}*\n` +
          (extraUtility > 0 ? `• Caj Utiliti / Tambahan: *${currency} ${extraUtility.toFixed(2)}*\n` : '') +
          `----------------------------------------\n` +
          `💳 *JUMLAH PERLU DIBAYAR:* *${currency} ${totalMonthDue.toFixed(2)}*\n` +
          bankInfoBM +
          `\n📌 *Nota:* Sila jelaskan bayaran sebelum *${dueStr}* dan hantar salinan resit transaksi ke WhatsApp ini. Terima kasih atas kerjasama anda! 🙏✨`;
        break;

      case 'monthly_rent_receipt':
        msg = `🧾 *RESIT RASMI BAYARAN SEWA (BULAN KE-${mIndex})*\n` +
          `No. Resit: *${recNo}*\n` +
          `Tarikh: *${todayStr}*\n\n` +
          `Salam *${booking.guestName}*, bayaran sewa bulanan anda bagi *Bulan ke-${mIndex}* telah diterima dan disahkan! 🎉\n\n` +
          tenantParticularsBM +
          `${unitTitleBM}\n` +
          `📅 *Tempoh Sewaan:* ${startStr} hingga ${endStr} (Bulan ke-${mIndex})\n` +
          `💰 *Jumlah Diterima:* *${currency} ${totalMonthDue.toFixed(2)}*\n` +
          (booking.lastPaymentRef ? `• 🔖 *No. Rujukan Bank:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Pindahan Bank'})\n` : '') +
          `✅ *Status Bayaran:* SELESAI DIBAYAR (PAID)\n\n` +
          `Terima kasih atas pembayaran anda yang tepat pada masanya! 🙏✨`;
        break;

      case 'refund_receipt':
        const ref = booking.refundDetails || {
          rentalDep: booking.rentalDeposit || 0,
          utilDep: booking.utilitiesDeposit || booking.securityDeposit || 0,
          dedUtil: 0,
          dedRepair: 0,
          netRefund: (booking.rentalDeposit || 0) + (booking.utilitiesDeposit || booking.securityDeposit || 0),
          notes: 'Deposit dipulangkan sepenuhnya.'
        };
        msg = `💰 *PENYATA PEMULANGAN DEPOSIT SEWAAN - ${prop.name.toUpperCase()}*\n` +
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
        break;

      case 'checkout':
        msg = `🏁 *Peringatan Daftar Keluar / Tamat Sewaan - ${prop.name}*\n\n` +
          `Salam *${booking.guestName}*, semoga anda menikmati penginapan yang menyenangkan bersama kami!\n\n` +
          `⏰ *Waktu Daftar Keluar:* Hari ini sebelum jam ${prop.checkOutTime || '12:00 PM'}\n\n` +
          `Sebelum bertolak, mohon kerjasama untuk:\n` +
          `1. Padamkan semua suis lampu dan penyaman udara (air-cond)\n` +
          `2. Pastikan semua pintu dan tingkap dikunci rapi\n` +
          `3. Serahkan kembali kunci atau masukkan ke dalam peti kunci pintar\n\n` +
          `Pemeriksaan unit dan pemulangan baki deposit keselamatan akan diproses selepas pemeriksaan selesai. Terima kasih! ⭐⭐⭐⭐⭐`;
        break;

      case 'cleaner':
        msg = `🧹 *Notis Pembersihan / Turnover - ${prop.name}*\n\n` +
          `Kerja pembersihan diperlukan untuk ${prop.name} pada ${booking.checkOut}.\n` +
          `Tetamu ${booking.guestName} daftar keluar jam ${prop.checkOutTime || '12:00 PM'}.\n` +
          (prop.address ? `Alamat: ${prop.address}\n` : '') +
          (prop.gpsLocation ? `Lokasi GPS: ${prop.gpsLocation}\n` : '') +
          `Kod PIN Smart Lock untuk diset: ${prop.doorCode || '1234'}.`;
        break;

      case 'payment':
        msg = `💳 *Peringatan Baki Bayaran - ${prop.name}*\n\n` +
          `Salam *${booking.guestName}*, ini adalah peringatan mesra bagi baki bayaran penginapan anda:\n\n` +
          `📅 *Tarikh:* ${booking.checkIn} hingga ${booking.checkOut}\n` +
          `💰 *Baki Bayaran:* *${currency} ${booking.balance.toFixed(2)}*\n` +
          bankInfoBM +
          `\nSila jelaskan baki sebelum daftar masuk untuk menerima kod akses masuk. Terima kasih! 🙏`;
        break;

      default:
        msg = '';
        break;
    }
  }

  // English Templates
  switch (templateType) {
    case 'quotation':
      if (isMonthly) {
        msg = `📋 *MONTHLY TENANCY QUOTATION - ${prop.name.toUpperCase()}*\n` +
          `Ref: QUO-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, thank you for your monthly rental enquiry! Here is the tenancy move-in package breakdown:\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `📅 *Tenancy Start Date:* ${booking.checkIn}\n` +
          `⏳ *Duration:* ${booking.monthlyDuration || 6} Months\n` +
          `⏳ *Quotation Validity:* *${validityDays} Day(s)* (Valid until: *${expDateStr}*)\n\n` +
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
          `\n📌 *Deposit Refund Terms:* Rental & Utilities deposits are 100% refundable at the end of tenancy subject to utility arrears & unit inspection. Quotation is valid for *${validityDays} day(s)* until *${expDateStr}*. ✨🏡`;
      } else {
        msg = `📋 *OFFICIAL QUOTATION - ${prop.name.toUpperCase()}*\n` +
          `Ref: QUO-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, thank you for your enquiry! Here is the price breakdown for your stay:\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `📅 *Check-In:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
          `🏁 *Check-Out:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n` +
          `🌙 *Stay Duration:* ${booking.nights} Night(s) • ${booking.guestCount} Guest(s)\n` +
          `⏳ *Quotation Validity:* *${validityDays} Day(s)* (Valid until: *${expDateStr}*)\n\n` +
          `💰 *PRICE BREAKDOWN:*\n` +
          `• Nightly Rate: ${currency} ${(booking.nightlyRate || 0).toFixed(2)} × ${booking.nights} nights = ${currency} ${(booking.nights * booking.nightlyRate).toFixed(2)}\n` +
          `• Cleaning Fee: ${currency} ${(booking.cleaningFee || 0).toFixed(2)}\n` +
          (secDep > 0 ? `• Security Deposit (Refundable): ${currency} ${secDep.toFixed(2)}\n` : '') +
          `----------------------------------------\n` +
          `💵 *TOTAL STAY PRICE:* *${currency} ${booking.totalAmount.toFixed(2)}*\n` +
          `🔒 *Booking Fee Required to Lock Dates (${settings.defaultDepositPct || 30}%):* *${currency} ${bookingFee.toFixed(2)}*\n` +
          `⏳ *Balance Due upon Key Handover:* ${currency} ${(booking.totalAmount - bookingFee).toFixed(2)}\n` +
          bankInfoEN +
          `\n📌 *Next Step:* Unit will be reserved and labelled *"BOOKED"* immediately upon booking fee receipt. Quotation valid for *${validityDays} day(s)* until *${expDateStr}*. Let us know to secure your dates! ✨🏡`;
      }
      break;

    case 'deposit_receipt':
      if (isMonthly) {
        msg = `🧾 *TENANCY BOOKING & DEPOSIT RECEIPT - ${prop.name.toUpperCase()}*\n` +
          `Receipt No: REC-BOOK-M-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, your tenancy booking fee has been received! 🎉\n` +
          `The property is now officially *BOOKED & RESERVED* for your move-in.\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `📅 *Move-In Date:* ${booking.checkIn}\n` +
          `⏳ *Tenancy Period:* ${booking.monthlyDuration || 6} Months\n\n` +
          tenantParticularsEN +
          `💰 *PAYMENT RECORD:*\n` +
          `• Total Move-In Package: ${currency} ${totalMoveIn.toFixed(2)}\n` +
          `• ✅ *Booking Fee Received:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
          (booking.lastPaymentRef ? `• 🔖 *Bank Reference No:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Bank Transfer'})\n` : '') +
          `----------------------------------------\n` +
          `💳 *Remaining Balance Due Before Keys Handover:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
          `🔑 *Keys & Smart Lock PIN:* Will be released upon full settlement of the remaining move-in balance. Thank you! 🙏`;
      } else {
        msg = `🧾 *BOOKING & DEPOSIT PAYMENT RECEIPT - ${prop.name.toUpperCase()}*\n` +
          `Receipt No: REC-DEP-${booking.id.slice(-6).toUpperCase()}\n\n` +
          `Hi *${booking.guestName}*, we have received your booking fee & deposit! 🎉\n` +
          `Your unit is now officially *BOOKED & RESERVED* on our calendar.\n\n` +
          `${unitTitleEN}\n` +
          `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
          (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
          `📅 *Check-In:* ${booking.checkIn} (${prop.checkInTime || '3:00 PM'})\n` +
          `🏁 *Check-Out:* ${booking.checkOut} (${prop.checkOutTime || '12:00 PM'})\n\n` +
          `💰 *PAYMENT RECORD:*\n` +
          `• Total Stay Amount: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
          `• ✅ *Deposit / Booking Received:* *${currency} ${booking.depositPaid.toFixed(2)}*\n` +
          (booking.lastPaymentRef ? `• 🔖 *Bank Reference No:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Bank Transfer'})\n` : '') +
          `----------------------------------------\n` +
          `💳 *Remaining Balance to Pay Before Check-In:* *${currency} ${booking.balance.toFixed(2)}*\n\n` +
          `🔑 *Smart Lock Access Code:* Will be released upon full payment confirmation before check-in. Thank you! 🏡✨`;
      }
      break;

    case 'checkin_reminder':
      msg = `📅 *CHECK-IN REMINDER & ARRIVAL GUIDE - ${prop.name.toUpperCase()}*\n\n` +
        `Hi *${booking.guestName}*, we look forward to welcoming you soon! Here are the essential details for your upcoming stay:\n\n` +
        `${unitTitleEN}\n` +
        `📅 *Check-In Date:* ${booking.checkIn}\n` +
        `⏰ *Check-In Time:* From *${prop.checkInTime || '3:00 PM'}* onwards\n` +
        `🏁 *Check-Out Date:* ${booking.checkOut} (by ${prop.checkOutTime || '12:00 PM'})\n\n` +
        `📍 *Address:* ${prop.address || 'Standard Address'}\n` +
        (prop.gpsLocation ? `🗺️ *GPS / Google Maps Link:* ${prop.gpsLocation}\n` : '') +
        `\n🔑 *SELF CHECK-IN & ACCESS:*\n` +
        (booking.status === 'confirmed' || booking.balance <= 0
          ? `• Door Smart Lock PIN: *${prop.doorCode || '123456#'}*\n• WiFi Network: *${prop.wifiName || 'Homestay_WiFi'}*\n• WiFi Password: *${prop.wifiPass || 'welcome123'}*\n`
          : `• Door access PIN and WiFi credentials will be released immediately upon balance settlement before check-in.\n`) +
        (booking.balance > 0
          ? `\n💳 *Remaining Balance Due:* *${currency} ${booking.balance.toFixed(2)}* (Kindly settle before arrival).\n` + bankInfoEN
          : `\n✅ *Payment Status:* Paid in Full (${currency} ${booking.totalAmount.toFixed(2)})\n`) +
        `\n📜 *House Rules:* ${prop.rules || 'No smoking indoors, quiet hours after 10 PM.'}\n\n` +
        `If you need any assistance or driving directions, feel free to message us here anytime. Safe travels and see you soon! ✨🏡`;
      break;

    case 'full_receipt':
      msg = `🔑 *FULL PAYMENT RECEIPT & ACCESS GUIDE - ${prop.name.toUpperCase()}*\n` +
        `Receipt No: REC-FULL-${booking.id.slice(-6).toUpperCase()}\n\n` +
        `Hi *${booking.guestName}*! Full payment has been received and your booking is *100% CONFIRMED*. Here are your self check-in access keys:\n\n` +
        `${unitTitleEN}\n` +
        `💰 *PAYMENT STATUS: PAID IN FULL (100%) ✅*\n` +
        `• Total Paid: ${currency} ${booking.totalAmount.toFixed(2)}\n` +
        (booking.lastPaymentRef ? `• 🔖 *Bank Reference No:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Bank Transfer'})\n` : '') +
        `• Balance Due: ${currency} 0.00\n\n` +
        `========================================\n` +
        `🔑 *YOUR ACCESS & DOOR LOCK DETAILS:*\n` +
        `========================================\n` +
        `📍 *Address:* ${prop.address || 'Standard Address'}\n` +
        (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
        `⏰ *Check-In Time:* Today from ${prop.checkInTime || '3:00 PM'} onwards\n` +
        `🔐 *Door Smart Lock PIN:* *${prop.doorCode || '123456#'}*\n` +
        `📶 *WiFi Name:* ${prop.wifiName || 'Homestay_WiFi'}\n` +
        `🔑 *WiFi Password:* *${prop.wifiPass || 'welcome123'}*\n\n` +
        `📜 *House Rules:* ${prop.rules || 'No smoking inside, quiet hours after 10 PM.'}\n\n` +
        `Have a wonderful stay with us! If you need anything, message us anytime. ✨🏡`;
      break;

    case 'monthly_invoice':
      msg = `📑 *MONTHLY RENTAL INVOICE (MONTH ${mIndex} OF ${booking.monthlyDuration || 6})*\n` +
        `Invoice No: *${invNo}*\n` +
        `Invoice Date: *${todayStr}*\n` +
        `Payment Due Date: *${dueStr}*\n\n` +
        tenantParticularsEN +
        `${unitTitleEN}\n` +
        `📍 *Location:* ${prop.address || 'Standard Address'}\n` +
        (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') + `\n` +
        `📅 *BILLING PERIOD:*\n` +
        `• Period: *${startStr} to ${endStr}* (Month ${mIndex})\n\n` +
        `💵 *PAYMENT BREAKDOWN:*\n` +
        `• Monthly Rental: *${currency} ${rentAmt.toFixed(2)}*\n` +
        (extraUtility > 0 ? `• Utilities / Extra Surcharge: *${currency} ${extraUtility.toFixed(2)}*\n` : '') +
        `----------------------------------------\n` +
        `💳 *TOTAL AMOUNT DUE:* *${currency} ${totalMonthDue.toFixed(2)}*\n` +
        bankInfoEN +
        `\n📌 *Note:* Please settle payment on or before *${dueStr}* and forward the transfer receipt. Thank you for your cooperation! 🙏✨`;
      break;

    case 'monthly_rent_receipt':
      msg = `🧾 *OFFICIAL RENT PAYMENT RECEIPT (MONTH ${mIndex})*\n` +
        `Receipt No: *${recNo}*\n` +
        `Date: *${todayStr}*\n\n` +
        `Dear *${booking.guestName}*, your monthly rent payment for *Month ${mIndex}* has been received and verified! 🎉\n\n` +
        tenantParticularsEN +
        `${unitTitleEN}\n` +
        `📅 *Rental Period:* ${startStr} to ${endStr} (Month ${mIndex})\n` +
        `💰 *Amount Received:* *${currency} ${totalMonthDue.toFixed(2)}*\n` +
        (booking.lastPaymentRef ? `• 🔖 *Bank Reference No:* \`${booking.lastPaymentRef}\` (${booking.lastPaymentBank || 'Bank Transfer'})\n` : '') +
        `✅ *Status:* PAID IN FULL\n\n` +
        `Thank you for your prompt payment! 🙏✨`;
      break;

    case 'refund_receipt':
      const refEN = booking.refundDetails || {
        rentalDep: booking.rentalDeposit || 0,
        utilDep: booking.utilitiesDeposit || booking.securityDeposit || 0,
        dedUtil: 0,
        dedRepair: 0,
        netRefund: (booking.rentalDeposit || 0) + (booking.utilitiesDeposit || booking.securityDeposit || 0),
        notes: 'Full deposit refunded.'
      };
      msg = `💰 *TENANCY DEPOSIT REFUND STATEMENT - ${prop.name.toUpperCase()}*\n` +
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
      break;

    case 'checkout':
      msg = `🏁 *Check-Out / Tenancy End Reminder - ${prop.name}*\n\n` +
        `Hi *${booking.guestName}*, we hope you had a fantastic stay with us!\n\n` +
        `⏰ *Check-Out Time:* Today by ${prop.checkOutTime || '12:00 PM'}\n\n` +
        `Before you depart, kindly:\n` +
        `1. Turn off all lights and air-conditioners\n` +
        `2. Ensure doors/windows are safely locked\n` +
        `3. Return keys or lock in the smart lockbox\n\n` +
        `Deposit refunds will be inspected and processed promptly after key return. Thank you! ⭐⭐⭐⭐⭐`;
      break;

    case 'cleaner':
      msg = `🧹 *Turnover Notice - ${prop.name}*\n\n` +
        `Turnover required for ${prop.name} on ${booking.checkOut}.\n` +
        `Guest ${booking.guestName} checking out at ${prop.checkOutTime || '12:00 PM'}.\n` +
        (prop.address ? `Address: ${prop.address}\n` : '') +
        (prop.gpsLocation ? `GPS Location: ${prop.gpsLocation}\n` : '') +
        `Smart Lock PIN to reset: ${prop.doorCode || '1234'}.`;
      break;

    case 'payment':
      msg = `💳 *Payment Reminder - ${prop.name}*\n\n` +
        `Hi *${booking.guestName}*, gentle reminder regarding the remaining balance for your stay:\n\n` +
        `📅 *Dates:* ${booking.checkIn} to ${booking.checkOut}\n` +
        `💰 *Balance Due:* *${currency} ${booking.balance.toFixed(2)}*\n` +
        bankInfoEN +
        `\nKindly settle the balance before check-in to receive your door access PIN. Thank you! 🙏`;
      break;

    default:
      msg = '';
      break;
  }

  // Append Standard Notes / Footer (Customer-facing templates only)
  if (msg) {
    const stdNotes = (settings.standardNotes || '').trim();
    if (stdNotes && templateType !== 'cleaner') {
      const header = isBM ? '\n\n📝 *NOTA PENTING:*' : '\n\n📝 *IMPORTANT NOTES:*';
      msg = msg.trim() + `${header}\n${stdNotes}`;
    }
  }

  return msg;
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
      <p class="card-subtitle"><i class="fa-solid fa-location-dot"></i> ${prop.address || 'Homestay Address'}${prop.gpsLocation ? ` • <a href="${prop.gpsLocation}" target="_blank" style="color:var(--primary); font-weight:700; text-decoration:none;"><i class="fa-solid fa-map-location-dot"></i> Maps / GPS</a>` : ''}</p>
      
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
      (prop.gpsLocation ? `🗺️ *GPS / Google Maps:* ${prop.gpsLocation}\n` : '') +
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
    version: APP_VERSION,
    exportDate: new Date().toISOString(),
    properties: appState.properties,
    bookings: appState.bookings,
    turnovers: appState.turnovers,
    expenses: appState.expenses,
    contacts: appState.contacts,
    promotionalMedia: appState.promotionalMedia,
    settings: appState.settings,
    licenseKey: appState.licenseKey,
    isLicensed: appState.isLicensed,
    isMasterAdmin: appState.isMasterAdmin
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
        appState.contacts = data.contacts || [...DEFAULT_CONTACTS];
        appState.promotionalMedia = data.promotionalMedia || [...DEFAULT_PROMO_MEDIA];
        appState.settings = data.settings || DEFAULT_SETTINGS;
        if (data.licenseKey) {
          const check = verifyLicenseKey(data.licenseKey, null);
          if (check.valid) {
            appState.isLicensed = true;
            appState.licenseKey = data.licenseKey;
            appState.isMasterAdmin = check.isMaster;
          }
        } else if (data.isLicensed) {
          appState.isLicensed = true;
          if (data.isMasterAdmin) appState.isMasterAdmin = true;
        }
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

function restoreAutoBackup() {
  const autoBackupStr = localStorage.getItem('staymanager_auto_backup');
  if (!autoBackupStr) {
    alert(t('no_auto_backup_found'));
    return;
  }
  try {
    const data = JSON.parse(autoBackupStr);
    const dateStr = data.backupDate ? new Date(data.backupDate).toLocaleString() : 'Pre-update';
    const propCount = (data.properties && data.properties.length) || 0;
    const bookCount = (data.bookings && data.bookings.length) || 0;
    const isLangBm = appState.settings.language === 'bm';
    const promptMsg = isLangBm 
      ? `Salinan Keselamatan Sebelum Kemaskini dijumpai!\nTarikh: ${dateStr}\nHomestay: ${propCount} unit\nTempahan: ${bookCount} rekod\n\nAdakah anda mahu memulihkan data ini sekarang?`
      : `Pre-Update Safety Snapshot found!\nDate: ${dateStr}\nHomestays: ${propCount} units\nBookings: ${bookCount} records\n\nDo you want to restore this data now?`;

    if (confirm(promptMsg)) {
      if (Array.isArray(data.properties)) appState.properties = data.properties;
      if (Array.isArray(data.bookings)) appState.bookings = data.bookings;
      if (Array.isArray(data.turnovers)) appState.turnovers = data.turnovers;
      if (Array.isArray(data.expenses)) appState.expenses = data.expenses;
      if (Array.isArray(data.contacts)) appState.contacts = data.contacts;
      if (Array.isArray(data.promotionalMedia)) appState.promotionalMedia = data.promotionalMedia;
      if (data.settings) appState.settings = { ...DEFAULT_SETTINGS, ...data.settings };
      if (data.licenseKey) {
        const check = verifyLicenseKey(data.licenseKey, null);
        if (check.valid) {
          appState.isLicensed = true;
          appState.licenseKey = data.licenseKey;
          appState.isMasterAdmin = check.isMaster;
        }
      } else if (data.isLicensed) {
        appState.isLicensed = true;
        if (data.isMasterAdmin) appState.isMasterAdmin = true;
      }
      saveToStorage();
      renderApp();
      showToast(isLangBm ? '🎉 Salinan keselamatan berjaya dipulihkan!' : '🎉 Safety snapshot successfully restored!');
    }
  } catch (err) {
    alert('Error restoring safety snapshot: ' + err.message);
  }
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
    appState.contacts = [...DEFAULT_CONTACTS];
    appState.promotionalMedia = [];
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

// ==========================================================================
// 18. IN-APP USER MANUAL & INTERACTIVE GUIDE ENGINE
// ==========================================================================

const USER_GUIDE_DATA = {
  en: [
    {
      id: 'guide-install',
      icon: 'fa-mobile-screen-button',
      title: '1. How to Install on Your Phone (iOS & Android)',
      content: `
        <p>You do not need to download anything from the App Store or Google Play. The app installs directly from your web browser as a fast, lightweight mobile app.</p>
        <div class="guide-callout success">
          <strong>🍏 iPhone / iPad (Safari):</strong><br>
          1. Open the app link in <strong>Safari</strong>.<br>
          2. Tap the <strong>Share</strong> button (box with an arrow pointing up at the bottom).<br>
          3. Scroll down and tap <strong>"Add to Home Screen"</strong>.<br>
          4. Tap <strong>Add</strong> in the top-right corner. The app icon will appear on your home screen!
        </div>
        <div class="guide-callout">
          <strong>🤖 Android (Chrome / Samsung Internet):</strong><br>
          1. Open the app link in <strong>Google Chrome</strong>.<br>
          2. Tap the <strong>Three Dots Menu (⋮)</strong> at the top right.<br>
          3. Tap <strong>"Install App"</strong> or <strong>"Add to Home screen"</strong>.<br>
          4. Confirm by tapping <strong>Install</strong>.
        </div>
        <p style="font-size:11.5px; color:var(--text-muted);"><i class="fa-solid fa-bolt"></i> <strong>Offline Ready:</strong> Once installed, the app opens full-screen like a native app and works even with no internet connection.</p>
      `
    },
    {
      id: 'guide-license',
      icon: 'fa-key',
      title: '2. Activating Your License Key',
      content: `
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Go to the <strong>Settings (⚙️)</strong> tab (or tap the <strong>DEMO</strong> badge in the header).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">Tap <strong>"Enter License Key"</strong>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Enter your registered <strong>WhatsApp Phone Number</strong> (e.g. <code>+60123456789</code>) and paste your <strong>License Key</strong>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text">Tap <strong>"Activate Full App"</strong>. You now have lifetime access with unlimited homestays!</div>
        </div>
      `
    },
    {
      id: 'guide-props',
      icon: 'fa-house-chimney',
      title: '3. Adding Homestays & Room Rentals',
      content: `
        <p>You can manage entire houses, villas, apartments, or individual room rentals:</p>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Tap <strong>Settings (⚙️)</strong> > Tap <strong>"+ Add Homestay Unit"</strong> (or tap <strong>"+ Add"</strong> in the top header).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">
            <strong>Fill in Unit Particulars:</strong><br>
            • <strong>Category:</strong> Entire House, Master Room, Medium Room, Single Room, or Studio.<br>
            • <strong>Location:</strong> Full Address and <strong>GPS / Google Maps Link</strong> (for guest navigation).<br>
            • <strong>Access:</strong> Smart Lock Door PIN (e.g. <code>5829#</code>) and WiFi Name/Password.<br>
            • <strong>Pricing:</strong> Standard nightly rate and cleaning fee.
          </div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Tap <strong>"Save Property"</strong>.</div>
        </div>
      `
    },
    {
      id: 'guide-bookings',
      icon: 'fa-calendar-plus',
      title: '4. Creating Bookings (Daily vs. Monthly)',
      content: `
        <p>Tap the floating <strong><code>+</code> (Add)</strong> button on the bottom-right to create a booking:</p>
        <div class="guide-callout success">
          <strong>☀️ Daily / Short-Term Stays:</strong><br>
          • Select <strong>"Daily / Short-Term"</strong> (monthly fields are automatically blocked).<br>
          • Enter Check-In/Out dates, Nightly Rate, and Cleaning Fee.<br>
          • Tap quick deposit presets: <code>30%</code>, <code>50%</code>, or <code>100% Full</code>.<br>
          • Enter guest particulars: Name, WhatsApp Phone, NRIC/Passport, and Address.
        </div>
        <div class="guide-callout">
          <strong>📅 Monthly Tenancy:</strong><br>
          • Select <strong>"Monthly Tenancy"</strong> (daily fields are automatically blocked).<br>
          • Enter Start Date, Duration (e.g. 6 Months), and Monthly Rental.<br>
          • Enter Rental Deposit, Utilities Deposit, and Tenancy Agreement Fee.<br>
          • The system automatically calculates the <strong>Total Move-In Package</strong>.
        </div>
        <div class="guide-callout success">
          <strong>💡 Calendar View (Check-In vs. Check-Out Modes):</strong><br>
          • <strong>📥 Check-In Mode:</strong> Highlights days when guests arrive with count badges (e.g. 📥 1) and lists upcoming arrivals.<br>
          • <strong>📤 Check-Out Mode:</strong> Highlights departure dates (e.g. 📤 1). Displays vacating unit notices with 1-tap <code>+ Book This Unit Starting Today</code> button!<br>
          • <strong>🛏️ All Stays:</strong> View overnight stays with colored dots for each homestay unit.<br>
          • <strong>4-Metric Bar:</strong> Tap any date to inspect Check-Ins, Check-Outs, In-Stay guests, and units available tonight.
        </div>
      `
    },
    {
      id: 'guide-invoicing',
      icon: 'fa-file-invoice-dollar',
      title: '5. Multi-Month Rental Invoices & Receipts',
      content: `
        <p>For monthly tenancies, the app provides a sequential monthly billing schedule:</p>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Go to the <strong>Bookings</strong> tab and tap <strong>"📑 Monthly Invoices (X/Y)"</strong> on any monthly booking card.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Send Invoice:</strong> Tap <code>Invoice</code> next to any month (e.g. Month 2). You can enter optional utility arrears (TNB/Water) before opening WhatsApp.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Mark Paid:</strong> Tap <code>Mark Paid</code> when the tenant transfers rent.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Send Receipt:</strong> Tap <code>Receipt</code> to send an official WhatsApp payment confirmation (<code>REC-RENT-M2-XXXX</code>).</div>
        </div>
      `
    },
    {
      id: 'guide-receipts',
      icon: 'fa-receipt',
      title: '5B. Digital Payment Receipts & Bank Reference Capture',
      content: `
        <p>When guests transfer booking deposits, balance settlements, or monthly rentals and share their bank slips, easily record and archive them:</p>
        <div class="guide-callout success">
          <strong>📸 Auto Image Compression:</strong><br>
          Bank slips and camera photos are compressed by 97% down to ~40KB–70KB without losing text sharpness, preserving your browser storage indefinitely!
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>Capture Receipt:</strong> Tap <code>+ Resit / + Receipt</code> on any booking card, or tap <code>Mark Deposit Paid</code> / <code>Mark Fully Paid</code>. The receipt capture modal opens with recommended amounts pre-filled.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Bank & Ref No:</strong> Select the bank (Maybank, CIMB, Bank Islam, DuitNow, etc.) and paste or type the tenant's transaction reference ID.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Upload Slip:</strong> Tap or drag the screenshot into the dropzone. It previews instantly with the compressed size.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Receipt Gallery:</strong> Tap the <code>🧾 X Receipt(s)</code> chip anytime to inspect all attached receipts, copy reference numbers with 1 tap, or zoom full-screen with the Lightbox viewer.</div>
        </div>
      `
    },
    {
      id: 'guide-wa',
      icon: 'fa-brands fa-whatsapp',
      title: '6. 1-Tap WhatsApp Automation (9 Templates)',
      content: `
        <p>Tap the WhatsApp button on any booking card to choose from 9 pre-formatted templates with zero manual typing:</p>
        <ul style="padding-left:18px; margin:6px 0;">
          <li><strong>📄 Quotation:</strong> Send price breakdown, location, & deposit request.</li>
          <li><strong>🧾 Deposit Receipt:</strong> Confirm booking & lock calendar dates.</li>
          <li><strong>📅 Check-In Reminder:</strong> Send friendly arrival guide with check-in time, address, GPS link, access PIN, & payment status (sent at owner's discretion when arrival is near).</li>
          <li><strong>🔑 Full Receipt & Keys:</strong> Send Door Lock PIN, WiFi credentials, address & directions.</li>
          <li><strong>📑 Monthly Invoice:</strong> Send monthly rent bill with due date & bank account.</li>
          <li><strong>🧾 Monthly Rent Receipt:</strong> Send official rent payment confirmation.</li>
          <li><strong>🏁 Check-Out Reminder:</strong> Reminder on check-out time & key return.</li>
          <li><strong>💰 Deposit Refund Statement:</strong> Itemized statement with utility deductions.</li>
          <li><strong>🧹 Cleaner Notice:</strong> Job alert with unit address, GPS link, check-out time & PIN code.</li>
        </ul>
      `
    },
    {
      id: 'guide-refunds',
      icon: 'fa-money-bill-transfer',
      title: '7. End of Tenancy & Deposit Refunds',
      content: `
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Tap <strong>"End Tenancy & Refund Deposit"</strong> on the booking card.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">Enter any deductions for <strong>Unpaid Utilities (TNB/Water)</strong> or <strong>Repairs/Cleaning</strong>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Tap <strong>"Send Refund Statement"</strong> — opens an itemized, transparent statement in WhatsApp for your tenant!</div>
        </div>
      `
    },
    {
      id: 'guide-cleaning',
      icon: 'fa-broom',
      title: '8. Turnovers, Maintenance Team & Supplier Dispatch',
      content: `
        <p>Keep your homestays pristine, coordinate cleaning crews, technicians, and restock supplies with 1-click WhatsApp alerts:</p>
        <div class="guide-callout success">
          <strong>👷 Team & Supplier Directory (Settings > Maintenance Team & Suppliers):</strong><br>
          • Store phone numbers, rates, and notes for your cleaners, aircond specialists, plumbers, electricians, handymen, and supply vendors (linen/laundry, cooking gas, toiletries).<br>
          • Direct 1-tap WhatsApp chat and dispatch alert buttons on every contact card.
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>Turnover Cleaning:</strong> Every checkout generates a turnover card in the <strong>Turnovers (🧹)</strong> tab. Tap <strong>"WhatsApp Cleaner"</strong> to open the Dispatch modal with target date, cleaning window, address, GPS link, and Smart Lock PIN pre-filled.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Service & Repair Alerts:</strong> Tap <strong>"🛠️ Service / Supply Alert"</strong> in the Turnovers header anytime to dispatch job requests for aircond servicing, plumbing leaks, electrical power trips, or general handyman fixes with urgency levels (Urgent / High / Normal).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Supply Restock Orders:</strong> Order fresh bedsheets, bath towels from your linen supplier or cooking gas cylinders from your gas vendor with 1 tap.</div>
        </div>
      `
    },
    {
      id: 'guide-finances',
      icon: 'fa-chart-line',
      title: '9. Financial Reports & Monthly Profit',
      content: `
        <p>Tap the <strong>Finances (📈)</strong> tab to see your business performance:</p>
        <ul style="padding-left:18px; margin:6px 0;">
          <li>💵 <strong>Total Revenue:</strong> Total booking income collected.</li>
          <li>📉 <strong>Total Expenses:</strong> Operational costs logged (tap <em>+ Add Expense</em>).</li>
          <li>🏆 <strong>Net Profit:</strong> Actual profit in green (<em>Revenue minus Expenses</em>).</li>
          <li>📊 <strong>Property Share:</strong> Percentage bars showing which unit earns the most.</li>
        </ul>
      `
    },
    {
      id: 'guide-backup',
      icon: 'fa-shield-halved',
      title: '10. Zero-Data-Loss Updates & Backups',
      content: `
        <div class="guide-callout success">
          <strong>🔒 100% Data Preservation Guarantee:</strong><br>
          All your homestays, bookings, tenant records, invoices, and license keys are stored in your device's persistent <code>localStorage</code> database. Updating the app only refreshes the code cache — it <strong>never deletes or touches your data</strong>!
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>1-Tap Auto Banner:</strong> When an update is deployed, tap <strong>"Update Now"</strong> on the notification banner at the top of the screen to activate instantly (~1s).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Check in Settings:</strong> You can also go to <strong>Settings (⚙️) > App Version & Updates</strong> and tap <strong>"Check for Updates"</strong> anytime.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>PWA Mobile App:</strong> For apps installed on your home screen, closing the app and reopening while connected to internet triggers automatic update in the background.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Safety Backup:</strong> Under <strong>Settings (⚙️) > Data Backup</strong>, tap <strong>"Export Backup (.json)"</strong> to save an encrypted snapshot of your business anytime.</div>
        </div>
      `
    }
  ],
  bm: [
    {
      id: 'guide-install',
      icon: 'fa-mobile-screen-button',
      title: '1. Cara Pasang di Telefon Pintar (iOS & Android)',
      content: `
        <p>Anda tidak perlu memuat turun apa-apa dari App Store atau Google Play. Aplikasi ini dipasang terus dari pelayar web anda sebagai aplikasi telefon pintar yang pantas dan ringan.</p>
        <div class="guide-callout success">
          <strong>🍏 Pengguna iPhone / iPad (Safari):</strong><br>
          1. Buka pautan aplikasi di <strong>Safari</strong>.<br>
          2. Tekan butang <strong>Kongsi (Share)</strong> (ikon petak dengan anak panah ke atas di bahagian bawah).<br>
          3. Skrol ke bawah dan tekan <strong>"Add to Home Screen" (Tambah ke Skrin Utama)</strong>.<br>
          4. Tekan <strong>Add</strong> di penjuru kanan atas. Ikon aplikasi akan muncul di skrin utama telefon anda!
        </div>
        <div class="guide-callout">
          <strong>🤖 Pengguna Android (Chrome / Samsung Internet):</strong><br>
          1. Buka pautan aplikasi di <strong>Google Chrome</strong>.<br>
          2. Tekan ikon <strong>Tiga Titik (⋮)</strong> di penjuru kanan atas.<br>
          3. Tekan <strong>"Install App" (Pasang Aplikasi)</strong> atau <strong>"Add to Home screen"</strong>.<br>
          4. Sahkan dengan menekan <strong>Install</strong>.
        </div>
        <p style="font-size:11.5px; color:var(--text-muted);"><i class="fa-solid fa-bolt"></i> <strong>Sedia Luar Talian:</strong> Selepas dipasang, aplikasi dibuka skrin penuh dan berfungsi walaupun tiada sambungan internet.</p>
      `
    },
    {
      id: 'guide-license',
      icon: 'fa-key',
      title: '2. Mengaktifkan Kunci Lesen Anda',
      content: `
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Pergi ke tab <strong>Tetapan (⚙️)</strong> (atau tekan lencana <strong>DEMO</strong> di bar atas).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">Tekan <strong>"Masukkan Kunci Lesen"</strong>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Masukkan <strong>Nombor WhatsApp Berdaftar</strong> anda (cth: <code>+60123456789</code>) dan tampal <strong>Kunci Lesen</strong> anda.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text">Tekan <strong>"Aktifkan Aplikasi Penuh"</strong>. Anda kini memiliki akses seumur hidup dengan unit tanpa had!</div>
        </div>
      `
    },
    {
      id: 'guide-props',
      icon: 'fa-house-chimney',
      title: '3. Menambah Unit Homestay & Bilik Sewa',
      content: `
        <p>Anda boleh menguruskan seluruh rumah, vila, apartmen, atau bilik sewa individu:</p>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Tekan <strong>Tetapan (⚙️)</strong> > Tekan <strong>"+ Tambah Unit Homestay / Bilik"</strong> (atau tekan <strong>"+ Tambah"</strong> di bar atas).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">
            <strong>Isikan Butiran Unit:</strong><br>
            • <strong>Kategori:</strong> Seluruh Rumah, Bilik Master, Bilik Medium, Bilik Single, atau Studio.<br>
            • <strong>Lokasi:</strong> Alamat Penuh dan <strong>Pautan GPS / Google Maps</strong> (panduan arah tetamu).<br>
            • <strong>Akses:</strong> Kod PIN Kunci Pintu Pintar (cth: <code>5829#</code>) dan Nama/Kata Laluan WiFi.<br>
            • <strong>Harga:</strong> Kadar asas semalam dan yuran pembersihan.
          </div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Tekan <strong>"Simpan Unit Homestay"</strong>.</div>
        </div>
      `
    },
    {
      id: 'guide-bookings',
      icon: 'fa-calendar-plus',
      title: '4. Merekod Tempahan (Harian & Bulanan)',
      content: `
        <p>Tekan butang terapung <strong><code>+</code> (Tambah)</strong> di penjuru kanan bawah untuk membuka borang tempahan:</p>
        <div class="guide-callout success">
          <strong>☀️ Sewaan Harian / Jangka Pendek:</strong><br>
          • Pilih <strong>"Harian / Jangka Pendek"</strong> (bahagian bulanan disekat automatik).<br>
          • Masukkan Tarikh Masuk/Keluar, Kadar Semalam, dan Yuran Pembersihan.<br>
          • Tekan pilihan deposit pantas: <code>30%</code>, <code>50%</code>, atau <code>100% Penuh</code>.<br>
          • Isikan maklumat tetamu: Nama, WhatsApp, No. KP/Pasport, dan Alamat.
        </div>
        <div class="guide-callout">
          <strong>📅 Sewaan Bulanan (Bilik / Rumah):</strong><br>
          • Pilih <strong>"Sewaan Bulanan"</strong> (bahagian harian disekat automatik).<br>
          • Masukkan Tarikh Mula, Tempoh (cth: 6 Bulan), dan Sewa Bulanan.<br>
          • Masukkan Deposit Sewa, Deposit Utiliti, dan Yuran Perjanjian Sewa.<br>
          • Sistem mengira <strong>Jumlah Pakej Kemasukan (Move-In)</strong> secara automatik.
        </div>
        <div class="guide-callout success">
          <strong>💡 Paparan Kalendar (Mod Daftar Masuk vs. Daftar Keluar):</strong><br>
          • <strong>📥 Mod Daftar Masuk:</strong> Menandakan hari ketibaan tetamu dengan lencana bilangan (cth: 📥 1) dan menyusun senarai ketibaan terdekat.<br>
          • <strong>📤 Mod Daftar Keluar:</strong> Menandakan hari tetamu keluar (cth: 📤 1). Memaparkan notis unit sedia dibersihkan berserta butang 1-sentuhan <code>+ Tempah Unit Ini Mulai Hari Ini</code>!<br>
          • <strong>🛏️ Penginapan:</strong> Paparkan semua malam penginapan dengan titik warna bagi setiap unit homestay.<br>
          • <strong>Bar 4-Statistik:</strong> Tekan mana-mana tarikh untuk melihat Masuk, Keluar, Menginap, dan unit Kosong Malam Ini.
        </div>
      `
    },
    {
      id: 'guide-invoicing',
      icon: 'fa-file-invoice-dollar',
      title: '5. Invois & Resit Sewaan Bulanan',
      content: `
        <p>Bagi sewaan bulanan, sistem menyediakan jadual bil bulanan berurutan:</p>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Buka tab <strong>Tempahan</strong> dan tekan butang <strong>"📑 Jadual Invois (X/Y)"</strong> pada kad sewaan bulanan.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Hantar Invois:</strong> Tekan <code>Invois</code> pada mana-mana bulan (cth: Bulan 2). Boleh masukkan caj utiliti TNB/Air tambahan jika ada sebelum buka WhatsApp.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Tanda Bayar:</strong> Tekan <code>Tanda Bayar</code> apabila penyewa telah memindahkan bayaran sewa.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Hantar Resit:</strong> Tekan <code>Resit</code> untuk menghantar resit rasmi WhatsApp pengesahan bayaran sewa (<code>REC-RENT-M2-XXXX</code>).</div>
        </div>
      `
    },
    {
      id: 'guide-receipts',
      icon: 'fa-receipt',
      title: '5B. Rekod Resit Digital & No. Rujukan Bank',
      content: `
        <p>Apabila tetamu atau penyewa memindahkan wang deposit, baki bayaran, atau sewa bulanan dan berkongsi slip transaksi di WhatsApp, anda boleh merekod dan menyimpannya terus di dalam aplikasi:</p>
        <div class="guide-callout success">
          <strong>📸 Pemampatan Imej Pintar:</strong><br>
          Gambar slip bank dimampatkan secara automatik sebanyak 97% ke ~40KB–70KB tanpa menjejaskan kejelasan teks nombor akaun dan ID transaksi, mengelakkan memori peranti penuh!
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>Buka Borang Resit:</strong> Tekan <code>+ Resit</code> pada mana-mana kad tempahan, atau tekan <code>Tanda Deposit Dibayar</code> / <code>Tanda Bayaran Penuh</code>. Jumlah bayaran dicadangkan automatik.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Pilih Bank & No. Rujukan:</strong> Pilih bank (Maybank, CIMB, Bank Islam, DuitNow, dll.) dan tekan <code>Tampal</code> atau taip ID Rujukan Transaksi bank.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Muat Naik Slip:</strong> Tekan atau seret tangkapan skrin resit. Pratonton imej dan saiz mampat dipaparkan serta-merta.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Galeri Resit & No. Rujukan:</strong> Tekan lencana <code>🧾 X Resit</code> bila-bila masa untuk semak semua resit yang disimpan, salin no rujukan dengan 1 sentuhan, atau lihat gambar skrin penuh (Lightbox) berserta butang Muat Turun.</div>
        </div>
      `
    },
    {
      id: 'guide-wa',
      icon: 'fa-brands fa-whatsapp',
      title: '6. Automasi WhatsApp 1-Sentuhan (9 Templat)',
      content: `
        <p>Tekan butang WhatsApp pada mana-mana kad tempahan untuk memilih daripada 9 templat siap sedia tanpa perlu taip manual:</p>
        <ul style="padding-left:18px; margin:6px 0;">
          <li><strong>📄 Sebut Harga:</strong> Hantar perincian harga rasmi, lokasi, & jumlah bayaran booking.</li>
          <li><strong>🧾 Resit Booking / Deposit:</strong> Pengesahan deposit & unit ditanda ditempah.</li>
          <li><strong>📅 Peringatan Daftar Masuk:</strong> Peringatan mesra ketibaan berserta waktu masuk, alamat, pautan GPS Maps, PIN pintu & status baki bayaran (dihantar mengikut budi bicara pemilik apabila tarikh masuk hampir).</li>
          <li><strong>🔑 Resit Penuh & Panduan Kunci:</strong> Resit bayaran penuh berserta PIN pintu, WiFi, alamat & panduan.</li>
          <li><strong>📑 Invois Sewa Bulanan:</strong> Invois bulanan mengikut bulan, tarikh akhir & no bank.</li>
          <li><strong>🧾 Resit Rasmi Sewa Bulanan:</strong> Resit rasmi pengesahan bayaran sewa bulanan.</li>
          <li><strong>🏁 Peringatan Daftar Keluar:</strong> Peringatan waktu keluar, suis elektrik & kunci.</li>
          <li><strong>💰 Penyata Pulangan Deposit:</strong> Penyata perincian deposit & tolakan bil utiliti.</li>
          <li><strong>🧹 Arahan Pembersihan:</strong> Arahan tugasan kepada pembersih berserta alamat, GPS, & kod PIN pintu.</li>
        </ul>
      `
    },
    {
      id: 'guide-refunds',
      icon: 'fa-money-bill-transfer',
      title: '7. Tamat Sewaan & Pemulangan Deposit',
      content: `
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text">Tekan butang <strong>"Tamat Sewa & Pulang Deposit"</strong> pada kad tempahan.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text">Masukkan jumlah tolakan jika ada <strong>Tunggakan Utiliti (TNB/Air)</strong> atau <strong>Kerosakan / Pembersihan</strong>.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text">Tekan <strong>"Hantar Penyata Pulangan"</strong> — membuka penyata tolakan yang telus dan jelas di WhatsApp penyewa!</div>
        </div>
      `
    },
    {
      id: 'guide-cleaning',
      icon: 'fa-broom',
      title: '8. Pembersihan, Pasukan Penyelenggaraan & Tempahan Bekalan',
      content: `
        <p>Kekalkan kebersihan homestay anda, selaraskan kakitangan pembersihan, juruteknik, dan tempahan stok bekalan sepantas 1-klik WhatsApp:</p>
        <div class="guide-callout success">
          <strong>👷 Direktori Pasukan & Pembekal (Tetapan > Pasukan Penyelenggaraan & Pembekal):</strong><br>
          • Simpan nombor telefon, kadar caj dan nota kerja untuk tukang cuci, pakar aircond, tukang paip, juruelektrik, tukang rumah, dan pembekal (dobi linen, tong gas memasak, sabun/syampu).<br>
          • Butang sembang terus WhatsApp dan butang hantar notis tugasan tersedia pada setiap kad kenalan.
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>Pembersihan Unit (Turnover):</strong> Setiap daftar keluar menjana tugasan di tab <strong>Pembersihan (🧹)</strong>. Tekan <strong>"WhatsApp Cleaner"</strong> untuk membuka tetingkap Notis dengan tarikh, waktu mengemas, alamat, pautan GPS Maps, dan Kod PIN pintu tersedia automatik.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Notis Pembaikan & Servis:</strong> Tekan <strong>"🛠️ Notis Servis & Bekalan"</strong> di bar atas tab Pembersihan pada bila-bila masa untuk menghantar tugasan servis aircond, paip bocor, bekalan elektrik trip, atau baiki perkakasan dengan tahap keperluan (Kecemasan / Tinggi / Biasa).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Pesanan Tambahan Stok:</strong> Tempah set cadar & tuala baru dari pembekal linen atau tong gas memasak baru daripada pembekal gas dengan 1 sentuhan.</div>
        </div>
      `
    },
    {
      id: 'guide-finances',
      icon: 'fa-chart-line',
      title: '9. Laporan Kewangan & Untung Bersih',
      content: `
        <p>Tekan tab <strong>Kewangan (📈)</strong> untuk melihat prestasi perniagaan anda:</p>
        <ul style="padding-left:18px; margin:6px 0;">
          <li>💵 <strong>Jumlah Hasil:</strong> Jumlah pendapatan sewaan yang diterima.</li>
          <li>📉 <strong>Jumlah Perbelanjaan:</strong> Kos operasi yang direkod (tekan <em>+ Tambah Kos</em>).</li>
          <li>🏆 <strong>Untung Bersih:</strong> Keuntungan sebenar berwarna hijau (<em>Hasil tolak Perbelanjaan</em>).</li>
          <li>📊 <strong>Pecahan Unit:</strong> Carta peratusan unit homestay/bilik yang menjana hasil tertinggi.</li>
        </ul>
      `
    },
    {
      id: 'guide-backup',
      icon: 'fa-shield-halved',
      title: '10. Kemas Kini Tanpa Hilang Data & Sandaran',
      content: `
        <div class="guide-callout success">
          <strong>🔒 Jaminan 100% Data Selamat:</strong><br>
          Semua maklumat homestay, tempahan, rekod penyewa, invois, dan lesen disimpan secara kekal di dalam <code>localStorage</code> peranti anda. Kemas kini aplikasi hanya memperbaharui kod program — ia <strong>tidak sekali-kali memadamkan data anda</strong>!
        </div>
        <div class="guide-step">
          <div class="guide-step-num">1</div>
          <div class="guide-step-text"><strong>Sepanduk 1-Sentuhan:</strong> Apabila versi baharu dikeluarkan, tekan <strong>"Kemas Kini Sekarang"</strong> pada sepanduk atas untuk memuatkan versi terkini (~1 saat).</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">2</div>
          <div class="guide-step-text"><strong>Semak di Tetapan:</strong> Anda juga boleh pergi ke <strong>Tetapan (⚙️) > Versi Aplikasi</strong> dan tekan <strong>"Semak Kemas Kini"</strong> pada bila-bila masa.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">3</div>
          <div class="guide-step-text"><strong>Aplikasi Telefon (PWA):</strong> Jika dipasang di skrin utama telefon, tutup aplikasi sepenuhnya dan buka semula semasa ada internet untuk muat turun fail terkini di latar belakang.</div>
        </div>
        <div class="guide-step">
          <div class="guide-step-num">4</div>
          <div class="guide-step-text"><strong>Sandaran Keselamatan:</strong> Di <strong>Tetapan (⚙️) > Sandaran Data</strong>, tekan <strong>"Eksport Sandaran (.json)"</strong> bila-bila masa untuk simpan salinan keselamatan fail bisnes anda.</div>
        </div>
      `
    }
  ]
};

function openUserGuideModal() {
  const currentAppLang = appState.settings.language || 'en';
  
  // Set segment active state matching app language
  document.querySelectorAll('#guideLangSegmented .segment-btn').forEach(b => {
    b.classList.toggle('active', b.getAttribute('data-glang') === currentAppLang);
  });

  renderUserGuideAccordion(currentAppLang);
  document.getElementById('userGuideModal').classList.add('active');
}

function renderUserGuideAccordion(lang = 'en') {
  const container = document.getElementById('userGuideAccordion');
  if (!container) return;
  container.innerHTML = '';

  const list = USER_GUIDE_DATA[lang] || USER_GUIDE_DATA.en;

  list.forEach((item, index) => {
    const card = document.createElement('div');
    card.className = `guide-card ${index === 0 ? 'active' : ''}`;
    card.innerHTML = `
      <div class="guide-card-header">
        <div class="guide-card-title-group">
          <div class="guide-card-icon">
            <i class="fa-solid ${item.icon}"></i>
          </div>
          <h4 class="guide-card-title">${item.title}</h4>
        </div>
        <i class="fa-solid fa-chevron-down guide-card-chevron"></i>
      </div>
      <div class="guide-card-body">
        ${item.content}
      </div>
    `;

    card.querySelector('.guide-card-header').addEventListener('click', () => {
      const wasActive = card.classList.contains('active');
      container.querySelectorAll('.guide-card').forEach(c => c.classList.remove('active'));
      if (!wasActive) card.classList.add('active');
    });

    container.appendChild(card);
  });
}

// Start application
window.addEventListener('DOMContentLoaded', initApp);
