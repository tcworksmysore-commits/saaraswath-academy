import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { LeadForm } from '../components/common/LeadForm';
import { BrandIcon, Socials } from '../components/common/Brand';
import { PageHero } from '../components/common/Blocks';
import { PHOTOS } from '../components/common/Visual';
import { ACADEMY_INFO, getWhatsAppLink, telLink } from '../utils/constants';

export const Contact = () => (
  <PageLayout>
    <SEO title="Contact Saaraswath IAS/KAS Academy, Mysuru" description={`Call ${ACADEMY_INFO.phoneNumbers.join(', ')} or visit us at ${ACADEMY_INFO.address}.`} />
    <PageHero photo={PHOTOS.front} crumbs={[['Contact']]} title="Contact us" text="Call, WhatsApp or visit our centre in Kuvempunagar, Mysuru. Or leave your number and we will call you back." />
    <section className="sec">
      <div className="wrap contact-grid">
        <div className="card">
          <div className="info-row"><span className="ic"><Phone size={20} /></span><div><b>Call</b><br />
            {ACADEMY_INFO.phoneNumbers.map((n, i) => <span key={n}>{i > 0 && ' · '}<a href={telLink(n)}>+91 {n}</a></span>)}</div></div>
          <div className="info-row"><span className="ic"><BrandIcon name="whatsapp" /></span><div><b>WhatsApp</b><br />
            <a href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer">{ACADEMY_INFO.whatsappFull}</a></div></div>
          <div className="info-row"><span className="ic"><Mail size={20} /></span><div><b>Email</b><br />
            <a href={`mailto:${ACADEMY_INFO.email}`}>{ACADEMY_INFO.email}</a></div></div>
          <div className="info-row"><span className="ic"><MapPin size={20} /></span><div><b>Visit</b><br />{ACADEMY_INFO.address}<br />
            <a href={ACADEMY_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions on Google Maps</a></div></div>
          <div className="info-row"><span className="ic"><Clock size={20} /></span><div><b>Follow us</b><div style={{ marginTop: 8 }} className="soc-dark"><Socials /></div></div></div>
        </div>
        <div className="lead-card">
          <LeadForm variant="full" title="Send an enquiry" subtitle="We reply within working hours." formName="contact" />
        </div>
      </div>
      <div className="wrap" style={{ marginTop: 24 }}>
        <iframe className="map" src={ACADEMY_INFO.mapsEmbed} title="Saaraswath Academy location on Google Maps" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>
    </section>
  </PageLayout>
);

export default Contact;
