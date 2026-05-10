import { supabase } from '@/lib/supabase';
import BansosChart from '@/components/BansosChart';
import { ShoppingBag, TrendingUp, ShieldCheck, Banknote } from 'lucide-react';
import Image from 'next/image';

export default async function KeadilanPage() {
  // Fetch UMKM data
  const { data: umkm, error: umkmError } = await supabase
    .from('umkm_products')
    .select('*')
    .order('created_at', { ascending: false });

  // Fetch Bansos data
  const { data: bansos, error: bansosError } = await supabase
    .from('bansos_data')
    .select('*');

  const safeUmkm = umkm || [];
  const safeBansos = bansos || [];

  // Calculate stats
  const totalBansosDistributed = safeBansos.reduce((sum, item) => sum + item.amount_distributed, 0);
  const totalBansosTarget = safeBansos.reduce((sum, item) => sum + item.target_amount, 0);
  const transparencyPercentage = totalBansosTarget > 0 ? ((totalBansosDistributed / totalBansosTarget) * 100).toFixed(1) : '0.0';

  return (
    <div className="responsive-padding" style={{ padding: '40px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 48, height: 48, borderRadius: '12px', background: 'var(--sila5-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontSize: '1.5rem' }}>⚖️</span>
          </div>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem', fontWeight: 800, color: 'var(--sila5)' }}>Jembatan Adil</h1>
            <p style={{ color: 'var(--text-secondary)' }}>Sila 5: Keadilan Sosial Bagi Seluruh Rakyat Indonesia</p>
          </div>
        </div>
      </div>

      {/* Top Stats */}
      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginBottom: '32px' }}>
        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sila2-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <TrendingUp size={24} color="var(--sila2)" />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>UMKM Terbantu</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>12,450</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sila3-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <ShieldCheck size={24} color="var(--sila3)" />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Transparansi Bansos</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>{transparencyPercentage}%</p>
          </div>
        </div>

        <div className="glass-card" style={{ padding: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--sila5-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Banknote size={24} color="var(--sila5)" />
          </div>
          <div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}>Dana Tersalurkan</p>
            <p style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>Rp {(totalBansosDistributed / 1000000000).toFixed(1)}M</p>
          </div>
        </div>
      </div>

      <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
        {/* Left Column - UMKM Marketplace */}
        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={20} color="var(--sila5)" /> UMKM 3T Marketplace
            </h2>
            <button className="btn btn-ghost" style={{ fontSize: '0.85rem' }}>Lihat Semua →</button>
          </div>
          
          <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {safeUmkm.map((product) => (
              <div key={product.id} style={{ border: '1px solid var(--border-subtle)', borderRadius: '12px', overflow: 'hidden', transition: 'all 0.2s', cursor: 'pointer' }} className="hover:shadow-md">
                <div style={{ height: '140px', background: 'var(--border-subtle)', position: 'relative' }}>
                  {product.image_url ? (
                    <Image src={product.image_url} alt={product.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>No Image</div>
                  )}
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '4px' }}>{product.name}</h3>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '12px' }}>{product.seller_name} • {product.region}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: 'var(--sila5)' }}>Rp {product.price.toLocaleString('id-ID')}</span>
                    <button className="btn btn-outline" style={{ padding: '6px 12px', fontSize: '0.8rem' }}>Beli</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Bansos Transparency */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <TrendingUp size={20} color="var(--sila5)" /> Transparansi Bansos
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '24px' }}>
            Penyaluran dana bantuan sosial secara real-time dari database nasional.
          </p>
          
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {safeBansos.length > 0 ? (
              <BansosChart data={safeBansos} />
            ) : (
              <p style={{ color: 'var(--text-muted)' }}>Belum ada data bansos tersedia.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
