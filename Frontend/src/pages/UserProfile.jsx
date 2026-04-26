// Profile Page - CLEAN VERSION
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import { SHOP_PRODUCTS, SHOP_CATS, PREMIUM_PLANS, PRESET_AVATARS } from '../data/shopData';
import ShopModal from '../components/features/ShopModal';
import './Profile.css';

// ── Preset avatars (Snapchat-style) ──────────────────────────────────────────

const AvatarBubble = ({ preset, size = 72, onClick }) => (
  <div
    className="avatar-bubble"
    style={{ width: size, height: size, background: preset?.bg || 'linear-gradient(135deg,#a855f7,#06b6d4)', borderRadius: '50%', cursor: onClick ? 'pointer' : 'default', display:'flex', alignItems:'center', justifyContent:'center', fontSize: size * 0.45 }}
    onClick={onClick}
  >
    {preset?.emoji || '👤'}
  </div>
);

const AvatarPickerModal = ({ current, onSave, onClose }) => {
  const [selected, setSelected] = useState(current || 'av1');
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header">
          <h2>Choose Your Avatar</h2>
          <button className="prof-modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="avatar-grid">
          {PRESET_AVATARS.map(av => (
            <div key={av.id} className={`avatar-pick-item ${selected === av.id ? 'selected' : ''}`} onClick={() => setSelected(av.id)}>
              <AvatarBubble preset={av} size={60} />
              <span className="avatar-pick-label">{av.label}</span>
            </div>
          ))}
        </div>
        <button className="prof-save-btn" onClick={() => { onSave(selected); onClose(); }}>Save Avatar</button>
      </div>
    </div>
  );
};

const EditProfileModal = ({ user, onSave, onClose }) => {
  const [form, setForm] = useState({ 
    name: user.name || '', 
    goal: user.goal?.name || '', 
    bio: user.bio || '',
    healthCondition: user.healthCondition || false,
    healthConditionDetails: user.healthConditionDetails || ''
  });
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header"><h2>Edit Profile</h2><button className="prof-modal-close" onClick={onClose}>✕</button></div>
        <div className="edit-form">
          <label className="edit-label">Name</label>
          <input className="edit-input" value={form.name} onChange={e => setForm(p=>({...p, name:e.target.value}))} />
          <label className="edit-label">Bio</label>
          <textarea className="edit-input" value={form.bio} onChange={e => setForm(p=>({...p, bio:e.target.value}))} />
        </div>
        <button className="prof-save-btn" onClick={() => { onSave(form); onClose(); }}>Save Changes</button>
      </div>
    </div>
  );
};

const ReferModal = ({ userName, onClose }) => {
  const code = `AACH-${(userName || 'USER').slice(0,4).toUpperCase()}-2026`;
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header"><h2>Refer & Earn</h2><button className="prof-modal-close" onClick={onClose}>✕</button></div>
        <div className="refer-hero"><div className="refer-icon">🤝</div><h3>Invite Friends!</h3><p>Code: <strong>{code}</strong></p></div>
        <button className="prof-save-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

const SettingsModal = ({ settings, onUpdate, onClose }) => {
  const toggle = (key) => onUpdate({...settings, [key]: !settings[key]});
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <div className="prof-modal-header"><h2>Settings</h2><button className="prof-modal-close" onClick={onClose}>✕</button></div>
        {Object.keys(settings).map(k => (
          <div key={k} className="settings-row-item">
            <span>{k}</span>
            <button className={`toggle-btn ${settings[k]?'on':'off'}`} onClick={() => toggle(k)}><span className="toggle-knob" /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

const PremiumModal = ({ onClose }) => {
  const [activated, setActivated] = useState(false);
  return (
    <div className="prof-modal-overlay" onClick={onClose}>
      <div className="prof-modal glass" onClick={e => e.stopPropagation()}>
        <h2 className="premium-title-big">Aacharyaa Premium 👑</h2>
        <button className="prof-save-btn" onClick={() => setActivated(true)}>
          {activated ? 'Activated! 🎉' : 'Upgrade Now'}
        </button>
        <button className="prof-modal-close" style={{position:'absolute',top:16,right:16}} onClick={onClose}>✕</button>
      </div>
    </div>
  );
};

const Profile = () => {
  const { state, dispatch } = useApp();
  const { user, xp, rank, streak, stats } = state;
  const [modal, setModal] = useState(null);
  const [settings, setSettings] = useState({ notifications:true, dailyReminders:true, soundEffects:true });

  const saveAvatar = (id) => dispatch({ type: 'UPDATE_AVATAR', payload: { avatarId: id } });
  const saveProfile = (form) => {
    dispatch({ type: 'SET_USER_NAME', payload: form.name });
    dispatch({ type: 'UPDATE_USER_BIO', payload: form.bio });
  };

  const currentPreset = PRESET_AVATARS.find(a => a.id === user.avatarId) || PRESET_AVATARS[0];

  return (
    <div className="profile-page">
      <TopBar title="Profile" showProgress={false} />
      <div className="profile-content">
        <GlassCard className="profile-header-card">
          <div className="prof-avatar-wrap" onClick={() => setModal('avatar')}>
            <AvatarBubble preset={currentPreset} size={88} />
          </div>
          <div className="profile-info">
            <h2>{user.name || 'Champion'}</h2>
            <p>{rank.name} (Rank {rank.id})</p>
          </div>
          <button className="shop-icon-btn" onClick={() => dispatch({ type: 'TOGGLE_SHOP' })}>🛍️</button>
        </GlassCard>

        <div className="quick-actions-grid" style={{marginTop:20}}>
          <button className="quick-action-btn" onClick={() => dispatch({ type: 'TOGGLE_SHOP' })}>🛍️ Shop</button>
          <button className="quick-action-btn" onClick={() => setModal('premium')}>👑 Premium</button>
          <button className="quick-action-btn" onClick={() => setModal('settings')}>⚙️ Settings</button>
        </div>


        <div style={{marginTop:20}}>
          <Button variant="ghost" fullWidth onClick={() => { if(window.confirm('Restart Journey?')) { dispatch({type:'RESET_APP'}); window.location.reload(); }}}>Restart Journey 🔄</Button>
          <Button variant="outline" fullWidth style={{marginTop:10,color:'#ef4444',borderColor:'#ef4444'}} onClick={() => { localStorage.clear(); window.location.href='/'; }}>Logout 🚪</Button>
        </div>
      </div>
      <BottomNav />
      {modal === 'avatar' && <AvatarPickerModal current={user.avatarId} onSave={saveAvatar} onClose={() => setModal(null)} />}
      {modal === 'edit' && <EditProfileModal user={user} onSave={saveProfile} onClose={() => setModal(null)} />}
      {modal === 'refer' && <ReferModal userName={user.name} onClose={() => setModal(null)} />}
      {modal === 'settings' && <SettingsModal settings={settings} onUpdate={setSettings} onClose={() => setModal(null)} />}
      {modal === 'premium' && <PremiumModal onClose={() => setModal(null)} />}
    </div>
  );
};

export default Profile;
