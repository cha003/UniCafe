import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Lock, Mail, ArrowRight, CheckCircle, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GoogleLogin } from '@react-oauth/google';
import heroBg from '../assets/hero_bg.png';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        studentId: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const response = await axios.post('/api/auth/google', {
                tokenId: credentialResponse.credential
            });
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            setSuccess(true);
            setTimeout(() => {
                navigate('/profile');
                window.location.reload();
            }, 2000);
        } catch (err) {
            setError(err.response?.data?.message || 'Google signup failed');
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            return setError('Passwords do not match');
        }

        try {
            await axios.post('/api/auth/register', {
                name: formData.name,
                studentId: formData.studentId,
                password: formData.password
            });
            console.log('Registration success');
            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err) {
            console.error('Registration Error:', err);
            const msg = err.response?.data?.message || err.message || 'Registration failed';
            setError(msg);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            width: '100vw',
            boxSizing: 'border-box',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '4rem 5%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            flexWrap: 'wrap',
            gap: '2rem'
        }}>
            {/* Success Popup */}
            {success && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    style={{
                        position: 'fixed',
                        top: '2rem',
                        right: '2rem',
                        background: 'linear-gradient(135deg, #10b981, #059669)',
                        padding: '1.5rem 2rem',
                        borderRadius: '16px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        boxShadow: '0 20px 60px rgba(16, 185, 129, 0.4)',
                        zIndex: 1000,
                        color: 'white',
                        fontWeight: 600
                    }}
                >
                    <CheckCircle size={24} />
                    <div>
                        <div style={{ fontSize: '1.125rem' }}>Signup Successful!</div>
                        <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Redirecting to login...</div>
                    </div>
                </motion.div>
            )}

            {/* Left Side text */}
            <div style={{ flex: '1 1 400px', paddingRight: '2rem' }}>
                <h1 style={{
                    fontSize: 'clamp(4rem, 8vw, 7rem)',
                    color: 'white',
                    fontFamily: 'cursive, "Brush Script MT", "Comic Sans MS"',
                    textShadow: '2px 4px 10px rgba(0,0,0,0.5)',
                    fontWeight: 'bold',
                    margin: 0,
                    lineHeight: 1
                }}>
                    UniCafé
                </h1>
            </div>

            {/* Right Side Form */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                style={{
                    flex: '0 1 480px',
                    width: '100%',
                    padding: '3rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '24px',
                    boxShadow: '0 30px 60px rgba(0, 0, 0, 0.4)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '1rem', marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 600, margin: 0, color: 'white', fontFamily: 'serif' }}>Sign Up</h2>
                    <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }}>Log In / Sign Up</Link>
                </div>

                {error && (
                    <div style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#fca5a5', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', border: '1px solid rgba(239, 68, 68, 0.4)', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSignup}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '1rem', color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>Full Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Your Full Name"
                            className="glass-input glass-input-dark"
                            style={{ color: 'white' }}
                        />
                    </div>

                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', fontSize: '1rem', color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>Student ID</label>
                        <input
                            type="text"
                            name="studentId"
                            required
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="e.g. ST12345"
                            className="glass-input glass-input-dark"
                            style={{ color: 'white' }}
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '1rem', color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>Password</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="glass-input glass-input-dark"
                                    style={{ paddingRight: '2.5rem', color: 'white' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.7
                                    }}
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '1rem', color: 'white', fontWeight: 500, marginBottom: '0.5rem' }}>Confirm</label>
                            <div style={{ position: 'relative' }}>
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    required
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="glass-input glass-input-dark"
                                    style={{ paddingRight: '2.5rem', color: 'white' }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={{
                                        position: 'absolute',
                                        right: '0.75rem',
                                        top: '50%',
                                        transform: 'translateY(-50%)',
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        cursor: 'pointer',
                                        padding: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        opacity: 0.7
                                    }}
                                >
                                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '2rem' }}>
                        <button type="submit" style={{
                            background: 'white',
                            color: '#1a1a1a',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            border: 'none',
                            fontWeight: 700,
                            fontSize: '1rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}>
                            Sign Up
                        </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
                        <span style={{ color: 'white', fontSize: '1rem', fontWeight: 500 }}>OR</span>
                        <div style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.3)' }}></div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', marginBottom: '2rem' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <GoogleLogin
                                onSuccess={handleGoogleSuccess}
                                onError={() => setError('Google Sign Up Failed')}
                                type="icon"
                                shape="circle"
                            />
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <span style={{ color: '#1a1a1a', fontSize: '1.8rem', fontWeight: 900, fontFamily: 'serif' }}>f</span>
                        </div>
                        <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                            <span style={{ color: '#1a1a1a', fontSize: '1.5rem', fontWeight: 600, fontFamily: 'sans-serif' }}>𝕏</span>
                        </div>
                    </div>

                    <p style={{ textAlign: 'center', color: 'white', opacity: 0.9, fontSize: '0.95rem', margin: 0 }}>
                        Already have an account? <Link to="/login" style={{ color: 'white', textDecoration: 'underline' }}>Login</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default SignupPage;
