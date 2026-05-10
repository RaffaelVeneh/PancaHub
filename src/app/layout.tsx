import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "PancaHub — Digital Civic Ecosystem",
  description: "Platform komunitas digital yang merepresentasikan nilai-nilai Pancasila melalui teknologi interaktif. Harmoni, Kemanusiaan, Persatuan, Demokrasi, dan Keadilan dalam satu ekosistem.",
  keywords: "pancasila, civic, indonesia, platform, digital, komunitas",
  openGraph: {
    title: "PancaHub — Digital Civic Ecosystem",
    description: "Ekosistem digital berbasis nilai Pancasila",
    type: "website",
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";
import MobileHeader from "@/components/MobileHeader";
import ParticleBackground from "@/components/ParticleBackground";
import { NavigationProvider } from "@/components/NavigationProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&family=Playfair+Display:wght@700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider>
          <NavigationProvider>
            <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-base)', position: 'relative' }}>
              <ParticleBackground />
              <Sidebar />
              <MobileHeader />
              <main className="main-content" style={{ 
                flex: 1, 
                marginLeft: '280px',
                position: 'relative',
                zIndex: 2,
                minHeight: '100vh'
              }}>
                {children}
              </main>
            </div>
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
