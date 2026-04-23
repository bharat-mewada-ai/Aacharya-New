// Glass Card - STRICT IMPLEMENTATION
import './GlassCard.css';

const GlassCard = ({ children, className = '', onClick, hover = false }) => {
  return (
    <div 
      className={`glass-card ${hover ? 'glass-card-hover' : ''} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
