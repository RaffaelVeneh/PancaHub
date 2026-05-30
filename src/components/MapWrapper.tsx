'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Search, Navigation, X, MapPin, Church, Star, Building2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ──────────────────────────────────────────────
type Place = {
  id: string;
  name: string;
  religion: string;
  address: string;
  lat: number;
  lng: number;
};

// ─── Religion config with colors ────────────────────────
const RELIGION_CONFIG: Record<string, { color: string; bg: string; border: string; icon: string }> = {
  'Islam':              { color: '#16A34A', bg: '#DCFCE7', border: '#22C55E', icon: '🕌' },
  'Kristen':            { color: '#2563EB', bg: '#DBEAFE', border: '#3B82F6', icon: '⛪' },
  'Katolik':            { color: '#7C3AED', bg: '#EDE9FE', border: '#8B5CF6', icon: '✝️' },
  'Hindu':              { color: '#EA580C', bg: '#FFF7ED', border: '#F97316', icon: '🛕' },
  'Buddha':             { color: '#CA8A04', bg: '#FEF9C3', border: '#EAB308', icon: '☸️' },
  'Konghucu':           { color: '#DC2626', bg: '#FEE2E2', border: '#EF4444', icon: '🏛️' },
};

function getReligionConfig(religion: string) {
  return RELIGION_CONFIG[religion] ?? { color: '#6B7280', bg: '#F3F4F6', border: '#9CA3AF', icon: '🏛️' };
}

// ─── Colored DivIcon factory ────────────────────────────
function createReligionIcon(religion: string, isSelected: boolean) {
  const cfg = getReligionConfig(religion);
  const size = isSelected ? 16 : 13;
  const border = isSelected ? `3px solid ${cfg.border}` : `2px solid ${cfg.border}`;
  const shadow = isSelected ? '0 0 14px 4px' : '0 0 6px 2px';
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width:${size}px;height:${size}px;
      background:${cfg.color};
      border:${border};
      border-radius:50%;
      box-shadow:${shadow} ${cfg.color}66;
      transition:all 0.25s ease;
    "></div>`,
    iconSize: [size + 8, size + 8],
    iconAnchor: [(size + 8) / 2, (size + 8) / 2],
    popupAnchor: [0, -(size + 8) / 2],
  });
}

// ─── FlyToController ─────────────────────────────────────
function FlyToController({ target }: { target: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (target) {
      map.flyTo(target, 15, { duration: 1.2, easeLinearity: 0.25 });
    }
  }, [target, map]);
  return null;
}

