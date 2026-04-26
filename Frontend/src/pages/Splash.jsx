// Splash Page - STRICT IMPLEMENTATION
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!state.user.onboardingComplete) {
        navigate('/onboarding');
      } else if (!state.user.setupComplete) {
        navigate('/setup');
      } else {
        navigate('/home');
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, state.user]);

  return (
    <div className="splash-page">
      <div className="splash-content fade-up">
        <div className="splash-icon float">💪</div>
        <h1 className="splash-title text-gradient">Aacharya</h1>
        <p className="splash-tagline">Your AI Habit Mentor</p>
        <div className="splash-loader">
          <div className="loader-bar shimmer"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
