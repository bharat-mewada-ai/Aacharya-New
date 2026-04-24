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
  const [age, setAge] = useState('');
  const [weight, setWeight] = useState('');
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [suggestedGoalId, setSuggestedGoalId] = useState(null);

  const [hasCondition, setHasCondition] = useState(null);
  const [conditionDetails, setConditionDetails] = useState('');

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

  const handleStatsSubmit = () => {
    if (age && weight) {
      dispatch({ type: 'SET_USER_AGE', payload: age });
      dispatch({ type: 'SET_USER_WEIGHT', payload: weight });
      setStep(3); // Go to health condition
    }
  };

  const handleHealthSubmit = () => {
    dispatch({ 
      type: 'SET_HEALTH_CONDITION', 
      payload: { hasCondition, details: conditionDetails } 
    });
    
    // Auto-suggest goal logic based on weight (moved from handleStatsSubmit)
    const weightNum = parseFloat(weight);
    let suggested = null;
    if (weightNum > 80) suggested = 'weight-loss';
    else if (weightNum < 60) suggested = 'muscle-gain';
    else suggested = 'stay-fit';
    
    setSuggestedGoalId(suggested);
    const goalObj = goals.find(g => g.id === suggested);
    if (goalObj) setSelectedGoal(goalObj);

    setStep(4);
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
            <div className="setup-icon">⚖️</div>
            <h2 className="setup-title">Your Body Stats</h2>
            <p className="setup-description">
              Help Aacharya tailor the best advice for you
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <input
                type="number"
                className="setup-input glass"
                placeholder="Age (years)"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && age && weight && handleStatsSubmit()}
                autoFocus
              />
              <input
                type="number"
                className="setup-input glass"
                placeholder="Weight (kg)"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && age && weight && handleStatsSubmit()}
              />
            </div>
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStatsSubmit}
              disabled={!age || !weight}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 3 && (
          <div className="setup-step fade-up">
            <div className="setup-icon">🏥</div>
            <h2 className="setup-title">Health Check</h2>
            <p className="setup-description">
              Do you have any pre-existing health conditions?
            </p>
            
            <div className="health-options" style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <Button
                variant={hasCondition === true ? 'primary' : 'outline'}
                onClick={() => setHasCondition(true)}
                style={{ flex: 1 }}
              >
                Yes, I do
              </Button>
              <Button
                variant={hasCondition === false ? 'primary' : 'outline'}
                onClick={() => {
                  setHasCondition(false);
                  setConditionDetails('');
                }}
                style={{ flex: 1 }}
              >
                No, I'm healthy
              </Button>
            </div>

            {hasCondition && (
              <div className="fade-up" style={{ marginBottom: '2rem' }}>
                <p className="setup-description" style={{ marginBottom: '0.5rem', textAlign: 'left' }}>
                  Please specify your condition:
                </p>
                <textarea
                  className="setup-input glass"
                  placeholder="e.g. Asthma, Knee injury, Diabetes..."
                  value={conditionDetails}
                  onChange={(e) => setConditionDetails(e.target.value)}
                  style={{ width: '100%', minHeight: '100px', padding: '1rem' }}
                />
              </div>
            )}
            
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleHealthSubmit}
              disabled={hasCondition === null || (hasCondition === true && !conditionDetails.trim())}
            >
              Continue
            </Button>
          </div>
        )}

        {step === 4 && (
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
                  
                  {suggestedGoalId === goal.id && (
                    <div className="suggested-badge" style={{
                      position: 'absolute', top: '-10px', right: '-10px', 
                      background: 'var(--primary-color)', color: 'white', 
                      padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem',
                      fontWeight: 'bold', boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
                    }}>
                      Suggested
                    </div>
                  )}

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
