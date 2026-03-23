import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Package, Clock, CheckCircle, RefreshCcw, AlertCircle } from 'lucide-react';
import axios from 'axios';

const ProfilePage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [studentId, setStudentId] = useState(localStorage.getItem('studentId') || '');
    const [isEditingId, setIsEditingId] = useState(false);
    const [tempId, setTempId] = useState(studentId);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!studentId) {
                setOrders([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response = await axios.get(`/api/orders/${studentId}`);
                setOrders(response.data);
            } catch (err) {
                console.error("Error fetching history:", err);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [studentId]);

    const handleSaveId = () => {
        setStudentId(tempId);
        localStorage.setItem('studentId', tempId);
        setIsEditingId(false);
    };

    const mockOrders = [
        {
            _id: 'm1',
            createdAt: new Date(Date.now() - 3600000),
            totalAmount: 400,
            status: 'ready',
            items: [{ name: 'Chicken Kottu', quantity: 1, price: 400 }]
        },
        {
            _id: 'm2',
            createdAt: new Date(Date.now() - 86400000),
            totalAmount: 150,
            status: 'picked-up',
            items: [{ name: 'Kiribath with Lunu Miris', quantity: 1, price: 150 }]
        }
    ];

    const getStatusStyle = (status) => {
        switch (status) {
            case 'pending': return { color: '#b45309', bg: '#fef3c7', icon: <Clock size={16} /> };
            case 'preparing': return { color: '#ea580c', bg: '#ffedd5', icon: <RefreshCcw size={16} className="animate-spin" /> };
            case 'ready': return { color: '#047857', bg: '#d1fae5', icon: <CheckCircle size={16} /> };
            case 'picked-up': return { color: '#475569', bg: '#f1f5f9', icon: <Package size={16} /> };
            default: return { color: '#b91c1c', bg: '#fee2e2', icon: <AlertCircle size={16} /> };
        }
    };

    return (
        <div style={{ padding: '2rem 5%', minHeight: '100vh' }}>
            {/* Profile Header */}
            <div className="glass" style={{ padding: '3rem', marginBottom: '3rem', display: 'flex', alignItems: 'center', gap: '2rem' }}>
                <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, #a855f7 100%)', width: '100px', height: '100px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                    <User size={48} color="white" />
                </div>
                <div>
                    <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>{JSON.parse(localStorage.getItem('user'))?.name || "Student"} <span className="gradient-text">Profile</span></h1>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Student ID: </p>
                        {isEditingId ? (
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    value={tempId}
                                    onChange={(e) => setTempId(e.target.value)}
                                    className="glass"
                                    style={{ padding: '0.25rem 0.5rem', background: 'var(--bg-page)', color: 'var(--text-main)', border: '1px solid var(--primary)' }}
                                />
                                <button className="btn-premium" style={{ padding: '0.25rem 0.75rem', fontSize: '0.8rem' }} onClick={handleSaveId}>Save</button>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>{studentId || "Not Set"}</span>
                                <button
                                    onClick={() => { setTempId(studentId); setIsEditingId(true); }}
                                    style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                                >
                                    Change
                                </button>
                            </div>
                        )}
                    </div>
                    <p style={{ color: 'var(--text-secondary)' }}>Department of Computer Science & Engineering</p>
                </div>
            </div>

            {/* Order History */}
            <h2 style={{ fontSize: '1.75rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Order <span className="gradient-text">History</span></h2>

            {loading ? (
                <div style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '3rem' }}>Loading your orders...</div>
            ) : (
                <div style={{ display: 'grid', gap: '1.5rem' }}>
                    {orders.map(order => {
                        const style = getStatusStyle(order.status);
                        return (
                            <motion.div
                                key={order._id}
                                layout
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="glass"
                                style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                            >
                                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                                    <div style={{ color: style.color, background: style.bg, padding: '1rem', borderRadius: '12px' }}>
                                        {style.icon}
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.25rem' }}>
                                            {new Date(order.createdAt).toLocaleDateString()} {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </div>
                                        <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                                            {order.items.map(i => `${i.quantity}x ${i.name}`).join(', ')}
                                        </h3>
                                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                                            <span style={{ fontWeight: 800 }}>LKR {order.totalAmount}</span>
                                            <span style={{ color: style.color, background: style.bg, padding: '2px 10px', borderRadius: '99px', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>
                                                {order.status}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <button className="glass" style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem', cursor: 'pointer', borderColor: style.color + '40', color: style.color, background: 'var(--bg-card)' }}>
                                    View Details
                                </button>
                            </motion.div>
                        );
                    })}

                    {orders.length === 0 && (
                        <div className="glass" style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
                            <Package size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                            <p>No orders found. Time to grab some food!</p>
                            <button className="btn-premium" style={{ marginTop: '1.5rem' }} onClick={() => window.location.href = '/order'}>
                                Go to Menu
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;
