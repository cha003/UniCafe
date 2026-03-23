import React, { useState } from 'react';
import { Search, Filter, Plus, Edit2, RotateCw, Trash2, AlertTriangle, ChevronLeft, ChevronRight, X } from 'lucide-react';

const InventoryView = () => {
    const [activeCategory, setActiveCategory] = useState('All');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ name: '', category: 'Beverage', qty: '', unit: 'kg', expiry: '', supplier: '' });
    
    const categories = ['All', 'Beverage', 'Dairy', 'Pantry', 'Meat', 'Vegetables'];
    
    // Using mapping to determine colors dynamically upon creation
    const categoryStyles = {
        'Beverage': { bg: '#eff6ff', text: '#3b82f6' },
        'Dairy': { bg: '#faf5ff', text: '#a855f7' },
        'Pantry': { bg: '#fff7ed', text: '#f97316' },
        'Meat': { bg: '#fef2f2', text: '#ef4444' },
        'Vegetables': { bg: '#f0fdf4', text: '#10b981' }
    };

    const [inventoryData, setInventoryData] = useState([
        { id: 1, name: 'Premium Coffee Beans', status: 'Good', category: 'Beverage', catColor: categoryStyles['Beverage'].bg, catText: categoryStyles['Beverage'].text, qty: 15, unit: 'kg', lowStock: true, expiry: 'May 22, 2026', supplier: 'Global Roasters' },
        { id: 2, name: 'Whole Milk', status: 'Good', category: 'Dairy', catColor: categoryStyles['Dairy'].bg, catText: categoryStyles['Dairy'].text, qty: 45, unit: 'L', lowStock: false, expiry: 'Mar 28, 2026', supplier: 'Local Dairy Farm' },
        { id: 3, name: 'Sugar', status: 'Good', category: 'Pantry', catColor: categoryStyles['Pantry'].bg, catText: categoryStyles['Pantry'].text, qty: 50, unit: 'kg', lowStock: false, expiry: 'Mar 23, 2027', supplier: 'Sweet Co.' },
        { id: 4, name: 'Flour', status: 'Good', category: 'Pantry', catColor: categoryStyles['Pantry'].bg, catText: categoryStyles['Pantry'].text, qty: 8, unit: 'kg', lowStock: true, expiry: 'Sep 19, 2026', supplier: 'Millers Hub' },
        { id: 5, name: 'Butter', status: 'Good', category: 'Dairy', catColor: categoryStyles['Dairy'].bg, catText: categoryStyles['Dairy'].text, qty: 5, unit: 'kg', lowStock: true, expiry: 'Apr 12, 2026', supplier: 'Local Dairy Farm' }
    ]);

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleAddItem = (e) => {
        e.preventDefault();
        const style = categoryStyles[formData.category] || { bg: '#f1f5f9', text: '#64748b' };
        
        const newItem = {
            id: Date.now(),
            name: formData.name,
            status: 'Good',
            category: formData.category,
            catColor: style.bg,
            catText: style.text,
            qty: Number(formData.qty),
            unit: formData.unit,
            lowStock: Number(formData.qty) <= 10,
            expiry: formData.expiry || 'N/A',
            supplier: formData.supplier || 'Unassigned'
        };

        setInventoryData([newItem, ...inventoryData]);
        setIsModalOpen(false);
        setFormData({ name: '', category: 'Beverage', qty: '', unit: 'kg', expiry: '', supplier: '' });
    };

    const filteredData = inventoryData.filter(item => activeCategory === 'All' || item.category === activeCategory);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Header Section */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Inventory Management</h2>
                    <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>Add, update, and track all cafeteria ingredients.</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} style={{
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)', color: 'white', border: 'none', 
                    padding: '10px 20px', borderRadius: '8px', fontSize: '0.95rem', 
                    fontWeight: 600, cursor: 'pointer', boxShadow: '0 4px 12px rgba(234,88,12,0.2)'
                }}>
                    <Plus size={18} />
                    Add New Item
                </button>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {categories.map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        style={{
                            padding: '8px 20px',
                            background: activeCategory === cat ? 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)' : 'transparent',
                            color: activeCategory === cat ? 'white' : '#64748b',
                            border: activeCategory === cat ? 'none' : '1px solid #e2e8f0',
                            borderRadius: '99px',
                            fontSize: '0.9rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            transition: 'all 0.2s ease'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* Main Table Container */}
            <div className="glass" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column', border: '1px solid #e2e8f0', borderRadius: '16px', background: 'white' }}>
                
                {/* Table Toolbar */}
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #f1f5f9' }}>
                    <div style={{ position: 'relative', width: '350px' }}>
                        <Search size={18} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                        <input 
                            type="text" 
                            placeholder="Search items, categories, suppliers..." 
                            style={{ 
                                width: '100%', padding: '10px 16px 10px 44px',
                                borderRadius: '8px', border: '1px solid #e2e8f0', 
                                background: '#ffffff', color: '#1e293b', fontSize: '0.9rem', outline: 'none'
                            }}
                        />
                    </div>
                    <button style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        background: 'transparent', border: '1px solid #e2e8f0', 
                        padding: '10px 16px', borderRadius: '8px', color: '#475569',
                        fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer'
                    }}>
                        <Filter size={16} />
                        Filters
                        <ChevronRight size={14} style={{ transform: 'rotate(90deg)' }} />
                    </button>
                </div>

                {/* Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ color: '#475569', fontSize: '0.875rem', fontWeight: 700, borderBottom: '1px solid #e2e8f0' }}>
                                <th style={{ padding: '20px', width: '25%' }}>Item Name</th>
                                <th style={{ padding: '20px', width: '15%' }}>Category</th>
                                <th style={{ padding: '20px', width: '15%' }}>Quantity</th>
                                <th style={{ padding: '20px', width: '15%' }}>Expiry Date</th>
                                <th style={{ padding: '20px', width: '20%' }}>Supplier</th>
                                <th style={{ padding: '20px', width: '10%', textAlign: 'center' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item, idx) => (
                                <tr key={item.id} style={{ borderBottom: idx < filteredData.length - 1 ? '1px solid #f1f5f9' : 'none' }}>
                                    
                                    {/* Item Name & Status */}
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ color: '#1e293b', fontWeight: 700, marginBottom: '6px' }}>{item.name}</div>
                                        <span style={{ 
                                            display: 'inline-flex', alignItems: 'center', gap: '4px',
                                            padding: '4px 8px', background: '#f0fdf4', color: '#10b981', 
                                            borderRadius: '99px', fontSize: '0.7rem', fontWeight: 800
                                        }}>
                                            <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }}></div>
                                            {item.status}
                                        </span>
                                    </td>
                                    
                                    {/* Category Pill */}
                                    <td style={{ padding: '20px' }}>
                                        <span style={{ 
                                            padding: '6px 12px', background: item.catColor, color: item.catText, 
                                            borderRadius: '99px', fontSize: '0.75rem', fontWeight: 800
                                        }}>
                                            {item.category}
                                        </span>
                                    </td>

                                    {/* Quantity & Low Stock Warning */}
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ 
                                            color: item.lowStock ? '#d97706' : '#1e293b', 
                                            fontWeight: 800, fontSize: '0.95rem', marginBottom: item.lowStock ? '6px' : '0' 
                                        }}>
                                            {item.qty} <span style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 600 }}>{item.unit}</span>
                                        </div>
                                        {item.lowStock && (
                                            <span style={{ 
                                                display: 'inline-flex', alignItems: 'center', gap: '4px',
                                                padding: '4px 8px', border: '1px solid #fde68a', background: '#fffbeb', 
                                                color: '#d97706', borderRadius: '4px', fontSize: '0.65rem', fontWeight: 800
                                            }}>
                                                <AlertTriangle size={10} strokeWidth={3} />
                                                LOW STOCK
                                            </span>
                                        )}
                                    </td>

                                    {/* Expiry Date */}
                                    <td style={{ padding: '20px', color: '#475569', fontSize: '0.9rem', fontWeight: 600 }}>
                                        {item.expiry}
                                    </td>

                                    {/* Supplier */}
                                    <td style={{ padding: '20px', color: '#475569', fontSize: '0.9rem' }}>
                                        {item.supplier}
                                    </td>

                                    {/* Actions */}
                                    <td style={{ padding: '20px' }}>
                                        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', color: '#cbd5e1' }}>
                                            <Edit2 size={16} style={{ cursor: 'pointer' }} onMouseOver={e=>e.currentTarget.style.color='#3b82f6'} onMouseOut={e=>e.currentTarget.style.color='#cbd5e1'} />
                                            <Trash2 size={16} style={{ cursor: 'pointer' }} onMouseOver={e=>e.currentTarget.style.color='#ef4444'} onMouseOut={e=>e.currentTarget.style.color='#cbd5e1'} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9' }}>
                    <div style={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                        Showing <span style={{ fontWeight: 800, color: '#1e293b' }}>1-5</span> of <span style={{ fontWeight: 800, color: '#1e293b' }}>8</span> items
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', color: '#94a3b8' }}>
                            <ChevronLeft size={16} />
                        </button>
                        <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)', border: 'none', borderRadius: '6px', cursor: 'pointer', color: 'white', fontWeight: 700, fontSize: '0.85rem' }}>
                            1
                        </button>
                        <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: 'none', borderRadius: '6px', cursor: 'pointer', color: '#475569', fontWeight: 600, fontSize: '0.85rem' }}>
                            2
                        </button>
                        <button style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'transparent', border: '1px solid #e2e8f0', borderRadius: '6px', cursor: 'pointer', color: '#64748b' }}>
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>

            {/* Add New Item Modal */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                    <div style={{ background: 'white', padding: '32px', borderRadius: '16px', width: '500px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Add New Item</h3>
                            <button onClick={() => setIsModalOpen(false)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#64748b' }}><X size={20} /></button>
                        </div>

                        <form onSubmit={handleAddItem} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Item Name</label>
                                <input required type="text" name="name" value={formData.name} onChange={handleFormChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b' }} placeholder="e.g. Vanilla Extract" />
                            </div>
                            
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Category</label>
                                    <select name="category" value={formData.category} onChange={handleFormChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b', background: 'white' }}>
                                        {categories.filter(c => c !== 'All').map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <div style={{ flex: 2 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Quantity</label>
                                        <input required type="number" name="qty" value={formData.qty} onChange={handleFormChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b' }} placeholder="0" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Unit</label>
                                        <select name="unit" value={formData.unit} onChange={handleFormChange} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b', background: 'white' }}>
                                            <option value="kg">kg</option>
                                            <option value="L">L</option>
                                            <option value="pcs">pcs</option>
                                            <option value="boxes">boxes</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Expiry Date</label>
                                    <input type="date" name="expiry" value={formData.expiry} onChange={handleFormChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '8px', fontSize: '0.85rem', fontWeight: 600, color: '#475569' }}>Supplier</label>
                                    <input type="text" name="supplier" value={formData.supplier} onChange={handleFormChange} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', color: '#1e293b' }} placeholder="e.g. Global Roasters" />
                                </div>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 20px', borderRadius: '8px', border: '1px solid #e2e8f0', background: 'transparent', color: '#64748b', fontWeight: 600, cursor: 'pointer' }}>Cancel</button>
                                <button type="submit" style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', background: 'linear-gradient(135deg, #FFB800 0%, #ea580c 100%)', color: 'white', fontWeight: 600, cursor: 'pointer' }}>Save Item</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InventoryView;
