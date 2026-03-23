import React, { useState } from 'react';
import { Package, AlertTriangle, TrendingUp, TrendingDown, Filter, BarChart3, Info, ChevronDown, PieChart, Calendar, ChevronUp, FileText, Download, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const ReportsView = () => {
    const [activePeriod, setActivePeriod] = useState('Weekly');
    const [activeTimespan, setActiveTimespan] = useState('Last 7 Days');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const topStats = [
        { title: 'Total Inventory', value: '1,284', subtext: 'SKUs', icon: Package, color: '#3b82f6', bg: '#eff6ff', trend: '12%', trendColor: '#10b981', TrendIcon: ArrowUpRight },
        { title: 'Low Stock Items', value: '18', subtext: 'Critical', icon: AlertTriangle, color: '#d97706', bg: '#fffbeb', trend: '5%', trendColor: '#ef4444', TrendIcon: ArrowDownRight },
        { title: 'Stock Added', value: '4,290', subtext: 'LKR 1.2M', icon: TrendingUp, color: '#10b981', bg: '#f0fdf4', trend: '8%', trendColor: '#10b981', TrendIcon: ArrowUpRight },
        { title: 'Stock Consumed', value: '3,850', subtext: 'LKR 0.9M', icon: TrendingDown, color: '#a855f7', bg: '#faf5ff', trend: '3%', trendColor: '#ef4444', TrendIcon: ArrowDownRight }
    ];

    const chartData = [
        { day: 'Mon', added: 420, consumed: 310 },
        { day: 'Tue', added: 380, consumed: 440 },
        { day: 'Wed', added: 950, consumed: 280 },
        { day: 'Thu', added: 410, consumed: 320, active: true },
        { day: 'Fri', added: 280, consumed: 260 },
        { day: 'Sat', added: 580, consumed: 410 },
        { day: 'Sun', added: 510, consumed: 380 },
    ];

    const analyticsData = [
        { title: 'Efficient Utilization', desc: 'Dairy products consumption increased by 15% without waste.', icon: TrendingUp, color: '#10b981', bg: '#f0fdf4', borderColor: '#bbf7d0' },
        { title: 'Waste Alert', desc: 'Meat products waste increased by 5%. Review storage condition.', icon: TrendingDown, color: '#ef4444', bg: '#fef2f2', borderColor: '#fecaca' },
        { title: 'Low Stock Warning', desc: '8 essential SKUs have fallen below the 20% safety threshold.', icon: AlertTriangle, color: '#f59e0b', bg: '#fffbeb', borderColor: '#fde68a' },
        { title: 'Purchasing Recommendation', desc: 'Projected demand for Beverages will rise by 25% next week.', icon: Info, color: '#3b82f6', bg: '#eff6ff', borderColor: '#bfdbfe' }
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Stock Reports</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Professional inventory analytics and consumption patterns.</p>
                </div>
                <div style={{ display: 'flex', gap: '16px', position: 'relative' }}>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px', 
                        background: 'white', color: '#1e293b', border: '1px solid #e2e8f0', 
                        padding: '10px 20px', borderRadius: '8px', fontSize: '0.95rem', 
                        fontWeight: 600, cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.02)'
                    }}>
                        <Calendar size={18} />
                        Schedule
                    </button>
                    
                    <button 
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        style={{
                            display: 'flex', alignItems: 'center', gap: '8px', 
                            background: 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)', color: 'white', border: 'none', 
                            padding: '10px 20px', borderRadius: '8px', fontSize: '0.95rem', 
                            fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
                        }}
                    >
                        <TrendingUp size={18} />
                        Generate Report
                        {isDropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                        <div style={{
                            position: 'absolute', top: '100%', right: 0, marginTop: '8px',
                            background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: '220px', padding: '8px',
                            zIndex: 100, display: 'flex', flexDirection: 'column', gap: '4px'
                        }}>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                                <FileText size={16} style={{ color: '#94a3b8' }} /> Daily Report
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                                <Calendar size={16} style={{ color: '#94a3b8' }} /> Weekly Report
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                                <FileText size={16} style={{ color: '#94a3b8' }} /> Monthly Report
                            </button>
                            <div style={{ height: '1px', background: 'currentcolor', opacity: 0.1, margin: '4px 0' }}></div>
                            <button style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 12px', background: 'transparent', border: 'none', borderRadius: '8px', cursor: 'pointer', color: '#1e293b', fontSize: '0.9rem', fontWeight: 600, textAlign: 'left', transition: 'background 0.2s' }} onMouseOver={e=>e.currentTarget.style.background='#f8fafc'} onMouseOut={e=>e.currentTarget.style.background='transparent'}>
                                <Download size={16} style={{ color: '#94a3b8' }} /> Export as PDF
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Top Stat Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {topStats.map((stat, idx) => (
                    <div key={idx} className="glass" style={{ position: 'relative', padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        
                        {/* Trend Indicator */}
                        <div style={{ position: 'absolute', top: '24px', right: '24px', display: 'flex', alignItems: 'center', gap: '4px', color: stat.trendColor, fontSize: '0.85rem', fontWeight: 800 }}>
                            <stat.TrendIcon size={16} strokeWidth={3} />
                            {stat.trend}
                        </div>

                        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <stat.icon size={20} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '0.9rem', fontWeight: 600, marginBottom: '8px' }}>{stat.title}</div>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
                                <span style={{ fontSize: '2rem', fontWeight: 800, color: '#1e293b', lineHeight: 1 }}>{stat.value}</span>
                                <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>{stat.subtext}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filter Toolbars */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '4px', background: 'white', border: '1px solid #e2e8f0', padding: '6px', borderRadius: '12px' }}>
                    {['Daily', 'Weekly', 'Monthly'].map(period => (
                        <button 
                            key={period} onClick={() => setActivePeriod(period)}
                            style={{
                                padding: '8px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                                fontSize: '0.95rem', fontWeight: activePeriod === period ? 700 : 600,
                                background: activePeriod === period ? '#f8fafc' : 'transparent',
                                color: activePeriod === period ? '#1e293b' : '#64748b',
                                boxShadow: activePeriod === period ? '0 2px 4px rgba(0,0,0,0.05)' : 'none',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {period}
                        </button>
                    ))}
                </div>

                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {['Today', 'Last 7 Days', 'Last 30 Days', 'Custom'].map(span => (
                            <button 
                                key={span} onClick={() => setActiveTimespan(span)}
                                style={{
                                    padding: '8px 16px', borderRadius: '20px', border: '1px solid #e2e8f0', cursor: 'pointer',
                                    fontSize: '0.85rem', fontWeight: 700,
                                    background: activeTimespan === span ? '#1e293b' : 'white',
                                    color: activeTimespan === span ? 'white' : '#64748b',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                {span}
                            </button>
                        ))}
                    </div>
                    
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px',
                        background: 'white', border: '1px solid #e2e8f0', borderRadius: '12px',
                        color: '#1e293b', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer'
                    }}>
                        <Filter size={16} style={{ color: '#64748b' }} />
                        All Categories
                        <ChevronDown size={16} style={{ color: '#94a3b8' }} />
                    </button>
                </div>
            </div>

            {/* Main Content Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(600px, 2fr) 1fr', gap: '24px' }}>
                
                {/* Left Column wrapper */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    
                    {/* Inventory Turnover Chart */}
                    <div className="glass" style={{ padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>Inventory Turnover</h3>
                                <p style={{ color: '#94a3b8', fontSize: '0.95rem', margin: 0, fontWeight: 500 }}>Trends in stock additions vs consumption</p>
                            </div>
                            <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
                                <BarChart3 size={20} />
                            </div>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '24px', marginBottom: '40px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#10b981' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }}></div>
                                Stock Added
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 700, color: '#3b82f6' }}>
                                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#3b82f6' }}></div>
                                Stock Consumed
                            </div>
                        </div>

                        {/* Chart Container */}
                        <div style={{ position: 'relative', height: '350px', width: '100%', display: 'flex', paddingLeft: '40px' }}>
                            
                            {/* Y-Axis Guidelines */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                {[1000, 750, 500, 250, 0].map(val => (
                                    <div key={val} style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                        <span style={{ width: '30px', textAlign: 'right', marginRight: '16px', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>{val === 0 ? '0' : val}</span>
                                        <div style={{ flex: 1, borderTop: '2px dashed #f1f5f9' }}></div>
                                    </div>
                                ))}
                            </div>

                            {/* Bars Area */}
                            <div style={{ flex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingBottom: '30px', paddingRight: '20px', position: 'relative', zIndex: 10 }}>
                                {chartData.map((data, idx) => {
                                    const addHeight = (data.added / 1000) * 100;
                                    const conHeight = (data.consumed / 1000) * 100;

                                    return (
                                        <div key={idx} style={{ 
                                            display: 'flex', flexDirection: 'column', alignItems: 'center', width: '10%', position: 'relative',
                                            background: data.active ? '#f8fafc' : 'transparent', borderRadius: '12px', paddingTop: '20px'
                                        }}>
                                            {data.active && (
                                                <div style={{ position: 'absolute', top: '-10px', background: 'white', padding: '16px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', zIndex: 20, width: '160px', border: '1px solid #e2e8f0' }}>
                                                    <div style={{ fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>{data.day}</div>
                                                    <div style={{ color: '#10b981', fontSize: '0.85rem', fontWeight: 700, marginBottom: '4px' }}>Stock Added: {data.added}</div>
                                                    <div style={{ color: '#3b82f6', fontSize: '0.85rem', fontWeight: 700 }}>Stock Consumed: {data.consumed}</div>
                                                </div>
                                            )}
                                            <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-end', height: '280px', width: '100%', justifyContent: 'center' }}>
                                                <div style={{ position: 'relative', width: '24px', height: `${addHeight}%`, background: '#10b981', borderRadius: '6px 6px 0 0', display: 'flex', justifyContent: 'center' }}>
                                                    <span style={{ position: 'absolute', top: '-22px', fontSize: '0.75rem', fontWeight: 800, color: '#10b981' }}>{data.added}</span>
                                                </div>
                                                <div style={{ position: 'relative', width: '24px', height: `${conHeight}%`, background: '#3b82f6', borderRadius: '6px 6px 0 0', display: 'flex', justifyContent: 'center' }}>
                                                    <span style={{ position: 'absolute', top: '-22px', fontSize: '0.75rem', fontWeight: 800, color: '#3b82f6' }}>{data.consumed}</span>
                                                </div>
                                            </div>
                                            <div style={{ position: 'absolute', bottom: 0, fontWeight: 700, color: '#cbd5e1', fontSize: '0.85rem', transform: 'translateY(100%)', paddingTop: '10px' }}>
                                                {data.day}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    {/* By Category Doughnut Chart Card */}
                    <div style={{ display: 'flex', gap: '24px' }}>
                        <div className="glass" style={{ flex: '0 0 380px', padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
                                <div>
                                    <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: '#1e293b', marginBottom: '4px', margin: 0 }}>By Category</h3>
                                    <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: 0, fontWeight: 600 }}>Stock consumption distribution</p>
                                </div>
                                <div style={{ width: '36px', height: '36px', borderRadius: '12px', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', border: '1px solid #e2e8f0' }}>
                                    <PieChart size={18} />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '10px 0' }}>
                                <svg width="220" height="220" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)', overflow: 'visible' }}>
                                    {/* Green: Dairy */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="26" strokeDasharray="110 440" strokeDashoffset="0" />
                                    {/* Grey: Others */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="#94a3b8" strokeWidth="26" strokeDasharray="50 440" strokeDashoffset="-120" />
                                    {/* Purple: Beverages */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="#a855f7" strokeWidth="26" strokeDasharray="70 440" strokeDashoffset="-180" />
                                    {/* Orange: Meat */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="#f59e0b" strokeWidth="26" strokeDasharray="70 440" strokeDashoffset="-260" />
                                    {/* Blue: Vegetables */}
                                    <circle cx="100" cy="100" r="70" fill="none" stroke="#3b82f6" strokeWidth="26" strokeDasharray="90 440" strokeDashoffset="-340" />
                                </svg>
                            </div>

                            {/* Legend */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '32px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div> Dairy
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }}></div> Meat
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#94a3b8' }}></div> Others
                                    </div>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div> Vegetables
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', fontWeight: 800, color: '#1e293b' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div> Beverages
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Key Analytics Panel */}
                <div className="glass" style={{ padding: '32px', borderRadius: '20px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Key Analytics</h3>
                        <div style={{ width: '36px', height: '36px', borderRadius: '50%', border: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#10b981' }}>
                            <TrendingUp size={16} strokeWidth={3} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {analyticsData.map((item, idx) => (
                            <div key={idx} style={{ 
                                display: 'flex', gap: '16px', padding: '24px', borderRadius: '16px',
                                background: item.bg, border: `1px solid ${item.borderColor}` 
                            }}>
                                <div style={{ color: item.color, marginTop: '2px', flexShrink: 0 }}>
                                    <item.icon size={20} strokeWidth={2.5} />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                    <div style={{ fontWeight: 800, color: '#1e293b', fontSize: '0.95rem' }}>{item.title}</div>
                                    <p style={{ margin: 0, color: '#475569', fontSize: '0.85rem', lineHeight: 1.5 }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
            
        </div>
    );
};

export default ReportsView;
