// App Component - RESTORED & SAFE
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useApp, AppProvider } from './context/AppContext';

// Pages
import Splash from './pages/Splash';
import Onboarding from './pages/Onboarding';
import Setup from './pages/Setup';
import Home from './pages/Home';
import Missions from './pages/Missions';
import Chat from './pages/Chat';
import Scanner from './pages/Scanner';
import Progress from './pages/Progress';
import Avatar from "./components/Avatar"; 
import UserProfile from './pages/UserProfile';
import ProfileGamified from './pages/ProfileGamified';
import Nutrition from './pages/Nutrition';
import Care from './pages/Care';
import ShopModal from './components/features/ShopModal';

import './App.css';

const AppContent = () => {
  let context;
  try {
    context = useApp();
  } catch (e) {
    return <div style={{color:'white', padding:20}}>Error loading app context: {e.message}</div>;
  }
  
  const { state, dispatch } = context;

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/missions" element={<Missions />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/scanner" element={<Scanner />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/profile" element={<ProfileGamified />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/care" element={<Care />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        
        {state?.showShop && (
          <ShopModal onClose={() => dispatch({ type: 'TOGGLE_SHOP' })} />
        )}
      </div>
    </BrowserRouter>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
