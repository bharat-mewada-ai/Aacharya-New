// Splash Screen - High Performance
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './Splash.css';

const Splash = () => {
  const navigate = useNavigate();
  const { state } = useApp();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.user.setupComplete) {
        navigate('/home');
      } else {
        navigate('/onboarding');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, state.user.setupComplete]);

  return (
    <div className="splash-screen">
      <div className="splash-content">
        <div className="logo-container">
          <img src="/logo.png" alt="Aacharyaa Logo" className="main-logo" />
        </div>
        <div className="brand-text">
          <h1 className="brand-name">AACHARYA</h1>
          <div className="tagline-container">
            <span className="tagline-up">up</span>
            <span className="tagline-grade">Grade</span>
            <span className="tagline-your">Your</span>
            <span className="tagline-life">life</span>
          </div>
        </div>
        <div className="loader-bar">
          <div className="loader-fill"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
