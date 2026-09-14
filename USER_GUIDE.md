# 📖 HOMESTAY MANAGER — COMPLETE USER GUIDE & MANUAL
## 📘 PANDUAN LENGKAP PENGGUNA PENGURUSAN HOMESTAY & SEWAAN BILIK

---

## 🌟 TABLE OF CONTENTS / SENARAI KANDUNGAN

1. [Deployment & Mobile Installation / Pelancaran & Pemasangan Telefon](#1-deployment--mobile-installation--pelancaran--pemasangan-telefon)
2. [First-Time Setup & Settings / Tetapan Awal & Profil Bisnes](#2-first-time-setup--settings--tetapan-awal--profil-bisnes)
3. [Managing Properties & Rooms / Pengurusan Homestay & Bilik](#3-managing-properties--rooms--pengurusan-homestay--bilik)
4. [Creating Bookings & Tenancies / Merekod Tempahan & Sewaan](#4-creating-bookings--tenancies--merekod-tempahan--sewaan)
5. [Multi-Month Invoicing & Receipts / Invois & Resit Bulanan](#5-multi-month-invoicing--receipts--invois--resit-bulanan)
6. [1-Tap WhatsApp Automation / Automasi Mesej WhatsApp 1-Sentuhan](#6-1-tap-whatsapp-automation--automasi-mesej-whatsapp-1-sentuhan)
7. [Deposit Refunds & Move-Out / Pemulangan Deposit & Tamat Sewaan](#7-deposit-refunds--move-out--pemulangan-deposit--tamat-sewaan)
8. [Turnover, Maintenance Team & Suppliers Directory / Pengurusan Pembersihan, Pasukan Penyelenggaraan & Pembekal](#8-turnover-maintenance-team--suppliers-directory--pengurusan-pembersihan-pasukan-penyelenggaraan--pembekal)
9. [Financial Reports & Expenses / Laporan Kewangan & Untung Bersih](#9-financial-reports--expenses--laporan-kewangan--untung-bersih)
10. [Updating the App (Zero Data Loss) / Kemas Kini Tanpa Hilang Data](#10-updating-the-app-zero-data-loss--kemas-kini-tanpa-hilang-data)
11. [Licensing & Security / Pengurusan Lesen & Keselamatan](#11-licensing--security--pengurusan-lesen--keselamatan)

---

## 1. Deployment & Mobile Installation / Pelancaran & Pemasangan Telefon

### 🇬🇧 English: How to Deploy & Install

#### A. Free Online Hosting via GitHub Pages
1. Go to [GitHub.com](https://github.com/) and create a free repository named `homestay-manager`.
2. Upload the 6 core files: `index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, and `version.json`.
3. Go to **Settings** > **Pages** > Under *Branch*, select `main` (or `master`) and click **Save**.
4. In ~60 seconds, your app will be live at: `https://<your-username>.github.io/homestay-manager/`.

#### B. Installing as a Native App on Mobile (PWA)
* **iPhone / iPad (iOS)**:
  1. Open your live link in **Safari**.
  2. Tap the **Share** button (box with an arrow pointing up).
  3. Tap **"Add to Home Screen"** > Tap **Add**.
* **Android (Samsung, Xiaomi, Oppo, etc.)**:
  1. Open your live link in **Google Chrome**.
  2. Tap the **Three Dots Menu (⋮)** at the top right.
  3. Tap **"Install App"** or **"Add to Home screen"**.

> 💡 **Offline Ready**: Once installed, the app opens full-screen with no browser address bar and works even without internet access!

---

### 🇲🇾 Bahasa Melayu: Cara Pelancaran & Pemasangan

#### A. Hos Percuma di GitHub Pages
1. Layari [GitHub.com](https://github.com/) dan cipta repositori baharu bernama `homestay-manager`.
2. Muat naik 6 fail utama: `index.html`, `styles.css`, `app.js`, `manifest.json`, `sw.js`, dan `version.json`.
3. Pergi ke **Settings** > **Pages** > Pada bahagian *Branch*, pilih `main` dan tekan **Save**.
4. Dalam 60 saat, sistem anda sedia dilayari di: `https://<nama-anda>.github.io/homestay-manager/`.

#### B. Pasang Sebagai Aplikasi Telefon Pintar (PWA)
* **Pengguna iPhone / iPad (iOS)**:
  1. Buka pautan aplikasi di pelayar **Safari**.
  2. Tekan butang **Kongsi (Share)** (ikon petak dengan anak panah ke atas).
  3. Skrol ke bawah dan pilih **"Add to Home Screen" (Tambah ke Skrin Utama)** > Tekan **Add**.
* **Pengguna Android**:
  1. Buka pautan aplikasi di pelayar **Google Chrome**.
  2. Tekan ikon **Tiga Titik (⋮)** di penjuru kanan atas.
  3. Tekan **"Install App" (Pasang Aplikasi)** atau **"Add to Home screen"**.

---

## 2. First-Time Setup & Settings / Tetapan Awal & Profil Bisnes

### 🇬🇧 English: Setting up Your Business Profile
1. Tap the **Settings (⚙️)** tab in the bottom navigation bar.
2. Fill in your business particulars:
   * **Business Name**: e.g., *Bayu Homestay & Rooms*
   * **Currency**: Select `RM (MYR)`, `$ (USD)`, `S$ (SGD)`, etc.
   * **Owner WhatsApp Number**: e.g., `+60123456789` (Required for WhatsApp templates & licensing)
   * **Language**: Choose English or Bahasa Melayu (Switchable anytime via top header button `EN/BM`).
   * **Default Booking Deposit %**: Default percentage requested to lock bookings (e.g. `30%` or `50%`).
   * **Bank & DuitNow Details**: Bank Name, Account Number, Account Holder Name, and DuitNow ID.
3. Tap **"Save Preferences"** and **"Save Payment Details"**.

---

### 🇲🇾 Bahasa Melayu: Menetapkan Profil Homestay Anda
1. Tekan tab **Tetapan (⚙️)** pada bar navigasi bawah.
2. Isikan butiran bisnes anda:
   * **Nama Bisnes / Homestay**: Cth: *Bayu Homestay & Bilik Sewa*
   * **Mata Wang**: Pilih `RM (MYR)`, `$`, dsb.
   * **Nombor WhatsApp Pemilik**: Cth: `+60123456789` (Digunakan untuk kunci lesen dan penghantaran WhatsApp).
   * **Bahasa**: Pilih Bahasa Melayu atau Bahasa Inggeris (Boleh ditukar bila-bila masa melalui butang `EN/BM` di atas).
   * **Peratusan Deposit Lalai**: Peratusan bayaran booking untuk kunci tarikh (cth: `30%` atau `50%`).
   * **Maklumat Bank & DuitNow**: Nama Bank, No Akaun, Nama Pemegang, dan No DuitNow.
3. Tekan **"Simpan Tetapan & WhatsApp"** dan **"Simpan Maklumat Bank"**.

---

## 3. Managing Properties & Rooms / Pengurusan Homestay & Bilik

### 🇬🇧 English: Adding Whole Units or Room Rentals
The app supports both whole homestays and individual room rentals:
1. Tap **Settings (⚙️)** > Tap **"+ Add Unit"** (or tap **"+ Add"** in the top header).
2. Enter the unit information:
   * **Property Name**: e.g. *Sunset Villa Unit A*
   * **Room / Unit No**: e.g. *Master Bedroom*, *Room 2*, *Villa 3A*
   * **Rental Category**:
     * `🏡 Entire House / Whole Unit` (Whole House / Villa)
     * `🚪 Room Rental - Master Bedroom`
     * `🚪 Room Rental - Medium Room`
     * `🚪 Room Rental - Single Room`
     * `🏢 Studio / Apartment Suite`
   * **Location Address**: Full address for guest navigation.
   * **Smart Lock Door PIN**: Self-check-in PIN (e.g., `5829#`).
   * **WiFi Details**: Network Name (SSID) and Password (automatically generates in Guest Guide).
   * **Default Nightly Rate & Cleaning Fee**: Standard pricing per night.
   * **Check-In & Check-Out Times**: e.g., 3:00 PM / 12:00 PM.
3. Tap **"Save Property"**.

---

### 🇲🇾 Bahasa Melayu: Menambah Unit Homestay & Bilik Sewa
Sistem menyokong pengurusan seluruh rumah dan bilik sewa individu:
1. Tekan tab **Tetapan (⚙️)** > Tekan butang **"+ Tambah Unit Homestay / Bilik"**.
2. Masukkan maklumat unit:
   * **Nama Unit**: Cth: *Villa Pantai Unit A*
   * **No. Bilik / Rujukan**: Cth: *Bilik Master*, *Bilik 2*, *Tingkat 3A*
   * **Kategori Sewaan**:
     * `🏡 Seluruh Rumah / Unit Penuh` (Villa / Homestay)
     * `🚪 Sewa Bilik - Bilik Utama (Master Room)`
     * `🚪 Sewa Bilik - Bilik Medium`
     * `🚪 Sewa Bilik - Bilik Single`
     * `🏢 Studio / Suite Apartmen`
   * **Alamat Lengkap**: Untuk panduan lokasi tetamu.
   * **Kod PIN Kunci Pintu Pintar (Smart Lock)**: Cth: `5829#`.
   * **Maklumat WiFi**: Nama WiFi dan Kata Laluan.
   * **Kadar Semalam & Yuran Pembersihan**: Harga asas semalam.
   * **Waktu Daftar Masuk & Keluar**: Cth: 3:00 PM / 12:00 PM.
3. Tekan **"Simpan Unit Homestay"**.

---

## 4. Creating Bookings & Tenancies / Merekod Tempahan & Sewaan

Tap the floating **`+` (Add)** button on any screen to open the booking modal.

```
┌─────────────────────────────────────────────────────────────┐
│                   RENTAL TYPE SWITCHER                      │
│   [ ☀️ Daily / Short-Term Stay ]   [ 📅 Monthly Tenancy ]   │
└─────────────────────────────────────────────────────────────┘
```

### 🇬🇧 English: Daily vs. Monthly Bookings

#### 1. Daily / Short-Term Stays (Holidays & Short Trips)
* Select **"Daily / Short-Term"**.
* Monthly fields are **automatically blocked and disabled**.
* Enter:
  * **Check-In & Check-Out Dates**: Nights are calculated automatically.
  * **Nightly Rate & Cleaning Fee**.
  * **Refundable Security Deposit**: (e.g. RM 100).
  * **Quick Deposit Presets**: Tap `30%`, `50%`, `100% Full`, or `0` to autofill advance payment.
  * **Tenant Particulars**: Full Name, WhatsApp Phone, NRIC/Passport, Email, Residential Address.

#### 2. Monthly Tenancy (Students, Working Adults, Medium-Term Stays)
* Select **"Monthly Tenancy"**.
* Daily stay fields are **automatically blocked and disabled**.
* Enter:
  * **Tenancy Start Date** & **Duration in Months** (e.g. 6 Months).
  * **Monthly Rental**: (e.g. RM 1,200/mo).
  * **Rental Deposit (Refundable)**: (e.g. 1 or 2 months rent).
  * **Utilities Deposit (Refundable)**: (e.g. RM 300).
  * **Tenancy Agreement & Stamping Fee**: (e.g. RM 150).
  * The system automatically computes the **Total Move-In Initial Settlement Package**.

---

### 🇲🇾 Bahasa Melayu: Tempahan Harian vs. Sewaan Bulanan

#### 1. Sewaan Harian / Percutian (Short-Term Stay)
* Pilih **"Harian / Jangka Pendek"**.
* Bahagian sewaan bulanan akan **disekat dan dikunci secara automatik**.
* Isikan:
  * **Tarikh Masuk & Keluar**: Bilangan malam dikira automatik.
  * **Kadar Semalam & Yuran Pembersihan**.
  * **Deposit Keselamatan (Dipulangkan)**: Cth: RM 100.
  * **Pilihan Pantas Deposit %**: Tekan `30%`, `50%`, `100% Penuh`, atau `0`.
  * **Butiran Tetamu**: Nama Penuh, WhatsApp, No. KP/Pasport, Emel, Alamat Rumah.

#### 2. Sewaan Bulanan (Bilik Sewa, Rumah Sewa Bulanan)
* Pilih **"Sewaan Bulanan"**.
* Bahagian harian akan **disekat dan dikunci secara automatik**.
* Isikan:
  * **Tarikh Mula Sewa** & **Tempoh Sewa (Bulan)**: Cth: 6 Bulan.
  * **Sewa Bulanan**: Cth: RM 1,200/bulan.
  * **Deposit Sewa (Boleh Dipulangkan)**: Cth: RM 1,200.
  * **Deposit Utiliti (Boleh Dipulangkan)**: Cth: RM 300.
  * **Yuran Perjanjian Sewa & Duti Setem**: Cth: RM 150.
  * Sistem mengira **Jumlah Pakej Kemasukan (Move-In Package)** dengan tepat.

---

## 5. Multi-Month Invoicing & Receipts / Invois & Resit Bulanan

For monthly tenancies, the app provides a **Sequential Monthly Billing Engine**.

### 🇬🇧 English: Monthly Billing & Invoicing Flow
1. Open the **Bookings** tab.
2. On any monthly tenancy card, tap **`📑 Monthly Invoices (X/Y Paid)`**.
3. A schedule sheet opens displaying all months (e.g., Month 1 to Month 6):
   * **Month 1**: Settled during initial move-in (`🟢 PAID`).
   * **Month 2 to Month N**: Shows exact billing period (*01 Oct – 31 Oct*), unique invoice number (*INV-M2-XXXX*), and payment due date.
4. **Sending WhatsApp Invoices**:
   * Tap **`Invoice`** next to any month.
   * The WhatsApp modal opens with that specific month pre-selected.
   * Optionally enter **Utility Arrears (TNB / Water surcharge)** to add to that month's bill.
   * Tap **"Open WhatsApp"** to send the formatted invoice with banking details!
5. **Marking as Paid & Sending Receipts**:
   * Tap **`Mark Paid`** once tenant transfers payment (records exact timestamp).
   * Tap **`Receipt`** to generate an official **Monthly Rent Payment Receipt** (`REC-RENT-M2-XXXX`).

---

### 🇲🇾 Bahasa Melayu: Aliran Invois & Resit Sewa Bulanan
1. Buka tab **Tempahan (Bookings)**.
2. Pada kad sewaan bulanan, tekan butang **`📑 Jadual Invois (X/Y Dibayar)`**.
3. Paparan jadual bulanan akan dibuka menyenaraikan semua bulan (cth: Bulan 1 hingga Bulan 6):
   * **Bulan 1**: Telah selesai semasa pakej kemasukan (`🟢 DIBAYAR`).
   * **Bulan 2 hingga Bulan N**: Memaparkan tempoh bil (*01 Okt – 31 Okt*), nombor rujukan (*INV-M2-XXXX*), dan tarikh akhir bayaran.
4. **Menghantar Invois WhatsApp**:
   * Tekan butang **`Invois`** pada bulan yang berkenaan.
   * Modal WhatsApp akan terbuka dengan bulan tersebut dipilih.
   * Boleh masukkan **Caj Utiliti / Tambahan (TNB/Air)** jika ada.
   * Tekan **"Buka WhatsApp"** untuk menghantar invois lengkap berserta no akaun bank!
5. **Menanda Bayaran & Menghantar Resit**:
   * Tekan **`Tanda Bayar`** apabila penyewa telah membuat bayaran.
   * Tekan **`Resit`** untuk menghantar **Resit Rasmi Bayaran Sewa Bulanan** (`REC-RENT-M2-XXXX`).

---

## 6. 1-Tap WhatsApp Automation / Automasi Mesej WhatsApp 1-Sentuhan

The app includes 8 built-in bilingual templates with zero manual typing required:

| Template / Templat | Purpose (English) | Kegunaan (Bahasa Melayu) |
|---|---|---|
| **📄 Quotation** | Official price breakdown & booking deposit request | Sebut harga rasmi & jumlah bayaran booking |
| **🧾 Deposit Receipt** | Confirms booking & marks dates as reserved | Pengesahan deposit & unit ditanda ditempah |
| **🔑 Full Receipt & Keys** | Full payment confirmation with Smart Lock PIN & WiFi | Resit penuh berserta PIN pintu & WiFi |
| **📑 Monthly Invoice** | Specific billing cycle invoice with bank & due date | Invois sewa bulanan mengikut bulan & tarikh akhir |
| **🧾 Monthly Rent Receipt** | Official monthly rent payment receipt | Resit rasmi pengesahan bayaran sewa bulanan |
| **🏁 Check-Out Reminder** | Check-out time, switch-off guide & key return | Peringatan waktu keluar & serahan kunci |
| **💰 Refund Statement** | Itemized deposit refund statement & deductions | Penyata pulangan deposit & tolakan bil utiliti |
| **🧹 Cleaner Notice** | Job alert with unit, check-out time & PIN code | Arahan pembersihan unit kepada staf pembersihan |

---

## 7. Deposit Refunds & Move-Out / Pemulangan Deposit & Tamat Sewaan

### 🇬🇧 English: End of Tenancy & Deposit Settlement
1. On the booking card, tap **`End Tenancy & Refund Deposit`** (or *Refund Security Deposit*).
2. The refund calculator opens showing:
   * Rental Deposit & Utilities Deposit held.
   * Enter deductions for **Unpaid Utilities (TNB/Water)** or **Cleaning/Repairs**.
   * Enter bank account notes for transfer.
3. Tap **"Send Refund Statement"** — the app records the refund and opens a WhatsApp statement itemizing deposits, deductions, and net refund amount.

---

### 🇲🇾 Bahasa Melayu: Tamat Sewaan & Penyata Pulangan Deposit
1. Pada kad tempahan, tekan butang **`Tamat Sewa & Pulang Deposit`**.
2. Kalkulator pulangan deposit akan dipaparkan:
   * Jumlah deposit sewa dan deposit utiliti yang dipegang.
   * Masukkan jumlah tolakan jika ada **Tunggakan Bil Utiliti (TNB/Air)** atau **Kerosakan / Pembersihan**.
   * Masukkan catatan akaun bank penerima.
3. Tekan **"Hantar Penyata Pulangan"** — sistem mengira baki bersih dan membuka WhatsApp dengan penyata perincian tolakan yang telus.

---

## 8. Turnover, Maintenance Team & Suppliers Directory / Pengurusan Pembersihan, Pasukan Penyelenggaraan & Pembekal

* **Maintenance Team & Suppliers Directory**: Store your full network of cleaners, aircond technicians, plumbers, electricians, handymen, locksmiths, and supply vendors (linens, laundry, cooking gas, guest amenities) in **Settings > Maintenance Team & Suppliers**.
* **Automatic Turnaround Schedules**: Every check-out automatically creates a turnover task in the **Turnovers (🧹)** tab with an interactive checklist.
* **1-Tap Cleaner WhatsApp Dispatch**: Tap **"WhatsApp Cleaner"** on any turnover card to open the Dispatch modal. Property address, Google Maps GPS link, Smart Lock Door PIN, and cleaning window are pre-filled and sent to your saved cleaner via WhatsApp in 1 tap.
* **On-Demand Service & Restock Alerts**: Tap **"[🛠️ Service / Supply Alert]"** in the Turnovers header to dispatch emergency repairs (aircond breakdown, water leak, power trip) or send restock supply orders (fresh linens, towels, gas cylinders) with urgency levels (Urgent / High / Normal) and instructions.

---

## 9. Financial Reports & Expenses / Laporan Kewangan & Untung Bersih

* **Interactive Monthly Dashboard**: View **Total Revenue**, **Total Expenses**, and **Net Profit** for any selected month and year.
* **Revenue by Property**: Visual percentage bars showing which homestay or room generates the most income.
* **Logging Expenses**: Tap **"+ Add Expense"** to log cleaning costs, utility bills, maintenance/repairs, or platform commission.

---

## 10. Updating the App (Zero Data Loss) / Kemas Kini Tanpa Hilang Data

### 🇬🇧 English: Zero-Data-Loss Update Architecture & Guide

#### 1. Why Your Data is 100% Safe During Updates
* **Independent Storage Layers**:
  * **App Code (HTML/CSS/JS)**: Stored inside the browser's Service Worker Cache.
  * **User Data (Units, Bookings, Turnovers, Expenses, Settings, License)**: Stored strictly inside persistent browser **`localStorage`**.
* **Zero Overlap**: When you upload new files to GitHub Pages or Netlify, only the Service Worker cache is refreshed. **The browser's local database is never touched, cleared, or overwritten.**

#### 2. How End Users Receive Updates
1. **Automatic Banner**: The app checks for new versions in the background every 30 minutes. When a new version is detected, a top banner alerts:
   > 🚀 **App Update Available! (vX.X.X) [Update Now]**  
   Tapping **"Update Now"** instantly activates the update (~1s reload) with all existing bookings intact.
2. **Manual Check via Settings**: Owners can go to **Settings (⚙️) > App Version & Updates** and tap **"🔍 Check for Updates"** anytime.
3. **PWA Mobile App (Home Screen)**: Closing the app (swiping it away from recent apps) and reopening while connected to WiFi or mobile data auto-refreshes the app files in the background.
4. **Safety Net Export**: Owners can tap **"Export Backup (.json)"** in **Settings > Data Backup** at any time to save an encrypted snapshot of their entire business.

---

### 🇲🇾 Bahasa Melayu: Seni Bina & Panduan Kemas Kini Tanpa Hilang Data

#### 1. Mengapa Data Anda 100% Selamat Semasa Kemas Kini
* **Pemisahan Lapisan Simpanan**:
  * **Kod Aplikasi (HTML/CSS/JS)**: Disimpan di dalam Cache Service Worker pelayar.
  * **Data Pengguna (Unit, Tempahan, Pembersihan, Kewangan, Lesen)**: Disimpan secara kekal di dalam **`localStorage`** peranti anda.
* **Tiada Risiko Terpadam**: Apabila anda memuat naik versi baharu, hanya fail kod cache yang diperbaharui. **Pangkalan data `localStorage` peranti anda tidak sekali-kali disentuh atau dipadamkan.**

#### 2. Cara Pengguna Mengemas Kini Aplikasi
1. **Sepanduk Automatik**: Aplikasi menyemak versi terkini di latar belakang setiap 30 minit. Apabila dikesan, sepanduk di atas akan muncul:
   > 🚀 **Kemas Kini Baharu Tersedia! (vX.X.X) [Kemas Kini Sekarang]**  
   Menekan butang **"Kemas Kini Sekarang"** akan memuatkan versi terbaharu dalam 1 saat tanpa menjejaskan mana-mana rekod sedia ada.
2. **Semakan Manual di Tetapan**: Pemilik boleh ke **Tetapan (⚙️) > Versi Aplikasi & Kemas Kini** dan tekan **"🔍 Semak Kemas Kini"** pada bila-bila masa.
3. **Aplikasi Skrin Utama (PWA)**: Tutup aplikasi sepenuhnya (leret keluar daripada senarai aplikasi) dan buka semula semasa ada sambungan internet untuk memuat turun fail terkini.
4. **Sandaran Keselamatan**: Pemilik boleh menekan **"Eksport Sandaran (.json)"** di **Tetapan > Sandaran Data** bila-bila masa untuk menyimpan fail salinan keselamatan perniagaan mereka.

---

## 11. Licensing & Security / Pengurusan Lesen & Keselamatan

### 🇬🇧 English: WhatsApp Phone-Bound Security
* **Phone-Locked Keys**: Each customer's license key is cryptographically tied to their registered WhatsApp phone number (`STAY-<PHONE>-<HASH1>-<HASH2>`).
* If a competitor or unauthorized party copies the files, they cannot use the license because it is locked to the legitimate owner's WhatsApp number.
* **Master Admin Keys**:
  * Unlocks unlimited property creation and opens the built-in **License Key Generator** in the Settings tab to generate customer license keys.

---

### 🇲🇾 Bahasa Melayu: Keselamatan Lesen Terkunci Nombor WhatsApp
* **Lesen Terkunci Nombor Telefon**: Setiap kunci lesen dijana secara kriptografi khas untuk nombor WhatsApp pemilik (`STAY-<NO_TEL>-<HASH1>-<HASH2>`).
* Jika pihak lain menyalin fail aplikasi anda, mereka tidak dapat menggunakannya kerana fungsi automasi dan pengesahan terkunci kepada nombor WhatsApp anda.
* **Kunci Master Admin**:
  * Membuka unit tanpa had dan mengaktifkan **Penjana Kunci Lesen (License Generator)** di tab Tetapan untuk menjana lesen pelanggan baharu.

---

### 📞 Summary of Key Shortcuts / Ringkasan Pintasan Utama

| Action / Tindakan | Where to Find / Di Mana Hendak Tekan |
|---|---|
| ➕ **Add Booking / Tambah Tempahan** | Floating `+` button on bottom-right / Butang terapung `+` |
| 🌐 **Switch Language (EN / BM)** | Top Header `EN/BM` button or Settings / Butang `EN/BM` di atas |
| 📑 **Monthly Invoices / Jadual Invois** | On monthly booking card in Bookings tab / Pada kad sewaan bulanan |
| 🔑 **Guest Welcome Kit / Kod Akses Tetamu** | Top Header Book Icon / Ikon Buku di bar atas |
| ⚙️ **Settings & Bank Details** | Bottom nav `Settings` tab / Tab `Tetapan` di bawah |
| 📥 **Export Backup Data / Eksport Data** | Settings > Data & Backup / Tetapan > Data & Sandaran |
