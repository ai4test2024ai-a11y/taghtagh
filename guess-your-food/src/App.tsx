import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Language, PlayerProgress } from './types';
import { translations, t, getDirection, supportedLanguages } from './utils/translations';
import { progressManager } from './systems/ProgressManager';
import HomePage from './pages/HomePage';
import PlayPage from './pages/PlayPage';
import CollectionPage from './pages/CollectionPage';
import SettingsPage from './pages/SettingsPage';
import './styles/App.css';

function App() {
  const [progress, setProgress] = useState<PlayerProgress | null>(null);
  const [language, setLanguage] = useState<Language>('en');
  const [direction, setDirection] = useState<'ltr' | 'rtl'>('ltr');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load progress on mount
    const loadedProgress = progressManager.loadProgress();
    setProgress(loadedProgress);
    
    // Set language from saved settings
    if (loadedProgress.settings.language) {
      setLanguage(loadedProgress.settings.language);
      setDirection(getDirection(loadedProgress.settings.language));
    }
    
    setIsLoading(false);
  }, []);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setDirection(getDirection(newLang));
    
    if (progress) {
      progress.settings.language = newLang;
      progressManager.saveProgress();
    }
  };

  const updateProgress = () => {
    const updated = progressManager.getProgress();
    setProgress(updated);
  };

  if (isLoading) {
    return (
      <div className="loading-screen" dir={direction}>
        <h1>{t('game.title', language)}</h1>
        <p>{t('message.loading', language)}</p>
      </div>
    );
  }

  return (
    <Router>
      <div className={`app ${direction}`} dir={direction} lang={language}>
        <header className="app-header">
          <div className="header-content">
            <h1 className="logo">{t('game.title', language)}</h1>
            
            {progress && (
              <div className="player-stats">
                <div className="stat">
                  <span className="stat-label">{t('stats.level', language)}</span>
                  <span className="stat-value">{progress.level}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t('stats.xp', language)}</span>
                  <span className="stat-value">{progress.xp}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t('stats.streak', language)}</span>
                  <span className="stat-value">🔥 {progress.streak}</span>
                </div>
                <div className="stat">
                  <span className="stat-label">{t('stats.coins', language)}</span>
                  <span className="stat-value">🪙 {progress.coins}</span>
                </div>
              </div>
            )}
            
            <nav className="main-nav">
              <a href="/">{t('nav.home', language)}</a>
              <a href="/play">{t('nav.play', language)}</a>
              <a href="/collection">{t('nav.collection', language)}</a>
              <a href="/settings">{t('nav.settings', language)}</a>
            </nav>
            
            <select 
              value={language} 
              onChange={(e) => handleLanguageChange(e.target.value as Language)}
              className="language-selector"
            >
              {supportedLanguages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.nativeName}
                </option>
              ))}
            </select>
          </div>
        </header>

        <main className="app-main">
          <Routes>
            <Route 
              path="/" 
              element={
                <HomePage 
                  language={language} 
                  progress={progress} 
                  onUpdateProgress={updateProgress}
                />
              } 
            />
            <Route 
              path="/play" 
              element={
                <PlayPage 
                  language={language} 
                  progress={progress} 
                  onUpdateProgress={updateProgress}
                /> 
              } 
            />
            <Route 
              path="/collection" 
              element={
                <CollectionPage 
                  language={language} 
                  progress={progress} 
                /> 
              } 
            />
            <Route 
              path="/settings" 
              element={
                <SettingsPage 
                  language={language} 
                  progress={progress} 
                  onLanguageChange={handleLanguageChange}
                /> 
              } 
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>

        <footer className="app-footer">
          <p>&copy; 2024 {t('game.title', language)}. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
