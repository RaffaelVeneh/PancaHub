import { Loader2 } from 'lucide-react';

export default function Loading() {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--bg-base)',
      gap: '16px'
    }}>
      <Loader2 size={48} color="var(--sila3)" className="animate-spin" />
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.2rem',
        fontWeight: 700,
        color: 'var(--text-secondary)'
      }}>
        Memuat Ekosistem...
      </p>
    </div>
  );
}
