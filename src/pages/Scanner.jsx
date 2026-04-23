// Scanner Page - WITH POSTURE DETECTION
import { useState } from 'react';
import { useScanner } from '../hooks/useScanner';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import PostureDetection from '../components/features/PostureDetection';
import CameraCapture from '../components/features/CameraCapture';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import './Scanner.css';

const Scanner = () => {
  const [mode, setMode] = useState('posture'); // 'posture' or 'food'
  const { scanHistory, performScan } = useScanner();
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  /**
   * Handle camera activation
   */
  const handleStartCamera = () => {
    setIsCameraActive(true);
  };

  /**
   * Handle photo capture from camera
   */
  const handleCapture = async (imageData) => {
    setCapturedImage(imageData);
    setIsCameraActive(false);
    setIsScanning(true);

    // Simulate scanning delay
    const result = await performScan();
    
    setIsScanning(false);
    setScanResult(result);
    setShowResult(true);
  };

  /**
   * Handle camera errors
   */
  const handleCameraError = (error) => {
    console.error('Camera error:', error);
    // Could show toast notification here
  };

  /**
   * Close result modal
   */
  const handleCloseResult = () => {
    setShowResult(false);
    setCapturedImage(null);
  };

  /**
   * Handle rep completion
   */
  const handleRepComplete = (count) => {
    console.log('Rep completed:', count);
    // Could add XP or achievements here
  };

  return (
    <div className="scanner-page">
      <TopBar title="Scanner" showProgress={false} />
      
      {/* Mode Toggle */}
      <div className="mode-toggle">
        <button 
          className={`mode-btn ${mode === 'posture' ? 'active' : ''}`}
          onClick={() => setMode('posture')}
        >
          <span className="mode-icon">💪</span>
          <span className="mode-label">Posture Check</span>
        </button>
        <button 
          className={`mode-btn ${mode === 'food' ? 'active' : ''}`}
          onClick={() => setMode('food')}
        >
          <span className="mode-icon">🍽️</span>
          <span className="mode-label">Food Scan</span>
        </button>
      </div>
      
      <div className="scanner-content">
        <section className="scan-section fade-up">
          {mode === 'posture' ? (
            <PostureDetection 
              isActive={true}
              onRepComplete={handleRepComplete}
            />
          ) : (
            <>
              {!isCameraActive && !isScanning && (
                <div className="scanner-intro">
                  <GlassCard className="intro-card">
                    <div className="intro-icon">📸</div>
                    <h3 className="intro-title">Scan Your Food</h3>
                    <p className="intro-description">
                      Use your camera to identify meals and get instant nutrition insights
                    </p>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      onClick={handleStartCamera}
                      icon="📷"
                    >
                      Open Camera
                    </Button>
                  </GlassCard>
                </div>
              )}

              {isCameraActive && (
                <div className="camera-section">
                  <CameraCapture
                    isActive={isCameraActive}
                    onCapture={handleCapture}
                    onError={handleCameraError}
                  />
                  <Button
                    variant="ghost"
                    size="md"
                    fullWidth
                    onClick={() => setIsCameraActive(false)}
                  >
                    Cancel
                  </Button>
                </div>
              )}

              {isScanning && (
                <div className="scanning-state">
                  <GlassCard className="scanning-card">
                    {capturedImage && (
                      <img 
                        src={capturedImage} 
                        alt="Captured" 
                        className="captured-preview"
                      />
                    )}
                    <div className="scanning-overlay">
                      <div className="scanning-spinner"></div>
                      <p className="scanning-text">Analyzing food...</p>
                    </div>
                  </GlassCard>
                </div>
              )}
            </>
          )}
        </section>

        <section className="scan-history-section fade-up">
          <h2 className="section-title">Recent Scans</h2>
          
          {scanHistory.length > 0 ? (
            <div className="history-list">
              {scanHistory.slice(0, 5).map((scan) => (
                <GlassCard key={scan.id} className="history-item" hover>
                  <div className="history-header">
                    <h3 className="history-name">{scan.name}</h3>
                    <span className="history-xp number">+{scan.xp} XP</span>
                  </div>
                  <p className="history-category">{scan.category}</p>
                  <p className="history-goal">{scan.goal}</p>
                </GlassCard>
              ))}
            </div>
          ) : (
            <div className="empty-state glass">
              <div className="empty-icon">📸</div>
              <h3 className="empty-title">No scans yet</h3>
              <p className="empty-description">Scan foods to get nutrition insights!</p>
            </div>
          )}
        </section>
      </div>

      <BottomNav />

      {/* Result Modal */}
      <Modal
        isOpen={showResult}
        onClose={handleCloseResult}
        title="Scan Result"
        size="md"
      >
        {scanResult && (
          <div className="scan-result">
            {capturedImage && (
              <div className="result-image-container">
                <img 
                  src={capturedImage} 
                  alt="Scanned item" 
                  className="result-image"
                />
              </div>
            )}
            
            <div className="result-header">
              <h2 className="result-name">{scanResult.name}</h2>
              <span className="result-category">{scanResult.category}</span>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Best For</h4>
              <p className="result-text">{scanResult.goal}</p>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Benefits</h4>
              <p className="result-text">{scanResult.benefits}</p>
            </div>
            
            <div className="result-section">
              <h4 className="result-label">Usage</h4>
              <p className="result-text">{scanResult.usage}</p>
            </div>
            
            <div className="result-xp">
              <span className="xp-earned number">+{scanResult.xp} XP</span>
              <span className="xp-label">Earned!</span>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleCloseResult}
            >
              Done
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Scanner;
