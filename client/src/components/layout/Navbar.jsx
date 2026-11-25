import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { ACADEMY_INFO, telLink, getWhatsAppLink } from '../../utils/constants';
import { Socials, BrandIcon } from '../common/Brand';
import { openEnquiry } from '../common/Enquire';

const LINKS = [
  ['/', 'Home'], ['/courses', 'Courses'], ['/ias-coaching-in-mysuru', 'IAS'], ['/kas-coaching-in-mysuru', 'KAS'], ['/psi-coaching-in-mysuru', 'PSI'], ['/articles', 'Articles'],
  ['/achievements', 'Results'], ['/about', 'About'], ['/contact', 'Contact'],
];

export const Logo = () => (
  <Link to="/" className="brand" aria-label="Saaraswath IAS/KAS Academy home">
    <img src={ACADEMY_INFO.logoTight} alt="Saaraswath IAS/KAS Academy logo" width="44" height="44" />
    <span><b>SAARASWATH</b><small>IAS / KAS ACADEMY · MYSURU</small></span>
  </Link>
);

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => { document.body.style.overflow = open ? 'hidden' : ''; }, [open]);
  const [p1] = ACADEMY_INFO.phoneNumbers;

  return (
    <>
      <div className="strip">
        <div className="wrap">
          <div className="strip-phones">
            {ACADEMY_INFO.phoneNumbers.map(n => <a key={n} href={telLink(n)}>📞 {n}</a>)}
          </div>
          <span className="strip-msg">Kuvempunagar, Mysuru · Free call with a mentor</span>
          <Socials />
        </div>
      </div>
      <header className="hdr">
        <div className="wrap">
          <Logo />
          <nav className="nav" aria-label="Main">
            {LINKS.map(([to, label]) => <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>{label}</NavLink>)}
          </nav>
          <div className="hdr-cta">
            <a className="b b-line" href={telLink(p1)}><Phone size={17} /> {p1}</a>
            <button className="b b-gold" onClick={() => openEnquiry({ form: 'header' })}>Get a call back</button>
          </div>
          <button className="burger" onClick={() => setOpen(true)} aria-label="Open menu" aria-expanded={open}><Menu size={24} /></button>
        </div>
      </header>
      {open && (
        <>
          <div className="drawer-bg" onClick={() => setOpen(false)} />
          <aside className="drawer" aria-label="Menu">
            <div className="drawer-top">
              <Logo />
              <button className="burger" style={{ marginLeft: 0, display: 'grid' }} onClick={() => setOpen(false)} aria-label="Close menu"><X size={24} /></button>
            </div>
            <nav>
              {[...LINKS, ['/faculty', 'Faculty'], ['/gallery', 'Gallery'], ['/free-resources', 'Free resources'], ['/admissions', 'Admissions']].map(([to, label]) => (
                <NavLink key={to} to={to} end={to === '/'} className={({ isActive }) => (isActive ? 'on' : '')}>{label}</NavLink>
              ))}
            </nav>
            <div className="calls">
              <button className="b b-gold b-block" onClick={() => { setOpen(false); openEnquiry({ form: 'menu' }); }}>Get a call back</button>
              <a className="b b-wa b-block" href={getWhatsAppLink()} target="_blank" rel="noopener noreferrer"><BrandIcon name="whatsapp" /> WhatsApp</a>
              {ACADEMY_INFO.phoneNumbers.map(n => <a key={n} className="b b-line b-block" href={telLink(n)}><Phone size={17} /> {n}</a>)}
            </div>
          </aside>
        </>
      )}
    </>
  );
};

export default Navbar;
