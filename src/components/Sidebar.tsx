'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Star, Users, Globe, Vote, ShoppingBag, LayoutDashboard, Moon, Sun } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useNavigation } from './NavigationProvider';

const navLinks = [
  { href: '/', label: 'Dashboard Utama', icon: LayoutDashboard, color: 'var(--text-primary)', bgLight: 'var(--bg-hover)', solidColor: '#1E293B' },
  { href: '/harmoni', label: 'Harmoni Ibadah', icon: Star, color: 'var(--sila1)', bgLight: 'var(--sila1-light)', solidColor: '#E74C3C' },
  { href: '/kemanusiaan', label: 'Lensa Kemanusiaan', icon: Users, color: 'var(--sila2)', bgLight: 'var(--sila2-light)', solidColor: '#3498DB' },
  { href: '/nusantara', label: 'Galeri Nusantara', icon: Globe, color: 'var(--sila3)', bgLight: 'var(--sila3-light)', solidColor: '#1ABC9C' },
  { href: '/mufakat', label: 'Ruang Mufakat', icon: Vote, color: 'var(--sila4)', bgLight: 'var(--sila4-light)', solidColor: '#9B59B6' },
  { href: '/keadilan', label: 'Jembatan Adil', icon: ShoppingBag, color: 'var(--sila5)', bgLight: 'var(--sila5-light)', solidColor: '#F39C12' },
];

const ITEM_HEIGHT = 48; // px per nav item (12px padding top+bottom + ~24px content)
const ITEM_GAP = 6;    // gap between items

function getActiveIndex(path: string) {
  // Find exact match first, then prefix match
  const exactIdx = navLinks.findIndex(l => l.href === path);
  if (exactIdx !== -1) return exactIdx;
  // Prefix match (skip root)
  const prefixIdx = navLinks.findIndex(l => l.href !== '/' && path.startsWith(l.href));
  return prefixIdx !== -1 ? prefixIdx : 0;
}

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const [activeIdx, setActiveIdx] = useState(() => getActiveIndex(pathname));
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [mounted, setMounted] = useState(false);
  const supabase = createClient();
  const { theme, setTheme } = useTheme();
  const { startNavigation } = useNavigation();

  // Sync active index when route changes (after nav completes)
  useEffect(() => {
    setActiveIdx(getActiveIndex(pathname));
  }, [pathname]);

  useEffect(() => {
    setMounted(true);
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const activeLink = navLinks[activeIdx];

  return (
    <aside
      className={isMobile ? '' : 'hidden-mobile'}
      style={{
        width: '280px',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        background: 'var(--bg-surface)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 0px 24px 20px',
        zIndex: 50,
        overflow: 'hidden',
      }}
    >
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, textDecoration: 'none', padding: '0 8px' }}>
        <div style={{
          width: 36, height: 36,
          background: 'var(--text-primary)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)',
          flexShrink: 0,
        }}>
          <Flame size={18} color="var(--bg-surface)" strokeWidth={2.5} />
        </div>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: '1.4rem', color: 'var(--text-primary)' }}>
          PancaHub
        </span>
      </Link>

      {/* Navigation Title */}
      <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, padding: '0 8px' }}>
        Sila Navigation
      </div>

      {/* Navigation — single sliding bookmark */}
      <nav style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: `${ITEM_GAP}px`, flex: 1 }}>

        {/* THE BOOKMARK — single persistent element that slides */}
        <motion.div
          animate={{
            y: activeIdx * (ITEM_HEIGHT + ITEM_GAP),
            background: activeLink.bgLight,
          }}
          transition={{ type: 'spring', stiffness: 380, damping: 32 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: -20,
            height: ITEM_HEIGHT,
            borderRight: `6px solid ${activeLink.solidColor}`,
            borderTopLeftRadius: '12px',
            borderBottomLeftRadius: '12px',
            boxShadow: `4px 0 16px -2px ${activeLink.solidColor}55`,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {navLinks.map((link, idx) => {
          const isActive = idx === activeIdx;
          const isHovered = idx === hoveredIdx;
          const Icon = link.icon;

          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => {
                setActiveIdx(idx);
                if (idx !== activeIdx) startNavigation();
              }}
              style={{ textDecoration: 'none', position: 'relative', zIndex: 1 }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              {/* Hover highlight (only for non-active items) */}
              {isHovered && !isActive && (
                <div style={{
                  position: 'absolute', inset: 0,
                  borderRadius: '12px',
                  background: 'var(--bg-hover)',
                  pointerEvents: 'none',
                }} />
              )}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                height: `${ITEM_HEIGHT}px`,
                position: 'relative', zIndex: 1,
                color: isActive ? link.color : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                transition: 'color 0.15s ease',
              }}>
                <Icon size={20} color={isActive ? link.solidColor : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.95rem' }}>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Theme Toggle */}
      <div style={{ padding: '12px 8px 8px', borderTop: '1px solid var(--border-subtle)', marginRight: '20px', marginTop: '8px' }}>
        {mounted && (
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            style={{
              width: '100%',
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 8px',
              borderRadius: '10px',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              fontWeight: 500,
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'var(--bg-hover)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            {theme === 'dark'
              ? <><Sun size={18} color="var(--sila5)" /> <span>Mode Terang</span></>
              : <><Moon size={18} color="var(--text-muted)" /> <span>Mode Gelap</span></>
            }
          </button>
        )}
      </div>

      {/* User Section */}
      <div style={{
        padding: '16px',
        background: 'var(--bg-base)',
        borderRadius: '12px',
        display: 'flex', alignItems: 'center', gap: 12,
        border: '1px solid var(--border-subtle)',
        marginRight: '20px',
        marginTop: '8px',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--border-normal)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', flexShrink: 0,
        }}>
          {user ? (
            <div style={{ width: '100%', height: '100%', background: 'var(--sila2)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 800 }}>
              {user.email?.charAt(0).toUpperCase()}
            </div>
          ) : (
            <div style={{ width: '100%', height: '100%', background: 'var(--gold)' }} />
          )}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {user ? user.email : 'Warga Digital'}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {user ? 'Terverifikasi' : 'Belum Login'}
          </div>
        </div>
      </div>

      {!user ? (
        <Link href="/login" style={{ marginTop: '8px', marginRight: '20px' }}>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px' }}>
            Masuk / Daftar
          </button>
        </Link>
      ) : (
        <button
          onClick={async () => { await supabase.auth.signOut(); window.location.reload(); }}
          className="btn btn-ghost"
          style={{ width: 'calc(100% - 20px)', justifyContent: 'center', fontSize: '0.85rem', padding: '8px', marginTop: '8px', color: 'var(--text-secondary)' }}
        >
          Keluar
        </button>
      )}
    </aside>
  );
}
