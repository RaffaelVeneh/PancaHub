'use client';

interface Culture {
  name: string;
  region: string;
  desc: string;
  icon: string;
  color: string;
  bg: string;
}

export default function CultureCards({ cultures }: { cultures: Culture[] }) {
  return (
    <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
      {cultures.map(c => (
        <div
          key={c.name}
          className="glass-card"
          style={{ padding: '20px', display: 'flex', gap: '16px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
            (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.transform = '';
            (e.currentTarget as HTMLElement).style.boxShadow = '';
          }}
        >
          <div style={{ width: 52, height: 52, borderRadius: '12px', background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
            {c.icon}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px', flexWrap: 'wrap' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>{c.name}</h3>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: c.color, background: c.bg, padding: '2px 8px', borderRadius: '100px', whiteSpace: 'nowrap' }}>
                {c.region}
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>{c.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
