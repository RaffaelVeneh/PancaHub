import { Globe, BookOpen, Sparkles } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import NusantaraWrapper from '@/components/NusantaraWrapper';
import CultureCards from '@/components/CultureCards';

const CULTURES = [
  { name: 'Tari Saman', region: 'Aceh', desc: 'Tarian serempak yang mengandalkan kekompakan gerak tangan dan bahu — diakui UNESCO 2011.', icon: '🕺', color: 'var(--sila1)', bg: 'var(--sila1-light)' },
  { name: 'Gamelan Jawa', region: 'Jawa Tengah', desc: 'Ansambel musik metalofon yang menjadi jantung seni pertunjukan Jawa sejak abad ke-9.', icon: '🎶', color: 'var(--sila5)', bg: 'var(--sila5-light)' },
  { name: 'Kecak Bali', region: 'Bali', desc: 'Drama tari Ramayana yang diiringi paduan suara ratusan penari — tanpa instrumen musik.', icon: '🔥', color: 'var(--sila4)', bg: 'var(--sila4-light)' },
  { name: 'Toraja', region: 'Sulawesi Selatan', desc: 'Budaya pemakaman megalitik Rambu Solo yang unik, menjadikan kematian sebagai perayaan kehidupan.', icon: '🏛️', color: 'var(--sila3)', bg: 'var(--sila3-light)' },
];

export default async function NusantaraPage() {
  const supabase = await createClient();
  const { data: dictionary } = await supabase
    .from('dictionary')
    .select('*')
    .limit(6);

  const safeDict = dictionary || [];

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Hero — immersive dark section */}
      <div style={{
        background: 'linear-gradient(180deg, #020d10 0%, #061a20 60%, var(--bg-base) 100%)',
        padding: '40px 40px 60px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse at 20% 0%, rgba(26,188,156,0.08) 0%, transparent 60%), radial-gradient(ellipse at 80% 100%, rgba(155,89,182,0.06) 0%, transparent 60%)', pointerEvents: 'none' }} />

        <div style={{ marginBottom: '32px', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'rgba(26,188,156,0.15)', border: '1px solid rgba(26,188,156,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Globe size={24} color="#1ABC9C" />
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1ABC9C', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Sila 3 · Persatuan Indonesia</div>
              <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', margin: 0 }}>Galeri Nusantara</h1>
            </div>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', maxWidth: '520px', lineHeight: 1.7 }}>
            Eksplorasi kekayaan budaya 17.000+ pulau Indonesia. Putar globe untuk menemukan simpul kebudayaan di seluruh Nusantara.
          </p>
        </div>

        <NusantaraWrapper />
      </div>

      {/* Content below */}
      <div className="responsive-padding" style={{ padding: '40px' }}>

        <div style={{ marginBottom: '48px' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Sparkles size={20} color="var(--sila3)" /> Sorotan Kebudayaan
          </h2>
          <CultureCards cultures={CULTURES} />
        </div>

        <div>
          <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <BookOpen size={20} color="var(--sila3)" /> Kamus Bahasa Daerah
          </h2>
          <div className="glass-card" style={{ padding: '24px' }}>
            {safeDict.length > 0 ? (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
                {safeDict.map(item => (
                  <div key={item.id} style={{ padding: '16px', background: 'var(--bg-base)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '6px' }}>
                      <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>{item.word}</span>
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--sila3)', background: 'var(--sila3-light)', padding: '2px 8px', borderRadius: '100px' }}>{item.language}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0, lineHeight: 1.6 }}>&quot;{item.meaning}&quot;</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <BookOpen size={32} style={{ opacity: 0.3, marginBottom: '12px' }} />
                <p style={{ fontWeight: 600 }}>Belum ada entri kamus.</p>
                <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Mari mulai berkontribusi untuk melestarikan bahasa daerah!</p>
              </div>
            )}
            <button className="btn" style={{ width: '100%', marginTop: '20px', background: 'var(--sila3)', color: 'white', justifyContent: 'center' }}>
              + Tambah Kosakata Baru
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
