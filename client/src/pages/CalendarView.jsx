import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Clock, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CalendarView = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [menuItems, setMenuItems] = useState([]);

    // Mock Events
    const events = {
        '2026-03-05': { type: 'closing', title: 'Renovation Day', desc: 'Canteen closed for kitchen upgrades.' },
        '2026-03-12': { type: 'event', title: 'Sri Lankan Night', desc: 'Special 20% discount on all Rice & Curry!' },
        '2026-03-20': { type: 'closing', title: 'Public Holiday', desc: 'University closed for the holiday.' },
        '2026-03-27': { type: 'event', title: 'Chef\'s Special', desc: 'Trying out new Seafood Pasta recipe.' },
        '2026-04-14': { type: 'event', title: 'New Year Festival', desc: 'Special Kavum & Kokis treats!' }
    };

    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('/api/menu');
                setMenuItems(response.data);
            } catch (err) {
                console.error('Error fetching menu:', err);
                // Fallback mock check handled in filtering
            }
        };
        fetchMenu();
    }, []);

    const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const changeMonth = (offset) => {
        const nextDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + offset, 1);
        setCurrentDate(nextDate);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);

    const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

    const isToday = (day) => {
        const today = new Date();
        return today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    };

    const isSelected = (day) => {
        return selectedDate.getDate() === day && selectedDate.getMonth() === month && selectedDate.getFullYear() === year;
    };

    const formatDateKey = (day) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const selectedDateKey = formatDateKey(selectedDate.getDate());
    const dayEvent = events[selectedDateKey];
    const selectedDayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(selectedDate);

    // Simple weekday-based menu logic as fallback/connection
    const filteredItems = menuItems.filter(item =>
        item.availableDays && item.availableDays.includes(selectedDayName)
    );

    return (
        <div className="calendar-view" style={{ padding: '2rem 5%', minHeight: '100vh', background: 'var(--bg-page)' }}>
            <div style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-main)', fontWeight: 900 }}>
                        Canteen <span className="gradient-text">Pulse Calendar</span>
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Stay updated with daily menus and special cafeteria events.</p>
                </div>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f59e0b' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Special Event</span>
                    </div>
                    <div className="glass" style={{ padding: '0.5rem 1rem', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-secondary)' }}>Canteen Closed</span>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
                {/* Calendar Grid */}
                <div className="glass" style={{ padding: '2.5rem', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 900, color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <CalendarIcon size={24} color="var(--primary)" />
                            {monthName} <span style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>{year}</span>
                        </h2>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <button onClick={() => changeMonth(-1)} className="glass hover-scale" style={{ p: '10px', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer', color: 'var(--text-main)' }}>
                                <ChevronLeft size={20} />
                            </button>
                            <button onClick={() => changeMonth(1)} className="glass hover-scale" style={{ p: '10px', borderRadius: '12px', border: '1px solid var(--glass-border)', cursor: 'pointer', color: 'var(--text-main)' }}>
                                <ChevronRight size={20} />
                            </button>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '12px', textAlign: 'center' }}>
                        {daysOfWeek.map(day => (
                            <div key={day} style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--text-secondary)', paddingBottom: '12px' }}>
                                {day.toUpperCase()}
                            </div>
                        ))}

                        {/* Empty slots for first day offset */}
                        {[...Array(firstDay)].map((_, i) => (
                            <div key={`empty-${i}`} style={{ aspectRatio: '1/1' }} />
                        ))}

                        {[...Array(daysInMonth)].map((_, i) => {
                            const d = i + 1;
                            const dateKey = formatDateKey(d);
                            const event = events[dateKey];
                            const selected = isSelected(d);
                            const today = isToday(d);

                            return (
                                <motion.div
                                    key={d}
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    onClick={() => setSelectedDate(new Date(year, month, d))}
                                    style={{
                                        aspectRatio: '1/1',
                                        borderRadius: '16px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        position: 'relative',
                                        background: selected ? 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)' : 'rgba(59, 10, 0, 0.03)',
                                        border: today ? '2px solid var(--primary)' : '1px solid transparent',
                                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                                    }}
                                >
                                    <span style={{
                                        fontSize: '1.25rem',
                                        fontWeight: 800,
                                        color: selected ? 'var(--text-main)' : (today ? 'var(--primary)' : 'var(--text-main)')
                                    }}>
                                        {d}
                                    </span>
                                    {event && (
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '8px',
                                            width: '6px',
                                            height: '6px',
                                            borderRadius: '50%',
                                            background: event.type === 'closing' ? '#ef4444' : '#f59e0b',
                                            boxShadow: `0 0 10px ${event.type === 'closing' ? 'rgba(239, 68, 68, 0.5)' : 'rgba(245, 158, 11, 0.5)'}`
                                        }} />
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Event & Menu Sidebar */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <motion.div
                        key={selectedDateKey}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="glass"
                        style={{ padding: '2.5rem', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}
                    >
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '0.5rem', color: 'var(--text-main)' }}>
                            {selectedDayName}, {monthName} {selectedDate.getDate()}
                        </h3>

                        {dayEvent ? (
                            <div style={{
                                padding: '1.5rem',
                                borderRadius: '20px',
                                background: dayEvent.type === 'closing' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                                border: `1px solid ${dayEvent.type === 'closing' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(245, 158, 11, 0.2)'}`,
                                marginTop: '1.5rem'
                            }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: dayEvent.type === 'closing' ? '#ef4444' : '#f59e0b' }} />
                                    <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: dayEvent.type === 'closing' ? '#ef4444' : '#f59e0b' }}>
                                        {dayEvent.type === 'closing' ? 'Canteen Closed' : 'Special Event'}
                                    </span>
                                </div>
                                <h4 style={{ fontSize: '1.125rem', fontWeight: 800, marginBottom: '4px' }}>{dayEvent.title}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>{dayEvent.desc}</p>
                            </div>
                        ) : (
                            <div style={{ marginTop: '1.5rem' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                                    <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#10b981' }} />
                                    <span style={{ fontWeight: 800, textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', color: '#10b981' }}>
                                        Canteen Open
                                    </span>
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {['Breakfast', 'Lunch', 'Dinner'].map(meal => (
                                        <div key={meal} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', background: 'rgba(59, 10, 0, 0.03)', borderRadius: '12px' }}>
                                            <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{meal}</span>
                                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Available</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {!dayEvent && (
                            <button className="btn-premium" style={{ width: '100%', marginTop: '2rem', padding: '1rem' }}>
                                <Link to="/order" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                    Pre-order Meal <Plus size={18} />
                                </Link>
                            </button>
                        )}
                    </motion.div>

                    <div className="glass" style={{ padding: '2rem', borderRadius: '32px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
                        <h4 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '1rem', color: 'var(--text-main)' }}>Notes</h4>
                        <div style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                            Evening snacks are available daily from 3:30 PM to 6:00 PM. Weekend menus may vary based on ingredient availability.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarView;
