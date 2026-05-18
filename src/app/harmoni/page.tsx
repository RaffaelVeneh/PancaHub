import { createClient } from '@/lib/supabase/server';
import DynamicMap from '@/components/DynamicMap';
import { Calendar, MapPin, Search } from 'lucide-react';

export default async function HarmoniPage() {
  const supabase = await createClient();
  // Fetch data from Supabase
  const { data: places, error } = await supabase
    .from('places_of_worship')
    .select('*')
    .order('name');

  const safePlaces = places || [];

  // Dummy schedule for UI
  const schedule = [
    { date: '11 Mar', event: 'Hari Raya Nyepi', religion: 'Hindu' },
    { date: '29 Mar', event: 'Wafat Yesus Kristus', religion: 'Kristen/Katolik' },
    { date: '10 Apr', event: 'Idul Fitri', religion: 'Islam' },
    { date: '23 Mei', event: 'Hari Raya Waisak', religion: 'Buddha' },
  ];

  return (
    <div style={{ padding: '40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--sila1-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>🌟</span>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--sila1)' }}>Harmoni Ibadah</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sila 1: Ketuhanan Yang Maha Esa</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Left Column - Map */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <MapPin size={20} color="var(--sila1)" /> Peta Rumah Ibadah
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--bg-base)', padding: '8px 16px', borderRadius: '100px', border: '1px solid var(--border-subtle)' }}>
                <Search size={16} color="var(--text-muted)" />
                <input type="text" placeholder="Cari lokasi..." style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.9rem', width: '150px' }} />
              </div>
            </div>
            
            <DynamicMap places={safePlaces} />
          </div>
        </div>

        {/* Right Column - Schedule & Stats */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="glass-card" style={{ padding: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Calendar size={20} color="var(--sila1)" /> Kalender Lintas Agama
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {schedule.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '16px', alignItems: 'center', paddingBottom: '12px', borderBottom: idx !== schedule.length - 1 ? '1px solid var(--border-subtle)' : 'none' }}>
                  <div style={{ width: '48px', height: '48px', background: 'var(--bg-hover)', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--sila1)' }}>{item.date.split(' ')[1]}</span>
                    <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.date.split(' ')[0]}</span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: '0.95rem', fontWeight: 700 }}>{item.event}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{item.religion}</span>
                  </div>
                </div>
              ))}
            </div>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px', justifyContent: 'center' }}>Lihat Kalender Penuh</button>
          </div>

          {/* Quick Stats */}
          <div className="glass-card" style={{ padding: '24px', background: 'var(--sila1-light)', border: 'none' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--sila1)', marginBottom: '8px', textTransform: 'uppercase' }}>Database Rumah Ibadah</h3>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>{safePlaces.length}</span>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>lokasi terdaftar</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
