import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import axios from 'axios';

const ContactPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post('/api/contact', formData);
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setStatus(''), 4000);
        } catch (err) {
            setStatus('error');
            setTimeout(() => setStatus(''), 4000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="contact-page" style={{ padding: '80px 5%', minHeight: '100vh', background: 'var(--bg-page)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '80px' }}
            >
                <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '20px', color: 'var(--text-main)' }}>
                    Get in <span className="gradient-text">Touch</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Have questions or feedback? We're here to help you experience UniCafé better.
                </p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px' }}>
                {/* Contact Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <div className="glass" style={{ padding: '30px', borderRadius: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ background: 'var(--secondary)', padding: '12px', borderRadius: '12px', color: 'var(--text-main)' }}>
                            <Phone size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Call Us</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>+94 11 234 5678</div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '30px', borderRadius: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ background: 'var(--primary)', padding: '12px', borderRadius: '12px', color: 'white' }}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Email Support</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>hello@unicafe.edu</div>
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '30px', borderRadius: '24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                        <div style={{ background: 'var(--secondary)', padding: '12px', borderRadius: '12px', color: 'var(--text-main)' }}>
                            <MapPin size={24} />
                        </div>
                        <div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Location</div>
                            <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-main)' }}>Main Canteen, University Grounds</div>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass"
                    style={{ padding: '50px', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
                >
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-secondary)' }}>Name</label>
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '12px', background: 'rgba(59, 10, 0, 0.03)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                                />
                            </div>
                            <div>
                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-secondary)' }}>Email</label>
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    style={{ width: '100%', padding: '12px 20px', borderRadius: '12px', background: 'rgba(59, 10, 0, 0.03)', border: '1px solid var(--glass-border)', color: 'var(--text-main)' }}
                                />
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-secondary)' }}>Message</label>
                            <textarea
                                required
                                rows="5"
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                style={{ width: '100%', padding: '12px 20px', borderRadius: '12px', background: 'rgba(59, 10, 0, 0.03)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', resize: 'none' }}
                            ></textarea>
                        </div>
                        <button type="submit" className="btn-premium" disabled={loading} style={{ width: '100%', padding: '16px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', opacity: loading ? 0.7 : 1 }}>
                            <Send size={20} /> {loading ? 'Sending...' : 'Send Message'}
                        </button>
                    </form>

                    {status === 'success' && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{ marginTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', color: '#10b981', fontWeight: 700 }}
                        >
                            <CheckCircle size={20} /> Message sent! We'll get back to you soon.
                        </motion.div>
                    )}
                    {status === 'error' && (
                        <div style={{ marginTop: '20px', textAlign: 'center', color: '#ef4444', fontWeight: 700 }}>
                            Failed to send. Please try again.
                        </div>
                    )}
                </motion.div>
            </div>
        </div>
    );
};

export default ContactPage;
