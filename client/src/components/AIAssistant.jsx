import React, { useState } from 'react';
import { Sparkles, Send, Bot, X, MessageSquare, TrendingUp, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I'm your UniCafé Smart Assistant. I can help you analyze sales data, manage inventory, or suggest menu optimizations. How can I assist you today?" }
    ]);
    const [input, setInput] = useState('');

    const suggestions = [
        "What are the top selling items today?",
        "Show me revenue trends for this week",
        "Which items are low in stock?",
        "Predict next week's peak hours"
    ];

    const handleSend = () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: 'user', content: input }];
        setMessages(newMessages);
        setInput('');

        // Simulate AI response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: "I'm currently processing the latest cafeteria data. Based on current trends, your 'Chicken Kottu' is seeing a 20% spike in orders. I recommend ensuring you have enough ingredients for the evening shift."
            }]);
        }, 1000);
    };

    return (
        <div style={{ position: 'fixed', bottom: '32px', right: '32px', zIndex: 1000 }}>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="glass"
                        style={{
                            width: '400px',
                            height: '500px',
                            marginBottom: '20px',
                            background: 'var(--bg-card)',
                            border: '1px solid var(--glass-border)',
                            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            flexDirection: 'column',
                            overflow: 'hidden'
                        }}
                    >
                        {/* Header */}
                        <div style={{ padding: '20px', background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <Bot size={24} color="white" />
                                <div>
                                    <div style={{ fontWeight: 800, color: 'white' }}>UniCafé AI</div>
                                    <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.9)' }}>Always Learning</div>
                                </div>
                            </div>
                            <X size={20} color="white" style={{ cursor: 'pointer' }} onClick={() => setIsOpen(false)} />
                        </div>

                        {/* Messages */}
                        <div style={{ flex: 1, padding: '20px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            {messages.map((msg, i) => (
                                <div key={i} style={{
                                    alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                                    maxWidth: '85%',
                                    background: msg.role === 'user' ? 'var(--primary)' : 'rgba(59, 10, 0, 0.05)',
                                    padding: '12px 16px',
                                    borderRadius: msg.role === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                    fontSize: '0.875rem',
                                    lineHeight: 1.5,
                                    color: msg.role === 'user' ? 'var(--text-main)' : 'var(--text-main)',
                                    border: msg.role === 'assistant' ? '1px solid var(--glass-border)' : 'none'
                                }}>
                                    {msg.content}
                                </div>
                            ))}
                        </div>

                        {/* Input Area */}
                        <div style={{ padding: '20px', background: 'rgba(255, 255, 255, 0.5)', borderTop: '1px solid var(--glass-border)' }}>
                            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                                {suggestions.slice(0, 2).map((s, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setInput(s)}
                                        style={{ fontSize: '0.7rem', padding: '6px 10px', borderRadius: '20px', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid var(--glass-border)', color: 'var(--text-main)', cursor: 'pointer' }}
                                    >
                                        {s}
                                    </button>
                                ))}
                            </div>
                            <div style={{ display: 'flex', gap: '10px' }}>
                                <input
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask for insights..."
                                    style={{ flex: 1, background: 'white', border: '1px solid var(--glass-border)', padding: '10px 16px', borderRadius: '12px', color: 'var(--text-main)', fontSize: '0.875rem' }}
                                />
                                <button
                                    onClick={handleSend}
                                    style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 10px rgba(239, 68, 68, 0.2)' }}
                                >
                                    <Send size={18} color="var(--text-main)" />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '20px',
                    background: 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 8px 20px rgba(239, 68, 68, 0.4)',
                    cursor: 'pointer'
                }}
            >
                {isOpen ? <X size={28} color="var(--text-main)" /> : <Sparkles size={28} color="var(--text-main)" />}
            </motion.button>
        </div>
    );
};

export default AIAssistant;
