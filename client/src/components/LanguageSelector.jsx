import React from 'react';
import { Globe } from 'lucide-react';

const LanguageSelector = ({ currentLang, onLanguageChange }) => {
    const languages = [
        { code: 'en', name: 'English' },
        { code: 'si', name: 'සිංහල' },
        { code: 'ta', name: 'தமிழ்' }
    ];

    return (
        <div className="glass" style={{ padding: '0.4rem 0.6rem', display: 'flex', alignItems: 'center', gap: '0.6rem', borderRadius: '14px', background: 'var(--bg-card)', border: '1px solid var(--glass-border)' }}>
            <Globe size={18} style={{ color: 'var(--primary)' }} />
            <div style={{ display: 'flex', gap: '4px' }}>
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => onLanguageChange(lang.code)}
                        style={{
                            background: currentLang === lang.code ? 'linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)' : 'transparent',
                            color: 'var(--text-main)',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '10px',
                            cursor: 'pointer',
                            fontSize: '0.8125rem',
                            fontWeight: 800,
                            opacity: currentLang === lang.code ? 1 : 0.6,
                            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                            boxShadow: currentLang === lang.code ? '0 4px 10px rgba(192, 122, 46, 0.2)' : 'none'
                        }}
                    >
                        {lang.name}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default LanguageSelector;
