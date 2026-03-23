import React, { useState, useEffect } from 'react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    AreaChart, Area, PieChart, Pie, Cell
} from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Save,
    ShoppingBag, DollarSign, Package, TrendingUp, Clock,
    Award, BarChart3, Sparkles, Utensils, ClipboardList,
    MessageSquare, Users as UsersIcon, Settings as SettingsIcon,
    AlertTriangle, Calendar, FileText, Filter, Star, Smile, AlertCircle, ThumbsUp, UserCircle, Search,
    Zap, ShieldAlert, LogOut, Download, Activity, ExternalLink,
    Store, Bell, MapPin, Grid, BarChart2, Briefcase, Plus, X, AlignLeft,
    Monitor, CheckSquare, Layers, Lock, CreditCard, Camera, Info, Type, Mail, Link as LinkIcon, Edit2, Trash2, StopCircle, CornerUpRight, Play, ArrowLeft
} from 'lucide-react';

import { Link } from 'react-router-dom';
import axios from 'axios';
import AdminSidebar from '../components/AdminSidebar';
import StatsCard from '../components/StatsCard';
import PopularItems from '../components/PopularItems';
import AIAssistant from '../components/AIAssistant';

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [stats, setStats] = useState({ totalOrders: 0, totalRevenue: 0, totalMenuItems: 0, todayOrders: 0, analytics: { popularItems: [], weeklyTrends: [], avgOrderValue: 0 } });
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [users, setUsers] = useState([]);
    const [contactMessages, setContactMessages] = useState([]);
    const [showUserModal, setShowUserModal] = useState(false);
    const [userFormData, setUserFormData] = useState({
        name: '',
        studentId: '',
        password: '',
        role: 'student'
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [showSuccess, setShowSuccess] = useState('');
    const [selectedReportDate, setSelectedReportDate] = useState(new Date().toISOString().split('T')[0]);
    const [showDailyReport, setShowDailyReport] = useState(false);

    // Inventory State
    const [inventoryTab, setInventoryTab] = useState('stock'); // stock, suppliers, reports
    const [showStockModal, setShowStockModal] = useState(false);
    const [showSupplierModal, setShowSupplierModal] = useState(false);
    const [formData, setFormData] = useState({
        name: { en: '', si: '', ta: '' },
        description: { en: '', si: '', ta: '' },
        price: '',
        category: 'Breakfast',
        image: '',
        isVeg: false,
        availability: true
    });

    const categories = ['Breakfast', 'Lunch', 'Dinner', 'Snacks', 'Beverages'];
    const statuses = ['pending', 'preparing', 'ready', 'picked-up'];

    useEffect(() => {
        fetchStats();
        fetchMenuItems();
        fetchOrders();
        fetchUsers();
        fetchContactMessages();

        // Set up real-time polling for dashboard cards
        const intervalId = setInterval(() => {
            fetchStats();
            fetchUsers();
            fetchOrders();
        }, 5000); // Refresh every 5 seconds

        return () => clearInterval(intervalId);
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get('/api/admin/stats');
            setStats(response.data);
        } catch (err) {
            console.error('Error fetching stats:', err);
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await axios.get('/api/menu/all');
            setMenuItems(response.data);
        } catch (err) {
            console.error('Error fetching menu:', err);
        }
    };

    const fetchOrders = async () => {
        try {
            const response = await axios.get('/api/orders/all');
            setOrders(response.data);
        } catch (err) {
            console.error('Error fetching orders:', err);
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await axios.get('/api/users');
            setUsers(response.data);
        } catch (err) {
            console.error('Error fetching users:', err);
        }
    };

    const fetchContactMessages = async () => {
        try {
            const response = await axios.get('/api/contact');
            setContactMessages(response.data);
        } catch (err) {
            console.error('Error fetching messages:', err);
        }
    };

    const handleMarkAsRead = async (id) => {
        try {
            await axios.put(`/api/contact/${id}/read`);
            fetchContactMessages();
        } catch (err) {
            console.error('Error marking as read:', err);
        }
    };

    const handleInputChange = (field, lang, value) => {
        if (lang) {
            setFormData({ ...formData, [field]: { ...formData[field], [lang]: value } });
        } else {
            setFormData({ ...formData, [field]: value });
        }
    };

    const resetForm = () => {
        setFormData({
            name: { en: '', si: '', ta: '' },
            description: { en: '', si: '', ta: '' },
            price: '',
            category: 'Breakfast',
            image: '',
            isVeg: false,
            availability: true
        });
        setUserFormData({
            name: '',
            studentId: '',
            password: '',
            role: 'student'
        });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/menu', formData);
            setShowSuccess('Item added successfully!');
            setShowAddModal(false);
            resetForm();
            fetchMenuItems();
            fetchStats();
        } catch (err) {
            console.error('Error adding item:', err);
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/users', userFormData);
            setShowSuccess('User added successfully!');
            fetchUsers();
            setShowUserModal(false);
            resetForm();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert(err.response?.data?.message || 'Failed to add user');
        }
    };

    const handleDeleteUser = async (userId) => {
        if (!window.confirm('Are you sure you want to delete this user?')) return;
        try {
            await axios.delete(`/api/users/${userId}`);
            setShowSuccess('User deleted successfully!');
            fetchUsers();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to delete user');
        }
    };

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axios.put(`/api/users/${userId}/role`, { role: newRole });
            setShowSuccess('User role updated!');
            fetchUsers();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to update user role');
        }
    };

    const handleEditItem = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/api/menu/${editingItem._id}`, formData);
            setShowSuccess('Item updated successfully!');
            setShowEditModal(false);
            setEditingItem(null);
            resetForm();
            fetchMenuItems();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to update item');
        }
    };

    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            await axios.delete(`/api/menu/${id}`);
            setShowSuccess('Item deleted successfully!');
            fetchMenuItems();
            fetchStats();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to delete item');
        }
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price,
            category: item.category,
            image: item.image,
            isVeg: item.isVeg,
            availability: item.availability
        });
        setShowEditModal(true);
    };

    const handleUpdateOrderStatus = async (orderId, newStatus) => {
        try {
            await axios.put(`/api/orders/${orderId}/status`, { status: newStatus });
            setShowSuccess('Order status updated!');
            fetchOrders();
            fetchStats();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to update order status');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (!window.confirm('Are you sure you want to cancel/delete this order?')) return;
        try {
            await axios.delete(`/api/orders/${orderId}`);
            setShowSuccess('Order deleted successfully!');
            fetchOrders();
            fetchStats();
            setTimeout(() => setShowSuccess(''), 3000);
        } catch (err) {
            alert('Failed to delete order');
        }
    };

    const StatCard = ({ icon: Icon, title, value, color }) => (
        <div className="glass" style={{ padding: '1.5rem', borderRadius: '16px', flex: 1 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ color: '#94a3b8', fontSize: '0.875rem', marginBottom: '0.5rem' }}>{title}</div>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{value}</div>
                </div>
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: `${color}20` }}>
                    <Icon size={24} style={{ color }} />
                </div>
            </div>
        </div>
    );

    const FormModal = ({ show, onClose, onSubmit, title, isEdit }) => (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1001 }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-page)', borderRadius: '24px', padding: '2.5rem', zIndex: 1002, border: '1px solid var(--primary)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{title}</h2>
                            <X onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
                        </div>
                        <form onSubmit={onSubmit}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Name (English)</label>
                                <input required value={formData.name.en} onChange={(e) => handleInputChange('name', 'en', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Sinhala</label>
                                    <input required value={formData.name.si} onChange={(e) => handleInputChange('name', 'si', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Tamil</label>
                                    <input required value={formData.name.ta} onChange={(e) => handleInputChange('name', 'ta', e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Description (English)</label>
                                <textarea value={formData.description.en} onChange={(e) => handleInputChange('description', 'en', e.target.value)} rows="2" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)', resize: 'none' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Price (LKR)</label>
                                    <input required type="number" value={formData.price} onChange={(e) => handleInputChange('price', null, e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                                    <select value={formData.category} onChange={(e) => handleInputChange('category', null, e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Image URL</label>
                                <input type="text" value={formData.image} onChange={(e) => handleInputChange('image', null, e.target.value)} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                            </div>
                            <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem' }}>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 600 }}>
                                    <input type="checkbox" checked={formData.isVeg} onChange={(e) => handleInputChange('isVeg', null, e.target.checked)} />
                                    Vegetarian
                                </label>
                                <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', color: 'var(--text-main)', fontWeight: 600 }}>
                                    <input type="checkbox" checked={formData.availability} onChange={(e) => handleInputChange('availability', null, e.target.checked)} />
                                    Available
                                </label>
                            </div>
                            <button type="submit" className="btn-premium" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <Save size={20} /> {isEdit ? 'Update Item' : 'Add Item'}
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    const StockFormModal = ({ show, onClose, title }) => (
        <AnimatePresence>
            {show && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1001 }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '700px', maxHeight: '90vh', overflowY: 'auto', background: 'var(--bg-page)', borderRadius: '24px', padding: '2.5rem', zIndex: 1002, border: '1px solid var(--primary)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>{title}</h2>
                            <X onClick={onClose} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
                        </div>
                        <form onSubmit={(e) => { e.preventDefault(); onClose(); setShowSuccess('Stock updated successfully!'); setTimeout(() => setShowSuccess(''), 3000); }}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Item Name</label>
                                <input required placeholder="e.g. Basmati Rice" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Category</label>
                                    <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                        <option>Vegetables</option>
                                        <option>Meat</option>
                                        <option>Dairy</option>
                                        <option>Dry Goods</option>
                                        <option>Condiments</option>
                                        <option>Beverages</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Supplier</label>
                                    <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                        <option>Lanka Foods</option>
                                        <option>Fresh Meats Co</option>
                                        <option>Agro Distributors</option>
                                        <option>Daily Farms</option>
                                    </select>
                                </div>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Quantity</label>
                                    <input required type="number" placeholder="0" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Unit</label>
                                    <select style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                        <option>kg</option>
                                        <option>g</option>
                                        <option>liters</option>
                                        <option>ml</option>
                                        <option>pieces</option>
                                        <option>boxes</option>
                                    </select>
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Min Alert Threshold</label>
                                    <input required type="number" placeholder="e.g. 5" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                                </div>
                            </div>
                            <div style={{ marginBottom: '2.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Expiry Date</label>
                                <input required type="date" style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} />
                            </div>
                            <button type="submit" className="btn-premium" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <Save size={20} /> Save Stock Item
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    const UserFormModal = () => (
        <AnimatePresence>
            {showUserModal && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => { setShowUserModal(false); resetForm(); }}
                        style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', zIndex: 1001 }}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '500px', background: 'var(--bg-page)', borderRadius: '24px', padding: '2.5rem', zIndex: 1002, border: '1px solid var(--primary)', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, color: 'var(--text-main)' }}>Add New User</h2>
                            <X onClick={() => { setShowUserModal(false); resetForm(); }} style={{ cursor: 'pointer', color: 'var(--text-main)' }} />
                        </div>
                        <form onSubmit={handleAddUser}>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Full Name</label>
                                <input required value={userFormData.name} onChange={(e) => setUserFormData({ ...userFormData, name: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} placeholder="e.g. John Doe" />
                            </div>
                            <div style={{ marginBottom: '1.5rem' }}>
                                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Student/Staff ID</label>
                                <input required value={userFormData.studentId} onChange={(e) => setUserFormData({ ...userFormData, studentId: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} placeholder="e.g. IT2100000" />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '2rem' }}>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Password</label>
                                    <input required type="password" value={userFormData.password} onChange={(e) => setUserFormData({ ...userFormData, password: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }} placeholder="********" />
                                </div>
                                <div>
                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 600, color: 'var(--text-secondary)' }}>Role</label>
                                    <select value={userFormData.role} onChange={(e) => setUserFormData({ ...userFormData, role: e.target.value })} style={{ width: '100%', padding: '12px 16px', borderRadius: '12px', background: 'white', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}>
                                        <option value="student">Student</option>
                                        <option value="staff">Staff</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </div>
                            </div>
                            <button type="submit" className="btn-premium" style={{ width: '100%', padding: '1rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}>
                                <Save size={20} /> Create User
                            </button>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );


    const renderMenuManager = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Manage Menu <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>({menuItems.length} items)</span></h3>
                <button onClick={() => { resetForm(); setShowAddModal(true); }} className="btn-premium" style={{ padding: '12px 24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Plus size={20} /> Add New Item
                </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
                {menuItems.map(item => (
                    <div key={item._id} style={{ padding: '24px', borderRadius: '24px', display: 'flex', gap: '20px', alignItems: 'center', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <div style={{ position: 'relative' }}>
                            {item.image ? (
                                <img src={item.image} alt={item.name.en} style={{ width: '90px', height: '90px', borderRadius: '16px', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '90px', height: '90px', borderRadius: '16px', background: 'rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Utensils size={32} color="rgba(255,255,255,0.1)" />
                                </div>
                            )}
                            <div style={{ position: 'absolute', top: '-5px', right: '-5px', padding: '4px 8px', borderRadius: '6px', background: item.availability ? '#10b981' : '#ef4444', fontSize: '0.6rem', fontWeight: 900, color: 'white' }}>
                                {item.availability ? 'LIVE' : 'OFF'}
                            </div>
                        </div>
                        <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '4px' }}>{item.name.en}</h4>
                            <div style={{ color: 'var(--primary)', fontWeight: 700, marginBottom: '8px' }}>LKR {item.price}</div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', background: item.isVeg ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', color: item.isVeg ? '#10b981' : '#ef4444', fontWeight: 700 }}>
                                    {item.isVeg ? 'VEG' : 'NON-VEG'}
                                </span>
                                <span style={{ fontSize: '0.7rem', padding: '4px 10px', borderRadius: '6px', background: 'rgba(255,255,255,0.05)', color: '#94a3b8', fontWeight: 700 }}>
                                    {item.category}
                                </span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <button onClick={() => openEditModal(item)} className="glass" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                <Edit2 size={18} />
                            </button>
                            <button onClick={() => handleDeleteItem(item._id)} className="glass" style={{ width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                <Trash2 size={18} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderOrderManager = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Order Queue <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>({orders.length} active)</span></h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                    {statuses.map(status => (
                        <div key={status} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                            <div style={{
                                width: '8px',
                                height: '8px',
                                borderRadius: '50%',
                                background: status === 'ready' ? '#10b981' :
                                    status === 'preparing' ? '#f59e0b' :
                                        status === 'pending' ? '#fbbf24' : '#64748b'
                            }} />
                            {status.toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>

            <div style={{ padding: '32px', borderRadius: '24px', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.02)', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 12px' }}>
                    <thead>
                        <tr style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600 }}>
                            <th style={{ padding: '0 16px', textAlign: 'left' }}>Que #</th>
                            <th style={{ padding: '0 16px', textAlign: 'left' }}>Student Details</th>
                            <th style={{ padding: '0 16px', textAlign: 'left' }}>Order Content</th>
                            <th style={{ padding: '0 16px', textAlign: 'left' }}>Current Status</th>
                            <th style={{ padding: '0 16px', textAlign: 'right' }}>Update</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id} style={{ background: '#f8fafc', borderBottom: '4px solid white' }}>
                                <td style={{ padding: '20px 16px', borderTopLeftRadius: '16px', borderBottomLeftRadius: '16px' }}>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}>#{order.queuePosition}</div>
                                </td>
                                <td style={{ padding: '20px 16px' }}>
                                    <div style={{ fontWeight: 700 }}>{order.studentId}</div>
                                    <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Placed at {new Date(order.createdAt).toLocaleTimeString()}</div>
                                </td>
                                <td style={{ padding: '20px 16px' }}>
                                    <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap' }}>
                                        {order.items?.map((item, i) => (
                                            <span key={i} style={{ fontSize: '0.7rem', padding: '4px 8px', borderRadius: '6px', background: '#e2e8f0', color: '#1e293b', fontWeight: 600 }}>
                                                {item.quantity}x {item.name?.en}
                                            </span>
                                        ))}
                                    </div>
                                    <div style={{ fontWeight: 800, marginTop: '8px', fontSize: '0.875rem' }}>LKR {order.totalAmount}</div>
                                </td>
                                <td style={{ padding: '20px 16px' }}>
                                    <span style={{
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '0.75rem',
                                        fontWeight: 700,
                                        background: order.status === 'ready' ? 'rgba(16, 185, 129, 0.1)' :
                                            order.status === 'preparing' ? 'rgba(245, 158, 11, 0.1)' :
                                                order.status === 'pending' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(100, 116, 139, 0.1)',
                                        color: order.status === 'ready' ? '#10b981' :
                                            order.status === 'preparing' ? '#f59e0b' :
                                                order.status === 'pending' ? '#fbbf24' : '#64748b',
                                        display: 'inline-flex',
                                        alignItems: 'center',
                                        gap: '6px'
                                    }}>
                                        <Clock size={12} />
                                        {order.status.toUpperCase()}
                                    </span>
                                </td>
                                <td style={{ padding: '20px 16px', textAlign: 'right', borderTopRightRadius: '16px', borderBottomRightRadius: '16px' }}>
                                    <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', alignItems: 'center' }}>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleUpdateOrderStatus(order._id, e.target.value)}
                                            style={{
                                                padding: '10px',
                                                borderRadius: '10px',
                                                background: '#f8fafc',
                                                border: '1px solid #cbd5e1',
                                                color: '#1f2937',
                                                fontSize: '0.875rem',
                                                fontWeight: 600,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {statuses.map(status => <option key={status} value={status}>{status}</option>)}
                                        </select>
                                        <button
                                            onClick={() => handleDeleteOrder(order._id)}
                                            className="glass"
                                            style={{ padding: '10px', borderRadius: '10px', background: 'white', color: '#ef4444', border: '1px solid #fca5a5', cursor: 'pointer' }}
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );





    const renderUserManager = () => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>User Management <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>({users.length} users)</span></h3>
                <button onClick={() => setShowUserModal(true)} className="btn-premium" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                    <Plus size={18} /> Add New User
                </button>
            </div>

            <div style={{ padding: '32px', borderRadius: '24px', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                        <thead>
                            <tr style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                                <th style={{ padding: '16px', textAlign: 'left' }}>User ID</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Name</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Role</th>
                                <th style={{ padding: '16px', textAlign: 'left' }}>Registered date</th>
                                <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id} style={{ background: '#f8fafc', borderRadius: '12px' }}>
                                    <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{user.studentId}</td>
                                    <td style={{ padding: '16px' }}>{user.name}</td>
                                    <td style={{ padding: '16px' }}>
                                        <select
                                            value={user.role}
                                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                            style={{
                                                padding: '6px 12px',
                                                borderRadius: '8px',
                                                fontSize: '0.8rem',
                                                fontWeight: 700,
                                                background: user.role === 'admin' ? 'rgba(139, 92, 246, 0.1)' : (user.role === 'staff' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(59, 130, 246, 0.1)'),
                                                color: user.role === 'admin' ? '#8b5cf6' : (user.role === 'staff' ? '#f59e0b' : '#3b82f6'),
                                                textTransform: 'capitalize',
                                                border: '1px solid currentColor',
                                                cursor: 'pointer',
                                                outline: 'none',
                                                appearance: 'none'
                                            }}
                                            title="Change role"
                                        >
                                            <option value="student">Student</option>
                                            <option value="staff">Staff</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>
                                        {new Date(user.createdAt).toLocaleDateString()}
                                    </td>
                                    <td style={{ padding: '16px', textAlign: 'right' }}>
                                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <button onClick={() => handleDeleteUser(user._id)} className="glass" style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }} title="Delete User">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderInventoryManager = () => {
        const mockStock = [
            { id: 1, name: 'Premium Cheese', category: 'Dairy', quantity: 2, unit: 'kg', minThreshold: 5, expiry: '2026-03-15', supplier: 'Lanka Foods' },
            { id: 2, name: 'Chicken Breast', category: 'Meat', quantity: 15, unit: 'kg', minThreshold: 10, expiry: '2026-03-10', supplier: 'Fresh Meats Co' },
            { id: 3, name: 'Basmati Rice', category: 'Dry Goods', quantity: 50, unit: 'kg', minThreshold: 20, expiry: '2026-12-01', supplier: 'Agro Distributors' },
            { id: 4, name: 'Tomato Sauce', category: 'Condiments', quantity: 4, unit: 'liters', minThreshold: 5, expiry: '2026-06-20', supplier: 'Lanka Foods' },
            { id: 5, name: 'Fresh Milk', category: 'Dairy', quantity: 20, unit: 'liters', minThreshold: 15, expiry: '2026-03-09', supplier: 'Daily Farms' },
        ];

        const getStatusColor = (item) => {
            const daysToExpiry = (new Date(item.expiry) - new Date()) / (1000 * 60 * 60 * 24);
            if (item.quantity <= item.minThreshold) return { bg: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', text: 'Low Stock' };
            if (daysToExpiry <= 3) return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', text: 'Expiring Soon' };
            return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981', text: 'Healthy' };
        };

        const lowStockCount = mockStock.filter(item => item.quantity <= item.minThreshold).length;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>Inventory & Stock</h3>
                    {lowStockCount > 0 && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '12px', fontWeight: 700 }}>
                            <AlertTriangle size={18} /> {lowStockCount} Items Low on Stock!
                        </div>
                    )}
                </div>

                {/* Sub Navigation */}
                <div style={{ display: 'flex', gap: '16px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '16px' }}>
                    {['stock', 'suppliers', 'reports'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setInventoryTab(tab)}
                            style={{
                                padding: '8px 24px',
                                borderRadius: '99px',
                                background: inventoryTab === tab ? 'var(--primary)' : 'transparent',
                                color: inventoryTab === tab ? 'white' : 'var(--text-secondary)',
                                border: 'none',
                                fontWeight: 700,
                                cursor: 'pointer',
                                transition: 'all 0.2s',
                                textTransform: 'capitalize'
                            }}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {inventoryTab === 'stock' && (
                    <div style={{ padding: '32px', borderRadius: '24px', background: 'white', border: '1px solid #f1f5f9', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                            <div style={{ display: 'flex', gap: '12px' }}>
                                <div style={{ position: 'relative' }}>
                                    <Filter size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                                    <input type="text" placeholder="Search items..." style={{ padding: '10px 10px 10px 40px', borderRadius: '12px', border: '1px solid var(--glass-border)', background: 'var(--bg-page)', color: 'var(--text-main)', width: '250px' }} />
                                </div>
                            </div>
                            <button onClick={() => setShowStockModal(true)} className="btn-premium" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
                                <Plus size={18} /> Add Stock Item
                            </button>
                        </div>

                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                                <thead>
                                    <tr style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                                        <th style={{ padding: '16px', textAlign: 'left' }}>Item Name</th>
                                        <th style={{ padding: '16px', textAlign: 'left' }}>Category</th>
                                        <th style={{ padding: '16px', textAlign: 'right' }}>Quantity</th>
                                        <th style={{ padding: '16px', textAlign: 'left' }}>Expiry Date</th>
                                        <th style={{ padding: '16px', textAlign: 'left' }}>Supplier</th>
                                        <th style={{ padding: '16px', textAlign: 'center' }}>Status</th>
                                        <th style={{ padding: '16px', textAlign: 'right' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mockStock.map((item) => {
                                        const status = getStatusColor(item);
                                        return (
                                            <tr key={item.id} style={{ background: 'rgba(59, 10, 0, 0.03)', borderRadius: '12px' }}>
                                                <td style={{ padding: '16px', fontWeight: 700, color: 'var(--text-main)' }}>{item.name}</td>
                                                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{item.category}</td>
                                                <td style={{ padding: '16px', textAlign: 'right', fontWeight: 800, color: item.quantity <= item.minThreshold ? '#ef4444' : 'var(--text-main)' }}>
                                                    {item.quantity} {item.unit}
                                                </td>
                                                <td style={{ padding: '16px' }}>
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-secondary)' }}>
                                                        <Calendar size={14} /> {item.expiry}
                                                    </div>
                                                </td>
                                                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{item.supplier}</td>
                                                <td style={{ padding: '16px', textAlign: 'center' }}>
                                                    <span style={{ padding: '6px 12px', borderRadius: '8px', fontSize: '0.75rem', fontWeight: 700, background: status.bg, color: status.color }}>
                                                        {status.text}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '16px', textAlign: 'right' }}>
                                                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                        <button className="glass" style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#3b82f6', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                                                            <Edit2 size={14} />
                                                        </button>
                                                        <button className="glass" style={{ width: '32px', height: '32px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {inventoryTab === 'suppliers' && (
                    <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '24px' }}>
                        <UsersIcon size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Supplier Management</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Manage contacts, view supplier history, and generate purchase orders.</p>
                        <button className="btn-premium" style={{ padding: '10px 24px' }}>Add New Supplier</button>
                    </div>
                )}

                {inventoryTab === 'reports' && (
                    <div className="glass" style={{ padding: '40px', textAlign: 'center', borderRadius: '24px' }}>
                        <FileText size={48} style={{ color: 'var(--text-secondary)', marginBottom: '16px', opacity: 0.5 }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '8px' }}>Inventory Reports</h3>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '24px' }}>Generate daily, weekly, or monthly reports on stock consumption and wastage.</p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <button className="btn-premium" style={{ padding: '10px 24px', background: 'var(--bg-page)', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>View Daily Waste</button>
                            <button className="btn-premium" style={{ padding: '10px 24px' }}>Generate Full Report</button>
                        </div>
                    </div>
                )}
            </div>
        );
    };

    const renderMessagesManager = () => {
        const unreadCount = contactMessages.filter(m => !m.isRead).length;
        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                        Contact Messages{' '}
                        <span style={{ color: '#94a3b8', fontSize: '1rem', fontWeight: 500 }}>
                            ({contactMessages.length} total)
                        </span>
                        {unreadCount > 0 && (
                            <span style={{ marginLeft: '12px', padding: '4px 12px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 700 }}>
                                {unreadCount} unread
                            </span>
                        )}
                    </h3>
                    <button onClick={fetchContactMessages} className="glass" style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 600, cursor: 'pointer', color: 'var(--text-main)', border: '1px solid var(--glass-border)' }}>
                        Refresh
                    </button>
                </div>

                {contactMessages.length === 0 ? (
                    <div className="glass" style={{ padding: '60px', textAlign: 'center', borderRadius: '24px' }}>
                        <MessageSquare size={48} style={{ color: 'var(--text-secondary)', opacity: 0.3, marginBottom: '16px' }} />
                        <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-secondary)' }}>No messages yet</h4>
                        <p style={{ color: 'var(--text-secondary)' }}>Messages from the Contact page will appear here.</p>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {contactMessages.map(msg => (
                            <div key={msg._id} className="glass" style={{
                                padding: '24px 28px',
                                borderRadius: '20px',
                                background: msg.isRead ? 'var(--bg-card)' : 'rgba(239,68,68,0.04)',
                                border: msg.isRead ? '1px solid var(--glass-border)' : '1px solid rgba(239,68,68,0.2)',
                                display: 'flex',
                                gap: '20px',
                                alignItems: 'flex-start'
                            }}>
                                {/* Avatar */}
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.2rem', color: 'var(--text-main)', flexShrink: 0 }}>
                                    {msg.name.charAt(0).toUpperCase()}
                                </div>

                                {/* Content */}
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                        <div>
                                            <span style={{ fontWeight: 800, color: 'var(--text-main)' }}>{msg.name}</span>
                                            <span style={{ marginLeft: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{msg.email}</span>
                                            {!msg.isRead && (
                                                <span style={{ marginLeft: '10px', padding: '2px 10px', background: 'rgba(239,68,68,0.1)', color: '#ef4444', borderRadius: '99px', fontSize: '0.72rem', fontWeight: 800 }}>NEW</span>
                                            )}
                                        </div>
                                        <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                                            {new Date(msg.createdAt).toLocaleString()}
                                        </span>
                                    </div>
                                    <p style={{ color: 'var(--text-main)', lineHeight: 1.6, margin: '0 0 12px 0' }}>{msg.message}</p>
                                    {!msg.isRead && (
                                        <button
                                            onClick={() => handleMarkAsRead(msg._id)}
                                            style={{ padding: '6px 16px', borderRadius: '8px', background: 'rgba(16,185,129,0.1)', color: '#10b981', border: '1px solid rgba(16,185,129,0.2)', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                                        >
                                            ✓ Mark as Read
                                        </button>
                                    )}
                                    {msg.isRead && (
                                        <span style={{ fontSize: '0.8rem', color: '#10b981', fontWeight: 600 }}>✓ Read</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        );
    };

    const renderDashboard = () => {
        // Calculate Top Customers dynamically
        const topCustomers = Object.values(orders.reduce((acc, order) => {
            const studentId = order.studentId;
            if (!acc[studentId]) {
                const user = users.find(u => u.studentId === studentId || u._id === studentId);
                acc[studentId] = {
                    name: user?.name || 'Customer',
                    role: user?.role ? (user.role.charAt(0).toUpperCase() + user.role.slice(1)) : 'Student',
                    totalSpend: 0
                };
            }
            acc[studentId].totalSpend += order.totalAmount || 0;
            return acc;
        }, {}))
        .sort((a, b) => b.totalSpend - a.totalSpend)
        .slice(0, 4);

        return (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px' }}>
                    
                    {/* Card 1: Orders (Orange) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'linear-gradient(135deg, #ff9f43 0%, #ff8000 100%)',
                            padding: '30px',
                            borderRadius: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 15px 30px rgba(255, 153, 102, 0.3)',
                            color: 'white'
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '5px', lineHeight: 1 }}>{stats.totalOrders || 0}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.9 }}>Total Orders</div>
                        </div>
                        <div style={{
                            width: '60px', height: '60px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <ShoppingBag size={28} color="white" />
                        </div>
                    </motion.div>

                    {/* Card 2: Revenue (Purple) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'linear-gradient(135deg, #a855f7 0%, #7e22ce 100%)',
                            padding: '30px',
                            borderRadius: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 15px 30px rgba(168, 85, 247, 0.3)',
                            color: 'white'
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '5px', lineHeight: 1 }}>{stats.totalRevenue || 0}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.9 }}>Total Revenue</div>
                        </div>
                        <div style={{
                            width: '60px', height: '60px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <DollarSign size={28} color="white" />
                        </div>
                    </motion.div>

                    {/* Card 3: Users (Cyan) */}
                    <motion.div
                        whileHover={{ y: -5 }}
                        style={{
                            background: 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
                            padding: '30px',
                            borderRadius: '24px',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            boxShadow: '0 15px 30px rgba(6, 182, 212, 0.3)',
                            color: 'white'
                        }}
                    >
                        <div>
                            <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '5px', lineHeight: 1 }}>{users.length || 0}</div>
                            <div style={{ fontSize: '1rem', fontWeight: 500, opacity: 0.9 }}>Active Users</div>
                        </div>
                        <div style={{
                            width: '60px', height: '60px',
                            background: 'rgba(255,255,255,0.2)',
                            borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center'
                        }}>
                            <UsersIcon size={28} color="white" />
                        </div>
                    </motion.div>
                </div>

                {/* AI Assistant Insight Section (Replacing Charts) */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px', marginBottom: '30px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="glass"
                        style={{
                            padding: '40px',
                            background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)',
                            borderRadius: '32px',
                            border: '1px solid rgba(139, 92, 246, 0.15)',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '30px',
                            boxShadow: '0 20px 50px rgba(139, 92, 246, 0.08)',
                            overflow: 'hidden'
                        }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <div style={{ 
                                    width: '64px', height: '64px', 
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                    borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    boxShadow: '0 10px 20px rgba(139, 92, 246, 0.3)'
                                }}>
                                    <Sparkles size={32} color="white" />
                                </div>
                                <div>
                                    <h3 style={{ margin: 0, fontSize: '1.6rem', fontWeight: 900, color: '#1e293b' }}>UniCafé AI Analytics</h3>
                                    <p style={{ margin: '5px 0 0', color: '#64748b', fontWeight: 500 }}>Intelligent insights & operations assistant</p>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                <div style={{ position: 'relative' }}>
                                    <input 
                                        type="date" 
                                        value={selectedReportDate}
                                        onChange={(e) => {
                                            setSelectedReportDate(e.target.value);
                                            setShowDailyReport(true);
                                        }}
                                        style={{
                                            padding: '8px 15px',
                                            borderRadius: '12px',
                                            border: '1px solid rgba(139, 92, 246, 0.2)',
                                            background: 'white',
                                            fontSize: '0.85rem',
                                            fontWeight: 600,
                                            color: '#1e293b',
                                            outline: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                                        }}
                                    />
                                </div>
                                <span style={{ padding: '8px 20px', borderRadius: '12px', background: '#ecfdf5', color: '#059669', fontSize: '0.8rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
                                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }} />
                                    AI System Online
                                </span>
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '40px', alignItems: 'center' }}>
                            {/* AI Insights (Left side) */}
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', marginBottom: '10px' }}>Daily Smart Highlights</h4>
                                
                                <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(249, 115, 22, 0.1)', color: '#f97316', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <TrendingUp size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Spike Alert: Iced Beverages</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Ordering volume for drinks is up 32% compared to last Friday.</div>
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(6, 182, 212, 0.1)', color: '#06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Clock size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Peak Hour Prediction</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Expect a 25% increase in traffic between 1:00 PM - 2:30 PM.</div>
                                    </div>
                                </div>

                                <div style={{ background: 'white', padding: '20px', borderRadius: '20px', border: '1px solid #f1f5f9', display: 'flex', gap: '15px', alignItems: 'center' }}>
                                    <div style={{ width: 40, height: 40, borderRadius: '12px', background: 'rgba(139, 92, 246, 0.1)', color: '#8b5cf6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Package size={20} />
                                    </div>
                                    <div>
                                        <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>Inventory Check-in</div>
                                        <div style={{ fontSize: '0.8rem', color: '#64748b' }}>"Chicken Breast" stock is low. Consider ordering for next week.</div>
                                    </div>
                                </div>
                            </div>

                            {/* Chat Interface (Right side) */}
                            <div style={{ background: 'rgba(255,255,255,0.6)', borderRadius: '28px', border: '1px solid #e2e8f0', padding: '30px', height: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                                <div style={{ flex: 1, maxHeight: '200px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                    <div style={{ alignSelf: 'flex-start', background: '#f8fafc', padding: '12px 18px', borderRadius: '18px 18px 18px 0', fontSize: '0.9rem', border: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
                                        Hello Admin! I've analyzed today's data. Everything looks stable, but I recommend a small promotion for "Snacks" to boost afternoon sales.
                                    </div>
                                    <div style={{ alignSelf: 'flex-start', background: '#f8fafc', padding: '12px 18px', borderRadius: '18px 18px 18px 0', fontSize: '0.9rem', border: '1px solid #f1f5f9', boxSizing: 'border-box' }}>
                                        How else can I help you optimize the cafe today?
                                    </div>
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Zap size={18} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: '#8b5cf6' }} />
                                    <input 
                                        type="text" 
                                        placeholder="Ask AI for revenue forecast, stock help or trends..." 
                                        style={{
                                            width: '100%',
                                            padding: '16px 60px 16px 50px',
                                            borderRadius: '20px',
                                            border: '1px solid #cbd5e1',
                                            background: 'white',
                                            fontSize: '0.95rem',
                                            fontWeight: 500,
                                            outline: 'none',
                                            transition: 'all 0.3s',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                                        }}
                                    />
                                    <div style={{ 
                                        position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', 
                                        width: '44px', height: '44px', borderRadius: '16px', 
                                        background: 'linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
                                        boxShadow: '0 4px 10px rgba(139, 92, 246, 0.3)'
                                    }}>
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Middle Charts Area (Restored) */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px', marginBottom: '30px' }}>
                    {/* Revenue Trends (Area Chart) */}
                    <div className="glass" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: '1px solid #f0f0f0', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Revenue & Orders</h4>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <span style={{ padding: '6px 16px', borderRadius: '99px', border: '1px solid #e2e8f0', fontSize: '0.75rem', fontWeight: 700, color: '#94a3b8' }}>Revenue</span>
                                <span style={{ padding: '6px 16px', borderRadius: '99px', border: '1px solid #06b6d4', fontSize: '0.75rem', fontWeight: 700, color: '#06b6d4' }}>Orders</span>
                            </div>
                        </div>
                        <div style={{ flex: 1, minHeight: '300px' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={[
                                    { name: 'Mon', revenue: 30, orders: 20 },
                                    { name: 'Tue', revenue: 50, orders: 40 },
                                    { name: 'Wed', revenue: 40, orders: 35 },
                                    { name: 'Thu', revenue: 70, orders: 50 },
                                    { name: 'Fri', revenue: 60, orders: 45 },
                                    { name: 'Sat', revenue: 85, orders: 60 },
                                    { name: 'Sun', revenue: 90, orders: 68 },
                                ]}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ff9f43" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#ff9f43" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorOrd" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 11 }} />
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                                    <Area type="monotone" dataKey="revenue" stroke="#ff9f43" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                    <Area type="monotone" dataKey="orders" stroke="#06b6d4" strokeWidth={3} fillOpacity={1} fill="url(#colorOrd)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Order Distribution (Donut Chart) */}
                    <div className="glass" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: '1px solid #f1f5f9', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Sales by Category</h4>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', fontSize: '1rem', fontWeight: 800, color: '#1f2937' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}><span>60%</span><span style={{color:'#94a3b8', fontWeight:600, fontSize: '0.75rem'}}>Meals</span></div>
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}><span>35%</span><span style={{color:'#94a3b8', fontWeight:600, fontSize: '0.75rem'}}>Drinks</span></div>
                        </div>
                        <div style={{ flex: 1, minHeight: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Meals', value: 60 },
                                            { name: 'Drinks', value: 35 },
                                            { name: 'Snacks', value: 5 }
                                        ]}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={70}
                                        outerRadius={105}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                        cornerRadius={6}
                                    >
                                        <Cell fill="#ff9f43" />
                                        <Cell fill="#06b6d4" />
                                        <Cell fill="#e2e8f0" />
                                    </Pie>
                                    <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.8rem', fontWeight: 600, color: '#64748b', marginTop: '10px' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius:'50%', background:'#ff9f43'}}/> Meals 60%</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius:'50%', background:'#06b6d4'}}/> Drinks 35%</span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><div style={{width:10, height:10, borderRadius:'50%', background:'#e2e8f0'}}/> Snacks 5%</span>
                        </div>
                    </div>
                </div>

                {/* Bottom Stats Area */}
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '30px' }}>
                    {/* Popular Items */}
                    <div className="glass" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                        <h4 style={{ margin: '0 0 30px', fontSize: '1.2rem', fontWeight: 800 }}>Popular Items</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
                            {[
                                { name: 'Iced Latte', percent: 85, color: '#ff9f43' },
                                { name: 'Chicken Burger', percent: 70, color: '#a855f7' },
                                { name: 'Club Sandwich', percent: 60, color: '#06b6d4' },
                                { name: 'Chocolate Muffins', percent: 45, color: '#64748b' }
                            ].map((item, i) => (
                                <div key={i}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', fontWeight: 700, marginBottom: '10px' }}>
                                        <span>{item.name}</span>
                                        <span style={{ color: '#94a3b8' }}>{item.percent}%</span>
                                    </div>
                                    <div style={{ width: '100%', height: '8px', background: '#f1f5f9', borderRadius: '99px', overflow: 'hidden' }}>
                                        <div style={{ width: `${item.percent}%`, height: '100%', background: item.color, borderRadius: '99px' }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent High Value Orders */}
                    <div className="glass" style={{ padding: '30px', background: 'white', borderRadius: '24px', border: '1px solid #f0f0f0' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
                            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>Recent Top Customers</h4>
                            <button style={{ background: 'none', border: 'none', color: '#ff9f43', fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer' }}>View All</button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            {topCustomers.length === 0 ? (
                                <div style={{ textAlign: 'center', padding: '20px', color: '#94a3b8', fontWeight: 600 }}>No order data available</div>
                            ) : topCustomers.map((user, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', borderRadius: '16px', border: '1px solid #f8fafc', background: '#fafafa', transition: 'all 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = '#f1f5f9'} onMouseOut={(e) => e.currentTarget.style.background = '#fafafa'}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} alt="avatar" style={{ width: '45px', height: '45px', borderRadius: '12px', background: '#e2e8f0' }} />
                                        <div>
                                            <div style={{ fontSize: '1rem', fontWeight: 800, color: '#1e293b' }}>{user.name}</div>
                                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8' }}>{user.role}</div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                        <span style={{ fontSize: '1rem', fontWeight: 800, color: '#0f172a' }}>LKR {user.totalSpend.toLocaleString()}</span>
                                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#ff9f43' }}>Total Value</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div style={{
            display: 'flex',
            minHeight: '100vh',
            background: '#f8fafc',
            color: '#111827'
        }}>
            <AdminSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                {/* Main Content Area */}
                <div style={{ position: 'relative', padding: '40px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', background: 'white', padding: '15px 30px', borderRadius: '30px', boxShadow: '0 5px 20px rgba(0,0,0,0.03)' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <AlignLeft size={24} style={{ color: '#1f2937', cursor: 'pointer' }} />
                                <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#1f2937', margin: 0, letterSpacing: '-0.5px' }}>
                                    {activeTab === 'dashboard' ? 'Dashboard' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace('-', ' ')}
                                </h1>
                            </div>
                            
                            <div style={{ display: 'flex', alignItems: 'center', gap: '35px' }}>
                                <div style={{ position: 'relative' }}>
                                    <input type="text" placeholder="Search something here..." style={{ padding: '14px 20px 14px 45px', borderRadius: '30px', border: 'none', background: '#f8fafc', color: '#1f2937', width: '320px', fontSize: '0.95rem', outline: 'none', fontWeight: 500 }} />
                                    <Search size={18} style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
                                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                                        <MessageSquare size={24} style={{ color: '#64748b' }} />
                                        <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', background: '#ea580c', borderRadius: '50%', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid white' }}>18</div>
                                    </div>
                                    <div style={{ position: 'relative', cursor: 'pointer' }}>
                                        <Bell size={24} style={{ color: '#64748b' }} />
                                        <div style={{ position: 'absolute', top: '-5px', right: '-5px', width: '18px', height: '18px', background: '#ea580c', borderRadius: '50%', color: 'white', fontSize: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', border: '2px solid white' }}>52</div>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <div style={{ textAlign: 'right' }}>
                                        <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#1f2937' }}>Admin User</div>
                                        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#94a3b8' }}>Super Admin</div>
                                    </div>
                                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Admin`} alt="profile" style={{ width: '45px', height: '45px', borderRadius: '50%', background: '#e2e8f0', objectFit: 'cover' }} />
                                </div>
                            </div>
                        </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {activeTab === 'dashboard' && renderDashboard()}
                            {activeTab === 'menu' && renderMenuManager()}
                            {activeTab === 'orders' && renderOrderManager()}
                            {activeTab === 'feedback' && <FeedbackPage />}
                            {activeTab === 'users' && renderUserManager()}
                            {activeTab === 'inventory' && renderInventoryManager()}

                            {/* Daily Sales Report Modal */}
                            <AnimatePresence>
                                {showDailyReport && (
                                    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
                                        <motion.div 
                                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                            onClick={() => setShowDailyReport(false)}
                                            style={{ position: 'absolute', inset: 0, background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)' }}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                            animate={{ opacity: 1, scale: 1, y: 0 }}
                                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                            className="glass"
                                            style={{
                                                width: '100%', maxWidth: '800px', background: 'white', borderRadius: '32px', position: 'relative', zIndex: 1, overflow: 'hidden',
                                                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
                                            }}
                                        >
                                            {/* Header */}
                                            <div style={{ background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', padding: '40px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                                                    <div style={{ width: 60, height: 60, borderRadius: '20px', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                        <FileText size={32} />
                                                    </div>
                                                    <div>
                                                        <h2 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 900 }}>Daily Sales Report</h2>
                                                        <p style={{ margin: '5px 0 0', opacity: 0.7, fontWeight: 500 }}>{new Date(selectedReportDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                                    </div>
                                                </div>
                                                <button onClick={() => setShowDailyReport(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', width: 44, height: 44, borderRadius: '15px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                                    <X size={24} />
                                                </button>
                                            </div>

                                            {/* Body */}
                                            <div style={{ padding: '40px' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
                                                    <div style={{ padding: '25px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Total Revenue</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>LKR 42,500</div>
                                                    </div>
                                                    <div style={{ padding: '25px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Total Orders</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>128</div>
                                                    </div>
                                                    <div style={{ padding: '25px', borderRadius: '24px', background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                                                        <div style={{ color: '#94a3b8', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>Avg. Order</div>
                                                        <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1e293b' }}>LKR 332</div>
                                                    </div>
                                                </div>

                                                <h4 style={{ fontSize: '1.1rem', fontWeight: 800, marginBottom: '20px' }}>Top Selling Items (Performance)</h4>
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                                    {[
                                                        { name: 'Chicken Burger', sales: 45, revenue: 15750 },
                                                        { name: 'Iced Coffee', sales: 38, revenue: 7600 },
                                                        { name: 'Cheese Pasta', sales: 22, revenue: 11000 }
                                                    ].map((item, i) => (
                                                        <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 25px', borderRadius: '18px', background: '#ffffff', border: '1px solid #f1f5f9' }}>
                                                            <span style={{ fontWeight: 700, color: '#1e293b' }}>{item.name}</span>
                                                            <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
                                                                <span style={{ color: '#94a3b8', fontSize: '0.9rem', fontWeight: 600 }}>{item.sales} sold</span>
                                                                <span style={{ fontWeight: 800, color: '#10b981' }}>LKR {item.revenue.toLocaleString()}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div style={{ marginTop: '40px', display: 'flex', gap: '15px' }}>
                                                    <button style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#ff9f43', color: 'white', border: 'none', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                                        <Download size={18} /> Download Detailed PDF
                                                    </button>
                                                    <button onClick={() => setShowDailyReport(false)} style={{ flex: 1, padding: '16px', borderRadius: '16px', background: '#f1f5f9', color: '#64748b', border: 'none', fontWeight: 800, cursor: 'pointer' }}>
                                                        Dismiss Report
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>
                                )}
                            </AnimatePresence>
                            {activeTab === 'messages' && renderMessagesManager()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>

            <AIAssistant />

            {/* Modals and Toasts */}
            <FormModal show={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddItem} title="Add New Menu Item" isEdit={false} />
            <FormModal show={showEditModal} onClose={() => { setShowEditModal(false); setEditingItem(null); resetForm(); }} onSubmit={handleEditItem} title="Edit Menu Item" isEdit={true} />
            <StockFormModal show={showStockModal} onClose={() => setShowStockModal(false)} title="Add/Edit Stock Item" />
            <UserFormModal />

            {showSuccess && (
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{ position: 'fixed', bottom: '40px', right: '40px', background: '#10b981', padding: '16px 25px', borderRadius: '16px', color: 'white', fontWeight: 700, zIndex: 3000, boxShadow: '0 10px 30px rgba(16, 185, 129, 0.3)' }}
                >
                    {showSuccess}
                </motion.div>
            )}
        </div>
    );
};

export default AdminPage;
