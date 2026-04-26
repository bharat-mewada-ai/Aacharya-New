// Bottom Navigation - STRICT IMPLEMENTATION
import { NavLink } from 'react-router-dom';
import './BottomNav.css';

const BottomNav = () => {
  const navItems = [
    { path: '/home', icon: '🏠', label: 'Home' },
    { path: '/missions', icon: '🎯', label: 'Missions' },
    { path: '/scanner', icon: '📸', label: 'Scanner' },
    { path: '/chat', icon: '💬', label: 'Chat' },
    { path: '/nutrition', icon: '🥗', label: 'Nutrition' },
    { path: '/care', icon: '🏥', label: 'Care' },
    { path: '/profile', icon: '👤', label: 'Profile' }
  ];

  return (
    <nav className="bottom-nav glass">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            `nav-item ${isActive ? 'active' : ''}`
          }
        >
          <span className="nav-icon">{item.icon}</span>
          <span className="nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
};

export default BottomNav;
