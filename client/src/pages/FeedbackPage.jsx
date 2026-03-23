import React, { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Camera,
    Send,
    AlertCircle,
    CheckCircle,
    MessageSquare,
    ThumbsUp,
    Heart,
    Smile,
    Meh,
    Frown,
    Angry,
    UserCircle
} from 'lucide-react';

const FeedbackPage = () => {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [quickRating, setQuickRating] = useState(null);
    const [complaintType, setComplaintType] = useState('General');
    const [isAnonymous, setIsAnonymous] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [complaintText, setComplaintText] = useState('');

    const emojis = [
        { icon: Heart, label: 'Love', color: '#ef4444' },
        { icon: Smile, label: 'Happy', color: '#10b981' },
        { icon: Meh, label: 'Neutral', color: '#f59e0b' },
        { icon: Frown, label: 'Sad', color: '#6366f1' },
        { icon: Angry, label: 'Angry', color: '#ef4444' }
    ];

    const topMeals = [
        { name: 'Kottu Roti Special', rating: 4.8, reviews: 124, image: '🍛' },
        { name: 'Vegetable Fried Rice', rating: 4.6, reviews: 89, image: '🍚' },
        { name: 'Chicken Curry Rice', rating: 4.5, reviews: 156, image: '🍗' }
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setRating(0);
            setQuickRating(null);
        }, 3000);
    };

    const handleComplaintSubmit = async () => {
        if (!complaintText.trim()) return;
        try {
            await axios.post('/api/contact', {
                name: isAnonymous ? 'Anonymous Student' : 'Student Feedback',
                email: isAnonymous ? 'anonymous@unicafe.com' : 'student@unicafe.com',
                message: complaintText,
            });
            setComplaintText('');
            setSubmitted(true);
            setTimeout(() => setSubmitted(false), 3000);
        } catch (error) {
            console.error('Error submitting complaint:', error);
        }
    };

    return (
        <div className="feedback-page" style={{ padding: '80px 5%', minHeight: '100vh', background: 'var(--bg-page)' }}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: '60px' }}
            >
                <h1 style={{ fontSize: '3rem', fontWeight: 900, marginBottom: '16px', color: 'var(--text-main)' }}>
                    Your <span className="gradient-text">Feedback</span> Matters
                </h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>幫助我們提升 UniCafé 的服務品質</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '40px' }}>
                {/* Left Side: Rating Form */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <motion.div
                        className="glass"
                        style={{ padding: '40px', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
                    >
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <Star style={{ color: 'var(--primary)' }} /> Rate Your Last Meal
                        </h3>

                        <div style={{ marginBottom: '32px' }}>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                        key={star}
                                        size={32}
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                        style={{
                                            cursor: 'pointer',
                                            fill: (hover || rating) >= star ? 'var(--primary)' : 'transparent',
                                            color: (hover || rating) >= star ? 'var(--primary)' : 'var(--text-secondary)',
                                            transition: 'transform 0.1s'
                                        }}
                                        className="star-hover"
                                    />
                                ))}
                            </div>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                {rating > 0 ? `You rated this ${rating} stars` : 'Select a rating'}
                            </p>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '16px', fontWeight: 700, color: 'var(--text-main)' }}>Quick Mood</label>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {emojis.map((e, idx) => (
                                    <motion.button
                                        key={idx}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setQuickRating(e.label)}
                                        style={{
                                            background: quickRating === e.label ? `${e.color}15` : 'transparent',
                                            border: quickRating === e.label ? `2px solid ${e.color}` : '1px solid var(--glass-border)',
                                            padding: '12px',
                                            borderRadius: '16px',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '8px',
                                            width: '60px'
                                        }}
                                    >
                                        <e.icon size={24} style={{ color: e.color }} />
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        <div style={{ marginBottom: '32px' }}>
                            <label style={{ display: 'block', marginBottom: '12px', fontWeight: 700, color: 'var(--text-main)' }}>Upload Photo</label>
                            <label className="glass" style={{ height: '120px', border: '2px dashed var(--glass-border)', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', position: 'relative', overflow: 'hidden', margin: 0 }}>
                                <input type="file" accept="image/*" capture="environment" onChange={(e) => console.log(e.target.files)} style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer' }} />
                                <Camera size={32} style={{ marginBottom: '8px', zIndex: 1 }} />
                                <span style={{ fontSize: '0.85rem', zIndex: 1, pointerEvents: 'none' }}>Drag or click to take a photo</span>
                            </label>
                        </div>

                        <button onClick={handleSubmit} className="btn-premium" style={{ width: '100%', padding: '16px' }}>
                            <Send size={18} style={{ marginRight: '8px' }} /> Submit Review
                        </button>
                    </motion.div>

                    {/* Anonymous Box */}
                    <div className="glass" style={{ padding: '30px', borderRadius: '32px', background: 'rgba(59, 10, 0, 0.02)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px', color: '#ef4444' }}>
                            <AlertCircle size={20} /> Anonymous Complaint Box
                        </h3>
                        <textarea
                            placeholder="Share your concerns privately..."
                            value={complaintText}
                            onChange={(e) => setComplaintText(e.target.value)}
                            style={{ width: '100%', padding: '16px', borderRadius: '16px', background: 'white', border: '1px solid var(--glass-border)', resize: 'none', marginBottom: '16px', minHeight: '100px' }}
                        />
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                                <input
                                    type="checkbox"
                                    checked={isAnonymous}
                                    onChange={(e) => setIsAnonymous(e.target.checked)}
                                    style={{ width: '18px', height: '18px' }}
                                />
                                Remain Anonymous
                            </label>
                            <button onClick={handleComplaintSubmit} className="glass" style={{ padding: '8px 20px', borderRadius: '12px', color: '#ef4444', border: '1px solid #ef444433', fontWeight: 600 }}>Send</button>
                        </div>
                    </div>
                </div>

                {/* Right Side: Analytics & Social */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                    <div className="glass" style={{ padding: '40px', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)' }}>
                            <ThumbsUp style={{ color: 'var(--primary)' }} /> Weekly Top Rated
                        </h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {topMeals.map((meal, idx) => (
                                <motion.div
                                    key={idx}
                                    whileHover={{ x: 10 }}
                                    style={{ display: 'flex', alignItems: 'center', gap: '20px', padding: '16px', borderRadius: '20px', background: 'rgba(59, 10, 0, 0.03)' }}
                                >
                                    <div style={{ fontSize: '2rem', background: 'white', width: '60px', height: '60px', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        {meal.image}
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ fontWeight: 800, color: 'var(--text-main)' }}>{meal.name}</div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                                            <Star size={14} style={{ fill: 'var(--primary)', color: 'var(--primary)' }} />
                                            {meal.rating} ({meal.reviews} reviews)
                                        </div>
                                    </div>
                                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: 'var(--primary)' }}># {idx + 1}</div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    <div className="glass" style={{ padding: '40px', borderRadius: '32px', background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)', color: 'var(--text-main)' }}>
                        <MessageSquare size={40} style={{ marginBottom: '20px' }} />
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>Feedback Acknowledgement</h3>
                        <p style={{ lineHeight: 1.6, opacity: 0.9 }}>
                            Our management team reviews every piece of feedback. Each report helps us maintain
                            the highest standards of hygiene, taste, and efficiency in your UniCafé.
                        </p>
                    </div>
                </div>
            </div>

            <AnimatePresence>
                {submitted && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        style={{ position: 'fixed', bottom: '40px', right: '40px', background: '#10b981', color: 'white', padding: '20px 40px', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '12px', fontWeight: 700, zIndex: 1000, boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)' }}
                    >
                        <CheckCircle /> Thank you for your feedback!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FeedbackPage;