// ─── LocateButton ────────────────────────────────────────
function LocateButton({ onLocated }: { onLocated: (pos: [number, number]) => void }) {
  const map = useMap();
  const [locating, setLocating] = useState(false);

  const handleLocate = useCallback(() => {
    if (!navigator.geolocation) return;
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        map.flyTo(coords, 14, { duration: 1 });
        onLocated(coords);
        setLocating(false);
      },
      () => setLocating(false),
      { enableHighAccuracy: true, timeout: 8000 }
    );
  }, [map, onLocated]);

  return (
    <button
      onClick={handleLocate}
      disabled={locating}
      className="btn btn-ghost"
      style={{
        position: 'absolute', bottom: 12, left: 12, zIndex: 1000,
        background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
        borderRadius: '8px', padding: '8px 12px', fontSize: '0.8rem',
        boxShadow: 'var(--shadow-md)', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 6,
      }}
      title="Lokasi Saya"
    >
      <Navigation size={15} color={locating ? 'var(--sila2)' : 'var(--text-secondary)'} />
      {locating ? 'Mencari...' : 'Lokasi Saya'}
    </button>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────
export default function MapWrapper({ places }: { places: Place[] }) {
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [flyTarget, setFlyTarget] = useState<[number, number] | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  // ─── Available religions ───────────────────────────────
  const religions = useMemo(() => {
    const set = new Set(places.map(p => p.religion));
    return Array.from(set).sort();
  }, [places]);

  // ─── Filtered places ───────────────────────────────────
  const filtered = useMemo(() => {
    let result = places;
    if (activeFilter) {
      result = result.filter(p => p.religion === activeFilter);
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.religion.toLowerCase().includes(q)
      );
    }
    return result;
  }, [places, activeFilter, search]);

  // ─── Handlers ──────────────────────────────────────────
  const handleSelectPlace = useCallback((place: Place) => {
    setSelectedPlace(place);
    setFlyTarget([place.lat, place.lng]);
  }, []);

  const handleLocateUser = useCallback((pos: [number, number]) => {
    setUserLocation(pos);
  }, []);

  // ─── Center ────────────────────────────────────────────
  const center: [number, number] = [-6.200000, 106.816666]; // Jakarta

  return (
    <div style={{ display: 'flex', gap: '16px', minHeight: '500px' }}>
      {/* LEFT: Map */}
      <div style={{ flex: 1, position: 'relative' }}>
        {/* Search + Filters bar */}
        <div style={{
          position: 'absolute', top: 12, left: 12, right: 12, zIndex: 1000,
          display: 'flex', gap: 8, flexWrap: 'wrap',
        }}>
          {/* Search input */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)',
            borderRadius: '100px', padding: '8px 16px',
            boxShadow: 'var(--shadow-md)', flex: '1 1 200px', maxWidth: '320px',
          }}>
            <Search size={15} color="var(--text-muted)" />
            <input
              type="text"
              placeholder="Cari rumah ibadah..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', fontSize: '0.85rem', width: '100%', color: 'var(--text-primary)' }}
            />
            {search && (
              <button onClick={() => setSearch('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>
                <X size={14} color="var(--text-muted)" />
              </button>
            )}
          </div>
        </div>

        {/* Religion filter chips */}
        <div style={{
          position: 'absolute', top: 60, left: 12, right: 12, zIndex: 1000,
          display: 'flex', gap: 6, flexWrap: 'wrap',
        }}>
          <button
            onClick={() => setActiveFilter(null)}
            style={{
              padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
              border: `1px solid ${activeFilter === null ? 'var(--sila1)' : 'var(--border-subtle)'}`,
              background: activeFilter === null ? 'var(--sila1-light)' : 'var(--bg-surface)',
              color: activeFilter === null ? 'var(--sila1)' : 'var(--text-secondary)',
              cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
              transition: 'all 0.2s',
            }}
          >
            Semua ({places.length})
          </button>
          {religions.map(rel => {
            const cfg = getReligionConfig(rel);
            const isActive = activeFilter === rel;
            const count = places.filter(p => p.religion === rel).length;
            return (
              <button
                key={rel}
                onClick={() => setActiveFilter(isActive ? null : rel)}
                style={{
                  padding: '4px 12px', borderRadius: '100px', fontSize: '0.72rem', fontWeight: 600,
                  border: `1px solid ${isActive ? cfg.border : 'var(--border-subtle)'}`,
                  background: isActive ? cfg.bg : 'var(--bg-surface)',
                  color: isActive ? cfg.color : 'var(--text-secondary)',
                  cursor: 'pointer', boxShadow: 'var(--shadow-sm)',
                  transition: 'all 0.2s',
                }}
              >
                {cfg.icon} {rel} ({count})
              </button>
            );
          })}
        </div>

        {/* The Map */}
        <div style={{ height: '500px', width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--border-subtle)' }}>
          <MapContainer center={center} zoom={11} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FlyToController target={flyTarget} />
            {filtered.map((place) => {
              const isSel = selectedPlace?.id === place.id;
              return (
                <Marker
                  key={place.id}
                  position={[place.lat, place.lng]}
                  icon={createReligionIcon(place.religion, isSel)}
                  eventHandlers={{
                    click: () => setSelectedPlace(place),
                  }}
                >
                  <Popup>
                    <div style={{ padding: '4px', minWidth: '160px' }}>
                      <h3 style={{ margin: '0 0 6px 0', fontSize: '14px', fontWeight: 800, color: 'var(--text-primary)' }}>
                        {place.name}
                      </h3>
                      <span style={{
                        display: 'inline-block', marginBottom: '8px', fontSize: '10px', fontWeight: 700,
                        padding: '2px 8px', borderRadius: '100px',
                        background: getReligionConfig(place.religion).bg,
                        color: getReligionConfig(place.religion).color,
                      }}>
                        {getReligionConfig(place.religion).icon} {place.religion}
                      </span>
                      <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                        📍 {place.address}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
            {/* User location circle */}
            {userLocation && (
              <Circle
                center={userLocation}
                radius={500}
                pathOptions={{
                  color: 'var(--sila2)',
                  fillColor: 'var(--sila2)',
                  fillOpacity: 0.12,
                  weight: 2,
                }}
              />
            )}
            <LocateButton onLocated={handleLocateUser} />
          </MapContainer>
        </div>
      </div>

      {/* RIGHT: Place List */}
      <div style={{
        width: '300px', flexShrink: 0,
        background: 'var(--bg-surface)', borderRadius: '12px',
        border: '1px solid var(--border-subtle)', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* List header */}
        <div style={{
          padding: '16px', borderBottom: '1px solid var(--border-subtle)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <Building2 size={16} color="var(--sila1)" />
          <span style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
            {filtered.length} Rumah Ibadah
          </span>
          {activeFilter && (
            <span style={{
              marginLeft: 'auto', fontSize: '0.7rem', fontWeight: 600,
              color: getReligionConfig(activeFilter).color,
              background: getReligionConfig(activeFilter).bg,
              padding: '2px 8px', borderRadius: '100px',
            }}>
              {activeFilter}
            </span>
          )}
        </div>

        {/* Scrollable list */}
        <div style={{ flex: 1, overflow: 'auto', padding: '8px' }}>
          <AnimatePresence>
            {filtered.length === 0 ? (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
                <Search size={28} style={{ opacity: 0.4, marginBottom: '8px' }} />
                <p style={{ fontSize: '0.85rem' }}>Tidak ada hasil untuk "{search}"</p>
              </div>
            ) : (
              filtered.map((place, i) => {
                const cfg = getReligionConfig(place.religion);
                const isSel = selectedPlace?.id === place.id;
                return (
                  <motion.div
                    key={place.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2, delay: i * 0.02 }}
                    onClick={() => handleSelectPlace(place)}
                    style={{
                      padding: '12px', borderRadius: '10px', cursor: 'pointer',
                      marginBottom: '4px',
                      background: isSel ? 'var(--bg-hover)' : 'transparent',
                      border: isSel ? `1px solid ${cfg.border}` : '1px solid transparent',
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'var(--bg-hover)'; }}
                    onMouseLeave={e => { if (!isSel) (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
                  >
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: cfg.bg, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, fontSize: '1rem',
                        border: `2px solid ${cfg.border}`,
                      }}>
                        {cfg.icon}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {place.name}
                        </div>
                        <span style={{
                          fontSize: '0.65rem', fontWeight: 700, padding: '1px 6px', borderRadius: '4px',
                          background: cfg.bg, color: cfg.color,
                        }}>
                          {place.religion}
                        </span>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          📍 {place.address}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
