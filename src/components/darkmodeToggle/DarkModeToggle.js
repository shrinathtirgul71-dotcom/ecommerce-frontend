import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import './DarkModeToggle.css';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button 
      className="dark-mode-toggle" 
      onClick={toggleTheme}
      aria-label="Toggle dark mode"
    >
      <div className={`toggle-icon ${theme === 'dark' ? 'active' : ''}`}>
        {theme === 'light' ? (
          <i className="fas fa-moon"></i>
        ) : (
          <i className="fas fa-sun"></i>
        )}
      </div>
    </button>
  );
};

export default DarkModeToggle;