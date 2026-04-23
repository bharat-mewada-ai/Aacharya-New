// Chat Hook - IMPROVED WITH USER CONTEXT
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { getChatResponse } from '../data/chatResponses';

export const useChat = () => {
  const { state, dispatch } = useApp();
  const [isTyping, setIsTyping] = useState(false);

  /**
   * Send message and get AI response with user context
   * @param {string} message - User message
   */
  const sendMessage = async (message) => {
    // Add user message immediately
    const userMessage = {
      id: Date.now(),
      text: message,
      sender: 'user',
      timestamp: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CHAT_MESSAGE', payload: userMessage });

    // Show typing indicator
    setIsTyping(true);

    // Simulate AI thinking time (800-1800ms for more realistic feel)
    const thinkingTime = 800 + Math.random() * 1000;
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // Prepare user context for intelligent responses
        const userContext = {
          name: state.user.name || 'Champion',
          goal: state.user.goal || 'Stay Fit',
          streak: state.streak || 0,
          xp: state.xp || 0,
          rank: state.rank?.id || 'E',
          completedMissions: state.missions?.filter(m => m.completed).length || 0
        };
        
        const responseText = getChatResponse(message, userContext);
        const aiMessage = {
          id: Date.now() + 1,
          text: responseText,
          sender: 'ai',
          timestamp: new Date().toISOString()
        };
        
        dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
        setIsTyping(false);
        
        // Check for chat badge
        if (state.stats.totalChatMessages + 1 >= 50) {
          dispatch({ type: 'UNLOCK_BADGE', payload: 'chat-50' });
        }
        
        resolve();
      }, thinkingTime);
    });
  };

  /**
   * Clear chat history
   */
  const clearHistory = () => {
    dispatch({ type: 'CLEAR_CHAT_HISTORY' });
  };

  return {
    chatHistory: state.chatHistory,
    isTyping,
    sendMessage,
    clearHistory
  };
};
