// Chat Hook - IMPROVED WITH USER CONTEXT
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { chatAPI } from '../services/api';
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

    try {
      // Call real backend API
      const response = await chatAPI.sendMessage(message);
      
      const aiMessage = {
        id: Date.now() + 1,
        text: response.reply,
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: aiMessage });
      
      // Check for chat badge
      if (state.stats.totalChatMessages + 1 >= 50) {
        dispatch({ type: 'UNLOCK_BADGE', payload: 'chat-50' });
      }
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: "I'm sorry, I'm having trouble connecting right now. Please check your connection and try again.",
        sender: 'ai',
        timestamp: new Date().toISOString(),
        isError: true
      };
      dispatch({ type: 'ADD_CHAT_MESSAGE', payload: errorMessage });
    } finally {
      setIsTyping(false);
    }
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
