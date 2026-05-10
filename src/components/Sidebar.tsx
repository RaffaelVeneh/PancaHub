'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Flame, Star, Users, Globe, Vote, ShoppingBag, LayoutDashboard } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';

const navLinks = [
  { href: '/', label: 'Dashboard Utama', icon: LayoutDashboard, color: 'var(--text-primary)', bgLight: 'var(--bg-hover)' },
  { href: '/harmoni', label: 'Harmoni Ibadah', icon: Star, color: 'var(--sila1)', bgLight: 'var(--sila1-light)' },
  { href: '/kemanusiaan', label: 'Lensa Kemanusiaan', icon: Users, color: 'var(--sila2)', bgLight: 'var(--sila2-light)' },
  { href: '/nusantara', label: 'Galeri Nusantara', icon: Globe, color: 'var(--sila3)', bgLight: 'var(--sila3-light)' },
  { href: '/mufakat', label: 'Ruang Mufakat', icon: Vote, color: 'var(--sila4)', bgLight: 'var(--sila4-light)' },
  { href: '/keadilan', label: 'Jembatan Adil', icon: ShoppingBag, color: 'var(--sila5)', bgLight: 'var(--sila5-light)' },
];

export default function Sidebar({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

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
      padding: '24px 20px',
      zIndex: 50,
    }}>
      {/* Brand */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 40, textDecoration: 'none', padding: '0 8px' }}>
        <div style={{
          width: 36, height: 36,
          background: 'var(--text-primary)',
          borderRadius: 10,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: 'var(--shadow-sm)'
        }}>
          <Flame size={18} color="var(--bg-surface)" strokeWidth={2.5} />
        </div>
        <span style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 800,
          fontSize: '1.4rem',
          color: 'var(--text-primary)',
        }}>
          PancaHub
        </span>
      </Link>

      {/* Navigation Title */}
      <div style={{
        fontSize: '0.75rem',
        fontWeight: 700,
        color: 'var(--text-muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 12,
        padding: '0 8px'
      }}>
        Sila Navigation
      </div>

      {/* Navigation Links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href || (link.href !== '/' && pathname?.startsWith(link.href));
          const Icon = link.icon;

          return (
            <Link key={link.href} href={link.href} style={{ textDecoration: 'none' }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 16px',
                borderRadius: '12px',
                background: isActive ? link.bgLight : 'transparent',
                color: isActive ? link.color : 'var(--text-secondary)',
                fontWeight: isActive ? 700 : 500,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.background = 'var(--bg-hover)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.background = 'transparent';
              }}>
                <Icon size={20} color={isActive ? link.color : 'var(--text-muted)'} />
                <span style={{ fontSize: '0.95rem' }}>{link.label}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div style={{
        marginTop: 'auto',
        padding: '16px',
        background: 'var(--bg-base)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        border: '1px solid var(--border-subtle)',
        position: 'relative'
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: '50%',
          background: 'var(--border-normal)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden',
          flexShrink: 0
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
        <Link href="/login" style={{ marginTop: '8px' }}>
          <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px' }}>
            Masuk / Daftar
          </button>
        </Link>
      ) : (
        <button 
          onClick={async () => {
            await supabase.auth.signOut();
            window.location.reload();
          }} 
          className="btn btn-ghost" 
          style={{ width: '100%', justifyContent: 'center', fontSize: '0.85rem', padding: '8px', marginTop: '8px', color: 'var(--text-secondary)' }}
        >
          Keluar
        </button>
      )}
    </aside>
  );
}
