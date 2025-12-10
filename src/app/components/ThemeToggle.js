'use client';

import styles from '../glass.module.css';

export default function ThemeToggle({ theme, toggleTheme }) {
    return (
        <button className={styles.themeToggle} onClick={toggleTheme} title="Toggle Theme">
            {theme === 'dark' ? '☀️' : '🌙'}
        </button>
    );
}
