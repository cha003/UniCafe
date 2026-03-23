import React from 'react';

const StatsCard = ({ title, value, icon: Icon, trend, color }) => (
    <div className="glass" style={{
        padding: '24px',
        borderRadius: '20px',
        flex: 1,
        minWidth: '240px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: '1px solid var(--glass-border)'
    }}>
        <div style={{
            position: 'absolute',
            top: '-10px',
            right: '-10px',
            width: '80px',
            height: '80px',
            background: color,
            opacity: 0.1,
            borderRadius: '50%',
            filter: 'blur(20px)'
        }} />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{
                padding: '12px',
                borderRadius: '12px',
                background: `${color}20`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Icon size={24} style={{ color }} />
            </div>
            {trend && (
                <div style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    color: trend.startsWith('+') ? '#10b981' : '#ef4444',
                    background: trend.startsWith('+') ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    padding: '4px 8px',
                    borderRadius: '6px'
                }}>
                    {trend}
                </div>
            )}
        </div>

        <div>
            <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>{title}</div>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-main)' }}>{value}</div>
        </div>
    </div>
);

export default StatsCard;
