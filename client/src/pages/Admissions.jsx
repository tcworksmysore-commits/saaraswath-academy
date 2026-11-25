import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { Phone, MapPin, Download } from 'lucide-react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { LeadForm } from '../components/common/LeadForm';
import { openEnquiry } from '../components/common/Enquire';
import { BrandIcon } from '../components/common/Brand';
import { PageHero } from '../components/common/Blocks';
import { PHOTOS, Timeline } from '../components/common/Visual';
import { ACADEMY_INFO, getWhatsAppLink, telLink } from '../utils/constants';

const STEPS = [
  ['Free counselling', 'Tell us about your education, goal and schedule. We suggest an exam, course and batch.'],
  ['Choose a batch', 'Morning, evening or weekend, depending on your college or work routine.'],
  ['Register', 'Complete the admission form and receive the syllabus plan and first study materials.'],
  ['Meet your mentor', `A first one-to-one session with ${ACADEMY_INFO.founder}, then classes begin.`],
];

export const Admissions = () => {
  const [params] = useSearchParams();
  return (
    <PageLayout>
      <SEO
        title="Admissions: Join IAS, KAS & PSI Coaching"
        description="How to join Saaraswath IAS/KAS Academy, Mysuru: free counselling, batch selection, registration. UPSC, KAS, PSI/PC and degree foundation batches."
        crumbs={[['Admissions', '/admissions']]}
      />
      <PageHero photo={PHOTOS.classroomB} crumbs={[['Admissions']]} title="Admissions: Join IAS, KAS & PSI Coaching" text="Joining takes four simple steps. It starts with a free conversation." />
      <section className="sec">
        <div className="wrap contact-grid">
          <div className="lead-card">
            <LeadForm variant="full" course={params.get('course') || ''} title="Admission enquiry" subtitle="We will call you back with batch dates and fee details." formName="admissions" />
          </div>
          <div>
            <div className="steps">
              <Timeline items={STEPS} vertical as="h2" />
            </div>
            <div className="card" style={{ marginTop: 16 }}>
              <div className="info-row"><span className="ic"><Phone size={20} /></span><div>{ACADEMY_INFO.phoneNumbers.map(n => <div key={n}><a href={telLink(n)}>+91 {n}</a></div>)}</div></div>
              <div className="info-row"><span className="ic"><MapPin size={20} /></span><div>{ACADEMY_INFO.address}</div></div>
              <div className="hero-actions" style={{ marginTop: 8 }}>
                <a className="b b-wa" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
                <button className="b b-line" onClick={() => openEnquiry({ variant: 'brochure', form: 'admissions-brochure' })}><Download size={17} /> Brochure</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Admissions;
