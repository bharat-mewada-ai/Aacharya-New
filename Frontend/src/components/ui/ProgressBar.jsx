// Progress Bar - STRICT IMPLEMENTATION
import './ProgressBar.css';

const ProgressBar = ({ 
  progress = 0, 
  color = '#a855f7',
  height = 8,
  showLabel = false,
  label = ''
}) => {
  return (
    <div className="progress-bar-container">
      {showLabel && <span className="progress-label">{label}</span>}
      <div className="progress-bar" style={{ height: `${height}px` }}>
        <div 
          className="progress-bar-fill" 
          style={{ 
            width: `${Math.min(Math.max(progress, 0), 100)}%`,
            background: color
          }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
