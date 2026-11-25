/**
 * Saaraswath IAS/KAS Academy: website enquiries -> Google Sheet + instant email.
 * Paste into Extensions > Apps Script of the lead sheet, then Deploy > Web app (Anyone).
 * See SETUP.md.
 */
var SHEET_NAME = 'Leads';
var ALERT_EMAIL = 'saaraswath.mysore@gmail.com';
var HEADERS = ['Time', 'Name', 'Phone', 'Email', 'Course', 'Mode', 'Message', 'Form', 'Page', 'Source', 'Status', 'Notes'];
var STATUSES = ['New', 'Called', 'Visited', 'Joined', 'Not interested'];

function doPost(e) {
  var p = (e && e.parameter) || {};
  // Honeypot: real people never fill the hidden "website" field.
  if (p.website) return reply_('ok');

  var name = clean_(p.name, 80);
  var phone = String(p.phone || '').replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
  if (!name || !/^[6-9]\d{9}$/.test(phone)) return reply_('invalid');

  var lock = LockService.getScriptLock();
  lock.waitLock(20000);
  try {
    var sheet = getSheet_();
    var row = [
      new Date(), name, "'" + phone, clean_(p.email, 120), clean_(p.course, 120), clean_(p.mode, 40),
      clean_(p.message, 1500), clean_(p.form, 40), clean_(p.page, 200), clean_(p.source, 200), 'New', ''
    ];
    sheet.appendRow(row);
  } finally {
    lock.releaseLock();
  }

  try {
    var subject = 'New enquiry: ' + name + ' (' + (p.course || 'General') + ')';
    var body =
      'Name: ' + name + '\n' +
      'Phone: ' + phone + '  (call: tel:+91' + phone + ')\n' +
      'WhatsApp: https://wa.me/91' + phone + '\n' +
      'Email: ' + (p.email || '-') + '\n' +
      'Course: ' + (p.course || '-') + '\n' +
      'Mode: ' + (p.mode || '-') + '\n' +
      'Message: ' + (p.message || '-') + '\n' +
      'Form: ' + (p.form || '-') + '  Page: ' + (p.page || '-') + '\n' +
      'Source: ' + (p.source || '-') + '\n\n' +
      'Open the sheet: ' + SpreadsheetApp.getActiveSpreadsheet().getUrl();
    MailApp.sendEmail({ to: ALERT_EMAIL, subject: subject, body: body, replyTo: p.email || ALERT_EMAIL });
  } catch (err) {
    console.error(err); // the row is saved even if email quota runs out
  }
  return reply_('ok');
}

function doGet() {
  return reply_('Saaraswath lead endpoint is running.');
}

function getSheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight('bold').setBackground('#173568').setFontColor('#ffffff');
    sheet.setColumnWidth(1, 150);
    sheet.setColumnWidth(7, 300);
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).build();
    sheet.getRange(2, HEADERS.indexOf('Status') + 1, 5000, 1).setDataValidation(rule);
    sheet.getRange(2, 1, 5000, 1).setNumberFormat('dd-mmm-yyyy hh:mm');
  }
  return sheet;
}

/** Run once from the editor (Run > setup) to create the sheet and grant permissions. */
function setup() {
  getSheet_();
  MailApp.getRemainingDailyQuota();
}

function clean_(v, max) {
  v = String(v == null ? '' : v).trim();
  if (/^[=+\-@]/.test(v)) v = "'" + v; // stop formula injection
  return v.slice(0, max);
}

function reply_(msg) {
  return ContentService.createTextOutput(msg).setMimeType(ContentService.MimeType.TEXT);
}
