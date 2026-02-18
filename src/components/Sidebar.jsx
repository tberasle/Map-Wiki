
import React, { useState } from 'react';
import { Download, Upload, Trash2, Moon, Sun, Map as MapIcon, ChevronRight, Volume2, VolumeX, Search, Filter, Image, HelpCircle } from 'lucide-react';
import HelpPanel from './HelpPanel';
import { sfx } from '../utils/SoundManager';
import { ICONS } from '../utils/constants';

const SidebarSection = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div style={{ borderBottom: '1px solid var(--border-color)' }}>
            <div
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    padding: '0.75rem 1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontWeight: '600',
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    userSelect: 'none'
                }}
            >
                {title}
                <ChevronRight size={16} style={{ transform: isOpen ? 'rotate(90deg)' : 'none', transition: 'transform 0.3s ease' }} />
            </div>
            <div style={{
                display: 'grid',
                gridTemplateRows: isOpen ? '1fr' : '0fr',
                transition: 'grid-template-rows 0.3s ease-out',
                opacity: isOpen ? 1 : 0.5
            }}>
                <div style={{ overflow: 'hidden' }}>
                    <div style={{ padding: '0.5rem 0' }}>
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

const Sidebar = ({
    pins,
    onSelectPin,
    onDeletePin,
    onExport,
    onImport,
    onToggleTheme,
    isDarkMode,
    breadcrumbs,
    onNavigate,
    onBack,
    activeFilters = [],
    onToggleFilter,

    onOpenAtlas,
    onExportImage,
    isGlobalEditMode,
    onToggleGlobalEdit,
    starSettings,
    onUpdateStarSettings,
    onResetStarSettings,
    projectName,
    currentViewId,
    rootTitle,
    rootDescription,
    onUpdateRootTitle,
    onUpdateRootDescription,
    allItems = []
}) => {
    const [isMuted, setIsMuted] = useState(sfx.muted);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchScope, setSearchScope] = useState('local'); // 'local' or 'global'
    const [showFilters, setShowFilters] = useState(false);
    const [showHelp, setShowHelp] = useState(false);

    const toggleMute = () => {
        const muted = sfx.toggleMute();
        setIsMuted(muted);
    };

    const targetList = searchScope === 'local' ? pins : allItems;

    const filteredPins = targetList.filter(pin => {
        const matchesSearch = (pin.title || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesFilter = activeFilters.length === 0 || activeFilters.includes(pin.icon);
        return matchesSearch && matchesFilter;
    });

    return (
        <>
            <div className="wiki-sidebar glass-panel" style={{ width: '350px', display: 'flex', flexDirection: 'column', height: '100%', pointerEvents: 'auto' }}>
                <div className="sidebar-header" style={{ gap: '0.5rem', flexShrink: 0 }}>
                    <button
                        className="btn-small"
                        onClick={onBack}
                        onMouseEnter={() => { }}
                        title="Back to Dashboard"
                        style={{ marginRight: '0.5rem' }}
                    >
                        <ChevronRight size={16} style={{ transform: 'rotate(180deg)' }} />
                    </button>
                    <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.2rem' }}>
                        <img src="/logo.png" alt="Map Wiki" style={{ width: '28px', height: '28px', borderRadius: '6px' }} />
                        {projectName || 'Wiki Map'}
                    </h2>
                    <div style={{ flex: 1 }} />
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', padding: '0 1rem', marginBottom: '0.5rem', flexShrink: 0 }}>
                    <button className="btn-small" onClick={toggleMute} onMouseEnter={() => { }} title={isMuted ? "Unmute SFX" : "Mute SFX"} style={{ flex: 1, justifyContent: 'center' }}>
                        {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <button className="btn-small" onClick={onToggleTheme} onMouseEnter={() => { }} title="Toggle Theme" style={{ flex: 1, justifyContent: 'center' }}>
                        {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
                    </button>
                    <button className="btn-small" onClick={() => setShowHelp(true)} onMouseEnter={() => { }} title="Help & Knowledge Base" style={{ flex: 1, justifyContent: 'center' }}>
                        <HelpCircle size={16} />
                    </button>
                </div>

                {/* Breadcrumbs */}
                <div className="breadcrumbs" style={{
                    padding: '0.5rem',
                    marginBottom: '0',
                    fontSize: '0.9rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '0.25rem',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    {breadcrumbs && breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={crumb.id}>
                            {index > 0 && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
                            <span
                                style={{
                                    cursor: 'pointer',
                                    color: index === breadcrumbs.length - 1 ? 'var(--primary-color)' : 'var(--text-color)',
                                    fontWeight: index === breadcrumbs.length - 1 ? 'bold' : 'normal',
                                    opacity: index === breadcrumbs.length - 1 ? 1 : 0.8
                                }}
                                onClick={() => onNavigate(crumb.id)}
                                onMouseEnter={() => { }}
                            >
                                {crumb.title || 'Untitled'}
                            </span>
                        </React.Fragment>
                    ))}
                </div>


                <div className="sidebar-scroll-area" style={{ flex: 1, overflowY: 'auto' }}>

                    {/* Section 1: Main Map Details (Root Only) */}
                    {currentViewId === 'root' && (
                        <SidebarSection title="Main Map Details" defaultOpen={true}>
                            <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                                <input
                                    type="text"
                                    placeholder="Title (e.g. Solar System)"
                                    value={rootTitle || ''}
                                    onChange={(e) => onUpdateRootTitle(e.target.value)}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: '0.25rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--secondary-color)',
                                        color: 'var(--text-color)',
                                        width: '100%'
                                    }}
                                />
                                <textarea
                                    placeholder="Description..."
                                    value={rootDescription || ''}
                                    onChange={(e) => onUpdateRootDescription(e.target.value)}
                                    style={{
                                        padding: '0.5rem',
                                        borderRadius: '0.25rem',
                                        border: '1px solid var(--border-color)',
                                        backgroundColor: 'var(--secondary-color)',
                                        color: 'var(--text-color)',
                                        width: '100%',
                                        resize: 'vertical',
                                        minHeight: '60px',
                                        fontFamily: 'inherit'
                                    }}
                                />
                            </div>
                        </SidebarSection>
                    )}

                    {/* Section 2: Locations */}
                    <SidebarSection title="Locations" defaultOpen={true}>
                        <div style={{ padding: '0 1rem 0.5rem 1rem' }}>
                            {/* Search Input Row */}
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: 'var(--secondary-color)',
                                borderRadius: '0.5rem',
                                padding: '0.5rem',
                                border: '1px solid var(--border-color)',
                                marginBottom: '0.5rem'
                            }}>
                                <Search size={16} style={{ opacity: 0.5, marginRight: '0.5rem' }} />
                                <input
                                    type="text"
                                    placeholder={searchScope === 'local' ? "Search current map..." : "Search all maps..."}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    style={{
                                        border: 'none',
                                        background: 'transparent',
                                        color: 'var(--text-color)',
                                        outline: 'none',
                                        width: '100%'
                                    }}
                                />
                            </div>

                            {/* Toggle & Filter Row */}
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: showFilters ? '0.5rem' : 0 }}>
                                <div
                                    className="toggle-switch"
                                    onClick={() => setSearchScope(searchScope === 'local' ? 'global' : 'local')}
                                    title={searchScope === 'local' ? "Switch to All Projects" : "Switch to Local Map"}
                                    style={{
                                        marginTop: 0,
                                        width: '120px',
                                        height: '30px',
                                        borderRadius: '15px',
                                        boxShadow: 'none',
                                        border: '1px solid var(--border-color)'
                                    }}
                                >
                                    <div className={`toggle-option ${searchScope === 'local' ? 'active' : ''}`} style={{ fontSize: '0.75rem', lineHeight: '30px' }}>Local</div>
                                    <div className={`toggle-option ${searchScope === 'global' ? 'active' : ''}`} style={{ fontSize: '0.75rem', lineHeight: '30px' }}>All</div>
                                    <div
                                        className={`toggle-slider ${searchScope === 'global' ? 'right' : 'left'}`}
                                        style={{
                                            borderRadius: '13px',
                                            width: 'calc(50% - 4px)',
                                            height: 'calc(100% - 4px)',
                                            top: '2px',
                                            left: '2px'
                                        }}
                                    />
                                </div>

                                <button className="btn-small" onClick={onOpenAtlas} title="Atlas View" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.25rem 0.5rem' }}>
                                    <MapIcon size={16} /> Atlas
                                </button>
                                <button
                                    className="icon-btn"
                                    onClick={() => { setShowFilters(!showFilters); }}
                                    onMouseEnter={() => { }}
                                    style={{
                                        backgroundColor: showFilters || activeFilters.length > 0 ? 'var(--secondary-color)' : 'transparent',
                                        border: showFilters || activeFilters.length > 0 ? '1px solid var(--accent-color)' : '1px solid var(--border-color)',
                                        color: showFilters || activeFilters.length > 0 ? 'var(--accent-color)' : 'var(--text-color)',
                                        borderRadius: '0.5rem',
                                        padding: '0.5rem',
                                        height: 'auto'
                                    }}
                                    title="Toggle Filters"
                                >
                                    <Filter size={20} />
                                </button>
                            </div>

                            {showFilters && (
                                <div style={{
                                    display: 'grid',
                                    gridTemplateColumns: 'repeat(6, 1fr)',
                                    gap: '0.25rem',
                                    padding: '0.5rem',
                                    backgroundColor: 'rgba(0,0,0,0.1)',
                                    borderRadius: '0.5rem',
                                    marginBottom: '0.5rem',
                                    marginTop: '0.5rem'
                                }}>
                                    {ICONS.map(item => {
                                        const isActive = activeFilters.includes(item.id);
                                        const isOthersActive = activeFilters.length > 0;
                                        return (
                                            <button
                                                key={item.id}
                                                onClick={() => { onToggleFilter(item.id); }}
                                                onMouseEnter={() => { }}
                                                title={item.label}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    padding: '0.25rem',
                                                    border: isActive ? 'none' : '1px solid var(--border-color)',
                                                    borderRadius: '4px',
                                                    backgroundColor: isActive ? 'var(--accent-color)' : 'transparent',
                                                    color: isActive ? 'white' : 'var(--text-color)',
                                                    cursor: 'pointer',
                                                    opacity: isActive || !isOthersActive ? 1 : 0.4
                                                }}
                                            >
                                                <item.icon size={16} />
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                        <h3 style={{ padding: '0 1rem', fontSize: '1rem', marginTop: '0.5rem' }}>Locations ({filteredPins.length})</h3>
                        {filteredPins.length === 0 && <p style={{ opacity: 0.6, fontStyle: 'italic', padding: '0 1rem' }}>No items found.</p>}
                        <ul style={{ listStyle: 'none', padding: '0 1rem', margin: 0 }}>
                            {filteredPins.map(pin => (
                                <li
                                    key={pin.id}
                                    className="pin-list-item"
                                    style={{
                                        padding: '0.75rem',
                                        marginBottom: '0.5rem',
                                        backgroundColor: 'var(--secondary-color)',
                                        borderRadius: '0.5rem',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        border: '1px solid var(--border-color)',
                                        borderLeft: pin.mapImage ? '4px solid var(--accent-color)' : '1px solid var(--border-color)'
                                    }}
                                    onClick={() => {
                                        if (searchScope === 'global' && pin.parentId && pin.parentId !== currentViewId) {
                                            onNavigate(pin.parentId);
                                        }
                                        onSelectPin(pin.id);
                                    }}
                                    onMouseEnter={() => { }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        {(() => {
                                            const iconDef = ICONS.find(i => i.id === pin.icon) || ICONS[0];
                                            const IconComp = iconDef.icon;
                                            return <IconComp size={16} color={pin.color || '#ef4444'} />;
                                        })()}
                                        <span style={{ fontWeight: '500' }}>{pin.title || 'Untitled'}</span>
                                        {pin.mapImage && <MapIcon size={12} color="var(--accent-color)" />}
                                    </div>
                                    {isGlobalEditMode && (
                                        <button
                                            onClick={(e) => { e.stopPropagation(); onDeletePin(pin.id); }}
                                            style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                                            title="Delete Location"
                                            onMouseEnter={() => { }}
                                        >
                                            <Trash2 size={14} />
                                        </button>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </SidebarSection>

                    {/* Section 3: Visual Effects */}
                    <SidebarSection title="Visual Effects" defaultOpen={false}>
                        {starSettings && onUpdateStarSettings ? (
                            <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'rgba(0,0,0,0.1)' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <label>Star Color</label>
                                    <input
                                        type="color"
                                        value={starSettings.starColor}
                                        onChange={(e) => onUpdateStarSettings({ ...starSettings, starColor: e.target.value })}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', width: '30px', height: '30px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <label>Nebula Color</label>
                                    <input
                                        type="color"
                                        value={starSettings.nebulaColor || '#4c1d95'}
                                        onChange={(e) => onUpdateStarSettings({ ...starSettings, nebulaColor: e.target.value })}
                                        style={{ border: 'none', background: 'none', cursor: 'pointer', width: '30px', height: '30px' }}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    <label>Nebula Intensity: {Math.round((starSettings.nebulaIntensity || 0) * 100)}%</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="1"
                                        step="0.1"
                                        value={starSettings.nebulaIntensity || 0}
                                        onChange={(e) => onUpdateStarSettings({ ...starSettings, nebulaIntensity: parseFloat(e.target.value) })}
                                    />
                                </div>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                                    <label>Star Twinkle: {starSettings.twinkleSpeed || 0}x</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.1"
                                        value={starSettings.twinkleSpeed !== undefined ? starSettings.twinkleSpeed : 0.5}
                                        onChange={(e) => onUpdateStarSettings({ ...starSettings, speed: 0, twinkleSpeed: parseFloat(e.target.value) })}
                                    />
                                </div>
                                {onResetStarSettings && (
                                    <button
                                        className="btn-small"
                                        onClick={onResetStarSettings}
                                        style={{
                                            marginTop: '0.5rem',
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.5rem',
                                            padding: '0.5rem',
                                            backgroundColor: 'transparent',
                                            border: '1px dashed var(--border-color)',
                                            color: 'var(--text-color)',
                                            opacity: 0.8,
                                            cursor: 'pointer'
                                        }}
                                        title="Reset to Inherited/Default Settings"
                                        onMouseEnter={() => { }}
                                    >
                                        Reset to Default
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div style={{ padding: '1rem', fontStyle: 'italic', opacity: 0.5 }}>No settings available</div>
                        )}
                    </SidebarSection>

                    {/* Section 4: Load/Save */}
                    <SidebarSection title="Load/Save" defaultOpen={false}>
                        <div style={{ padding: '0.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                                <label className="btn-small" title="Import JSON" style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, justifyContent: 'center' }} onMouseEnter={() => { }}>
                                    <Upload size={16} /> Import JSON
                                    <input type="file" onChange={onImport} accept=".json" style={{ display: 'none' }} />
                                </label>
                                <button className="btn-small" onClick={onExport} title="Export JSON" style={{ flex: 1, justifyContent: 'center' }} onMouseEnter={() => { }}>
                                    <Download size={16} /> Export JSON
                                </button>
                            </div>
                            <button className="btn-small" onClick={onExportImage} title="Export Map as PNG" style={{ marginTop: '0.5rem', width: '100%', justifyContent: 'center' }} onMouseEnter={() => { }}>
                                <Image size={16} /> Export PNG
                            </button>
                        </div>
                    </SidebarSection>

                </div>
            </div>
            {showHelp && <HelpPanel onClose={() => setShowHelp(false)} />}
        </>
    );
};
export default Sidebar;
