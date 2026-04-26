// Onboarding Page - STRICT IMPLEMENTATION
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import './Onboarding.css';

const Onboarding = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: '💪',
      title: 'Welcome to Aacharya',
      description: 'Your personalized AI habit mentor. Build better habits and achieve your fitness goals with smart guidance.'
    },
    {
      icon: '🎯',
      title: 'Set Your Fitness Goal',
      description: 'Choose from Weight Loss, Muscle Gain, or Stay Fit. Get personalized recommendations for your journey.'
    },
    {
      icon: '🏆',
      title: 'Complete Daily Missions',
      description: 'Build healthy habits with guided missions. Earn XP, unlock badges, and rank up on your fitness journey.'
    },
    {
      icon: '🛍️',
      title: 'Health Store & Perks',
      description: 'Unlock exclusive discounts on premium supplements and equipment using your earned XP points.'
    },
    {
      icon: '💬',
      title: 'Chat with Your AI Mentor',
      description: 'Get instant answers to your fitness questions. Your AI guide is here 24/7 to support your journey.'
    }
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate('/setup');
    }
  };


  const handleSkip = () => {
    navigate('/setup');
  };

  return (
    <div className="onboarding-page">
      <div className="onboarding-content">
        <div className="slide-container">
          {slides.map((slide, index) => (
            <div
              key={index}
              className={`slide ${index === currentSlide ? 'active fade-up' : ''}`}
              style={{ display: index === currentSlide ? 'flex' : 'none' }}
            >
              <div className="slide-icon float">{slide.icon}</div>
              <h2 className="slide-title">{slide.title}</h2>
              <p className="slide-description">{slide.description}</p>
            </div>
          ))}
        </div>

        <div className="slide-indicators">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className="onboarding-actions">
          <Button variant="ghost" onClick={handleSkip}>
            Skip
          </Button>
          <Button variant="primary" onClick={handleNext}>
            {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
