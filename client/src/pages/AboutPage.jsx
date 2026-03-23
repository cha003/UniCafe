import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Target, Users, Shield, Sparkles } from 'lucide-react';

const AboutPage = () => {
    const subsystems = [
        {
            title: "Deliver Quality Food",
            desc: "To provide fresh, delicious, and hygienic meals that students can trust and enjoy every day.",
            icon: Shield,
            color: "var(--primary)"
        },
        {
            title: "Make Ordering Easy & Fast",
            desc: "To simplify the food ordering experience through technology, reducing waiting time and improving convenience.",
            icon: Coffee,
            color: "#3b82f6"
        },
        {
            title: "Create a Great Café Experience",
            desc: "To build a friendly and comfortable environment where students can relax, connect, and enjoy good food.",
            icon: Users,
            color: "#f59e0b"
        }
    ];

    return (
        <div className="about-page" style={{ padding: '80px 5%', minHeight: '100vh', background: 'var(--bg-page)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '80px' }}
            >
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', color: 'var(--text-main)' }}>
                    Our <span className="gradient-text">Mission</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
                    UniCafé is revolutionizing the university dining experience through innovative technology,
                    ensuring every student and staff member enjoys efficient, high-quality, and modern cafeteria services.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', marginBottom: '100px' }}>
                {subsystems.map((system, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="glass"
                        style={{ padding: '40px', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
                    >
                        <div style={{ padding: '12px', borderRadius: '16px', background: `${system.color}15`, width: 'fit-content', marginBottom: '24px' }}>
                            <system.icon size={32} style={{ color: system.color }} />
                        </div>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '16px', color: 'var(--text-main)' }}>{system.title}</h3>
                        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{system.desc}</p>
                    </motion.div>
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="glass"
                style={{ padding: '60px', borderRadius: '40px', textAlign: 'center', background: 'linear-gradient(135deg, rgba(234, 182, 118, 0.05) 0%, rgba(191, 149, 99, 0.05) 100%)', border: '1px solid var(--primary)' }}
            >
                <Sparkles size={48} style={{ color: 'var(--primary)', marginBottom: '24px' }} />
                <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: '16px', color: 'var(--text-main)' }}>The Future of Campus Dining</h2>
                <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                    We believe in a world where technology and hospitality meet to create seamless, sustainable,
                    and enjoyable dining environments for the academic community.
                </p>
            </motion.div>
        </div>
    );
};

export default AboutPage;
