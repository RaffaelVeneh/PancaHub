import { createClient } from '@/lib/supabase/server';
import DynamicMap from '@/components/DynamicMap';
import { Calendar, MapPin, Building2, TrendingUp } from 'lucide-react';

export default async function HarmoniPage() {
  const supabase = await createClient();
  const { data: places } = await supabase
    .from('places_of_worship')
    .select('*')
    .order('name');

  const safePlaces = places || [];

  // Hitung statistik per agama dari data nyata
  const religionStats: Record<string, number> = safePlaces.reduce<Record<string, number>>((acc, p) => {
    acc[p.religion] = (acc[p.religion] || 0) + 1;
    return acc;
  }, {});

  const schedule = [
    { date: '11 Mar', event: 'Hari Raya Nyepi', religion: 'Hindu', icon: '🛕' },
    { date: '29 Mar', event: 'Wafat Yesus Kristus', religion: 'Kristen/Katolik', icon: '✝️' },
    { date: '10 Apr', event: 'Idul Fitri', religion: 'Islam', icon: '🕌' },
    { date: '23 Mei', event: 'Hari Raya Waisak', religion: 'Buddha', icon: '☸️' },
    { date: '17 Agu', event: 'Hari Kemerdekaan RI', religion: 'Nasional', icon: '🇮🇩' },
  ];

  return (
    <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
      {/* ─── Header ─── */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
          <div style={{
            width: 48, height: 48, borderRadius: '12px',
            background: 'var(--sila1-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '1.5rem' }}>🌟</span>
          </div>
          <div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '2rem',
              fontWeight: 800, color: 'var(--sila1)', margin: 0,
            }}>
              Harmoni Ibadah
            </h1>
            <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '0.9rem' }}>
              Sila 1 — Ketuhanan Yang Maha Esa
            </p>
          </div>
        </div>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', maxWidth: '600px', lineHeight: 1.6 }}>
          Temukan rumah ibadah dari enam agama di seluruh Indonesia. Gunakan filter atau cari langsung untuk menjelajahi tempat ibadah terdekat.
        </p>
      </div>

      {/* ─── Stats Row ─── */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '16px', marginBottom: '32px',
      }}>
        <div className="glass-card" style={{
          padding: '20px', display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '10px',
            background: 'var(--sila1-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <Building2 size={20} color="var(--sila1)" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
              Total Terdaftar
            </p>
            <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {safePlaces.length}
            </p>
          </div>
        </div>

        <div className="glass-card" style={{
          padding: '20px', display: 'flex', alignItems: 'center', gap: '14px',
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: '10px',
            background: 'var(--sila3-light)', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
          }}>
            <TrendingUp size={20} color="var(--sila3)" />
          </div>
          <div>
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', margin: 0 }}>
              Agama Tercakup
            </p>
            <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              {Object.keys(religionStats).length}
            </p>
          </div>
        </div>

        {Object.entries(religionStats).slice(0, 4).map(([religion, count]) => (
          <div key={religion} className="glass-card" style={{
            padding: '16px', display: 'flex', alignItems: 'center', gap: '10px',
          }}>
            <div style={{
              width: 36, height: 36, borderRadius: '8px',
              background: 'var(--bg-hover)', display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem',
            }}>
              {religion === 'Islam' ? '🕌' : religion === 'Kristen' ? '⛪' : religion === 'Katolik' ? '✝️' : religion === 'Hindu' ? '🛕' : religion === 'Buddha' ? '☸️' : '🏛️'}
            </div>
            <div>
              <p style={{ fontSize: '0.65rem', color: 'var(--text-muted)', margin: 0, fontWeight: 600 }}>
                {religion}
              </p>
              <p style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                {count}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Map Section ─── */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '16px' }}>
          <MapPin size={18} color="var(--sila1)" />
          <h2 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
            Peta Interaktif Rumah Ibadah
          </h2>
        </div>
        <DynamicMap places={safePlaces} />
      </div>

      {/* ─── Bottom Row: Calendar + Info ─── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
      }} className="responsive-grid">
        {/* Calendar */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <h2 style={{
            fontSize: '1.1rem', fontWeight: 700, marginBottom: '20px',
            display: 'flex', alignItems: 'center', gap: '8px',
          }}>
            <Calendar size={18} color="var(--sila1)" /> Kalender Lintas Agama
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {schedule.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex', gap: '14px', alignItems: 'center',
                  paddingBottom: '12px',
                  borderBottom: idx !== schedule.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                }}
              >
                <div style={{
                  width: '48px', height: '48px', background: 'var(--bg-hover)',
                  borderRadius: '10px', display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--sila1)' }}>
                    {item.date.split(' ')[1]}
                  </span>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {item.date.split(' ')[0]}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2 }}>
                    <span>{item.icon}</span>
                    <h3 style={{ fontSize: '0.92rem', fontWeight: 700, margin: 0 }}>{item.event}</h3>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{item.religion}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px', justifyContent: 'center', fontSize: '0.85rem' }}>
            Lihat Kalender Penuh →
          </button>
        </div>

        {/* Info Card */}
        <div className="glass-card" style={{
          padding: '24px', background: 'linear-gradient(135deg, var(--sila1-light), var(--bg-surface))',
          border: '1px solid var(--sila1-light)', display: 'flex', flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '3rem', textAlign: 'center', marginBottom: '16px' }}>🕊️</div>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontSize: '1.3rem',
            fontWeight: 800, textAlign: 'center', color: 'var(--sila1)',
            marginBottom: '12px',
          }}>
            Harmoni dalam Keberagaman
          </h3>
          <p style={{
            textAlign: 'center', color: 'var(--text-secondary)',
            fontSize: '0.9rem', lineHeight: 1.7,
          }}>
            Indonesia memiliki {safePlaces.length}+ rumah ibadah yang tersebar di seluruh Nusantara,
            mencerminkan semangat toleransi dan persatuan dalam bingkai Bhinneka Tunggal Ika.
          </p>
          <div style={{
            display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '16px',
            fontSize: '1.5rem',
          }}>
            🕌 ⛪ ✝️ 🛕 ☸️ 🏛️
          </div>
        </div>
      </div>
    </div>
  );
}
