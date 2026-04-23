// Chat Page - IMPROVED VERSION
import { useState, useRef, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import ChatBubble from '../components/features/ChatBubble';
import TypingIndicator from '../components/features/TypingIndicator';
import Button from '../components/ui/Button';
import './Chat.css';

const Chat = () => {
  const { chatHistory, sendMessage, isTyping } = useChat();
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  /**
   * Scroll to bottom of chat
   */
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isTyping]);

  /**
   * Handle sending message
   */
  const handleSend = async () => {
    if (input.trim() && !isSending) {
      setIsSending(true);
      await sendMessage(input);
      setInput('');
      setIsSending(false);
      
      // Focus back on input
      inputRef.current?.focus();
    }
  };

  /**
   * Handle key press in textarea
   */
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  /**
   * Handle quick question click
   */
  const handleQuickQuestion = async (question) => {
    setInput(question);
    setIsSending(true);
    await sendMessage(question);
    setInput('');
    setIsSending(false);
  };

  /**
   * Auto-resize textarea
   */
  const handleInputChange = (e) => {
    setInput(e.target.value);
    
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const quickQuestions = [
    { icon: '🎯', text: 'What is my fitness goal?' },
    { icon: '🔥', text: 'How can I lose weight?' },
    { icon: '💪', text: 'Best exercises for muscle gain' },
    { icon: '🥗', text: 'What should I eat today?' }
  ];

  return (
    <div className="chat-page">
      <TopBar title="AI Habit Mentor" showProgress={false} />
      
      <div className="chat-content">
        {chatHistory.length === 0 ? (
          <div className="chat-empty">
            <div className="chat-avatar-container">
              <div className="chat-avatar float">💪</div>
              <div className="avatar-glow"></div>
            </div>
            <h2 className="chat-welcome">Hey Champion! 🙌</h2>
            <p className="chat-intro">
              I'm Aacharya, your AI habit mentor. Ask me anything about fitness, nutrition, or workouts!
            </p>
            
            <div className="quick-questions">
              <p className="quick-label">Quick questions:</p>
              <div className="quick-questions-grid">
                {quickQuestions.map((question, index) => (
                  <button
                    key={index}
                    className="quick-question glass"
                    onClick={() => handleQuickQuestion(question.text)}
                    disabled={isSending}
                  >
                    <span className="question-icon">{question.icon}</span>
                    <span className="question-text">{question.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="chat-messages">
            {chatHistory.map((message) => (
              <ChatBubble
                key={message.id}
                message={message}
                sender={message.sender}
              />
            ))}
            
            {/* Show typing indicator when AI is responding */}
            {isTyping && <TypingIndicator />}
            
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Chat Input */}
      <div className="chat-input-container glass">
        <textarea
          ref={inputRef}
          className="chat-input"
          placeholder="Ask Aacharya..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          rows={1}
          disabled={isSending}
        />
        <Button
          variant="primary"
          size="md"
          onClick={handleSend}
          disabled={!input.trim() || isSending}
          icon={isSending ? '⏳' : '📤'}
        >
          {isSending ? 'Sending...' : 'Send'}
        </Button>
      </div>

      <BottomNav />
    </div>
  );
};

export default Chat;
