import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero } from '../components/common/Blocks';
import { ACADEMY_INFO } from '../utils/constants';

export const Terms = () => (
  <PageLayout>
    <SEO title="Terms of Use" description="Terms of use of the Saaraswath IAS/KAS Academy, Mysuru website: exam information, courses, enquiries and links to official sites." crumbs={[['Terms of use', '/terms']]} />
    <PageHero title="Terms of use" text="Last updated: November 2026" />
    <section className="sec">
      <div className="wrap prose narrow">
        <h2>Information on this site</h2>
        <p>We try to keep course and exam information accurate and up to date. Exam dates, eligibility and patterns are decided by UPSC, KPSC and other recruiting bodies; always confirm them on the official websites.</p>
        <h2>Courses and fees</h2>
        <p>Batch dates, timings and fees are shared during counselling and at admission, and may change. The admission form signed at the academy is the final agreement.</p>
        <h2>Content</h2>
        <p>Articles, notes and images on this site belong to {ACADEMY_INFO.name}. You may share links to them; please do not copy them in full without permission.</p>
        <h2>Contact</h2>
        <p>{ACADEMY_INFO.address} · +91 {ACADEMY_INFO.phoneNumbers[0]} · {ACADEMY_INFO.email}</p>
      </div>
    </section>
  </PageLayout>
);

export default Terms;
