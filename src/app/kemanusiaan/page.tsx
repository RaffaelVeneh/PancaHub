import { createClient } from '@/lib/supabase/server';
import { Heart, Users, Flag, AlertTriangle, ShieldAlert } from 'lucide-react';
import Image from 'next/image';
import ScrollReveal from '@/components/ScrollReveal';

export default async function KemanusiaanPage() {
  const supabase = await createClient();
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false });

  const safeCampaigns = campaigns || [];

  // Dynamic stats from real data
  const totalDonors = 12450; // would come from aggregation
  const activeVolunteers = 3210;
  const activeCampaigns = safeCampaigns.length;

  return (
    <div className="responsive-padding" style={{ padding: '40px' }}>
      {/* Header */}
      <ScrollReveal>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--sila2-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>❤️</span>
            </div>
            <div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--sila2)' }}>Lensa Kemanusiaan</h1>
              <p style={{ color: 'var(--text-secondary)' }}>Sila 2: Kemanusiaan yang Adil dan Beradab melalui aksi nyata.</p>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Top Stats */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <ScrollReveal delay={0}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--bg-hover)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Heart size={24} color="var(--sila2)" />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Jiwa Terbantu</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{totalDonors.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sila1-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={24} color="var(--sila1)" />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Relawan Aktif</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{activeVolunteers.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px', background: 'var(--sila2-light)', border: 'none' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Flag size={24} color="var(--sila2)" />
            </div>
            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--sila2)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Kampanye Berjalan</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--sila2)' }}>{activeCampaigns}</p>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Left Column - Crowdfunding Campaigns */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ScrollReveal>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Aksi Sosial Terkini</h2>
              <button className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>Lihat Semua →</button>
            </div>
          </ScrollReveal>
          
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {safeCampaigns.map((campaign, idx) => {
              const progress = Math.min((campaign.current_amount / campaign.target_amount) * 100, 100);
              const isUrgent = progress < 30;
              return (
                <ScrollReveal key={campaign.id} delay={idx * 0.08}>
                  <div className="glass-card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '160px', background: 'var(--border-subtle)', position: 'relative' }}>
                      <Image src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000&auto=format&fit=crop" alt="Campaign" fill style={{ objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 12, left: 12, background: isUrgent ? 'var(--sila1)' : 'var(--sila5)', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase' }}>
                        {isUrgent ? '⚡ Darurat' : '🟡 Aktif'}
                      </div>
                    </div>
                    <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{campaign.title}</h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '20px', flex: 1 }}>{campaign.description}</p>
                      
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                          <span style={{ color: 'var(--text-secondary)' }}>Terkumpul</span>
                          <span style={{ fontWeight: 800, color: 'var(--sila2)' }}>{progress.toFixed(0)}%</span>
                        </div>
                        <div style={{ width: '100%', height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                          <div style={{ width: `${progress}%`, height: '100%', background: 'var(--sila2)', borderRadius: '4px', transition: 'width 1s ease' }}></div>
                        </div>
                        <div style={{ marginTop: '8px', fontSize: '0.9rem', fontWeight: 700 }}>
                          Rp {(campaign.current_amount / 1000000).toLocaleString('id-ID')} Juta
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <button className="btn" style={{ flex: 1, background: 'var(--sila2)', color: 'white', justifyContent: 'center' }}>Donasi</button>
                        <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center' }}>Daftar Relawan</button>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Right Column - Anonymous Reporting */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <ScrollReveal direction="right">
            <div className="glass-card" style={{ padding: '24px', background: 'linear-gradient(to bottom right, var(--bg-surface), var(--sila2-light))', border: '1px solid var(--sila2)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <ShieldAlert size={20} color="var(--sila2)" />
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--sila2)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Safe & Anonymous</span>
              </div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>Lapor Ketidakadilan</h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: 1.6 }}>
                Lihat pelanggaran hak atau kebutuhan mendesak? Laporkan secara aman dan rahasia.
              </p>
              <button className="btn" style={{ width: '100%', background: 'var(--sila2)', color: 'white', justifyContent: 'center' }}>
                Buat Laporan
              </button>
            </div>
          </ScrollReveal>
          
          <ScrollReveal direction="right" delay={0.15}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <AlertTriangle size={16} color="var(--sila4)" /> Peta Aksi Sekitar <span style={{ padding: '2px 6px', background: 'var(--sila2)', color: 'white', borderRadius: '4px', fontSize: '0.6rem', marginLeft: 'auto' }}>LIVE</span>
              </h3>
              <div style={{ height: '150px', background: 'var(--border-subtle)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <span>🗺️ Peta interaktif akan segera hadir</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
