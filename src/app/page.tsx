'use client';

import Link from 'next/link';
import { Star, Users, Globe, Vote, ShoppingBag, ArrowRight, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollReveal from '@/components/ScrollReveal';
import CounterAnimation from '@/components/CounterAnimation';

const silaData = [
  {
    id: 1,
    judul: 'Harmoni Ibadah',
    deskripsi: 'Peta rumah ibadah & jadwal.',
    icon: Star,
    href: '/harmoni',
    colorClass: 'sila-card-1',
    color: 'var(--sila1)',
    bgLight: 'var(--sila1-light)',
    solidColor: '#E74C3C',
  },
  {
    id: 2,
    judul: 'Lensa Kemanusiaan',
    deskripsi: 'Crowdfunding & pelaporan anonim.',
    icon: Users,
    href: '/kemanusiaan',
    colorClass: 'sila-card-2',
    color: 'var(--sila2)',
    bgLight: 'var(--sila2-light)',
    solidColor: '#3498DB',
  },
  {
    id: 3,
    judul: 'Galeri Nusantara',
    deskripsi: 'Eksplorasi budaya 3D interaktif.',
    icon: Globe,
    href: '/nusantara',
    colorClass: 'sila-card-3',
    color: 'var(--sila3)',
    bgLight: 'var(--sila3-light)',
    solidColor: '#1ABC9C',
  },
  {
    id: 4,
    judul: 'Ruang Mufakat',
    deskripsi: 'Voting transparan & diskusi publik.',
    icon: Vote,
    href: '/mufakat',
    colorClass: 'sila-card-4',
    color: 'var(--sila4)',
    bgLight: 'var(--sila4-light)',
    solidColor: '#9B59B6',
  },
  {
    id: 5,
    judul: 'Jembatan Adil',
    deskripsi: 'Marketplace UMKM 3T & bansos.',
    icon: ShoppingBag,
    href: '/keadilan',
    colorClass: 'sila-card-5',
    color: 'var(--sila5)',
    bgLight: 'var(--sila5-light)',
    solidColor: '#F39C12',
  },
];

export default function DashboardPage() {
  return (
    <div className="responsive-padding" style={{ minHeight: '100vh', padding: '40px' }}>
      
      {/* Top Header Section */}
      <ScrollReveal>
        <div className="glass-card mesh-bg-light" style={{ 
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
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Mulai Kontribusi <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Grid Content */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '32px' }}>
        
        {/* Left Column: Sila Navigation */}
        <div>
          <ScrollReveal>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>
              Akses Cepat Sila
            </h2>
          </ScrollReveal>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {silaData.map((sila, i) => {
              const Icon = sila.icon;
              return (
                <ScrollReveal key={sila.id} delay={i * 0.08}>
                  <Link href={sila.href} style={{ textDecoration: 'none' }}>
                    <motion.div
                      className={`sila-card ${sila.colorClass}`}
                      style={{ 
                        padding: '24px',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                      whileHover={{ y: -6, boxShadow: 'var(--shadow-lg)' }}
                      whileTap={{ scale: 0.98 }}
                    >
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
                    </motion.div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Right Column: Platform Stats & Activity */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <ScrollReveal direction="right">
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Activity size={18} color="var(--gold)" />
                Statistik Platform
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Pengguna Aktif</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    <CounterAnimation value={12450} duration={1.5} />
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '12px', borderBottom: '1px solid var(--border-subtle)' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Donasi Tersalurkan</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    <CounterAnimation value={4.1} decimals={1} prefix="Rp " suffix="M" duration={1.8} />
                  </span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>UMKM Terbantu</span>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                    <CounterAnimation value={124} duration={1.3} />
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="glass-card" style={{ padding: '24px', background: 'var(--bg-primary)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ width: 40, height: 40, borderRadius: '10px', background: 'var(--sila4-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <ShieldCheck size={20} color="var(--sila4)" />
              </div>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '8px' }}>Aman & Transparan</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                Seluruh transaksi, donasi, dan sistem voting dienkripsi menggunakan teknologi terkini untuk memastikan keamanan data warga digital.
              </p>
            </div>
          </ScrollReveal>

        </div>
      </div>
    </div>
  );
}
