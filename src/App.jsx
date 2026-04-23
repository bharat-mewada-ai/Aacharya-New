// App Component - STRICT IMPLEMENTATION
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import ParticleBackground from './components/canvas/ParticleBackground';

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
import Profile from './pages/Profile';

import './App.css';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <ParticleBackground />
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
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
