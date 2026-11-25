import { LEAD_URL } from '../utils/constants';

// First-touch source (UTM / referrer), remembered for the visit.
const getSource = () => {
  try {
    const saved = sessionStorage.getItem('sa_src');
    if (saved) return saved;
    const q = new URLSearchParams(window.location.search);
    const utm = ['utm_source', 'utm_medium', 'utm_campaign'].map(k => q.get(k)).filter(Boolean).join(' / ');
    const src = utm || (document.referrer ? new URL(document.referrer).hostname : 'direct');
    sessionStorage.setItem('sa_src', src);
    return src;
  } catch {
    return 'direct';
  }
};
if (typeof window !== 'undefined') getSource();

/**
 * Sends a lead to the Google Apps Script web app (sheet + email).
 * no-cors: the response is opaque, so a network success counts as delivered.
 */
export const enquiryService = {
  submitEnquiry: async (data) => {
    const body = new URLSearchParams({
      name: data.name || data.fullName || '',
      phone: data.phone || data.mobile || '',
      email: data.email || '',
      course: data.course || data.subject || '',
      mode: data.mode || data.preferredMode || '',
      message: data.message || '',
      form: data.form || 'enquiry',
      website: data.website || '', // honeypot
      page: window.location.pathname,
      source: getSource(),
    });
    if (!LEAD_URL) {
      console.warn('LEAD_URL not set: lead not sent', Object.fromEntries(body));
      return { success: true, offline: true };
    }
    await fetch(LEAD_URL, { method: 'POST', mode: 'no-cors', body });
    return { success: true };
  },
};
