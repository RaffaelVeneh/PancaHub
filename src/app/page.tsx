'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Star, Users, Globe, Vote, ShoppingBag, ArrowRight, ShieldCheck, Activity } from 'lucide-react';

const silaData = [
  {
    id: 1,
    judul: 'Harmoni Ibadah',
    deskripsi: 'Peta rumah ibadah & jadwal.',
    icon: Star,
    href: '/harmoni',
    colorClass: 'sila-card-1',
    color: 'var(--sila1)',
    bgLight: 'var(--sila1-light)'
  },
  {
    id: 2,
    judul: 'Lensa Kemanusiaan',
    deskripsi: 'Crowdfunding & pelaporan anonim.',
    icon: Users,
    href: '/kemanusiaan',
    colorClass: 'sila-card-2',
    color: 'var(--sila2)',
    bgLight: 'var(--sila2-light)'
  },
  {
    id: 3,
    judul: 'Galeri Nusantara',
    deskripsi: 'Eksplorasi budaya 3D interaktif.',
    icon: Globe,
    href: '/nusantara',
    colorClass: 'sila-card-3',
    color: 'var(--sila3)',
    bgLight: 'var(--sila3-light)'
  },
  {
    id: 4,
    judul: 'Ruang Mufakat',
    deskripsi: 'Voting transparan & diskusi publik.',
    icon: Vote,
    href: '/mufakat',
    colorClass: 'sila-card-4',
    color: 'var(--sila4)',
    bgLight: 'var(--sila4-light)'
  },
  {
    id: 5,
    judul: 'Jembatan Adil',
    deskripsi: 'Marketplace UMKM 3T & bansos.',
    icon: ShoppingBag,
    href: '/keadilan',
    colorClass: 'sila-card-5',
    color: 'var(--sila5)',
    bgLight: 'var(--sila5-light)'
  },
];

export default function DashboardPage() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );
    document.querySelectorAll('.fade-up').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-grid-pattern responsive-padding" style={{ minHeight: '100vh', padding: '40px' }}>
      
      {/* Top Header Section */}
      <div className="glass-card mesh-bg-light fade-up" style={{ 
        padding: '40px', 
        marginBottom: '40px',
        position: 'relative',
        overflow: 'hidden',
        border: 'none',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{ 
            fontFamily: "'Playfair Display', serif", 
            fontSize: '2.5rem', 
            fontWeight: 800,
            color: 'var(--text-primary)',
            marginBottom: '8px'
          }}>
            Selamat Datang di PancaHub!
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', maxWidth: '600px', marginBottom: '24px' }}>
            Ekosistem digital yang menghidupkan nilai-nilai Pancasila. Jelajahi kelima pilar untuk mulai berkontribusi secara nyata bagi Indonesia.
          </p>
          <button className="btn btn-primary">
            Mulai Kontribusi <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        
        {/* Left Column: Sila Navigation */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)' }}>Akses Cepat Sila</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {silaData.map((sila, i) => {
              const Icon = sila.icon;
              return (
                <Link key={sila.id} href={sila.href} style={{ textDecoration: 'none' }}>
                  <div className={`sila-card ${sila.colorClass} fade-up`} style={{ 
                    padding: '24px', 
                    animationDelay: `${i * 0.05}s`,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}>
                    <div style={{ 
                      width: 48, height: 48, 
                      borderRadius: '12px', 
                      background: sila.bgLight,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '16px'
                    }}>
                      <Icon size={24} color={sila.color} />
                    </div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: sila.color, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      Sila {sila.id}
                    </div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                      {sila.judul}
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, flex: 1 }}>
                      {sila.deskripsi}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Column: Platform Stats & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Stats Card */}
          <div className="glass-card fade-up" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Activity size={18} color="var(--gold)" />
              Statistik Platform
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pengguna Aktif</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>12.450</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Donasi Tersalurkan</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>Rp 4.1M</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>UMKM Terbantu</span>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>124</span>
              </div>
            </div>
          </div>

          {/* Info Card */}
          <div className="glass-card fade-up" style={{ padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--sila4-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
              <ShieldCheck size={20} color="var(--sila4)" />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Aman & Transparan</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              Seluruh transaksi, donasi, dan sistem voting dienkripsi menggunakan teknologi terkini untuk memastikan keamanan data warga digital.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
