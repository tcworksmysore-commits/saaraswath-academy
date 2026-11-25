import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Loader2, Download, PhoneCall } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { ACADEMY_INFO, LEAD_URL, getWhatsAppLink, telLink } from '../../utils/constants';
import { BrandIcon } from './Brand';

export const COURSE_OPTIONS = [
  'UPSC Civil Services (IAS/IPS)',
  'KPSC KAS',
  'PSI / PC (Karnataka Police)',
  'Degree + IAS/KAS Foundation (3 years)',
  'Kannada Literature Optional',
  'Not sure, need counselling',
];

const REACH = ['Call', 'WhatsApp only', 'I will visit'];
const TIMES = ['Morning', 'Evening', 'Weekend'];
const fmt = (n) => `${n.slice(0, 5)} ${n.slice(5)}`; // 7619415566 -> 76194 15566
const MAIN = fmt(ACADEMY_INFO.phoneNumbers[0]);

// What happens after the form is sent (shown under the form and on the thank-you screen).
const NextSteps = () => (
  <ol className="nextsteps" aria-label="What happens next">
    <li>A mentor calls you from {MAIN}, or messages you on WhatsApp if you prefer.</li>
    <li>We answer your questions on the course, the batch and the exact fee.</li>
    <li>You decide. No pressure, and no follow-up messages if you say no.</li>
  </ol>
);

const Chips = ({ legend, name, options, value, onChange }) => (
  <fieldset>
    <legend>{legend}</legend>
    <div className="chips">
      {options.map(o => (
        <label key={o}>
          <input type="radio" name={name} value={o} checked={value === o} onChange={() => onChange(o)} />
          <span>{o}</span>
        </label>
      ))}
    </div>
  </fieldset>
);

// WhatsApp text carrying the whole enquiry (used while the sheet URL is not set, and as a faster option).
const waText = (f, phone) => [
  'Hello Saaraswath Academy, please call me back.',
  `Name: ${f.name.trim()}`,
  `Mobile: ${phone}`,
  f.course && `Course: ${f.course}`,
  f.reach && `Reach me by: ${f.reach}`,
  f.time && `Best time: ${f.time}`,
  f.mode && `Mode: ${f.mode}`,
  f.message && `Message: ${f.message.trim()}`,
].filter(Boolean).join('\n');

/**
 * One lead form for the whole site.
 * variant: 'short' (name, phone, course, how to reach, best time) | 'full' (adds email, mode, message) | 'brochure'
 */
