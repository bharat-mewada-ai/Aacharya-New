// Chat Bubble - IMPROVED WITH FORMATTING
import './ChatBubble.css';

const ChatBubble = ({ message, sender }) => {
  const { text, timestamp } = message;
  const isUser = sender === 'user';

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  /**
   * Format message text with line breaks and structure
   */
  const formatMessage = (text) => {
    // Split by newlines and render with proper spacing
    return text.split('\n').map((line, index) => {
      // Check if line is a bullet point
      if (line.trim().startsWith('•') || line.trim().startsWith('✓') || line.trim().startsWith('✗')) {
        return (
          <div key={index} className="chat-bullet">
            {line}
          </div>
        );
      }
      // Check if line is a numbered item
      else if (line.trim().match(/^\d+\./)) {
        return (
          <div key={index} className="chat-numbered">
            {line}
          </div>
        );
      }
      // Check if line is a section header (contains emoji at start or all caps)
      else if (line.trim().match(/^[🔥💪🎯🏋️🍗😴🌙💧🌿💡📈✓🍽️💙🙏🤖📸🧘]/)) {
        return (
          <div key={index} className="chat-section">
            {line}
          </div>
        );
      }
      // Regular line
      else if (line.trim()) {
        return (
          <div key={index} className="chat-line">
            {line}
          </div>
        );
      }
      // Empty line for spacing
      return <div key={index} className="chat-spacer" />;
    });
  };

  return (
    <div className={`chat-bubble-wrapper ${isUser ? 'user' : 'ai'} slide-in-${isUser ? 'right' : 'left'}`}>
      {!isUser && (
        <div className="chat-avatar">
          <span className="avatar-emoji">🤖</span>
        </div>
      )}
      <div className={`chat-bubble ${isUser ? 'user-bubble' : 'ai-bubble'}`}>
        <div className="chat-text">
          {formatMessage(text)}
        </div>
        <span className="chat-time">{formatTime(timestamp)}</span>
      </div>
      {isUser && (
        <div className="chat-avatar user-avatar">
          <span className="avatar-emoji">👤</span>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
