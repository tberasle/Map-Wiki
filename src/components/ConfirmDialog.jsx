import React, { useEffect, useRef } from 'react';

const ConfirmDialog = ({ isOpen, title, message, confirmLabel = 'Delete', cancelLabel = 'Cancel', onConfirm, onCancel, variant = 'danger' }) => {
    const cancelRef = useRef(null);

    useEffect(() => {
        if (isOpen && cancelRef.current) {
            cancelRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e) => {
            if (e.key === 'Escape') onCancel();
        };
        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen, onCancel]);

    if (!isOpen) return null;

    const colors = variant === 'danger'
        ? { btn: '#ef4444', btnHover: '#dc2626', border: 'rgba(239,68,68,0.3)', iconBg: 'rgba(239,68,68,0.1)' }
        : { btn: 'var(--primary-color)', btnHover: 'var(--accent-color)', border: 'var(--border-color)', iconBg: 'rgba(59,130,246,0.1)' };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 20000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.15s ease'
        }} onClick={onCancel}>
            <div
                className="glass-panel"
                style={{
                    width: '90%',
                    maxWidth: '420px',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    animation: 'slideUp 0.2s ease'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Icon + Title */}
                <div style={{ padding: '1.5rem 1.5rem 0' }}>
                    <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        backgroundColor: colors.iconBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '1rem'
                    }}>
                        {variant === 'danger' ? (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                                <line x1="12" y1="9" x2="12" y2="13" />
                                <line x1="12" y1="17" x2="12.01" y2="17" />
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        )}
                    </div>
                    <h3 style={{ margin: '0 0 0.5rem', fontSize: '1.15rem' }}>{title}</h3>
                    <p style={{ margin: 0, opacity: 0.7, lineHeight: 1.5, fontSize: '0.9rem' }}>{message}</p>
                </div>

                {/* Actions */}
                <div style={{
                    display: 'flex',
                    gap: '0.75rem',
                    padding: '1.5rem',
                    justifyContent: 'flex-end'
                }}>
                    <button
                        ref={cancelRef}
                        onClick={onCancel}
                        className="btn-small"
                        style={{ padding: '0.5rem 1.25rem' }}
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onConfirm}
                        style={{
                            padding: '0.5rem 1.25rem',
                            borderRadius: '0.5rem',
                            border: `1px solid ${colors.border}`,
                            backgroundColor: colors.btn,
                            color: 'white',
                            cursor: 'pointer',
                            fontWeight: 500,
                            fontSize: '0.85rem',
                            transition: 'background-color 0.2s',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = colors.btnHover}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = colors.btn}
                    >
                        {confirmLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmDialog;
