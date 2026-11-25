import React, { useState } from 'react';
import { CheckCircle2, Loader2, Download } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';
import { ACADEMY_INFO, getWhatsAppLink, telLink } from '../../utils/constants';
import { BrandIcon } from './Brand';

export const COURSE_OPTIONS = [
  'UPSC Civil Services (IAS/IPS)',
  'KPSC KAS',
  'PSI / PC (Karnataka Police)',
  'Degree + IAS/KAS Foundation (3 years)',
  'Kannada Literature Optional',
  'Not sure, need counselling',
];

/**
 * One lead form for the whole site.
 * variant: 'short' (name, phone, course) | 'full' (adds email, mode, message) | 'brochure'
 */
export const LeadForm = ({ variant = 'short', course = '', title, subtitle, formName, onDone }) => {
  const [f, setF] = useState({ name: '', phone: '', course: course || '', email: '', mode: '', message: '', website: '' });
  const [err, setErr] = useState({});
  const [state, setState] = useState('idle'); // idle | sending | done | fail
  const full = variant === 'full';
  const brochure = variant === 'brochure';

  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

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
    if (!phone) return;
    setState('sending');
    try {
      await enquiryService.submitEnquiry({ ...f, phone, form: formName || (brochure ? 'brochure' : variant) });
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
    return (
      <div className="ok">
        <div className="tick"><CheckCircle2 size={36} /></div>
        <h3>Thank you, {f.name.split(' ')[0]}!</h3>
        <p>{brochure ? 'Your brochure is downloading. ' : ''}Our counsellor will call you shortly on {f.phone}.</p>
        {brochure && <a className="b b-line b-block" href={ACADEMY_INFO.brochurePath} download style={{ marginBottom: 10 }}><Download size={18} /> Download again</a>}
        <a className="b b-wa b-block" href={getWhatsAppLink(`Hello Saaraswath Academy, I am ${f.name}. I just enquired about ${f.course || 'your courses'} on the website.`)} target="_blank" rel="noopener noreferrer">
          <BrandIcon name="whatsapp" /> Want a faster reply? WhatsApp us
        </a>
      </div>
    );
  }

  return (
    <form className="lf" onSubmit={submit} noValidate>
      {title && <div><h3>{title}</h3>{subtitle && <p className="sub" style={{ margin: '4px 0 2px' }}>{subtitle}</p>}</div>}
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
        {state === 'sending' ? <><Loader2 size={18} className="spin" /> Sending…</> : brochure ? <><Download size={18} /> Get the brochure</> : 'Book free counselling'}
      </button>
      {state === 'fail' && <p className="err" style={{ textAlign: 'center' }}>Could not send. Please call <a href={telLink(ACADEMY_INFO.phoneNumbers[0])}>{ACADEMY_INFO.phoneNumbers[0]}</a>.</p>}
      <p className="fine">We call back within working hours. No spam, ever.</p>
    </form>
  );
};

export default LeadForm;
