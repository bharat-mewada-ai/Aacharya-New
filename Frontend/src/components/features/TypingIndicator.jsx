// Typing Indicator Component - NEW
import './TypingIndicator.css';

/**
 * TypingIndicator Component
 * Shows animated dots when AI is typing
 */
const TypingIndicator = () => {
  return (
    <div className="typing-indicator-wrapper ai slide-in-left">
      <div className="typing-indicator">
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <div className="typing-dot"></div>
        <span className="typing-text">Aacharya is thinking...</span>
      </div>
    </div>
  );
};

export default TypingIndicator;
