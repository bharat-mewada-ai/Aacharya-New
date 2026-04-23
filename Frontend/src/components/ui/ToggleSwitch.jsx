// Toggle Switch - STRICT IMPLEMENTATION
import './ToggleSwitch.css';

const ToggleSwitch = ({ checked, onChange, label = '' }) => {
  return (
    <label className="toggle-switch">
      {label && <span className="toggle-label">{label}</span>}
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="toggle-input"
      />
      <span className="toggle-slider"></span>
    </label>
  );
};

export default ToggleSwitch;
