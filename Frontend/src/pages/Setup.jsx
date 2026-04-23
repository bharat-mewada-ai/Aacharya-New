// Setup Page - STRICT IMPLEMENTATION
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import Button from '../components/ui/Button';
import GlassCard from '../components/ui/GlassCard';
import './Setup.css';

const Setup = () => {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);

  const goals = [
    {
      id: 'weight-loss',
      name: 'Weight Loss',
      icon: '🔥',
      element: 'Burn Fat',
      traits: 'Cardio-focused, Calorie deficit, Sustainable',
      color: '#ec4899'
    },
    {
      id: 'muscle-gain',
      name: 'Muscle Gain',
      icon: '💪',
      element: 'Build Strength',
      traits: 'Strength training, High protein, Progressive overload',
      color: '#a855f7'
    },
    {
      id: 'stay-fit',
      name: 'Stay Fit',
      icon: '⚡',
      element: 'Maintain Health',
      traits: 'Balanced routine, Consistency, Overall wellness',
      color: '#10b981'
    }
  ];

  const handleNameSubmit = () => {
    if (name.trim()) {
      dispatch({ type: 'SET_USER_NAME', payload: name });
      dispatch({ type: 'COMPLETE_ONBOARDING' });
      setStep(2);
    }
  };

  const handleGoalSelect = (goal) => {
    setSelectedGoal(goal);
  };

  const handleComplete = () => {
    if (selectedGoal) {
      dispatch({ type: 'SET_USER_GOAL', payload: selectedGoal });
      dispatch({ type: 'COMPLETE_SETUP' });
      navigate('/home');
    }
  };

  return (
    <div className="setup-page">
      <div className="setup-content">
        {step === 1 && (
          <div className="setup-step fade-up">
            <div className="setup-icon">👋</div>
            <h2 className="setup-title">What's your name?</h2>
            <p className="setup-description">
              Let's personalize your fitness journey
            </p>
            
            <input
              type="text"
              className="setup-input glass"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
              autoFocus
            />
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleNameSubmit}
              disabled={!name.trim()}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="setup-step fade-up">
            <div className="setup-icon">🎯</div>
            <h2 className="setup-title">Choose Your Fitness Goal</h2>
            <p className="setup-description">
              Select the goal that best matches your fitness journey
            </p>
            
            <div className="goal-grid">
              {goals.map((goal) => (
                <GlassCard
                  key={goal.id}
                  className={`goal-card ${selectedGoal?.id === goal.id ? 'selected' : ''}`}
                  onClick={() => handleGoalSelect(goal)}
                  hover
                >
                  <div className="goal-icon">{goal.icon}</div>
                  <h3 className="goal-name" style={{ color: goal.color }}>
                    {goal.name}
                  </h3>
                  <p className="goal-element">{goal.element}</p>
                  <p className="goal-traits">{goal.traits}</p>
                  {selectedGoal?.id === goal.id && (
                    <div className="goal-check">✓</div>
                  )}
                </GlassCard>
              ))}
            </div>
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleComplete}
              disabled={!selectedGoal}
            >
              Start Your Journey
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Setup;
