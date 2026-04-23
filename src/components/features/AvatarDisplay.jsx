// Avatar Display - IMPROVED VERSION
import { useState } from 'react';
import './AvatarDisplay.css';

/**
 * AvatarDisplay Component
 * Renders user avatar with proper fallback and error handling
 * @param {Object} avatar - Avatar configuration object
 * @param {string} size - Size variant (sm, md, lg, xl)
 * @param {string} fallbackIcon - Fallback emoji/icon if avatar fails
 */
const AvatarDisplay = ({ avatar, size = 'md', fallbackIcon = '👤' }) => {
  const [imageError, setImageError] = useState(false);
  
  // Extract avatar properties with defaults
  const { skin = '#ffd5b5', hair, outfit, accessory } = avatar || {};

  // If no avatar data or error, show fallback
  if (!avatar || imageError) {
    return (
      <div className={`avatar-display avatar-${size}`}>
        <div className="avatar-container avatar-fallback">
          <span className="avatar-fallback-icon">{fallbackIcon}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`avatar-display avatar-${size}`}>
      <div className="avatar-container">
        {/* Enhanced SVG-based avatar with better styling */}
        <svg viewBox="0 0 200 200" className="avatar-svg">
          {/* Background circle */}
          <circle cx="100" cy="100" r="95" fill="rgba(168, 85, 247, 0.1)" />
          
          {/* Hair (back layer) */}
          <circle cx="100" cy="50" r="48" fill="#2d3748" opacity="0.9" />
          
          {/* Head with gradient */}
          <defs>
            <radialGradient id="skinGradient">
              <stop offset="0%" stopColor={skin} />
              <stop offset="100%" stopColor={adjustBrightness(skin, -20)} />
            </radialGradient>
          </defs>
          <circle cx="100" cy="80" r="42" fill="url(#skinGradient)" />
          
          {/* Body/Outfit */}
          <rect x="68" y="115" width="64" height="75" rx="12" fill="#4a5568" />
          
          {/* Face features with better positioning */}
          {/* Eyes */}
          <circle cx="88" cy="75" r="4" fill="#000" />
          <circle cx="112" cy="75" r="4" fill="#000" />
          
          {/* Eye highlights */}
          <circle cx="89" cy="74" r="1.5" fill="#fff" opacity="0.8" />
          <circle cx="113" cy="74" r="1.5" fill="#fff" opacity="0.8" />
          
          {/* Smile */}
          <path 
            d="M 88 92 Q 100 98 112 92" 
            stroke="#000" 
            strokeWidth="2.5" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Accessory indicator (if present) */}
          {accessory && accessory !== 'acc-1' && (
            <circle cx="100" cy="45" r="8" fill="#fbbf24" opacity="0.8" />
          )}
        </svg>
        
        {/* Animated ring around avatar */}
        <div className="avatar-ring"></div>
      </div>
    </div>
  );
};

/**
 * Helper function to adjust color brightness
 */
const adjustBrightness = (color, amount) => {
  const hex = color.replace('#', '');
  const r = Math.max(0, Math.min(255, parseInt(hex.substr(0, 2), 16) + amount));
  const g = Math.max(0, Math.min(255, parseInt(hex.substr(2, 2), 16) + amount));
  const b = Math.max(0, Math.min(255, parseInt(hex.substr(4, 2), 16) + amount));
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
};

export default AvatarDisplay;
