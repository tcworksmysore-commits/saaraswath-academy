# Local SEO checklist: Saaraswath IAS/KAS Academy

Do these once, signed in as **saaraswath.mysore@gmail.com**. Together they matter more for "IAS coaching in Mysuru" than anything on the website itself.
Website address to use everywhere (until the domain is bought): `https://tcworksmysore-commits.github.io/saaraswath-academy/`

## 1. Google Business Profile (most important, ~30 min)
1. Open https://business.google.com and search "Saaraswath IAS KAS Academy". Claim the existing listing, or create it.
2. Use the exact same name, address and phone as the website:
   - Name: **Saaraswath IAS/KAS Academy** (no extra keywords; Google penalises that)
   - Address: No. 608, 1st Floor, P & T Block, Near Gnanaganga PU College, Panchamantra Road, Kuvempunagar, Mysuru 570023
   - Phone: +91 76194 15566 · Website: the address above
3. Primary category: **Coaching center**. Extra categories: *Educational institution*, *Tutoring service*.
4. Opening hours, a short description (2–3 calm sentences: courses, Kannada + English, since 2019), and **Services**: UPSC coaching, KAS coaching, PSI/PC coaching, Degree foundation, Kannada Literature optional.
5. Add 10+ real photos: board outside, classroom, library, founder, felicitations. Add the logo and a cover photo.
6. Verify the listing (postcard, phone or video, whichever Google offers).

## 2. Reviews (keep doing this every month)
- In the Business Profile, copy the **"Ask for reviews"** link. Send it on WhatsApp to current and past students (e.g. Pooja, Dayanand, Dinesha, Krishna, Santhosh) with a polite request.
- Reply to every review within a few days, briefly and politely, including any negative ones.
- Never buy reviews or write them yourself; Google removes them and can suspend the listing.

## 3. Google Posts (weekly, 5 min)
In the Business Profile, add a post each week: a new batch date, an exam update (link to the matching article on the site), a student result, or a YouTube class. Use the "Call" or "Learn more" button.

## 4. Google Search Console (~10 min)
1. Open https://search.google.com/search-console → Add property → **URL prefix** → the website address above.
2. Verify with the **HTML tag** method: copy the `<meta name="google-site-verification" ...>` tag and send it to the website developer (it goes into `client/index.html`). Then click Verify.
3. Sitemaps → submit `sitemap.xml`.
4. URL inspection → request indexing for the home page and the five course pages:
   `/ias-coaching-in-mysuru`, `/kas-coaching-in-mysuru`, `/psi-coaching-in-mysuru`, `/upsc-foundation-course-for-degree-students`, `/kannada-literature-optional-coaching`.
5. Check "Pages" and "Performance" once a month.

## 5. Bing Webmaster Tools (~5 min)
https://www.bing.com/webmasters → "Import from Google Search Console". Done.

## 6. Same details everywhere (citations)
Make sure name, address, phone and website are identical on: YouTube "About", Instagram bio, Facebook page, Telegram channel description, JustDial, Sulekha, and Google Maps. Add the website link to each.

## 7. When the domain (saaraswathmysore.in) is bought
Tell the developer. The site, sitemap and canonical links will be switched; then add the new domain as a new property in Search Console and update the website on the Business Profile and all social profiles.

## 8. Keep the site alive
- Add an article for each new UPSC/KPSC/KSP notification (see `client/src/data/articles.js`; the instructions are at the top of that file).
- Send the academy's verified list of selections and real Google review count to the developer so the site can show them.
