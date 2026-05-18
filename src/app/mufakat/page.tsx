import { createClient } from '@/lib/supabase/server';
import { Vote, Target, CheckCircle2, Link as LinkIcon, MessageSquare, Users } from 'lucide-react';
import Link from 'next/link';

export default async function MufakatPage() {
  const supabase = await createClient();
  const { data: petitions } = await supabase
    .from('petitions')
    .select('*')
    .order('created_at', { ascending: false });

  const safePetitions = petitions || [];

  return (
    <div className="responsive-padding" style={{ padding: '40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--sila4-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>🗳️</span>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--sila4)' }}>Ruang Mufakat</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sila 4: Menjunjung tinggi Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan melalui musyawarah digital transparan.</p>
          </div>
        </div>
      </div>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        {/* Left Column - Petitions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Vote size={20} color="var(--sila4)" /> Pemungutan Suara Aktif
            </h2>
            <button className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>Lihat Semua →</button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {safePetitions.map((petition) => {
              const target = 15000;
              const progress = (petition.votes_count / target) * 100;
              return (
                <div key={petition.id} className="glass-card" style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <div>
                      <span className="badge badge-sila4" style={{ marginBottom: '8px', display: 'inline-block' }}>Infrastruktur</span>
                      <h3 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '8px' }}>{petition.title}</h3>
                      <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', lineHeight: 1.5, maxWidth: '90%' }}>{petition.description}</p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.8rem', color: 'var(--text-muted)', background: 'var(--bg-hover)', padding: '4px 8px', borderRadius: '4px' }}>
                      <Target size={14} /> Sisa 3 Hari
                    </div>
                  </div>
                  
                  <div style={{ marginBottom: '20px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}><Users size={12} style={{ display: 'inline', marginRight: 4 }} />Dukungan: <strong style={{ color: 'var(--text-primary)' }}>{petition.votes_count.toLocaleString('id-ID')}</strong></span>
                      <span style={{ color: 'var(--text-secondary)' }}>Target: <strong style={{ color: 'var(--text-primary)' }}>{target.toLocaleString('id-ID')}</strong></span>
                    </div>
                    <div style={{ width: '100%', height: '8px', background: 'var(--border-subtle)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: `${progress}%`, height: '100%', background: 'var(--sila4)', borderRadius: '4px' }}></div>
                    </div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button className="btn" style={{ background: 'var(--sila4)', color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CheckCircle2 size={16} /> Berikan Suara
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column - Hash Chain & Discussion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Hash Chain Widget */}
          <div className="glass-card" style={{ padding: '24px', background: '#1a1a1a', color: 'white', border: '1px solid #333' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#ccc' }}>
              <LinkIcon size={16} color="var(--sila4)" /> Jaringan Konsensus
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontFamily: 'monospace', fontSize: '0.75rem' }}>
              <div style={{ background: '#2a2a2a', padding: '12px', borderRadius: '8px', borderLeft: '3px solid var(--sila4)' }}>
                <div style={{ color: '#888', marginBottom: '4px' }}>HASH TERAKHIR:</div>
                <div style={{ color: 'var(--sila4)', wordBreak: 'break-all' }}>0x789C...2F4A99E</div>
                <div style={{ color: '#666', marginTop: '4px' }}>BLOCK: #002819 · 12 sec ago</div>
              </div>
              <div style={{ background: '#222', padding: '12px', borderRadius: '8px', color: '#888' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span>Voter_89***42</span>
                  <span>+1</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Voter_12***7A</span>
                  <span>+1</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Discussion Thread */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MessageSquare size={16} color="var(--text-secondary)" /> Ruang Diskusi
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--sila1-light)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: '0.8rem', fontWeight: 700, color: 'var(--sila1)' }}>B</div>
                <div>
                  <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>Dampak Renovasi?</div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>Apakah ada studi komprehensif mengenai dampak lalu lintas?</p>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', gap: '12px' }}>
                    <span>42 Balasan</span>
                    <span>1 Jam lalu</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-outline" style={{ width: '100%', marginTop: '20px', justifyContent: 'center', fontSize: '0.85rem' }}>Lihat Forum</button>
          </div>
        </div>
      </div>
    </div>
  );
}


