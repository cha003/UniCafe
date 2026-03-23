import React from 'react';
import {
    LayoutDashboard,
    Utensils,
    ClipboardList,
    BarChart3,
    Settings,
    LogOut,
    Package,
    MessageSquare,
    Users,
    Home,
    Calendar,
    Info,
    Mail,
    Search
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/unicafe_logo_orange.png';

const AdminSidebar = ({ activeTab, setActiveTab }) => {
    const navigate = useNavigate();

    const menuGroups = [
        {
            title: 'CORE DASHBOARD',
            items: [
                { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
            ]
        },
        {
            title: 'MANAGEMENT',
            items: [
                { id: 'menu', name: 'Menu Items', icon: Utensils },
                { id: 'orders', name: 'Orders & Queue', icon: ClipboardList },
                { id: 'users', name: 'User Access', icon: Users },
                { id: 'messages', name: 'Messages', icon: MessageSquare },
            ]
        },
        {
            title: 'SITE PAGES',
            items: [
                { id: 'home', name: 'Home Page', icon: Home, path: '/' },
                { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/calendar' },
                { id: 'feedback', name: 'Feedback', icon: MessageSquare, path: '/feedback' },
                { id: 'about', name: 'About Us', icon: Info, path: '/about' },
                { id: 'contact', name: 'Contact', icon: Mail, path: '/contact' },
            ]
        }
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload();
    };

    const handleItemClick = (item) => {
        if (item.path) {
            navigate(item.path);
        } else {
            setActiveTab(item.id);
        }
    };

    return (
        <aside className="admin-sidebar" style={{
            width: '280px',
            height: '100vh',
            background: 'linear-gradient(180deg, rgba(234, 88, 12, 1) 0%, rgba(194, 65, 12, 1) 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky',
            top: 0,
            left: 0,
            overflowY: 'auto',
            borderRight: 'none',
            zIndex: 100
        }}>
            {/* Logo Area */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', padding: '30px 20px', paddingBottom: '10px' }}>
                <img src={logo} alt="UniCafé Logo" style={{ height: '40px', width: '40px', objectFit: 'cover', borderRadius: '50%', boxShadow: '0 4px 10px rgba(0,0,0,0.2)' }} />
                <h2 style={{ fontWeight: 800, letterSpacing: '-1px', color: 'white', margin: 0 }}>Uni<span style={{ color: '#FFB800' }}>Café</span></h2>
            </div>

            {/* Navigation Groups */}
            <div style={{ flex: 1, padding: '20px 0' }}>
                {menuGroups.map((group, idx) => (
                    <div key={idx} style={{ marginBottom: '35px' }}>
                        <h3 style={{
                            fontSize: '0.75rem',
                            color: 'rgba(255,255,255,0.5)',
                            fontWeight: 800,
                            paddingLeft: '30px',
                            marginBottom: '15px',
                            letterSpacing: '1.5px'
                        }}>
                            {group.title}
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {group.items.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => handleItemClick(item)}
                                    style={{
                                        width: 'calc(100% - 20px)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '15px',
                                        padding: '16px 30px',
                                        borderRadius: '0 30px 30px 0',
                                        border: 'none',
                                        background: activeTab === item.id ? '#ffffff' : 'transparent',
                                        color: activeTab === item.id ? '#ea580c' : 'rgba(255,255,255,0.7)',
                                        cursor: 'pointer',
                                        fontSize: '0.95rem',
                                        fontWeight: activeTab === item.id ? 700 : 500,
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                        textAlign: 'left',
                                        position: 'relative'
                                    }}
                                    onMouseOver={(e) => {
                                        if (activeTab !== item.id) e.currentTarget.style.color = 'white';
                                    }}
                                    onMouseOut={(e) => {
                                        if (activeTab !== item.id) e.currentTarget.style.color = 'rgba(255,255,255,0.7)';
                                    }}
                                >
                                    <item.icon size={20} style={{
                                        color: activeTab === item.id ? '#ea580c' : 'inherit',
                                        transition: 'color 0.3s ease'
                                    }} />
                                    <span>{item.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* User Profile Summary or Logout */}
            <div style={{ padding: '30px 20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '15px',
                        borderRadius: '12px',
                        border: 'none',
                        background: 'rgba(255,255,255,0.1)',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: 600,
                        transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.8)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                >
                    <LogOut size={20} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default AdminSidebar;
