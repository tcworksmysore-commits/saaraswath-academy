import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { SEO } from '../components/common/SEO';
import { PageHero } from '../components/common/Blocks';
import { ACADEMY_INFO } from '../utils/constants';

export const PrivacyPolicy = () => (
  <PageLayout>
    <SEO title="Privacy Policy" description="How Saaraswath IAS/KAS Academy, Mysuru uses the details you share through enquiry forms." crumbs={[['Privacy policy', '/privacy-policy']]} />
    <PageHero title="Privacy policy" text="Last updated: November 2026" />
    <section className="sec">
      <div className="wrap prose narrow">
        <p>{ACADEMY_INFO.name} respects your privacy. This page explains what we collect through this website and how we use it.</p>
        <h2>What we collect</h2>
        <p>When you send an enquiry or ask for the brochure, we collect your name, phone number and, if you give them, your email, course of interest and message.</p>
        <h2>How we use it</h2>
        <ul>
          <li>To call or message you about courses, batches and fees.</li>
          <li>To send the brochure or information you asked for.</li>
        </ul>
        <h2>Sharing</h2>
        <p>We do not sell or share your details with anyone outside the academy. Enquiries are stored in the academy's own Google account.</p>
        <h2>Contact</h2>
        <p>To ask us to delete your details, write to {ACADEMY_INFO.email} or call +91 {ACADEMY_INFO.phoneNumbers[0]}.</p>
      </div>
    </section>
  </PageLayout>
);

export default PrivacyPolicy;
