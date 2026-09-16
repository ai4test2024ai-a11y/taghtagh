// SettingsPage Component
import React from 'react';
import { Language, PlayerProgress } from '../types';
import { t, supportedLanguages } from '../utils/translations';

interface SettingsPageProps {
  language: Language;
  progress: PlayerProgress | null;
  onLanguageChange: (lang: Language) => void;
}

const SettingsPage: React.FC<SettingsPageProps> = ({ 
  language, 
  progress, 
  onLanguageChange 
}) => {
  return (
    <div className="settings-page">
      <h2>{t('nav.settings', language)}</h2>

      <section className="settings-section">
        <h3>{t('settings.language', language)}</h3>
        <div className="language-options">
          {supportedLanguages.map(lang => (
            <button
              key={lang.code}
              className={`language-btn ${language === lang.code ? 'active' : ''}`}
              onClick={() => onLanguageChange(lang.code)}
            >
              {lang.nativeName}
            </button>
          ))}
        </div>
      </section>

      <section className="settings-section">
        <h3>{t('settings.calendar', language)}</h3>
        <div className="calendar-options">
          <label>
            <input
              type="radio"
              name="calendar"
              value="gregorian"
              checked={progress?.settings.calendarType === 'gregorian'}
              onChange={() => {}}
            />
            {t('settings.gregorian', language)}
          </label>
          <label>
            <input
              type="radio"
              name="calendar"
              value="persian"
              checked={progress?.settings.calendarType === 'persian'}
              onChange={() => {}}
            />
            {t('settings.persian', language)}
          </label>
        </div>
      </section>

      <section className="settings-section">
        <h3>About</h3>
        <p>Guess Your Food - A global food discovery game</p>
        <p>Version 1.0.0</p>
      </section>

      {progress && (
        <section className="settings-section stats-section">
          <h3>Your Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span>Level:</span>
              <strong>{progress.level}</strong>
            </div>
            <div className="stat-item">
              <span>Total XP:</span>
              <strong>{progress.xp}</strong>
            </div>
            <div className="stat-item">
              <span>Coins:</span>
              <strong>{progress.coins}</strong>
            </div>
            <div className="stat-item">
              <span>Foods Discovered:</span>
              <strong>{progress.collection.length}</strong>
            </div>
            <div className="stat-item">
              <span>Best Streak:</span>
              <strong>{progress.streak}</strong>
            </div>
            <div className="stat-item">
              <span>Achievements:</span>
              <strong>{progress.achievements.filter(a => a.unlocked).length} / {progress.achievements.length}</strong>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default SettingsPage;
