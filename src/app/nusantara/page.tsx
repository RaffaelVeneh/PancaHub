import { Globe, BookOpen, Music, Map } from 'lucide-react';
import dynamic from 'next/dynamic';
import { supabase } from '@/lib/supabase';

import NusantaraWrapper from '@/components/NusantaraWrapper';

export default async function NusantaraPage() {
  const { data: dictionary } = await supabase
    .from('dictionary')
    .select('*')
    .limit(3);
    
  const safeDict = dictionary || [];

  return (
    <div className="responsive-padding" style={{ padding: '40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--sila3-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>🌴</span>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--sila3)' }}>Galeri Nusantara</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sila 3: Persatuan Indonesia dirajut lewat pelestarian bahasa dan budaya daerah.</p>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px', marginBottom: '40px' }}>
        {/* Interactive 3D Globe */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Globe size={20} color="var(--sila3)" /> Visualisasi Budaya 3D
            </h2>
          </div>
          <NusantaraWrapper />
        </div>
      </div>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Culture Preservation - Dictionary */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BookOpen size={20} color="var(--sila3)" /> Kamus Bahasa Daerah
          </h2>
          <div className="glass-card" style={{ padding: '24px' }}>
            {safeDict.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {safeDict.map(item => (
                  <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '4px', paddingBottom: '16px', borderBottom: '1px solid var(--border-subtle)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 800 }}>{item.word}</span>
                      <span className="badge" style={{ background: 'var(--sila3-light)', color: 'var(--sila3)' }}>{item.language}</span>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>"{item.meaning}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                <p>Belum ada entri kamus. Mari mulai berkontribusi!</p>
              </div>
            )}
            
            <button className="btn" style={{ width: '100%', marginTop: '20px', background: 'var(--sila3)', color: 'white', justifyContent: 'center' }}>
              Tambah Kosakata Baru
            </button>
          </div>
        </div>

        {/* Culture Spotlights */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Music size={20} color="var(--sila3)" /> Kesenian & Tradisi
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '16px' }}>
            <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '8px', background: 'var(--sila3-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Map size={32} color="var(--sila3)" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '4px' }}>Tari Saman (Aceh)</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Kesenian yang mengandalkan kekompakan gerak tepuk tangan dan bahu.</p>
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Lihat</button>
            </div>
            
            <div className="glass-card" style={{ padding: '16px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: 80, height: 80, borderRadius: '8px', background: 'var(--gold)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.5 }}>
                <Music size={32} color="white" />
              </div>
              <div style={{ flex: 1 }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '4px' }}>Gamelan Jawa</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Ansambel musik yang menonjolkan harmoni metalofon dan gendang.</p>
              </div>
              <button className="btn btn-outline" style={{ fontSize: '0.75rem', padding: '6px 12px' }}>Lihat</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