export const LeadForm = ({ variant = 'short', course = '', title, subtitle, formName, onDone }) => {
  const [f, setF] = useState({ name: '', phone: '', course: course || '', email: '', mode: '', message: '', reach: 'Call', time: '', website: '' });
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | fail
  const [viaWa, setViaWa] = useState(false);
  const full = variant === 'full';
  const brochure = variant === 'brochure';

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });
  const pick = (k) => (v) => setF({ ...f, [k]: v });

  const validate = () => {
    const e = {};
    if (f.name.trim().length < 2) e.name = 'Please enter your name';
    const ph = f.phone.replace(/\D/g, '').replace(/^(91|0)(?=\d{10}$)/, '');
    if (!/^[6-9]\d{9}$/.test(ph)) e.phone = 'Enter a valid 10-digit mobile number';
    if (f.email && !/^\S+@\S+\.\S+$/.test(f.email)) e.email = 'Check the email address';
    setErr(e);
    return Object.keys(e).length === 0 ? ph : null;
  };

  const submit = async (ev) => {
    ev.preventDefault();
    const phone = validate();
    if (!phone || f.website) return;
    // No sheet connected yet: open WhatsApp with the details filled in (inside the click, so it is not blocked).
    if (!LEAD_URL) {
      window.open(getWhatsAppLink(waText(f, phone)), '_blank', 'noopener');
      setViaWa(true);
    }
    setState('sending');
    const extra = [f.reach && `Reach by: ${f.reach}`, f.time && `Best time: ${f.time}`].filter(Boolean).join(' · ');
    try {
      await enquiryService.submitEnquiry({ ...f, phone, message: [extra, f.message].filter(Boolean).join(' | '), form: formName || (brochure ? 'brochure' : variant) });
      setState('done');
      if (brochure) {
        const a = document.createElement('a');
        a.href = ACADEMY_INFO.brochurePath;
        a.download = 'Saaraswath-Academy-Brochure.pdf';
        document.body.appendChild(a); a.click(); a.remove();
      }
      onDone && onDone();
    } catch {
      setState('fail');
    }
  };

  if (state === 'done') {
    const phone = f.phone.replace(/\D/g, '').slice(-10);
    return (
      <div className="ok">
        <div className="tick"><CheckCircle2 size={36} /></div>
        <h2>Thank you, {f.name.trim().split(' ')[0]}</h2>
        {viaWa
          ? <p>{brochure ? 'Your brochure is downloading. ' : ''}WhatsApp has opened with your details. Please tap <b>Send</b> there so the message reaches us.</p>
          : <p>{brochure ? 'Your brochure is downloading. ' : ''}We have your details and will reach you on {fmt(phone)}.</p>}
        <NextSteps />
        {brochure && <a className="b b-line b-block" href={ACADEMY_INFO.brochurePath} download style={{ marginBottom: 10 }}><Download size={18} /> Download again</a>}
        <a className="b b-wa b-block" href={getWhatsAppLink(waText(f, phone))} target="_blank" rel="noopener noreferrer">
          <BrandIcon name="whatsapp" /> {viaWa ? 'Open WhatsApp again' : 'Want a faster reply? WhatsApp us'}
        </a>
      </div>
    );
  }

  return (
    <form className="lf" onSubmit={submit} noValidate>
      {title && <div><h2>{title}</h2>{subtitle && <p className="sub" style={{ margin: '4px 0 2px' }}>{subtitle}</p>}</div>}
      <label>Full name
        <input className={err.name ? 'bad' : ''} value={f.name} onChange={set('name')} autoComplete="name" placeholder="Your name" />
        {err.name && <span className="err">{err.name}</span>}
      </label>
      <label>Mobile number
        <input className={err.phone ? 'bad' : ''} value={f.phone} onChange={set('phone')} type="tel" inputMode="numeric" autoComplete="tel" placeholder="10-digit mobile" maxLength={14} />
        {err.phone && <span className="err">{err.phone}</span>}
      </label>
      <label>Course interested in
        <select value={f.course} onChange={set('course')}>
          <option value="">Select a course</option>
          {COURSE_OPTIONS.map(c => <option key={c}>{c}</option>)}
          {course && !COURSE_OPTIONS.includes(course) && <option>{course}</option>}
        </select>
      </label>
      {!brochure && <Chips legend="How should we reach you?" name={`reach-${formName || variant}`} options={REACH} value={f.reach} onChange={pick('reach')} />}
      {!brochure && <Chips legend="Best time (optional)" name={`time-${formName || variant}`} options={TIMES} value={f.time} onChange={pick('time')} />}
      {full && (
        <>
          <div className="row2">
            <label>Email (optional)
              <input className={err.email ? 'bad' : ''} value={f.email} onChange={set('email')} type="email" autoComplete="email" placeholder="you@example.com" />
              {err.email && <span className="err">{err.email}</span>}
            </label>
            <label>Preferred mode
              <select value={f.mode} onChange={set('mode')}>
                <option value="">Any</option>
                <option>Classroom (Mysuru)</option>
                <option>Online</option>
                <option>Weekend batch</option>
              </select>
            </label>
          </div>
          <label>Message (optional)
            <textarea value={f.message} onChange={set('message')} placeholder="Your question, preferred batch time, etc." />
          </label>
        </>
      )}
      <input className="hp" tabIndex={-1} autoComplete="off" value={f.website} onChange={set('website')} aria-hidden="true" name="website" />
      <button className="b b-gold b-block" type="submit" disabled={state === 'sending'}>
        {state === 'sending' ? <><Loader2 size={18} className="spin" /> Sending…</> : brochure ? <><Download size={18} /> Get the brochure</> : <><PhoneCall size={18} /> Get a call back</>}
      </button>
      {state === 'fail' && <p className="err" style={{ textAlign: 'center' }}>Could not send. Please call <a href={telLink(ACADEMY_INFO.phoneNumbers[0])}>{MAIN}</a>.</p>}
      {!brochure && <NextSteps />}
      <p className="fine">One call from {MAIN}. No marketing SMS, and your number is never shared. <Link to="/privacy-policy">Privacy</Link></p>
    </form>
  );
};

export default LeadForm;
