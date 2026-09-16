// HomePage Component
import React from 'react';
import { Language, PlayerProgress } from '../types';
import { t } from '../utils/translations';
import { foods } from '../data/database';

interface HomePageProps {
  language: Language;
  progress: PlayerProgress | null;
  onUpdateProgress: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ language, progress, onUpdateProgress }) => {
  const collectionPercentage = progress ? Math.round((progress.collection.length / foods.length) * 100) : 0;

  return (
    <div className="home-page">
      <section className="hero-section">
        <h2>{t('game.subtitle', language)}</h2>
        <p>🌍🍴</p>
        
        <div className="action-buttons">
          <a href="/play" className="btn btn-primary btn-large">
            {t('home.playNow', language)}
          </a>
          <a href="/collection" className="btn btn-secondary btn-large">
            {t('home.foodCollection', language)}
          </a>
        </div>
      </section>

      <section className="stats-section">
        {progress && (
          <>
            <div className="stat-card">
              <h3>{t('stats.level', language)}</h3>
              <p className="stat-number">{progress.level}</p>
            </div>
            <div className="stat-card">
              <h3>{t('stats.xp', language)}</h3>
              <p className="stat-number">{progress.xp}</p>
            </div>
            <div className="stat-card">
              <h3>{t('stats.streak', language)}</h3>
              <p className="stat-number">🔥 {progress.streak}</p>
            </div>
            <div className="stat-card">
              <h3>{t('stats.coins', language)}</h3>
              <p className="stat-number">🪙 {progress.coins}</p>
            </div>
          </>
        )}
      </section>

      <section className="progress-section">
        <h3>{t('progress.world', language)}</h3>
        <div className="progress-bar-container">
          <div className="progress-bar" style={{ width: `${collectionPercentage}%` }}></div>
        </div>
        <p>{collectionPercentage}% {t('progress.foods', language)}</p>
        <p>{progress?.collection.length || 0} / {foods.length} {t('progress.foods', language)}</p>
      </section>

      <section className="featured-section">
        <h3>Featured Country: Iran 🇮🇷</h3>
        <p>Discover over 100 authentic Iranian dishes from different regions!</p>
        <a href="/play" className="btn btn-primary">
          {t('home.iranJourney', language)}
        </a>
      </section>
    </div>
  );
};

export default HomePage;
