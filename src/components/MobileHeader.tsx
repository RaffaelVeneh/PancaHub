'use client';

import { Menu, Flame } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Close drawer on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="hidden-desktop" style={{
        position: 'fixed', top: 0, left: 0, width: '100%', height: '60px',
        background: 'var(--glass-bg)', backdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 16px', zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="btn btn-ghost" style={{ padding: 4 }} onClick={() => setIsOpen(true)}>
            <Menu size={24} color="var(--text-primary)" />
          </button>
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            <div style={{
              width: 28, height: 28,
              background: 'var(--text-primary)',
              borderRadius: 8,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Flame size={14} color="var(--bg-surface)" strokeWidth={2.5} />
            </div>
            <span style={{
              fontFamily: "'Playfair Display', serif",
              fontWeight: 800,
              fontSize: '1.1rem',
              color: 'var(--text-primary)',
            }}>
              PancaHub
            </span>
          </Link>
        </div>
        
        <ThemeToggle />
      </div>

      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="hidden-desktop"
          style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 101 }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Drawer Content */}
      <div 
        className="hidden-desktop"
        style={{ 
          position: 'fixed', top: 0, left: isOpen ? 0 : '-300px', 
          width: '280px', height: '100vh', 
          transition: 'left 0.3s ease', zIndex: 102,
          background: 'var(--bg-surface)'
        }}
      >
        <Sidebar isMobile />
      </div>
    </>
  );
}
