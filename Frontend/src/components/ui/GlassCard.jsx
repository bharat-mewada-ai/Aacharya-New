// Glass Card - STRICT IMPLEMENTATION
import './GlassCard.css';

const GlassCard = ({ children, className = '', onClick, hover = false, style = {} }) => {
  return (
    <div 
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
};

export default GlassCard;
