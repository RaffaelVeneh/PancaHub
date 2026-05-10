'use client';

import dynamic from 'next/dynamic';
import React from 'react';

type Place = {
  id: string;
  name: string;
  religion: string;
  address: string;
  lat: number;
  lng: number;
};

// Dynamically import MapWrapper with SSR disabled
const MapWrapper = dynamic(() => import('./MapWrapper'), { 
  ssr: false, 
  loading: () => (
    <div style={{ height: '400px', background: 'var(--bg-hover)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)' }}>
      Memuat Peta...
    </div>
  ) 
});

export default function DynamicMap({ places }: { places: Place[] }) {
  return <MapWrapper places={places} />;
}
