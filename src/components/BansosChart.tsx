'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function BansosChart({ data }: { data: any[] }) {
  // Format data for Recharts
  const chartData = data.map(d => ({
    name: d.region,
    'Tersalurkan': d.amount_distributed / 1000000, // in millions for easier reading
    'Target': d.target_amount / 1000000
  }));

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" />
          <XAxis dataKey="name" tick={{ fill: 'var(--text-secondary)' }} axisLine={{ stroke: 'var(--border-normal)' }} />
          <YAxis tick={{ fill: 'var(--text-secondary)' }} axisLine={{ stroke: 'var(--border-normal)' }} tickFormatter={(val) => `Rp ${val}M`} />
          <Tooltip 
            contentStyle={{ background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', borderRadius: '8px', boxShadow: 'var(--shadow-lg)' }}
            formatter={(value: number) => [`Rp ${value} Juta`, '']}
          />
          <Legend wrapperStyle={{ paddingTop: '10px' }} />
          <Bar dataKey="Tersalurkan" fill="var(--sila5)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Target" fill="var(--border-normal)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
