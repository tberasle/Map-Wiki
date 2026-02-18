import React, { useState } from 'react';

const HELP_ARTICLES = [
    {
        category: 'Getting Started',
        icon: '🚀',
        articles: [
            {
                title: 'Creating a New Project',
                content: `From the Dashboard, click **"New Project"** and enter a name. This creates an empty project with a starfield background ready for your map.

**Tip:** You can also **Import** an existing project JSON file using the Import button.`
            },
            {
                title: 'Adding a Map Image',
                content: `Once inside a project, **drag and drop** any image file onto the canvas area. This becomes your map background.

Supported formats include PNG, JPG, and WebP. For best results, use high-resolution images (2000x2000+).

**To remove a map:** In Edit mode, click the red trash icon in the top-right corner.`
            },
            {
                title: 'View Mode vs Edit Mode',
                content: `The toggle in the **bottom-left corner** switches between two modes:

- **View Mode:** Browse your maps without accidentally moving pins or making changes. Ideal for presentation or exploration.
- **Edit Mode:** Enables all editing features — add, move, and delete pins, drag map images, and modify content.

Projects open in **View mode** by default.`
            }
        ]
    },
    {
        category: 'Locations & Pins',
        icon: '📍',
        articles: [
            {
                title: 'Adding Locations',
                content: `In **Edit mode**, **right-click** anywhere on the map to open the context menu and select **"Add Location"**. A new pin will appear at that position.

Click the pin to select it and open the **Wiki Editor** panel, where you can set its name, icon, size, and rich-text description.`
            },
            {
                title: 'Pin Icons & Sizes',
                content: `Each location pin can be customized with:

- **Icon:** Choose from presets like Planet, Star, Rocket, Shield, Skull, and more.
- **Size:** Options range from **XS** (tiny) to **XL** (extra large).
- **Color:** Set a custom color for the pin.
- **Show Label:** Toggle whether the pin's name appears on the map.

Labels maintain a consistent readable size regardless of pin scale or zoom level.`
            },
            {
                title: 'Nested Maps (Sub-Locations)',
                content: `Any location can have its **own map**. This lets you create a hierarchy:

1. Select a pin and open the Wiki Editor.
2. In the editor, add a **Location Map** image using the upload button.
3. **Double-click** the pin (or click it twice) to zoom into that location's sub-map.
4. Use the **Back** button (top-left) to zoom back out.

This system lets you build deep, layered worlds — from galaxies down to individual rooms.`
            },
            {
                title: 'Connections (Quick Links)',
                content: `You can draw visual connections between locations:

1. **Right-click** a pin and select **"Connect"**.
2. Click another pin to create a connection line between them.
3. Connections appear as lines on the map.

To remove a connection, open the Wiki Editor for the source pin and click the ✕ next to the connected location.`
            },
            {
                title: 'Deleting Locations',
                content: `There are multiple ways to delete a location:

- **Right-click** the pin → **Delete**
- Select the pin and press the **Delete** key
- Use the **trash icon** next to the location in the sidebar
- Click **Delete** in the Wiki Editor

⚠️ **Warning:** Deleting a location also removes all of its sub-locations and their content.`
            }
        ]
    },
    {
        category: 'Visual Effects',
        icon: '✨',
        articles: [
            {
                title: 'Starfield & Nebula Background',
                content: `The animated starfield background can be customized in the **Visual Effects** section of the sidebar:

- **Star Color:** Changes the color of the stars.
- **Nebula Color:** Sets the color of the nebula glow effect.
- **Nebula Intensity:** Controls how strong the nebula effect is (0-100%).
- **Star Twinkle:** Adjusts how fast stars twinkle.`
            },
            {
                title: 'Visual Effects Inheritance',
                content: `Visual effects use a **parent inheritance** system:

- **Root level** settings apply to the main map and act as the default for all sub-locations.
- **Sub-locations** inherit their parent's visual effects unless they have their own custom settings.
- If a sub-location has custom settings, those are used instead.

**Example:** If you set the root nebula to purple, all sub-locations will also have a purple nebula — unless you explicitly change one.

**Resetting:** Click **"Reset to Default"** in the Visual Effects section to remove a location's custom settings and revert to inheriting from its parent.`
            },
            {
                title: 'Smooth Transitions',
                content: `When navigating between locations with different visual settings, the background **smoothly transitions**:

- Nebula color gradually shifts
- Star intensity fades
- Twinkling speed adjusts

This creates an immersive "traveling through space" feeling as you move between different areas of your world.`
            },
            {
                title: 'Warp Effect',
                content: `When you zoom into or out of a sub-location, a **warp speed** effect plays:

- Stars streak outward from the clicked pin's position
- The effect direction matches your navigation (zooming in vs backing out)
- Combined with sound effects for full immersion

The warp effect is automatic and cannot be disabled independently.`
            }
        ]
    },
    {
        category: 'Data & Storage',
        icon: '💾',
        articles: [
            {
                title: 'Auto-Save',
                content: `All changes are **automatically saved** to your browser's local database (IndexedDB) within 1 second of any change. You never need to manually save.

⚠️ **Important:** Data is stored **locally in your browser**. Clearing browser data will erase your projects. Always keep backups using the Export feature.`
            },
            {
                title: 'Export & Import (JSON)',
                content: `**Exporting** creates a JSON file containing all locations, maps, and content for the current project.

- From the sidebar, scroll to **Map Configuration (JSON)** and click **Export**.
- The file is named with the project name and timestamp.

**Importing** restores a previously exported project:
- From the sidebar, click **Import** and select a JSON file.
- From the Dashboard, use the **Import** button to add a new project.`
            },
            {
                title: 'Export Map as PNG',
                content: `You can capture your current map view as an image:

1. Navigate to the map view you want to capture.
2. In the sidebar, click the **Image** export button.
3. A PNG file will download with all visible pins and labels.

This is useful for sharing maps outside the app or printing.`
            },
            {
                title: 'IndexedDB Storage',
                content: `This app uses **IndexedDB** for storage instead of localStorage. This provides:

- **Much larger capacity** — supports maps with large, high-resolution images (10MB+)
- **No quota errors** — avoids the 5-10MB localStorage limit
- **Better performance** — asynchronous operations don't block the UI

Your data remains local to your browser and device.`
            }
        ]
    },
    {
        category: 'Navigation & UI',
        icon: '🧭',
        articles: [
            {
                title: 'Breadcrumb Navigation',
                content: `The **breadcrumb trail** at the top of the sidebar shows your current location hierarchy:

\`Main Map > Continent > City > Building\`

Click any breadcrumb to jump directly to that level. This is the fastest way to navigate up multiple levels.`
            },
            {
                title: 'Atlas View',
                content: `The **Atlas View** provides a tree-style overview of your entire project:

- Click the **Atlas** button in the sidebar to open it.
- See all locations organized in a collapsible hierarchy.
- Click any location to navigate directly to it.

This is invaluable for large projects with many nested levels.`
            },
            {
                title: 'Search & Filters',
                content: `**Search:** Use the search bar in the sidebar to filter locations by name.

**Icon Filters:** Click the **Filter** button to show/hide locations by their icon type. This is useful for projects with many diverse location types (e.g., show only planets, hide outposts).`
            },
            {
                title: 'Keyboard Shortcuts',
                content: `- **Delete** key — Delete the selected pin (when not typing in an input)
- **Right-click** on map — Open context menu to add a location
- **Right-click** on pin — Open context menu with edit/delete/connect options
- **Double-click** pin — Zoom into sub-location (if it has a map)
- **Mouse wheel** — Zoom the map
- **Click + drag** — Pan the map`
            }
        ]
    },
    {
        category: 'Sample Projects',
        icon: '📦',
        articles: [
            {
                title: 'Pre-loaded Sample Projects',
                content: `The app comes with sample projects that are **automatically loaded** on first launch.

These demonstrate the app's capabilities and can serve as templates. Feel free to explore, modify, or delete them.

**Note:** Sample projects are only loaded once. If you delete one, it won't reappear unless you clear your browser data.`
            },
            {
                title: 'Renaming & Managing Projects',
                content: `On the Dashboard, each project card has two action buttons:

- **✏️ Pencil icon** — Click to rename the project inline. Press **Enter** to save or **Escape** to cancel.
- **🗑️ Trash icon** — Delete the project permanently.

Click anywhere on a project card to open it.`
            }
        ]
    }
];

