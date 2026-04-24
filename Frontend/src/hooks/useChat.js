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
      // Create a context-rich message for the AI
      const healthStr = state.user.healthCondition ? `Health Condition: ${state.user.healthConditionDetails}` : 'Health: No known conditions';
      const contextStr = `[Context - Name: ${state.user.name || 'User'}, Age: ${state.user.age || 'Unknown'}, Weight: ${state.user.weight || 'Unknown'}, ${healthStr}, Current Goal: ${state.user.goal?.name || 'None'}]`;
      const enrichedMessage = `${contextStr} \n\n${message}`;

      // Call real backend API
      const response = await chatAPI.sendMessage(enrichedMessage);
      
      let replyText = response.reply;
      
      // Parse Action Commands from AI
      const goalMatch = replyText.match(/\[ACTION:CHANGE_GOAL:(.+?)\]/);
      if (goalMatch) {
        const newGoalId = goalMatch[1];
        const goals = [
          { id: 'weight-loss', name: 'Weight Loss', icon: '🔥', element: 'Burn Fat', traits: 'Cardio-focused', color: '#ec4899' },
          { id: 'muscle-gain', name: 'Muscle Gain', icon: '💪', element: 'Build Strength', traits: 'Strength training', color: '#a855f7' },
          { id: 'stay-fit', name: 'Stay Fit', icon: '⚡', element: 'Maintain Health', traits: 'Balanced routine', color: '#10b981' }
        ];
        const newGoal = goals.find(g => g.id === newGoalId);
        if (newGoal) {
          dispatch({ type: 'SET_USER_GOAL', payload: newGoal });
        }
        // Remove the command from the visible text
        replyText = replyText.replace(/\[ACTION:CHANGE_GOAL:(.+?)\]/g, '').trim();
      }

      // Parse Mission Update Action
      const missionMatch = replyText.match(/\[ACTION:UPDATE_MISSION:(.+?)\]/);
      if (missionMatch) {
        const missionTitle = missionMatch[1];
        // For simplicity, we'll add it as a new custom mission
        const newMission = {
          id: Date.now(),
          title: missionTitle,
          desc: "Assigned by AI Mentor based on your conversation",
          xp: 150,
          icon: '🎯',
          type: 'daily',
          completed: false
        };
        dispatch({ type: 'ADD_MISSION', payload: newMission });
        replyText = replyText.replace(/\[ACTION:UPDATE_MISSION:(.+?)\]/g, '').trim();
      }
      
      const aiMessage = {
        id: Date.now() + 1,
        text: replyText,
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
