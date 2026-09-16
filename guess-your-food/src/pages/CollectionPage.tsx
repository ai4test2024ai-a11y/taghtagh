// CollectionPage Component
import React, { useState } from 'react';
import { Language, PlayerProgress, FilterState } from '../types';
import { t } from '../utils/translations';
import { foods, countries, cities } from '../data/database';
import { progressManager } from '../systems/ProgressManager';

interface CollectionPageProps {
  language: Language;
  progress: PlayerProgress | null;
}

const CollectionPage: React.FC<CollectionPageProps> = ({ language, progress }) => {
  const [filters, setFilters] = useState<FilterState>({});
  const [searchTerm, setSearchTerm] = useState('');

  const isFoodDiscovered = (foodId: string): boolean => {
    return progressManager.isFoodDiscovered(foodId);
  };

  const filteredFoods = foods.filter(food => {
    // Search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = 
        food.name.toLowerCase().includes(searchLower) ||
        food.englishName.toLowerCase().includes(searchLower) ||
        food.persianName.includes(searchTerm) ||
        food.arabicName.includes(searchTerm);
      
      if (!matchesSearch) return false;
    }

    // Country filter
    if (filters.countryId && !food.countryIds.includes(filters.countryId)) {
      return false;
    }

    // Category filter
    if (filters.category && food.category !== filters.category) {
      return false;
    }

    // Collected filter
    if (filters.collected !== undefined) {
      const discovered = isFoodDiscovered(food.id);
      if (filters.collected && !discovered) return false;
      if (!filters.collected && discovered) return false;
    }

    return true;
  });

  const getFoodDisplayName = (food: typeof foods[0]): string => {
    switch (language) {
      case 'fa': return food.persianName;
      case 'ar': return food.arabicName;
      default: return food.englishName;
    }
  };

  const getCountryName = (countryId: string): string => {
    const country = countries.find(c => c.id === countryId);
    if (!country) return '';
    
    switch (language) {
      case 'fa': return country.persianName;
      case 'ar': return country.arabicName;
      default: return country.englishName;
    }
  };

  return (
    <div className="collection-page">
      <h2>{t('nav.collection', language)}</h2>
      
      <div className="collection-stats">
        <div className="stat-box">
          <span className="stat-number">{progress?.collection.length || 0}</span>
          <span className="stat-label">{t('progress.foods', language)}</span>
        </div>
        <div className="stat-box">
          <span className="stat-number">{foods.length}</span>
          <span className="stat-label">Total Foods</span>
        </div>
      </div>

      <div className="search-filter-section">
        <input
          type="text"
          placeholder={t('button.search', language)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        
        <div className="filter-buttons">
          <button
            className={`filter-btn ${filters.collected === undefined ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, collected: undefined })}
          >
            All
          </button>
          <button
            className={`filter-btn ${filters.collected === true ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, collected: true })}
          >
            Discovered
          </button>
          <button
            className={`filter-btn ${filters.collected === false ? 'active' : ''}`}
            onClick={() => setFilters({ ...filters, collected: false })}
          >
            Locked
          </button>
        </div>
      </div>

      <div className="foods-grid">
        {filteredFoods.length === 0 ? (
          <div className="empty-state">
            <p>{t('message.noResults', language)}</p>
          </div>
        ) : (
          filteredFoods.map(food => {
            const discovered = isFoodDiscovered(food.id);
            
            return (
              <div
                key={food.id}
                className={`food-card ${discovered ? 'discovered' : 'locked'}`}
              >
                <div className="food-image">
                  {discovered ? (
                    <span className="food-emoji">🍽️</span>
                  ) : (
                    <span className="lock-icon">❓</span>
                  )}
                </div>
                
                <div className="food-info">
                  <h3>{getFoodDisplayName(food)}</h3>
                  <p className="food-country">
                    📍 {getCountryName(food.countryIds[0])}
                  </p>
                  <p className="food-rarity">
                    {t(`rarity.${food.rarity.toLowerCase()}`, language)}
                  </p>
                </div>
                
                {discovered && (
                  <div className="food-actions">
                    <button className="btn btn-small">View Recipe</button>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
