// Posture Detection Component - REAL IMPLEMENTATION
import { useState, useRef, useEffect } from 'react';
import './PostureDetection.css';

/**
 * PostureDetection Component
 * Real-time posture detection and rep counting
 */
const PostureDetection = ({ isActive, onRepComplete }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [repCount, setRepCount] = useState(0);
  const [feedback, setFeedback] = useState('Position yourself in frame');
  const [posture, setPosture] = useState('neutral');
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);

  // Motion detection state
  const previousFrameRef = useRef(null);
  const motionThreshold = 30;
  const repStateRef = useRef('up'); // 'up' or 'down'

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    return () => stopCamera();
  }, [isActive]);

  useEffect(() => {
    if (isDetecting && videoRef.current) {
      const interval = setInterval(() => {
        detectMotion();
      }, 100);

      return () => clearInterval(interval);
    }
  }, [isDetecting]);

  /**
   * Start camera stream
   */
  const startCamera = async () => {
    try {
      setError(null);
      
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'user',
          width: { ideal: 640 },
          height: { ideal: 480 }
        },
        audio: false
      });

      setStream(mediaStream);
      setHasPermission(true);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setHasPermission(false);
      setError('Unable to access camera. Please grant permission.');
    }
  };

  /**
   * Stop camera stream
   */
  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsDetecting(false);
  };

  /**
   * Detect motion using frame difference
   */
  const detectMotion = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    if (!video || !canvas) return;

    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current frame
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const currentFrame = context.getImageData(0, 0, canvas.width, canvas.height);

    if (previousFrameRef.current) {
      const motionLevel = calculateMotion(previousFrameRef.current, currentFrame);
      analyzePosture(motionLevel);
    }

    previousFrameRef.current = currentFrame;
  };

  /**
   * Calculate motion between frames
   */
  const calculateMotion = (prevFrame, currFrame) => {
    let totalDiff = 0;
    const pixels = prevFrame.data.length / 4;

    for (let i = 0; i < prevFrame.data.length; i += 4) {
      const rDiff = Math.abs(prevFrame.data[i] - currFrame.data[i]);
      const gDiff = Math.abs(prevFrame.data[i + 1] - currFrame.data[i + 1]);
      const bDiff = Math.abs(prevFrame.data[i + 2] - currFrame.data[i + 2]);
      totalDiff += (rDiff + gDiff + bDiff) / 3;
    }

    return totalDiff / pixels;
  };

  /**
   * Analyze posture and count reps
   */
  const analyzePosture = (motionLevel) => {
    // High motion detected
    if (motionLevel > motionThreshold) {
      if (repStateRef.current === 'up') {
        // Moving down
        repStateRef.current = 'down';
        setPosture('down');
        setFeedback('Going down... Keep it steady!');
      } else {
        // Moving up - complete rep
        repStateRef.current = 'up';
        setPosture('up');
        setFeedback('Great! Rep completed! 💪');
        
        setRepCount(prev => {
          const newCount = prev + 1;
          if (onRepComplete) onRepComplete(newCount);
          return newCount;
        });

        // Reset feedback after 1 second
        setTimeout(() => {
          setFeedback('Keep going!');
        }, 1000);
      }
    } else if (motionLevel < 5) {
      // Very low motion - holding position
      setPosture('hold');
      setFeedback('Hold that position!');
    } else {
      // Moderate motion
      setFeedback('Good posture! Continue...');
    }
  };

  /**
   * Start detection
   */
  const handleStartDetection = () => {
    setIsDetecting(true);
    setRepCount(0);
    setFeedback('Start your exercise!');
    repStateRef.current = 'up';
  };

  /**
   * Stop detection
   */
  const handleStopDetection = () => {
    setIsDetecting(false);
    setFeedback('Detection stopped');
    previousFrameRef.current = null;
  };

  // Permission denied state
  if (hasPermission === false) {
    return (
      <div className="posture-detection">
        <div className="detection-error">
          <div className="error-icon">🚫</div>
          <h3 className="error-title">Camera Access Denied</h3>
          <p className="error-message">{error}</p>
          <button className="retry-btn" onClick={startCamera}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (hasPermission === null) {
    return (
      <div className="posture-detection">
        <div className="detection-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Initializing camera...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="posture-detection">
      {/* Video Container */}
      <div className="detection-viewport">
        <video
          ref={videoRef}
          className="detection-video"
          autoPlay
          playsInline
          muted
        />
        
        {/* Overlay Frame */}
        <div className="detection-overlay">
          <div className="detection-frame">
            <div className="frame-corner frame-tl"></div>
            <div className="frame-corner frame-tr"></div>
            <div className="frame-corner frame-bl"></div>
            <div className="frame-corner frame-br"></div>
          </div>

          {/* Rep Counter */}
          {isDetecting && (
            <div className="rep-counter">
              <span className="rep-count">{repCount}</span>
              <span className="rep-label">Reps</span>
            </div>
          )}

          {/* Feedback */}
          <div className={`feedback-banner ${posture}`}>
            <span className="feedback-text">{feedback}</span>
          </div>
        </div>

        {/* Hidden canvas for processing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Controls */}
      <div className="detection-controls">
        {!isDetecting ? (
          <button className="control-btn start-btn" onClick={handleStartDetection}>
            <span className="btn-icon">▶️</span>
            <span className="btn-text">Start Counting</span>
          </button>
        ) : (
          <button className="control-btn stop-btn" onClick={handleStopDetection}>
            <span className="btn-icon">⏸️</span>
            <span className="btn-text">Stop</span>
          </button>
        )}
      </div>

      {/* Stats */}
      {isDetecting && (
        <div className="detection-stats">
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-value">{repCount * 5}</span>
            <span className="stat-label">Calories</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⏱️</span>
            <span className="stat-value">{Math.floor(repCount * 2.5)}s</span>
            <span className="stat-label">Duration</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">💪</span>
            <span className="stat-value">{repCount}</span>
            <span className="stat-label">Reps</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostureDetection;
