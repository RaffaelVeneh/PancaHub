'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Flame } from 'lucide-react';

const navLinks = [
  { href: '/harmoni', label: 'Harmoni', sila: 1, desc: 'Sila I' },
  { href: '/kemanusiaan', label: 'Kemanusiaan', sila: 2, desc: 'Sila II' },
  { href: '/nusantara', label: 'Nusantara', sila: 3, desc: 'Sila III' },
  { href: '/mufakat', label: 'Mufakat', sila: 4, desc: 'Sila IV' },
  { href: '/keadilan', label: 'Keadilan', sila: 5, desc: 'Sila V' },
];

const silaColors: Record<number, string> = {
  1: 'var(--sila1)',
  2: 'var(--sila2)',
  3: 'var(--sila3)',
  4: 'var(--sila4)',
  5: 'var(--sila5)',
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-main" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div style={{
            width: 36, height: 36,
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            borderRadius: 10,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Flame size={18} color="#0A0A0F" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            fontSize: '1.25rem',
            background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            PancaHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                padding: '8px 14px', borderRadius: 10,
                transition: 'all 0.2s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget;
                el.style.background = `rgba(255,255,255,0.05)`;
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget;
                el.style.background = 'transparent';
              }}>
                <span style={{
                  fontSize: '0.65rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: silaColors[link.sila],
                  textTransform: 'uppercase',
                }}>
                  {link.desc}
                </span>
                <span style={{
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                }}>
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }} className="desktop-cta">
          <Link href="/auth" className="btn btn-outline" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
            Masuk
          </Link>
          <Link href="/auth?tab=register" className="btn btn-gold" style={{ padding: '9px 20px', fontSize: '0.875rem' }}>
            Bergabung
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: 'none',
            background: 'none', border: 'none',
            color: 'var(--text-primary)', cursor: 'pointer',
          }}
          className="mobile-menu-btn"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '100%', left: 0, right: 0,
          background: 'rgba(10, 10, 15, 0.95)',
          backdropFilter: 'blur(24px)',
          borderBottom: '1px solid var(--border-subtle)',
          padding: '16px 24px 24px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '14px 0',
                borderBottom: '1px solid var(--border-subtle)',
                textDecoration: 'none',
              }}
            >
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: silaColors[link.sila],
                flexShrink: 0,
              }} />
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{link.desc}</span>
              <span style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{link.label}</span>
            </Link>
          ))}
          <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
            <Link href="/auth" className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Masuk</Link>
            <Link href="/auth?tab=register" className="btn btn-gold" style={{ flex: 1, justifyContent: 'center' }}>Bergabung</Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-cta { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
