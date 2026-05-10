import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './SubmitButton';

export default async function LoginPage(props: { searchParams: Promise<{ message: string }> }) {
  const searchParams = await props.searchParams;
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    return redirect('/');
  }

  const signIn = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect('/login?message=Email atau kata sandi salah. Silakan coba lagi.');
    }

    return redirect('/');
  };

  const signUp = async (formData: FormData) => {
    'use server';
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = await createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      return redirect(`/login?message=${error.message}`);
    }

    return redirect('/login?message=Pendaftaran berhasil! Silakan cek email Anda untuk verifikasi.');
  };

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'center', gap: '8px', padding: '16px' }}>
      <div className="glass-card" style={{ margin: 'auto', width: '100%', maxWidth: '380px', display: 'flex', flexDirection: 'column', gap: '16px', padding: '32px' }}>
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 800, fontFamily: "'Playfair Display', serif", marginBottom: '8px' }}>Masuk PancaHub</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Gabung dalam ekosistem digital kewarganegaraan.</p>
        </div>
        
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="email" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Email</label>
            <input
              name="email"
              placeholder="anda@email.com"
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-normal)', background: 'var(--bg-base)', color: 'var(--text-primary)' }}
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label htmlFor="password" style={{ fontSize: '0.85rem', fontWeight: 600 }}>Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--border-normal)', background: 'var(--bg-base)', color: 'var(--text-primary)' }}
            />
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px' }}>
            <SubmitButton formAction={signIn} style={{ background: 'var(--text-primary)', color: 'var(--bg-base)', justifyContent: 'center' }}>
              Masuk
            </SubmitButton>
            <SubmitButton formAction={signUp} isOutline style={{ justifyContent: 'center' }}>
              Daftar
            </SubmitButton>
          </div>
          
          {searchParams?.message && (
            <div style={{ 
              marginTop: '16px', padding: '12px', 
              background: searchParams.message.includes('berhasil') ? 'var(--sila3-light)' : 'var(--sila1-light)', 
              color: searchParams.message.includes('berhasil') ? 'var(--sila3)' : 'var(--sila1)', 
              textAlign: 'center', borderRadius: '8px', fontSize: '0.85rem',
              border: `1px solid ${searchParams.message.includes('berhasil') ? 'var(--sila3)' : 'var(--sila1)'}`
            }}>
              {searchParams.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
