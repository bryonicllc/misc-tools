// Theme Toggle System
(function() {
    'use strict';

    // Get saved theme or default to light
    const getTheme = () => {
        return localStorage.getItem('theme') || 'light';
    };

    // Save theme preference
    const saveTheme = (theme) => {
        localStorage.setItem('theme', theme);
    };

    // Apply theme to document
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
    };

    // Toggle between themes
    const toggleTheme = () => {
        const currentTheme = getTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        saveTheme(newTheme);
        applyTheme(newTheme);
        updateToggleIcon(newTheme);
    };

    // Update toggle button icon
    const updateToggleIcon = (theme) => {
        const toggle = document.getElementById('themeToggle');
        if (toggle) {
            toggle.textContent = theme === 'light' ? '🌙' : '☀️';
            toggle.setAttribute('aria-label', `Switch to ${theme === 'light' ? 'dark' : 'light'} mode`);
        }
    };

    // Initialize theme on page load
    const initTheme = () => {
        // Prevent transition flash on load
        document.body.classList.add('no-transition');

        const savedTheme = getTheme();
        applyTheme(savedTheme);

        // Create and add toggle button if it doesn't exist
        if (!document.getElementById('themeToggle')) {
            const toggle = document.createElement('button');
            toggle.id = 'themeToggle';
            toggle.className = 'theme-toggle';
            toggle.setAttribute('aria-label', `Switch to ${savedTheme === 'light' ? 'dark' : 'light'} mode`);
            toggle.onclick = toggleTheme;
            document.body.appendChild(toggle);
            updateToggleIcon(savedTheme);
        }

        // Re-enable transitions after a brief delay
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.remove('no-transition');
            });
        });
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }

    // Export for manual use if needed
    window.themeToggle = {
        toggle: toggleTheme,
        getTheme: getTheme,
        setTheme: (theme) => {
            saveTheme(theme);
            applyTheme(theme);
            updateToggleIcon(theme);
        }
    };
})();
