# Saaraswath IAS/KAS Academy, Mysuru

Official modern web platform for **Saaraswath IAS/KAS Academy**, Kuvempunagar, Mysuru. Founded in 2019 under the academic leadership of **Dr. Vasanth Kumar N**.

## 🏛️ Academy Overview
- **Campus**: #608, 1st Floor, P & T Block (Near Jnanaganga school), Panchamantra Road, Kuvempunagar, Mysuru - 570023
- **Phone / WhatsApp**: +91 7619415566 / +91 7619615566
- **Email**: srisaaraswath@gmail.com
- **Programs**: UPSC Civil Services (IAS), KPSC KAS Gazetted Probationers, Karnataka Police (PSI/PC), 3-Year Degree Foundation, and Kannada Literature Optional.

---

## 🚀 Quick Start Guide

### 1. Run Development Server
From the root directory or inside `client/`:
```bash
npm run dev
```
Open **http://localhost:5173/** in your browser.

### 2. Build for Production
```bash
npm run build
```

---

## 📁 Clean Project Structure

```
SAARASWATH-ACADEMY/
├── client/
│   ├── public/             # High-res logos, brochures, student & campus images
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/     # AchieverCard, CourseCard, FacultyCard, FloatingWhatsApp, etc.
│   │   │   ├── forms/      # ContactForm, EnquiryForm, FormInput with 10-digit validation
│   │   │   ├── home/       # HeroSection, WhyChooseUs, CoursesSection, AchievementsSection, FAQSection, AdmissionCTA
│   │   │   ├── layout/     # Navbar, MobileMenu, PageLayout, Footer, ScrollToTop
│   │   │   └── study-materials/ # StudyMaterialCard, Filters, Section
│   │   ├── pages/          # 15 Public routing pages (Home, About, Courses, Faculty, Achievers, Admissions, etc.)
│   │   ├── services/       # Standalone data services (courses, study materials, faculty, achievements)
│   │   ├── styles/         # Global styles, variables, components, and responsive CSS
│   │   ├── utils/          # Constants, asset helpers, phone & email validators
│   │   ├── App.jsx         # Clean client routing
│   │   └── main.jsx        # App entry point
│   ├── package.json        # Client Vite dependencies
│   └── vite.config.js      # Vite configuration
└── package.json            # Root runner (npm run dev / npm run build)
```
