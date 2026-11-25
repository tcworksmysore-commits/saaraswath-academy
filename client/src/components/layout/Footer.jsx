import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';
import { ACADEMY_INFO, telLink } from '../../utils/constants';
import { Socials } from '../common/Brand';
import { openEnquiry } from '../common/Enquire';

export const Footer = () => (
  <footer className="ftr">
    <div className="wrap">
      <div className="ftr-grid">
        <div>
          <Link to="/" className="brand">
            <img src={ACADEMY_INFO.logoTight} alt="Saaraswath IAS/KAS Academy logo" width="44" height="44" loading="lazy" />
            <span><b>SAARASWATH</b><small>IAS / KAS ACADEMY · MYSURU</small></span>
          </Link>
          <p style={{ margin: '14px 0 16px' }}>
            Coaching for UPSC Civil Services, KPSC KAS, PSI/PC and degree foundation in Mysuru since {ACADEMY_INFO.since},
            led by {ACADEMY_INFO.founder}.
          </p>
          <Socials />
        </div>
        <div>
          <h4>Courses</h4>
          <ul>
            <li><Link to="/ias-coaching-in-mysuru">IAS coaching in Mysuru</Link></li>
            <li><Link to="/kas-coaching-in-mysuru">KAS coaching in Mysuru</Link></li>
            <li><Link to="/psi-coaching-in-mysuru">PSI / PC coaching</Link></li>
            <li><Link to="/upsc-foundation-course-for-degree-students">Foundation for degree students</Link></li>
            <li><Link to="/kannada-literature-optional-coaching">Kannada Literature optional</Link></li>
          </ul>
        </div>
        <div>
          <h4>Academy</h4>
          <ul>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/faculty">Faculty</Link></li>
            <li><Link to="/achievements">Results</Link></li>
            <li><Link to="/gallery">Gallery</Link></li><li><Link to="/articles">Articles &amp; updates</Link></li><li><Link to="/free-resources">Free resources</Link></li><li><Link to="/admissions">Admissions</Link></li>
            <li><button onClick={() => openEnquiry({ variant: 'brochure', form: 'footer-brochure' })} style={{ background: 'none', border: 0, color: '#e6ecf7', cursor: 'pointer', font: 'inherit', padding: 0 }}>Download brochure</button></li>
          </ul>
        </div>
        <div>
          <h4>Visit / Call</h4>
          <ul>
            <li style={{ display: 'flex', gap: 8 }}><MapPin size={18} style={{ flex: 'none', marginTop: 3 }} /><a href={ACADEMY_INFO.mapsUrl} target="_blank" rel="noopener noreferrer">{ACADEMY_INFO.address}</a></li>
            {ACADEMY_INFO.phoneNumbers.map(n => (
              <li key={n} style={{ display: 'flex', gap: 8 }}><Phone size={18} style={{ flex: 'none', marginTop: 3 }} /><a href={telLink(n)}>+91 {n}</a></li>
            ))}
            <li style={{ display: 'flex', gap: 8 }}><Mail size={18} style={{ flex: 'none', marginTop: 3 }} /><a href={`mailto:${ACADEMY_INFO.email}`}>{ACADEMY_INFO.email}</a></li>
          </ul>
        </div>
      </div>
      <div className="ftr-bottom">
        <span>© {new Date().getFullYear()} {ACADEMY_INFO.name}, Mysuru</span>
        <span><Link to="/privacy-policy">Privacy</Link> · <Link to="/terms">Terms</Link></span>
      </div>
    </div>
  </footer>
);

export default Footer;
