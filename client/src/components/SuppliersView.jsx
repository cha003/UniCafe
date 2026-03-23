import React, { useState } from 'react';
import { Search, Plus, Building2, User, Mail, Phone, Edit, Package, Trash2, Users, UserCheck, UserX, ShoppingBag } from 'lucide-react';

const SuppliersView = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    const stats = [
        { label: 'TOTAL SUPPLIERS', value: '4', icon: Users, color: '#3b82f6', bg: '#eff6ff' },
        { label: 'ACTIVE SUPPLIERS', value: '3', icon: UserCheck, color: '#10b981', bg: '#f0fdf4' },
        { label: 'INACTIVE SUPPLIERS', value: '1', icon: UserX, color: '#ef4444', bg: '#fef2f2' },
        { label: 'TOTAL ORDERS', value: '79', icon: ShoppingBag, color: '#a855f7', bg: '#faf5ff' }
    ];

    const suppliers = [
        { id: 1, name: 'Global Roasters', status: 'ACTIVE', orders: 24, contact: 'John Doe', email: 'john@globalroasters.com', phone: '+1 234-567-8900' },
        { id: 2, name: 'Local Dairy Farm', status: 'ACTIVE', orders: 18, contact: 'Jane Smith', email: 'jane@localdairy.com', phone: '+1 234-567-8901' },
        { id: 3, name: 'Sweet Co.', status: 'INACTIVE', orders: 6, contact: 'Mike Johnson', email: 'mike@sweetco.com', phone: '+1 234-567-8902' },
        { id: 4, name: 'Millers Hub', status: 'ACTIVE', orders: 31, contact: 'Sarah Williams', email: 'sarah@millershub.com', phone: '+1 234-567-8903' }
    ];

    const filteredSuppliers = suppliers.filter(supplier => {
        if (activeFilter === 'All') return true;
        if (activeFilter === 'Active') return supplier.status === 'ACTIVE';
        if (activeFilter === 'Inactive') return supplier.status === 'INACTIVE';
        return true;
    });

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Supplier Management</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Manage cafeteria food and ingredient suppliers.</p>
                </div>
                <button style={{
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)', color: 'white', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', fontSize: '0.95rem', 
                    fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
                }}>
                    <Plus size={18} />
                    Add Supplier
                </button>
            </div>

            {/* Stats Row */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {stats.map((stat, idx) => (
                    <div key={idx} className="glass" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: '16px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: stat.bg, color: stat.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <stat.icon size={24} />
                        </div>
                        <div>
                            <div style={{ color: '#64748b', fontSize: '0.75rem', fontWeight: 800, letterSpacing: '0.05em', marginBottom: '4px' }}>{stat.label}</div>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Toolbar */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginTop: '8px' }}>
                <div style={{ position: 'relative', width: '350px' }}>
                    <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                    <input 
                        type="text" 
                        placeholder="Search suppliers..." 
                        style={{ 
                            width: '100%', padding: '10px 16px 10px 44px',
                            borderRadius: '12px', border: '1px solid #e2e8f0', 
                            background: '#ffffff', color: '#1e293b', fontSize: '0.95rem', outline: 'none'
                        }}
                    />
                </div>
                <div style={{ display: 'flex', gap: '4px', background: 'white', border: '1px solid #e2e8f0', padding: '4px', borderRadius: '12px' }}>
                    {['All', 'Active', 'Inactive'].map(filter => (
                        <button 
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            style={{
                                padding: '8px 24px',
                                background: activeFilter === filter ? 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)' : 'transparent',
                                color: activeFilter === filter ? 'white' : '#64748b',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.9rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.2s ease'
                            }}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
            </div>

            {/* Suppliers Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '24px', marginTop: '8px' }}>
                {filteredSuppliers.map(supplier => (
                    <div key={supplier.id} className="glass" style={{ padding: '24px', borderRadius: '16px', border: '1px solid #e2e8f0', background: 'white', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        
                        {/* Card Header */}
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#f0fdf4', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                <Building2 size={24} />
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '6px' }}>{supplier.name}</h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '0.75rem', fontWeight: 600 }}>
                                    <span style={{ 
                                        padding: '4px 8px', borderRadius: '6px', 
                                        background: supplier.status === 'ACTIVE' ? '#f0fdf4' : '#f1f5f9', 
                                        color: supplier.status === 'ACTIVE' ? '#10b981' : '#64748b',
                                        display: 'flex', alignItems: 'center', gap: '4px'
                                    }}>
                                        <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'currentColor' }}></div>
                                        {supplier.status}
                                    </span>
                                    <span style={{ color: '#94a3b8' }}>{supplier.orders} orders</span>
                                </div>
                            </div>
                        </div>

                        {/* Contact Info */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '4px' }}>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 800 }}>
                                    {supplier.contact.charAt(0)}
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '2px', letterSpacing: '0.05em' }}>CONTACT</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{supplier.contact}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Mail size={14} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '2px', letterSpacing: '0.05em' }}>EMAIL</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#3b82f6', cursor: 'pointer' }}>{supplier.email}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                                <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f1f5f9', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Phone size={14} />
                                </div>
                                <div>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#94a3b8', marginBottom: '2px', letterSpacing: '0.05em' }}>PHONE</div>
                                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e293b' }}>{supplier.phone}</div>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: 'auto', paddingTop: '8px' }}>
                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#eff6ff', color: '#3b82f6', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                                <Edit size={16} /> Edit
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#f0fdf4', color: '#10b981', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                                <Package size={16} /> Orders
                            </button>
                            <button style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', padding: '10px', background: '#fef2f2', color: '#ef4444', border: 'none', borderRadius: '8px', fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer' }}>
                                <Trash2 size={16} /> Delete
                            </button>
                        </div>

                    </div>
                ))}
            </div>

        </div>
    );
};

export default SuppliersView;
