// Slider Component - STRICT IMPLEMENTATION
import './Slider.css';

const Slider = ({ 
  value, 
  onChange, 
  min = 0, 
  max = 100, 
  step = 1,
  label = '',
  showValue = true
}) => {
  return (
    <div className="slider-container">
      {label && (
        <div className="slider-header">
          <span className="slider-label">{label}</span>
          {showValue && <span className="slider-value number">{value}</span>}
        </div>
      )}
      <input
        type="range"
        className="slider"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        min={min}
        max={max}
        step={step}
        style={{
          background: `linear-gradient(to right, var(--neon-purple) 0%, var(--neon-purple) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) ${((value - min) / (max - min)) * 100}%, rgba(255,255,255,0.1) 100%)`
        }}
      />
    </div>
  );
};

export default Slider;
