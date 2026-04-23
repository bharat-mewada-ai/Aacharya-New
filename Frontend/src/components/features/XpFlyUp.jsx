// XP Fly Up Animation - STRICT IMPLEMENTATION
import { useEffect, useState } from 'react';
import './XpFlyUp.css';

const XpFlyUp = ({ xp, onComplete }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      if (onComplete) onComplete();
    }, 1000);

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!show) return null;

  return (
    <div className="xp-fly-up">
      <span className="xp-fly-text number">+{xp} XP</span>
    </div>
  );
};

export default XpFlyUp;
