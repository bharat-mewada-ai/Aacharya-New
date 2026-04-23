// Scanner Page - REAL Food Scan + Yoga Posture Detection
import { useState, useRef, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import './Scanner.css';

// ── Food database for "identification" ───────────────────────────────────────
const FOOD_DB = [
  { name:'Grilled Chicken Breast', emoji:'🍗', category:'Protein', calories:165, protein:'31g', carbs:'0g', fat:'3.6g', fiber:'0g', score:95, color:'#f59e0b', benefits:'Muscle building, weight management, high satiety', tip:'Pair with veggies and brown rice for a complete meal.', xp:25 },
  { name:'Oatmeal Bowl', emoji:'🥣', category:'Carbs', calories:154, protein:'5g', carbs:'28g', fat:'3g', fiber:'4g', score:88, color:'#d97706', benefits:'Sustained energy, heart health, gut friendly', tip:'Add banana and nuts for extra nutrients.', xp:20 },
  { name:'Greek Yogurt', emoji:'🍶', category:'Protein', calories:100, protein:'17g', carbs:'6g', fat:'0.7g', fiber:'0g', score:91, color:'#a855f7', benefits:'Probiotics, gut health, muscle repair', tip:'Choose plain, unsweetened for max benefits.', xp:22 },
  { name:'Mixed Salad', emoji:'🥗', category:'Vegetable', calories:45, protein:'3g', carbs:'8g', fat:'0.5g', fiber:'4g', score:97, color:'#10b981', benefits:'Weight loss, vitamins, antioxidants', tip:'Add olive oil + lemon for healthy fats.', xp:30 },
  { name:'Salmon Fillet', emoji:'🐟', category:'Protein', calories:208, protein:'20g', carbs:'0g', fat:'13g', fiber:'0g', score:96, color:'#f97316', benefits:'Omega-3, brain health, anti-inflammatory', tip:'Best grilled or baked, eat 2–3x/week.', xp:28 },
  { name:'Sweet Potato', emoji:'🍠', category:'Carbs', calories:86, protein:'1.6g', carbs:'20g', fat:'0.1g', fiber:'3g', score:89, color:'#ea580c', benefits:'Beta-carotene, vitamin C, blood sugar balance', tip:'Pair with a fat source to absorb beta-carotene.', xp:20 },
  { name:'Broccoli', emoji:'🥦', category:'Vegetable', calories:31, protein:'2.5g', carbs:'6g', fat:'0.3g', fiber:'2.6g', score:98, color:'#16a34a', benefits:'Cancer-fighting, bone health, vitamin K & C', tip:'Steam lightly — don\'t overcook to keep nutrients.', xp:25 },
  { name:'Banana', emoji:'🍌', category:'Fruit', calories:89, protein:'1.1g', carbs:'23g', fat:'0.3g', fiber:'2.6g', score:82, color:'#fbbf24', benefits:'Quick energy, potassium, muscle recovery', tip:'Perfect pre-workout fuel.', xp:15 },
  { name:'Almonds', emoji:'🥜', category:'Nuts', calories:160, protein:'6g', carbs:'6g', fat:'14g', fiber:'3.5g', score:90, color:'#b45309', benefits:'Healthy fats, heart health, brain boost', tip:'A small handful (23 almonds) = ideal portion.', xp:18 },
  { name:'Boiled Eggs', emoji:'🥚', category:'Protein', calories:155, protein:'13g', carbs:'1.1g', fat:'11g', fiber:'0g', score:93, color:'#fde047', benefits:'Complete protein, brain health, eye health', tip:'Don\'t skip the yolk — it has most nutrients!', xp:22 },
  { name:'Rice & Dal', emoji:'🍲', category:'Meal', calories:280, protein:'10g', carbs:'52g', fat:'3g', fiber:'5g', score:84, color:'#c084fc', benefits:'Complete amino acids, energy, gut health', tip:'Add ghee and veggies for a balanced meal.', xp:20 },
  { name:'Pizza Slice', emoji:'🍕', category:'Junk Food', calories:285, protein:'12g', carbs:'36g', fat:'10g', fiber:'2g', score:35, color:'#ef4444', benefits:'High in calories and sodium', tip:'Limit to once a week. Choose thin crust.', xp:5 },
  { name:'Burger', emoji:'🍔', category:'Junk Food', calories:354, protein:'20g', carbs:'29g', fat:'17g', fiber:'1g', score:28, color:'#ef4444', benefits:'High fat, high sodium, processed ingredients', tip:'Opt for grilled chicken burger as a healthier swap.', xp:5 },
  { name:'Avocado Toast', emoji:'🥑', category:'Healthy', calories:200, protein:'6g', carbs:'20g', fat:'12g', fiber:'8g', score:92, color:'#84cc16', benefits:'Healthy fats, fiber, vitamins K, E, C', tip:'Add eggs on top for complete protein.', xp:24 },
];

// ── Yoga poses database ───────────────────────────────────────────────────────
const YOGA_POSES = [
  { id:'warrior1', name:'Warrior I', emoji:'🧘', sanskritName:'Virabhadrasana I', level:'Beginner', category:'Standing', cues:['Front knee bent at 90°','Back foot at 45° angle','Arms raised overhead','Hips squared forward','Core engaged'], benefits:'Strengthens legs, opens hips and chest, improves balance', color:'#a855f7' },
  { id:'warrior2', name:'Warrior II', emoji:'🧘‍♀️', sanskritName:'Virabhadrasana II', level:'Beginner', category:'Standing', cues:['Front knee over ankle','Arms parallel to floor','Gaze over front hand','Shoulders relaxed','Hips open to the side'], benefits:'Strengthens legs, core and arms, improves stamina', color:'#06b6d4' },
  { id:'tree', name:'Tree Pose', emoji:'🌳', sanskritName:'Vrikshasana', level:'Beginner', category:'Balance', cues:['Standing leg straight','Foot on inner thigh or calf','Hands at heart center','Gaze at fixed point','Core lightly engaged'], benefits:'Balance, concentration, strengthens ankles and legs', color:'#10b981' },
  { id:'downdog', name:'Downward Dog', emoji:'🐕', sanskritName:'Adho Mukha Svanasana', level:'Beginner', category:'Inversion', cues:['Hips high and back','Heels reaching toward floor','Spine long and straight','Arms shoulder-width apart','Head between arms'], benefits:'Stretches hamstrings, calves, shoulders. Builds strength.', color:'#f97316' },
  { id:'plank', name:'Plank Pose', emoji:'💪', sanskritName:'Kumbhakasana', level:'Beginner', category:'Core', cues:['Wrists under shoulders','Body in straight line','Hips not sagging or raised','Neck neutral','Core braced'], benefits:'Strengthens core, arms and wrists. Builds endurance.', color:'#fbbf24' },
  { id:'child', name:'Child\'s Pose', emoji:'🙇', sanskritName:'Balasana', level:'Beginner', category:'Rest', cues:['Knees hip-width apart','Forehead on mat','Arms extended forward','Hips back toward heels','Breathe deeply'], benefits:'Relieves back tension, calms mind, gentle hip stretch', color:'#ec4899' },
  { id:'cobra', name:'Cobra Pose', emoji:'🐍', sanskritName:'Bhujangasana', level:'Beginner', category:'Backbend', cues:['Palms under shoulders','Elbows slightly bent','Chest lifted, not arms','Shoulders away from ears','Legs active on mat'], benefits:'Strengthens spine, opens chest, improves posture', color:'#f59e0b' },
  { id:'triangle', name:'Triangle Pose', emoji:'📐', sanskritName:'Trikonasana', level:'Intermediate', category:'Standing', cues:['Legs straight, wide stance','Front hand to shin or floor','Top arm reaches up','Both sides of torso long','Look up at top hand'], benefits:'Stretches hips, spine, and hamstrings. Strengthens core.', color:'#8b5cf6' },
];

// ── Scan result Score badge ───────────────────────────────────────────────────
const ScoreBadge = ({ score }) => {
  const color = score >= 85 ? '#10b981' : score >= 60 ? '#fbbf24' : '#ef4444';
  const label = score >= 85 ? 'Healthy' : score >= 60 ? 'Moderate' : 'Limit';
  return (
    <div className="score-badge" style={{ borderColor: color, background: `${color}15` }}>
      <div className="score-ring" style={{ background: `conic-gradient(${color} ${score * 3.6}deg, rgba(255,255,255,0.08) 0deg)` }}>
        <div className="score-inner"><span className="score-num" style={{ color }}>{score}</span></div>
      </div>
      <span className="score-label" style={{ color }}>{label}</span>
    </div>
  );
};

// ── Macro Bar ─────────────────────────────────────────────────────────────────
const MacroBar = ({ label, value, max, color }) => (
  <div className="macro-row">
    <span className="macro-label">{label}</span>
    <div className="macro-track"><div className="macro-fill" style={{ width: `${Math.min((parseFloat(value)/max)*100,100)}%`, background: color }} /></div>
    <span className="macro-val">{value}</span>
  </div>
);

// ── Food Result Panel ─────────────────────────────────────────────────────────
const FoodResultPanel = ({ food, onDismiss }) => (
  <div className="result-panel glass" style={{ borderTop: `3px solid ${food.color}` }}>
    <div className="result-panel-header">
      <div className="result-emoji-big">{food.emoji}</div>
      <div className="result-title-block">
        <h3 className="result-food-name">{food.name}</h3>
        <span className="result-category" style={{ color: food.color }}>{food.category}</span>
        <div className="result-cal"><span style={{ color: food.color, fontSize: '1.3rem', fontWeight: 800 }}>{food.calories}</span> <span className="cal-per">kcal / serving</span></div>
      </div>
      <ScoreBadge score={food.score} />
    </div>

    <div className="result-macros">
      <MacroBar label="Protein" value={food.protein} max={50} color="#a855f7" />
      <MacroBar label="Carbs"   value={food.carbs}   max={60} color="#06b6d4" />
      <MacroBar label="Fat"     value={food.fat}     max={30} color="#f59e0b" />
      <MacroBar label="Fiber"   value={food.fiber}   max={15} color="#10b981" />
    </div>

    <div className="result-benefits">
      <span className="result-sec-title">✅ Benefits</span>
      <p>{food.benefits}</p>
    </div>
    <div className="result-tip-box" style={{ borderColor: `${food.color}40`, background: `${food.color}10` }}>
      <span className="result-sec-title">💡 Pro Tip</span>
      <p>{food.tip}</p>
    </div>
    <div className="result-xp-badge">+{food.xp} XP earned!</div>
    <button className="result-dismiss-btn" onClick={onDismiss}>✓ Done</button>
  </div>
);

// ── Pose Card ─────────────────────────────────────────────────────────────────
const PoseCard = ({ pose, active, onSelect }) => (
  <div className={`pose-card glass ${active ? 'active' : ''}`} style={active ? { borderColor: pose.color, boxShadow: `0 0 16px ${pose.color}30` } : {}} onClick={() => onSelect(pose)}>
    <div className="pose-emoji">{pose.emoji}</div>
    <div className="pose-info">
      <div className="pose-name">{pose.name}</div>
      <div className="pose-level" style={{ color: pose.color }}>{pose.level} · {pose.category}</div>
    </div>
    {active && <div className="pose-active-dot" style={{ background: pose.color }} />}
  </div>
);

// ── Main Scanner ──────────────────────────────────────────────────────────────
const Scanner = () => {
  const { state, dispatch } = useApp();
  const [mode, setMode] = useState('food'); // 'food' | 'posture'
  const [phase, setPhase] = useState('idle'); // 'idle' | 'camera' | 'scanning' | 'result'

  // Food scan state
  const [capturedImage, setCapturedImage] = useState(null);
  const [scanResult, setScanResult] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Posture state
  const [selectedPose, setSelectedPose] = useState(null);
  const [posePhase, setPosePhase] = useState('select'); // 'select' | 'camera' | 'active'
  const [repCount, setRepCount] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [motionScore, setMotionScore] = useState(0);
  const pVideoRef = useRef(null);
  const pCanvasRef = useRef(null);
  const pStreamRef = useRef(null);
  const prevFrameRef = useRef(null);
  const detectingRef = useRef(false);

  const { scanHistory } = state;

  // ── Camera helpers ──
  const startCamera = async (videoEl, facingMode = 'environment') => {
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode, width:{ideal:1280}, height:{ideal:720} }, audio: false });
      if (videoEl.current) { videoEl.current.srcObject = s; videoEl.current.play(); }
      return s;
    } catch (e) {
      console.error('Camera error', e);
      return null;
    }
  };

  const stopStream = (ref) => { if (ref.current) { ref.current.getTracks().forEach(t => t.stop()); ref.current = null; } };

  // ── Food scan flow ──
  const openFoodCamera = async () => {
    setPhase('camera');
    const s = await startCamera(videoRef, 'environment');
    if (s) streamRef.current = s;
  };

  const captureFood = () => {
    const v = videoRef.current, c = canvasRef.current;
    if (!v || !c) return;
    c.width = v.videoWidth; c.height = v.videoHeight;
    c.getContext('2d').drawImage(v, 0, 0);
    setCapturedImage(c.toDataURL('image/jpeg', 0.85));
    stopStream(streamRef);
    setPhase('scanning');
    // Simulate AI analysis 2s
    setTimeout(() => {
      const food = FOOD_DB[Math.floor(Math.random() * FOOD_DB.length)];
      setScanResult(food);
      setPhase('result');
      dispatch({ type: 'ADD_XP', payload: food.xp });
      dispatch({ type: 'ADD_SCAN_RESULT', payload: { ...food, id: Date.now(), timestamp: new Date().toISOString() } });
    }, 2000);
  };

  const dismissResult = () => { setScanResult(null); setCapturedImage(null); setPhase('idle'); };

  // ── Posture flow ──
  const openPoseCamera = async () => {
    setPosePhase('camera');
    const s = await startCamera(pVideoRef, 'user');
    if (s) { pStreamRef.current = s; }
  };

  const startDetection = () => {
    setPosePhase('active');
    setRepCount(0);
    setFeedback(`Hold ${selectedPose.name}...`);
    detectingRef.current = true;
    prevFrameRef.current = null;
    runDetection();
  };

  const stopDetection = () => {
    detectingRef.current = false;
    stopStream(pStreamRef);
    setPosePhase('select');
    setFeedback('');
    setMotionScore(0);
  };

  const runDetection = useCallback(() => {
    if (!detectingRef.current) return;
    const v = pVideoRef.current, c = pCanvasRef.current;
    if (!v || !c || !v.videoWidth) { requestAnimationFrame(runDetection); return; }
    c.width = v.videoWidth; c.height = v.videoHeight;
    const ctx = c.getContext('2d');
    ctx.drawImage(v, 0, 0);
    const curr = ctx.getImageData(0, 0, c.width, c.height);

    if (prevFrameRef.current) {
      let diff = 0, px = curr.data.length / 4;
      for (let i = 0; i < curr.data.length; i += 16) {
        diff += (Math.abs(curr.data[i] - prevFrameRef.current.data[i]) +
                 Math.abs(curr.data[i+1] - prevFrameRef.current.data[i+1]) +
                 Math.abs(curr.data[i+2] - prevFrameRef.current.data[i+2])) / 3;
      }
      const motion = (diff / (px / 4)) * 4;
      setMotionScore(Math.round(Math.min(motion * 2, 100)));

      if (motion < 3) {
        setFeedback(`✅ Perfect ${selectedPose?.name}! Hold it!`);
      } else if (motion < 10) {
        setFeedback('Good! Keep stable...');
      } else if (motion < 25) {
        setFeedback('⚠️ Too much movement — slow down');
        setRepCount(p => p + 1);
      } else {
        setFeedback('🔴 Stop — reset your pose');
      }
    }
    prevFrameRef.current = curr;
    setTimeout(() => { if (detectingRef.current) requestAnimationFrame(runDetection); }, 150);
  }, [selectedPose]);

  // Cleanup on unmount
  useEffect(() => () => { stopStream(streamRef); stopStream(pStreamRef); detectingRef.current = false; }, []);

  return (
    <div className="scanner-page">
      <TopBar title="Scanner" showProgress={false} />

      {/* Mode Toggle */}
      <div className="scanner-mode-tabs">
        <button className={`scan-tab ${mode==='food'?'active':''}`} onClick={() => { setMode('food'); stopStream(pStreamRef); detectingRef.current=false; setPosePhase('select'); }}>
          🍽️ Food Scan
        </button>
        <button className={`scan-tab ${mode==='posture'?'active':''}`} onClick={() => { setMode('posture'); stopStream(streamRef); setPhase('idle'); }}>
          🧘 Yoga / Posture
        </button>
      </div>

      <div className="scanner-body">

        {/* ────── FOOD MODE ────── */}
        {mode === 'food' && (
          <>
            {phase === 'idle' && (
              <div className="scan-intro fade-up">
                <GlassCard className="scan-intro-card">
                  <div className="scan-intro-icon">📸</div>
                  <h3>AI Food Scanner</h3>
                  <p>Point your camera at any food and get instant nutrition analysis powered by AI</p>
                  <div className="scan-intro-features">
                    {['🔍 Identifies food instantly','📊 Full nutrition breakdown','💡 Health score & tips','⚡ Earn XP for healthy choices'].map(f => <div key={f} className="scan-feature">{f}</div>)}
                  </div>
                  <button className="scan-open-btn" onClick={openFoodCamera}>📷 Open Camera</button>
                </GlassCard>
              </div>
            )}

            {phase === 'camera' && (
              <div className="cam-view fade-up">
                <div className="cam-viewport">
                  <video ref={videoRef} autoPlay playsInline muted className="cam-video" />
                  <div className="cam-frame">
                    <div className="cam-corner tl"/><div className="cam-corner tr"/>
                    <div className="cam-corner bl"/><div className="cam-corner br"/>
                  </div>
                  <div className="cam-hint">Point at food & tap capture</div>
                  <canvas ref={canvasRef} style={{display:'none'}} />
                </div>
                <div className="cam-controls">
                  <button className="capture-btn" onClick={captureFood}><span className="capture-inner" /></button>
                </div>
                <button className="cancel-scan-btn" onClick={() => { stopStream(streamRef); setPhase('idle'); }}>Cancel</button>
              </div>
            )}

            {phase === 'scanning' && (
              <div className="scanning-state fade-up">
                <GlassCard className="scanning-card">
                  {capturedImage && <img src={capturedImage} alt="Captured" className="captured-preview" />}
                  <div className="scanning-overlay">
                    <div className="scan-spinner" />
                    <p className="scan-anim-text">🤖 Analyzing food...</p>
                    <div className="scan-steps">
                      {['Identifying food item...','Calculating nutrients...','Generating health score...'].map((s,i) => <div key={i} className="scan-step" style={{animationDelay:`${i*0.6}s`}}>{s}</div>)}
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {phase === 'result' && scanResult && (
              <div className="result-view fade-up">
                {capturedImage && <img src={capturedImage} alt="Scanned" className="result-captured-img" />}
                <FoodResultPanel food={scanResult} onDismiss={dismissResult} />
              </div>
            )}

            {/* Scan History */}
            {phase === 'idle' && scanHistory.length > 0 && (
              <div className="scan-history fade-up">
                <h3 className="scan-hist-title">Recent Scans</h3>
                <div className="history-list">
                  {scanHistory.slice(0,5).map(s => (
                    <GlassCard key={s.id} className="history-item">
                      <span className="hist-emoji">{s.emoji || '🍽️'}</span>
                      <div className="hist-info">
                        <div className="hist-name">{s.name}</div>
                        <div className="hist-cat" style={{color:s.color || 'var(--neon-purple)'}}>{s.category}</div>
                      </div>
                      <span className="hist-xp">+{s.xp} XP</span>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ────── POSTURE / YOGA MODE ────── */}
        {mode === 'posture' && (
          <>
            {posePhase === 'select' && (
              <div className="pose-select fade-up">
                <GlassCard className="pose-select-intro">
                  <h3>🧘 Yoga Posture Checker</h3>
                  <p>Select a pose, then use your camera for real-time feedback on your form</p>
                </GlassCard>
                <h4 className="pose-pick-title">Choose a Pose</h4>
                <div className="pose-list">
                  {YOGA_POSES.map(p => (
                    <PoseCard key={p.id} pose={p} active={selectedPose?.id === p.id} onSelect={setSelectedPose} />
                  ))}
                </div>
                {selectedPose && (
                  <div className="pose-detail-card glass fade-up">
                    <div className="pose-detail-header">
                      <span className="pose-detail-emoji">{selectedPose.emoji}</span>
                      <div>
                        <div className="pose-detail-name">{selectedPose.name}</div>
                        <div className="pose-detail-sanskrit" style={{color:selectedPose.color}}>{selectedPose.sanskritName}</div>
                      </div>
                      <span className="pose-detail-level-badge" style={{background:`${selectedPose.color}20`,color:selectedPose.color}}>{selectedPose.level}</span>
                    </div>
                    <div className="pose-cues-section">
                      <div className="pose-sec-title">✅ Form Cues</div>
                      {selectedPose.cues.map((c,i) => <div key={i} className="pose-cue"><span style={{color:selectedPose.color}}>•</span> {c}</div>)}
                    </div>
                    <div className="pose-benefits-section">
                      <div className="pose-sec-title">🌿 Benefits</div>
                      <p className="pose-benefits-text">{selectedPose.benefits}</p>
                    </div>
                    <button className="scan-open-btn" style={{background:`linear-gradient(135deg,${selectedPose.color},var(--neon-cyan))`}} onClick={openPoseCamera}>
                      📷 Start Pose Check
                    </button>
                  </div>
                )}
              </div>
            )}

            {(posePhase === 'camera' || posePhase === 'active') && selectedPose && (
              <div className="pose-cam-view fade-up">
                <div className="cam-viewport">
                  <video ref={pVideoRef} autoPlay playsInline muted className="cam-video" style={{transform:'scaleX(-1)'}} />

                  {/* Pose skeleton overlay hint */}
                  <div className="pose-overlay">
                    <div className="pose-name-overlay" style={{background:`${selectedPose.color}CC`}}>
                      {selectedPose.emoji} {selectedPose.name}
                    </div>
                    {posePhase === 'active' && (
                      <>
                        <div className={`feedback-banner-live ${motionScore < 10 ? 'good' : motionScore < 25 ? 'warn' : 'bad'}`}>
                          {feedback}
                        </div>
                        <div className="rep-counter-live">
                          <span className="rep-count-num">{repCount}</span>
                          <span className="rep-count-label">movements</span>
                        </div>
                        <div className="motion-bar-wrap">
                          <div className="motion-bar" style={{width:`${motionScore}%`, background: motionScore<25 ? '#10b981' : motionScore<50 ? '#fbbf24' : '#ef4444'}} />
                        </div>
                      </>
                    )}
                  </div>
                  <canvas ref={pCanvasRef} style={{display:'none'}} />
                </div>

                <div className="pose-cues-live glass">
                  {selectedPose.cues.slice(0,3).map((c,i) => <div key={i} className="cue-live">✓ {c}</div>)}
                </div>

                {posePhase === 'camera' && (
                  <button className="scan-open-btn" onClick={startDetection}>▶️ Start Posture Check</button>
                )}
                {posePhase === 'active' && (
                  <button className="stop-pose-btn" onClick={stopDetection}>⏹ Stop & Choose Another</button>
                )}
              </div>
            )}
          </>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Scanner;
