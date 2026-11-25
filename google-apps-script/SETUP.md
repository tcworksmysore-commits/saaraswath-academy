# Lead sheet setup (one time, about 5 minutes)

Every enquiry on the website goes into a Google Sheet and sends an instant email to **saaraswath.mysore@gmail.com**.
Do these steps on a computer, **signed in to saaraswath.mysore@gmail.com** in Chrome.

1. Open https://sheets.new and name the sheet **Saaraswath Leads**.
2. In the menu click **Extensions → Apps Script**. Delete everything in the editor, then paste the whole of
   `Code.gs` (in this folder). Press **Ctrl+S**.
3. At the top, choose the function **setup** and click **Run**. Google asks for permission:
   **Review permissions → choose saaraswath.mysore@gmail.com → Advanced → Go to project (unsafe) → Allow**.
   (It says "unsafe" only because you wrote the script yourself.) A tab called **Leads** appears in the sheet.
4. Click **Deploy → New deployment → ⚙ Select type → Web app**.
   - Description: `website leads`
   - Execute as: **Me**
   - Who has access: **Anyone**
   Click **Deploy**, then **Copy** the **Web app URL** (it ends in `/exec`).
5. Send that URL to Claude (or paste it into `client/src/utils/constants.js` as `LEAD_URL`, then push).
   From then on every form on the site lands in the sheet + your email.

## Daily use
- New rows show **Status = New**. Change it with the dropdown: Called / Visited / Joined / Not interested. Use **Notes** for remarks.
- Install the **Google Sheets** app on the phone to see leads anywhere; turn on Gmail notifications for instant alerts.
- Free limits: about 100 alert emails a day (rows are always saved even past that).

## If you change Code.gs later
Deploy → **Manage deployments** → ✏ edit → Version: **New version** → Deploy. The URL stays the same.

## Test it
Open the website, fill the enquiry form with your own number, submit. Within a few seconds a row appears and an email arrives.