const HelpPanel = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedArticle, setExpandedArticle] = useState(null); // 'category-index'
    const [expandedCategory, setExpandedCategory] = useState(null);

    const filteredCategories = HELP_ARTICLES.map(cat => ({
        ...cat,
        articles: cat.articles.filter(article =>
            article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.content.toLowerCase().includes(searchQuery.toLowerCase())
        )
    })).filter(cat => cat.articles.length > 0);

    const renderMarkdown = (text) => {
        // Simple markdown-ish rendering
        return text
            .split('\n\n')
            .map((block, i) => {
                // Convert **bold** to <strong>
                let html = block.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                // Convert `code` to <code>
                html = html.replace(/`(.*?)`/g, '<code style="background:rgba(255,255,255,0.1);padding:0.1em 0.4em;border-radius:3px;font-size:0.9em">$1</code>');
                // Convert lines starting with - to list items
                const lines = html.split('\n');
                const isList = lines.every(l => l.trim().startsWith('- ') || l.trim() === '');
                if (isList && lines.some(l => l.trim().startsWith('- '))) {
                    const items = lines
                        .filter(l => l.trim().startsWith('- '))
                        .map(l => l.trim().substring(2));
                    return (
                        <ul key={i} style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                            {items.map((item, j) => (
                                <li key={j} style={{ marginBottom: '0.25rem' }} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                        </ul>
                    );
                }
                // Numbered lists
                const isNumberedList = lines.every(l => /^\d+\./.test(l.trim()) || l.trim() === '');
                if (isNumberedList && lines.some(l => /^\d+\./.test(l.trim()))) {
                    const items = lines
                        .filter(l => /^\d+\./.test(l.trim()))
                        .map(l => l.trim().replace(/^\d+\.\s*/, ''));
                    return (
                        <ol key={i} style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                            {items.map((item, j) => (
                                <li key={j} style={{ marginBottom: '0.25rem' }} dangerouslySetInnerHTML={{ __html: item }} />
                            ))}
                        </ol>
                    );
                }
                // Warning callouts
                if (html.includes('⚠️')) {
                    return (
                        <div key={i} style={{
                            backgroundColor: 'rgba(234, 179, 8, 0.1)',
                            border: '1px solid rgba(234, 179, 8, 0.3)',
                            borderRadius: '0.5rem',
                            padding: '0.75rem 1rem',
                            margin: '0.5rem 0',
                            fontSize: '0.9rem'
                        }} dangerouslySetInnerHTML={{ __html: html }} />
                    );
                }
                return <p key={i} style={{ margin: '0.5rem 0', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: html }} />;
            });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            backdropFilter: 'blur(4px)',
            animation: 'fadeIn 0.2s ease'
        }} onClick={onClose}>
            <div
                className="glass-panel"
                style={{
                    width: '90%',
                    maxWidth: '720px',
                    maxHeight: '85vh',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '1rem',
                    overflow: 'hidden',
                    animation: 'slideUp 0.3s ease'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{
                    padding: '1.5rem 2rem',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexShrink: 0
                }}>
                    <h2 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                        <span style={{ fontSize: '1.5rem' }}>📖</span>
                        Help & Knowledge Base
                    </h2>
                    <button
                        onClick={onClose}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: 'var(--text-color)',
                            cursor: 'pointer',
                            padding: '0.5rem',
                            fontSize: '1.5rem',
                            lineHeight: 1,
                            opacity: 0.6,
                            transition: 'opacity 0.2s'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.opacity = 1}
                        onMouseLeave={(e) => e.currentTarget.style.opacity = 0.6}
                    >
                        ✕
                    </button>
                </div>

                {/* Search */}
                <div style={{ padding: '1rem 2rem', flexShrink: 0 }}>
                    <input
                        type="text"
                        placeholder="Search help articles..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '0.5rem',
                            border: '1px solid var(--border-color)',
                            backgroundColor: 'var(--bg-color)',
                            color: 'var(--text-color)',
                            fontSize: '0.95rem',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }}
                    />
                </div>

                {/* Content */}
                <div style={{
                    flex: 1,
                    overflowY: 'auto',
                    padding: '0 2rem 2rem'
                }}>
                    {filteredCategories.length === 0 ? (
                        <div style={{ textAlign: 'center', opacity: 0.5, padding: '3rem 0' }}>
                            <p style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔍</p>
                            <p>No articles found for "{searchQuery}"</p>
                        </div>
                    ) : (
                        filteredCategories.map((category, catIdx) => (
                            <div key={catIdx} style={{ marginBottom: '1rem' }}>
                                {/* Category Header */}
                                <div
                                    onClick={() => setExpandedCategory(expandedCategory === catIdx ? null : catIdx)}
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        padding: '0.75rem 0',
                                        cursor: 'pointer',
                                        borderBottom: '1px solid var(--border-color)',
                                        userSelect: 'none'
                                    }}
                                >
                                    <span style={{ fontSize: '1.2rem' }}>{category.icon}</span>
                                    <h3 style={{ margin: 0, flex: 1, fontSize: '1.1rem' }}>{category.category}</h3>
                                    <span style={{
                                        opacity: 0.4,
                                        fontSize: '0.8rem',
                                        marginRight: '0.5rem'
                                    }}>{category.articles.length} articles</span>
                                    <span style={{
                                        transition: 'transform 0.2s',
                                        transform: expandedCategory === catIdx ? 'rotate(90deg)' : 'rotate(0deg)',
                                        opacity: 0.5
                                    }}>▶</span>
                                </div>

                                {/* Articles */}
                                {(expandedCategory === catIdx || searchQuery) && (
                                    <div style={{ paddingLeft: '0.5rem' }}>
                                        {category.articles.map((article, artIdx) => {
                                            const key = `${catIdx}-${artIdx}`;
                                            const isExpanded = expandedArticle === key;
                                            return (
                                                <div key={artIdx} style={{
                                                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                                                }}>
                                                    <div
                                                        onClick={() => setExpandedArticle(isExpanded ? null : key)}
                                                        style={{
                                                            padding: '0.75rem 0.5rem',
                                                            cursor: 'pointer',
                                                            display: 'flex',
                                                            alignItems: 'center',
                                                            gap: '0.5rem',
                                                            transition: 'background-color 0.15s',
                                                            borderRadius: '0.375rem'
                                                        }}
                                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.05)'}
                                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                                    >
                                                        <span style={{
                                                            transition: 'transform 0.2s',
                                                            transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                                            opacity: 0.4,
                                                            fontSize: '0.7rem'
                                                        }}>▶</span>
                                                        <span style={{ fontWeight: 500 }}>{article.title}</span>
                                                    </div>
                                                    {isExpanded && (
                                                        <div style={{
                                                            padding: '0.5rem 1rem 1rem 1.5rem',
                                                            fontSize: '0.9rem',
                                                            color: 'var(--text-color)',
                                                            opacity: 0.85,
                                                            lineHeight: 1.6,
                                                            animation: 'fadeIn 0.2s ease'
                                                        }}>
                                                            {renderMarkdown(article.content)}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default HelpPanel;
