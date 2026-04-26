// Care Page - Nearby Clinics & Doctors
import React, { useState, useEffect } from 'react';
import TopBar from '../components/layout/TopBar';
import BottomNav from '../components/layout/BottomNav';
import GlassCard from '../components/ui/GlassCard';
import Button from '../components/ui/Button';
import './Care.css';

const MOCK_CLINICS = [
  {
    id: 1,
    name: 'Apex Multispeciality Clinic',
    type: 'General Physician',
    distance: '0.8 km',
    rating: 4.8,
    address: 'Sector 45, Near Central Mall, Mumbai',
    open: true,
    phone: '+91 98765 43210',
    tags: ['Emergency', 'Vaccination', 'Physiotherapy']
  },
  {
    id: 2,
    name: 'Wellness Care Centre',
    type: 'Nutritionist & Dietician',
    distance: '1.2 km',
    rating: 4.6,
    address: 'Oakwood Towers, MG Road, Mumbai',
    open: true,
    phone: '+91 98765 11122',
    tags: ['Diet Plan', 'Diabetes', 'Obesity']
  },
  {
    id: 3,
    name: 'City Heart Hospital',
    type: 'Cardiologist',
    distance: '2.5 km',
    rating: 4.9,
    address: 'Plot 12, Link Road, Mumbai',
    open: true,
    phone: '+91 98765 99988',
    tags: ['Cardiology', 'ICU', '24/7']
  },
  {
    id: 4,
    name: 'Smile Dental Hub',
    type: 'Dentist',
    distance: '3.1 km',
    rating: 4.5,
    address: 'B-Block, Sunshine Plaza, Mumbai',
    open: false,
    phone: '+91 98765 00044',
    tags: ['Cleaning', 'Orthodontics']
  }
];

const Care = () => {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate location fetch
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  const categories = ['All', 'Emergency', 'Physician', 'Dietician', 'Specialist'];

  const filteredClinics = MOCK_CLINICS.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                       c.type.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || c.tags.includes(filter) || c.type.includes(filter);
    return matchSearch && matchFilter;
  });

  const handleNavigate = (address) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="care-page">
      <TopBar title="Nearby Care" />

      <div className="care-content">
        {/* Search & Filters */}
        <div className="care-header fade-up">
          <div className="care-search glass">
            <span>🔍</span>
            <input 
              type="text" 
              placeholder="Search doctors, clinics..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="care-filters">
            {categories.map(cat => (
              <button 
                key={cat} 
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="care-loading">
            <div className="pulse-circle"></div>
            <p>Scanning nearby medical facilities...</p>
          </div>
        ) : (
          <div className="clinics-list">
            <h3 className="list-title">Recommended for You</h3>
            {filteredClinics.map(clinic => (
              <GlassCard key={clinic.id} className="clinic-card fade-up">
                <div className="clinic-header">
                  <div className="clinic-main">
                    <h4 className="clinic-name">{clinic.name}</h4>
                    <span className="clinic-type">{clinic.type}</span>
                  </div>
                  <div className="clinic-rating">
                    <span>⭐</span> {clinic.rating}
                  </div>
                </div>

                <div className="clinic-meta">
                  <span className="meta-item">📍 {clinic.distance} away</span>
                  <span className={`meta-item status ${clinic.open ? 'open' : 'closed'}`}>
                    {clinic.open ? '● Open Now' : '● Closed'}
                  </span>
                </div>

                <p className="clinic-address">{clinic.address}</p>

                <div className="clinic-tags">
                  {clinic.tags.map(tag => (
                    <span key={tag} className="c-tag">{tag}</span>
                  ))}
                </div>

                <div className="clinic-actions">
                  <Button variant="primary" style={{ flex: 1 }} onClick={() => window.open(`tel:${clinic.phone}`)}>
                    📞 Call Now
                  </Button>
                  <Button variant="secondary" style={{ flex: 1, color: 'white' }} onClick={() => handleNavigate(clinic.address)}>
                    🚀 Navigate
                  </Button>
                </div>
              </GlassCard>
            ))}

            {filteredClinics.length === 0 && (
              <div className="empty-care">
                <span>🏥</span>
                <p>No facilities found matching your search.</p>
              </div>
            )}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
};

export default Care;
