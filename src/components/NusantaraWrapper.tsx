'use client';

import { Globe } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function NusantaraWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div style={{ width: '100%', height: '500px', background: 'var(--bg-surface)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <Globe size={40} color="var(--sila3)" style={{ opacity: 0.5 }} />
          <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>Memuat Galeri 3D...</span>
        </div>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '500px', background: 'radial-gradient(circle at center, var(--bg-surface) 0%, var(--bg-base) 100%)', borderRadius: '16px', overflow: 'hidden', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      
      {/* CSS Simulated Globe */}
      <div style={{ 
        width: '250px', 
        height: '250px', 
        borderRadius: '50%', 
        background: 'radial-gradient(circle at 30% 30%, #2A9D8F 0%, #1A5F56 100%)', 
        boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.5), 0 0 50px rgba(42, 157, 143, 0.4)',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        animation: 'spin 20s linear infinite'
      }}>
        {/* Nodes */}
        <div style={{ position: 'absolute', top: '20%', left: '20%', width: 12, height: 12, borderRadius: '50%', background: 'var(--sila1)', boxShadow: '0 0 10px var(--sila1)' }}></div>
        <div style={{ position: 'absolute', top: '70%', left: '80%', width: 8, height: 8, borderRadius: '50%', background: 'var(--sila2)', boxShadow: '0 0 10px var(--sila2)' }}></div>
        <div style={{ position: 'absolute', top: '80%', left: '30%', width: 10, height: 10, borderRadius: '50%', background: 'var(--sila4)', boxShadow: '0 0 10px var(--sila4)' }}></div>
        <div style={{ position: 'absolute', top: '40%', left: '70%', width: 14, height: 14, borderRadius: '50%', background: 'var(--sila5)', boxShadow: '0 0 10px var(--sila5)' }}></div>
        
        {/* Ring */}
        <div style={{ 
          position: 'absolute', 
          width: '350px', 
          height: '350px', 
          borderRadius: '50%', 
          border: '1px solid rgba(233, 196, 106, 0.3)', 
          transform: 'rotateX(70deg)',
          boxSizing: 'border-box'
        }}></div>
      </div>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}} />

      <div style={{ position: 'absolute', bottom: 20, left: 20, background: 'rgba(255,255,255,0.8)', padding: '12px 20px', borderRadius: '12px', backdropFilter: 'blur(10px)', border: '1px solid var(--border-normal)' }}>
        <p style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--sila3)' }}>Interaktif (CSS)</p>
        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Representasi kesatuan keberagaman.</p>
      </div>
    </div>
  );
}
