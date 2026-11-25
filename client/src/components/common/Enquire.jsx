import React, { useEffect, useState } from 'react';
import { X, Phone } from 'lucide-react';
import { LeadForm } from './LeadForm';
import { BrandIcon } from './Brand';
import { ACADEMY_INFO, getWhatsAppLink, telLink } from '../../utils/constants';

// Open from anywhere: openEnquiry({ course, variant: 'brochure' })
export const openEnquiry = (detail = {}) => window.dispatchEvent(new CustomEvent('sa-enquire', { detail }));

export const EnquiryModal = () => {
  const [opts, setOpts] = useState(null);
  useEffect(() => {
    const on = (e) => setOpts(e.detail || {});
    window.addEventListener('sa-enquire', on);
    return () => window.removeEventListener('sa-enquire', on);
  }, []);
  useEffect(() => {
    if (!opts) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const esc = (e) => e.key === 'Escape' && setOpts(null);
    window.addEventListener('keydown', esc);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', esc); };
  }, [opts]);
  if (!opts) return null;
  const brochure = opts.variant === 'brochure';
  return (
    <div className="modal-bg" onClick={() => setOpts(null)} role="dialog" aria-modal="true" aria-label="Enquiry form">
      <div className="lead-card modal" onClick={(e) => e.stopPropagation()}>
        <button className="x" onClick={() => setOpts(null)} aria-label="Close"><X size={20} /></button>
        <h3 style={{ paddingRight: 40 }}>{brochure ? 'Download the brochure' : 'Get a call back'}</h3>
        <p className="sub">{brochure ? 'Courses, batches and faculty in one PDF.' : 'A short call with a mentor about the right course, batch and fee.'}</p>
        <LeadForm variant={opts.variant || 'short'} course={opts.course} formName={opts.form} />
      </div>
    </div>
  );
};

export const ContactBar = ({ whatsappMessage }) => (
  <>
    <div className="mbar">
      <a className="call" href={telLink(ACADEMY_INFO.phoneNumbers[0])}><Phone size={18} /> Call</a>
      <a className="wa" href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" size={19} /> WhatsApp</a>
      <button className="enq" onClick={() => openEnquiry({ form: 'mobile-bar' })}>Call back</button>
    </div>
    <a className="fwa" href={getWhatsAppLink(whatsappMessage)} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp"><BrandIcon name="whatsapp" size={30} /></a>
  </>
);
