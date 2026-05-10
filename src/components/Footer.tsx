'use client';

import Link from 'next/link';
import { Flame, Github, Instagram, Twitter, Heart } from 'lucide-react';

const silaLinks = [
  { href: '/harmoni', label: 'Harmoni Ibadah', sila: 'Sila I', color: 'var(--sila1)' },
  { href: '/kemanusiaan', label: 'Lensa Kemanusiaan', sila: 'Sila II', color: 'var(--sila2)' },
  { href: '/nusantara', label: 'Galeri Nusantara', sila: 'Sila III', color: 'var(--sila3)' },
  { href: '/mufakat', label: 'Ruang Mufakat', sila: 'Sila IV', color: 'var(--sila4)' },
  { href: '/keadilan', label: 'Jembatan Adil', sila: 'Sila V', color: 'var(--sila5)' },
];

export default function Footer() {
  return (
    <footer style={{
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(10,10,15,0.8)',
      backdropFilter: 'blur(20px)',
    }}>
      {/* Gold Divider */}
      <div className="divider-gold" />

      <div className="container-main" style={{ padding: '64px 24px 32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 48 }}>
          {/* Brand */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
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
                fontWeight: 700, fontSize: '1.25rem',
                background: 'linear-gradient(135deg, var(--gold-light), var(--gold))',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>PancaHub</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, maxWidth: 260 }}>
              Ekosistem digital yang menghidupkan nilai-nilai Pancasila melalui teknologi interaktif untuk seluruh warga Indonesia.
            </p>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
              {[Github, Instagram, Twitter].map((Icon, i) => (
                <button key={i} style={{
                  width: 36, height: 36,
                  background: 'var(--bg-elevated)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 8,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', color: 'var(--text-secondary)',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-normal)';
                  e.currentTarget.style.color = 'var(--gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-subtle)';
                  e.currentTarget.style.color = 'var(--text-secondary)';
                }}>
                  <Icon size={16} />
                </button>
              ))}
            </div>
          </div>

          {/* Fitur */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Fitur
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {silaLinks.map((link) => (
                <Link key={link.href} href={link.href} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                  color: 'var(--text-secondary)',
                  fontSize: '0.875rem',
                }}>
                  <span style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: link.color, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.75rem', color: link.color, fontWeight: 600 }}>{link.sila}</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Tentang */}
          <div>
            <h3 style={{ color: 'var(--text-primary)', fontWeight: 700, fontSize: '0.9rem', marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              Tentang
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['Tentang PancaHub', 'Tim Kami', 'Kebijakan Privasi', 'Syarat & Ketentuan'].map((item) => (
                <Link key={item} href="#" style={{
                  textDecoration: 'none', color: 'var(--text-secondary)',
                  fontSize: '0.875rem', transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--text-secondary)'}>
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{
          marginTop: 48, paddingTop: 24,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: 16,
        }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            © 2025 PancaHub. Dibuat dengan semangat Pancasila.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: 4 }}>
            Dibuat dengan <Heart size={12} color="var(--sila1)" fill="var(--sila1)" /> untuk Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
