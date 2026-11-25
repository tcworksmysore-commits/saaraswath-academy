# Saaraswath website: STATUS / build brief

Goal: the best IAS/KAS academy website in Karnataka, built to **generate leads**. Budget: zero (only a domain later).
Project: `E:\WEB SITES\SAARASWATH-ACADEMY-main\SAARASWATH-ACADEMY-main` (Vite + React 18 + react-router, plain CSS).

## Done (phase 0, 2026-11-25)
- GitHub account **tcworksmysore-commits**; repo `tcworksmysore-commits/saaraswath-academy` (public).
  Remote: `https://tcworksmysore-commits@github.com/...` (this PC also has another cached GitHub login: nagalingeshwara1963-design; don't use it).
  Push needs the interactive sign-in; if a push fails with "terminal prompts disabled", run it with `run_in_terminal`.
- `.github/workflows/deploy.yml` builds `client/` and deploys to GitHub Pages on each push to main.
  **Pages source must be set to "GitHub Actions"** (repo Settings → Pages). Live URL: https://tcworksmysore-commits.github.io/saaraswath-academy/
- vite base = `/saaraswath-academy/` (override with env `VITE_BASE=/`). SPA 404 redirect: `client/public/404.html` (pathSegmentsToKeep=1).
- **Planned domain: saaraswathmysore.in** (already printed on their YouTube; NOT registered yet). When bought: VITE_BASE=/,
  pathSegmentsToKeep=0, add `client/public/CNAME`, fix sitemap.xml/robots.txt/canonical/og URLs (they currently say saaraswathacademy.com, which is wrong).

## Real contact data (use everywhere; constants.js is the single source)
- Phones: 7619415566 (also WhatsApp), 7348845454, 7619615566
- Display email: srisaaraswath@gmail.com (keep). **Lead alerts go to saaraswath.mysore@gmail.com.**
- Address: No. 608, 1st Floor, P & T Block, Near Gnanaganga PU College, Panchamantra Road, Kuvempunagar, Mysuru 570023
- Maps: https://maps.app.goo.gl/HsmnvRnqMMPBs4c49
- Instagram https://instagram.com/saaraswath.mysore · Facebook https://facebook.com/SaaraswathAcademyMysore
- YouTube https://www.youtube.com/@Saaraswath.Mysore · Telegram https://t.me/saaraswath
- Founder: Dr. Vasanth Kumar N; founded 2019. Courses: UPSC CSE, KPSC KAS, PSI/PC, 3-yr degree foundation, Kannada literature optional.

## Phase 1 done (2026-11-25)
- Leads: `services/enquiryService.js` POSTs (no-cors, form-encoded) to `LEAD_URL` (= env `VITE_LEAD_URL`, set as a repo
  Actions variable or hard-code in constants.js). `google-apps-script/Code.gs` + `SETUP.md` written; **user must deploy it and send the /exec URL**.
  Until then forms show success but only console.warn the lead (no data lost to localStorage any more, but none delivered either).
- One form for the whole site: `components/common/LeadForm.jsx` (short/full/brochure). `Enquire.jsx` = global modal
  (`openEnquiry({course, variant})`) + mobile bottom bar (Call/WhatsApp/Enquire) + desktop WhatsApp button. Brochure links are gated.
- New design layer `styles/site.css` (bright navy+gold); new Navbar (top strip w/ 3 phones + socials), Footer, Home, Contact (Maps embed).
  Old home components / old forms / MobileMenu / api.js / validators deleted.
- Images → WebP (38.4 → 6.2 MB), brochure 36 → 5.4 MB. SEO: meta, canonical, JSON-LD EducationalOrganization+LocalBusiness, sitemap, robots.
- History was restarted slim (old 60 MB commits kept locally on branch `backup-before-slim`).

Live and checked on mobile 2026-11-25: https://tcworksmysore-commits.github.io/saaraswath-academy/ (pushes work; slow link → push big files in small commits).

## Phase 2 (user request 2026-11-25, verbatim gist): "landing pages for all the courses and many more; everything very nice,
aimed at leads and convincing a visitor this is the best academy; NO bold statements, simple, humble, nicer, more convincing;
best SEO; very nice articles + recent updates; should top Google; whoever clicks should become a student; do whatever it takes."
1. **Pre-render every route to static HTML** (SEO blocker: on GitHub Pages deep links are served with HTTP 404 via 404.html). E.g. a
   post-build script rendering each route (react-dom/server + StaticRouter, or vite-plugin-prerender style) into dist/<route>/index.html
   with its own <title>, description, canonical, JSON-LD (Course, FAQPage, BreadcrumbList, Article). Keep 404.html only for unknown paths.
2. **Course landing pages** (one per course + local-intent pages: "IAS coaching in Mysuru", "KAS coaching in Mysuru", "PSI coaching Mysuru",
   "UPSC foundation for degree students", Kannada optional), each: humble hero + form above fold, who it's for, syllabus/what you get,
   batch/timing/mode, mentor, results, FAQ, fee CTA ("Get fee details"), WhatsApp. Tone: calm, specific, honest; no superlatives/claims
   ("best", "top", "guaranteed", "360-degree", "high selection rate", "All-India benchmarking" in constants.js must go).
3. **Articles / updates section** (/articles, markdown or JS data): strategy guides, KPSC/UPSC exam notifications & dates, syllabus,
   booklists, Karnataka current affairs. Accurate facts only (verify dates/notifications on official sites upsc.gov.in / kpsc.kar.nic.in);
   each article ends with a soft counselling CTA. Plan an easy way for the academy to add posts later.
4. Restyle the inner pages (UPSC, KAS, About, Courses, Faculty, Achievements, Gallery, Admissions) to site.css; rewrite boastful copy.
5. /study-materials: lists fake "official question papers" (all download the brochure) with made-up counts → fix or remove.
6. Local SEO checklist for the user: Google Business Profile (link the site, posts, reviews), Search Console + sitemap submit, Bing.
7. Build, check mobile + desktop, push in small commits, verify live. Lead URL still pending from the user (SETUP.md).

## Phase 2 done (2026-11-25)
- **Pre-render:** `npm run build` = vite build + SSR build of `src/entry-server.jsx` + `scripts/prerender.mjs`, which writes
  `dist/<route>.html` and `dist/<route>/index.html` for every route in `ROUTES` (entry-server.jsx), injects title/description/
  canonical/og + JSON-LD (Breadcrumb, Course, FAQPage, Article) from `<SEO>` (headStore), writes `sitemap.xml` and a noindex `404.html`.
  main.jsx hydrates. New route → add it to App.jsx AND to ROUTES.
- **Landing pages** from `src/data/courses.js` (template `pages/CourseLanding.jsx`): /ias-coaching-in-mysuru, /kas-coaching-in-mysuru,
  /psi-coaching-in-mysuru, /upsc-foundation-course-for-degree-students, /kannada-literature-optional-coaching. Old /upsc, /kas,
  /courses/<id> render the same page with canonical → landing.
- **Articles** in `src/data/articles.js` (markdown body; how-to-add note at top), /articles + /articles/<slug>. 7 posts. Exam facts came
  from news reports (upsc.gov.in 403, kpsc site unreachable to the bot); articles say "confirm on official site". Fact sheet:
  side-session notes `exam_facts.md`. KAS 2026 = 319 posts, prelims 15 Nov 2026; UPSC CSE 2027: notif 13 Jan, prelims 23 May, mains 20 Aug 2027.
- Inner pages rewritten on site.css (shared blocks in `components/common/Blocks.jsx`); boastful copy removed; "demo class" promises
  removed (user chose free counselling call as the offer); timings shown generically (user choice). /study-materials → /free-resources
  (official links only). Old components/services deleted.
- `LOCAL_SEO_CHECKLIST.md` for the user (GBP, reviews, Search Console, Bing, citations).
- Still pending from the user: Apps Script lead URL (SETUP.md), Search Console verification tag, domain, verified results/review count.

## Phase 3 design polish done (2026-11-25)
User choices: hero = photo collage (place photo + founder portrait), serif display headings (Fraunces), generic
"How a batch runs" strip, desktop slim sticky CTA bar after the hero.
- New `components/common/Visual.jsx` (PhotoStack, Photo/PHOTOS, Timeline, Flow, FacultyRow, Testimonial, GalleryStrip,
  StickyCta, MoreLink) + `styles/polish.css` (loaded after site.css). Light photos in `public/images/web/` (720/420 WebP,
  faculty avatars `av-*.webp` 128px).
- Course landings: collage hero, varied icons per card, exam-stage timeline, navy "how a batch runs" strip, framed mentor,
  teaching-team avatars, testimonial (+ achievers), gallery strip, sticky CTA (desktop).
- Home: collage hero (academy front), team + gallery section. `PageHero` takes `photo` (framed tilted card) on all inner
  pages incl. Contact; Admissions steps = vertical timeline; card hovers, floating gallery cards, footer gold rule.
- Fixed: header was not sticky (overflow-x: hidden on html/body) → `overflow-x: clip`.
- Motion: CSS only (load rise + scroll reveal where `animation-timeline` is supported); reduced-motion turns it off.
- Checked 375 + 1280, built pages hydrate with no console errors, no horizontal scroll.

## Phase 4 design round 2 done (2026-11-25)
User feedback: "tilted image not good… refer the best website in this category". Research note (Vision, Drishti, Vajiram,
Insights, NEXT IAS, ForumIAS): side-session notes `design_round2_findings.md`. User choices: big photo + mentor card hero,
all 4 upgrades, inner heroes text-left/photo-right, **clean sans headings** (Fraunces removed; `--font-display` = Plus Jakarta Sans 800).
- No tilt anywhere: PhotoStack = one straight framed photo, location pill top-right, mentor pill card (founder face + name)
  over the lower-left corner; `.ph-pic`, `.f-portrait`, `.gthumb`, gallery `.pic` all straight.
- New in Visual.jsx: `ExamTiles` (Home, under hero), `ResultsStrip` (achievers as portrait cards, moved right after the exam
  tiles), `CallbackCard` (mid-page on Home + every course landing, reuses LeadForm), `VideoCard`/`VideoPair` (poster first,
  video loads only on tap).
- Course landings: "Right for you if / You may want to wait if" (`waitIf` in data/courses.js), call-back card, videos in "Where you will study".
- Videos from the user's promo reels (`E:\Naveen things\Edits`): `public/videos/campus-tour.mp4` (6.9 MB, 480p) and
  `mentor-talk.mp4` (3.6 MB, Sri Narasimha Murthy) + WebP posters. Also on /gallery. The third reel (Navodaya/Sainik
  school entrance, "SINCE 2016", Oct 12 date) was NOT used: not a listed course, and it conflicts with "since 2019".
- Founding year confirmed by the user: **2019** (the "SINCE 2016" in the Navodaya reel is not used on the site).

## Phase 5 plan (audit 2026-11-25, `WEBSITE_AUDIT.md`; user: "you decide best")
User feedback on Phase 4: "not nice fonts and design, the previous was better" (hero: heavy 800 Jakarta, gold highlighter strip,
gaps before "," and ".", tiny faint Kannada line). User answers: look = Claude chooses a premium one; build order = Claude decides;
fees = honest line, no numbers; results cards = keep as they are (do not change names/honorifics/cards).
**5a (next chat, Opus for design):**
1. Premium type: Fraunces (600, normal tracking) for display headings + Plus Jakarta Sans body; plain accent colour, no highlighter;
   fix the punctuation gaps; Kannada hero line 18-20px, darker. Check 375 + 1280, show the user a screenshot.
2. Form + CTA trust (audit 1.1-1.3, 2.2, 2.4): main CTA "Get a call back"; "what happens next" 3 steps; privacy line "One call from
   76194 15566. No marketing SMS, number never shared"; How to reach you (Call/WhatsApp/Visit) + best time; **while LEAD_URL is
   empty, the form opens WhatsApp with the details prefilled** so no lead is lost. Fees FAQ/CTA = honest line ("Fees depend on batch
   and mode; we tell you the exact fee on the first call, no visit needed").
3. Mobile hero: two buttons above the fold, smaller photo. Speed: preload hero img + fetchpriority, self-host fonts, favicon
   413 KB -> <10 KB, 1200x630 og share images + summary_large_image, 4 missing alts.
4. Build, check, push small commits, verify live.
**5b later:** Kannada /kn/ pages + hreflang; content engine (exam calendar 2027, monthly Karnataka CA, KAS syllabus/booklist PDFs).
Academy to-dos (Apps Script URL, domain, GBP, reviews, photos, hours, batch dates): list in WEBSITE_AUDIT.md.

## Phase 5a done (2026-11-25, commits a944ec5, 866cb87, 9785094)
- **Type:** `--font-display` = Fraunces 600 (headings, course/article h3, footer h4, sticky bar), body Plus Jakarta Sans.
  Fonts are self-hosted via `@fontsource/*` (imported in `main.jsx`, latin + Kannada subsets only); the Google Fonts links are gone.
  Hero `em` = plain accent colour `--accent-ink` #9a6a00 (no highlighter, no padding, so no gap before "," or "."). Kannada hero line 19px (18px phone), navy.
- **Form (`LeadForm.jsx`):** button "Get a call back"; chips "How should we reach you?" (Call / WhatsApp only / I will visit) and
  "Best time" (Morning / Evening / Weekend), sent inside `message` (so `Code.gs` columns are unchanged); 3-step "what happens next"
  under the form and on the thank-you screen; privacy line "One call from 76194 15566. No marketing SMS, and your number is never
  shared." + Privacy link. **While `LEAD_URL` is empty, submit opens WhatsApp with all details prefilled** and the thank-you screen
  asks the visitor to tap Send. Once the Apps Script URL is set, it posts to the sheet and WhatsApp is only an optional button.
- **CTA wording:** "Get a call back" (form/modal/header/menu/bands/sticky bar) + "WhatsApp us"; "Get fee details" kept. Fee FAQ
  everywhere: "Fees depend on the batch and mode. We tell you the exact fee on the first call, so no visit is needed." No numbers.
- **Phone hero:** `HeroCtaM` (Visual.jsx) shows "Get a call back" (#enquire) + "WhatsApp us" under the lead text below 960px;
  hero photo 16:9 on phones. Both buttons sit above the fold at 375x812.
- **Speed/share:** SEO takes `preload` (hero photo key) and `image` (og name); prerender writes a `<link rel=preload as=image
  imagesrcset fetchpriority=high>` and the per-page og:image; eager `<Photo>` has fetchpriority=high. favicon.ico 413 KB -> 5 KB,
  `apple-touch-icon.png` 180px. Share images `public/images/og/{home,ias,kas,psi,foundation,optional}.jpg` (1200x630, made by
  `client/scripts/make_og.py`, rerun it if titles/photos change), `summary_large_image`. Alt text on logos + video posters.
- Results/achiever cards untouched. Checked 375 + 1280 on the built site: no console errors, no horizontal scroll, form WhatsApp
  fallback tested (prefilled text correct).
- Not done (next): navbar/footer logo still loads the 98 KB `academy-logo-tight.webp` at 44px (make a 96px version); inner-page
  heroes do not preload their photo yet.

## Older phase 2 notes
- Inner pages (UPSC, KAS, About, Courses, Faculty, Achievements, Gallery, Admissions) still use the older dark-hero inline-style design; restyle to site.css.
- /study-materials page (unlinked now) lists "official question papers" that all download the brochure, with made-up download counts: fix or remove.
- Add a verified selections count / Google reviews when the academy provides them.

## Phase 1 brief (original)
1. **Leads (top priority):** `services/enquiryService.js` saves only to localStorage, so leads go NOWHERE right now. Replace it with a POST
   (`no-cors`, form-encoded) to a Google Apps Script web app, whose URL goes in `VITE_LEAD_URL` / constants. Write `google-apps-script/Code.gs`:
   doPost → append a row (time, name, phone, email, course, mode, message, page, source/UTM) to the sheet "Leads"; MailApp
   email to saaraswath.mysore@gmail.com; honeypot field + basic phone validation. Add a status column (New/Called/Joined) with dropdown.
   Write `google-apps-script/SETUP.md`: 5-click steps for the user while signed in to saaraswath.mysore@gmail.com
   (new sheet → Extensions → Apps Script → paste → Deploy as web app, "Anyone" → copy URL). The user does this step.
   Show a success screen with WhatsApp follow-up offered, never forced.
2. **Contact everywhere:** sticky mobile bottom bar (Call · WhatsApp · Enquire), floating WhatsApp on desktop, header phone,
   footer with all socials (lucide has no brand icons; use inline SVGs), click-to-call links for all 3 numbers, Maps embed on Contact.
3. **Design overhaul:** research top IAS academies (Vajiram, Vision IAS, Shankar IAS, Insights IAS, Drishti, plus Karnataka ones) and beat them:
   bright, premium, trustworthy; strong hero with a clear offer + enquiry form above the fold; results/achievers proof, founder,
   free demo class / counselling CTA, brochure download behind a lead form (optional), course pages with fees/batch/mode CTA,
   FAQ, testimonials, YouTube embeds (latest videos), Kannada+English friendly. Mobile-first; most visitors use phones.
4. **Speed:** images total 36.6 MB, brochure PDF 35 MB. Convert images to WebP (≤200 KB each), compress the PDF (<5 MB),
   lazy-load, aim for Lighthouse ≥90. Remove dead backend bits (api.js admin token, MONGODB/JWT .env.example).
5. SEO: local "IAS coaching Mysore" / "KAS coaching Mysuru", schema.org EducationalOrganization + LocalBusiness, fix the domain in meta.
6. Test (`npm run build`, browser pane at mobile + desktop), commit, push, verify the live URL.
