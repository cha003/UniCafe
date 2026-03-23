import React from 'react';
import { Award, TrendingUp } from 'lucide-react';

const PopularItems = ({ items }) => {
    return (
        <div className="glass" style={{ padding: '32px', borderRadius: '24px', background: 'var(--bg-card)', height: '100%', border: '1px solid var(--glass-border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                <div style={{ padding: '10px', borderRadius: '12px', background: '#f59e0b20' }}>
                    <Award size={20} style={{ color: '#f59e0b' }} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-main)' }}>Popular Items</h3>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items && items.length > 0 ? (
                    items.slice(0, 5).map((item, idx) => (
                        <div key={idx} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '16px',
                            borderRadius: '16px',
                            background: 'rgba(59, 10, 0, 0.05)',
                            border: '1px solid var(--glass-border)',
                            transition: 'transform 0.2s ease'
                        }} className="hover-scale">
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '10px',
                                    background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '1rem',
                                    fontWeight: 900,
                                    color: 'var(--text-main)'
                                }}>
                                    {idx + 1}
                                </div>
                                <div style={{ flex: 1 }}>
                                    <div style={{ fontWeight: 700, color: 'var(--text-main)' }}>{item._id}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{item.count} orders</div>
                                </div>
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontWeight: 800, color: '#10b981' }}>LKR {item.revenue?.toLocaleString()}</div>
                                <div style={{ fontSize: '0.65rem', color: '#10b981', display: 'flex', alignItems: 'center', gap: '2px', justifyContent: 'flex-end' }}>
                                    <TrendingUp size={10} /> +{Math.floor(Math.random() * 15) + 5}%
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ textAlign: 'center', padding: '40px', color: '#94a3b8' }}>
                        No data available yet
                    </div>
                )}
            </div>
        </div>
    );
};

export default PopularItems;
