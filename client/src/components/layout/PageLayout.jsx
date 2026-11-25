import React from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { EnquiryModal, ContactBar } from '../common/Enquire';

export const PageLayout = ({ children, whatsappMessage }) => (
  <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', background: '#fff' }}>
    <ScrollToTop />
    <Navbar />
    <main style={{ flex: 1 }}>{children}</main>
    <Footer />
    <ContactBar whatsappMessage={whatsappMessage} />
    <EnquiryModal />
  </div>
);

export default PageLayout;
