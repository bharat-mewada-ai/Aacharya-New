// Camera Capture Component - NEW IMPROVED VERSION
import { useState, useRef, useEffect } from 'react';
import './CameraCapture.css';

/**
 * CameraCapture Component
 * Provides real webcam access with proper error handling
 * @param {boolean} isActive - Whether camera should be active
 * @param {function} onCapture - Callback when photo is captured
 * @param {function} onError - Callback for errors
 */
const CameraCapture = ({ isActive, onCapture, onError }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [error, setError] = useState(null);
  const [isCameraReady, setIsCameraReady] = useState(false);

  // Initialize camera when component becomes active
  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }

    // Cleanup on unmount
    return () => {
      stopCamera();
    };
  }, [isActive]);

  /**
   * Start camera stream
   */
  const startCamera = async () => {
    try {
      setError(null);
      setIsCameraReady(false);

      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error('Camera not supported in this browser');
      }

      // Request camera access
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: 'environment', // Use back camera on mobile
          width: { ideal: 1280 },
          height: { ideal: 720 }
        },
        audio: false
      });

      setStream(mediaStream);
      setHasPermission(true);

      // Attach stream to video element
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          setIsCameraReady(true);
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setHasPermission(false);
      
      let errorMessage = 'Unable to access camera';
      
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        errorMessage = 'Camera permission denied. Please allow camera access.';
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        errorMessage = 'No camera found on this device.';
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        errorMessage = 'Camera is already in use by another application.';
      }
      
      setError(errorMessage);
      if (onError) onError(errorMessage);
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
    setIsCameraReady(false);
  };

  /**
   * Capture photo from video stream
   */
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraReady) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw current video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get image data
    const imageData = canvas.toDataURL('image/jpeg', 0.9);
    
    if (onCapture) {
      onCapture(imageData);
    }
  };

  /**
   * Retry camera access
   */
  const retryCamera = () => {
    setError(null);
    setHasPermission(null);
    startCamera();
  };

  // Render permission denied state
  if (hasPermission === false) {
    return (
      <div className="camera-capture">
        <div className="camera-error">
          <div className="error-icon">🚫</div>
          <h3 className="error-title">Camera Access Denied</h3>
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={retryCamera}>
            Try Again
          </button>
          <p className="error-hint">
            💡 Enable camera in your browser settings
          </p>
        </div>
      </div>
    );
  }

  // Render loading state
  if (hasPermission === null || !isCameraReady) {
    return (
      <div className="camera-capture">
        <div className="camera-loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">Initializing camera...</p>
        </div>
      </div>
    );
  }

  // Render active camera
  return (
    <div className="camera-capture">
      <div className="camera-viewport">
        {/* Video element for live camera feed */}
        <video
          ref={videoRef}
          className="camera-video"
          autoPlay
          playsInline
          muted
        />
        
        {/* Scan frame overlay */}
        <div className="scan-overlay">
          <div className="scan-corner scan-corner-tl"></div>
          <div className="scan-corner scan-corner-tr"></div>
          <div className="scan-corner scan-corner-bl"></div>
          <div className="scan-corner scan-corner-br"></div>
        </div>

        {/* Hidden canvas for capturing */}
        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>

      {/* Camera controls */}
      <div className="camera-controls">
        <button className="capture-button" onClick={capturePhoto}>
          <span className="capture-icon">📸</span>
        </button>
      </div>

      {/* Instructions */}
      <p className="camera-instructions">
        Position item within frame and tap to capture
      </p>
    </div>
  );
};

export default CameraCapture;
