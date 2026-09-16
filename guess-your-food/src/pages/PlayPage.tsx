// PlayPage Component - Main Quiz Game
import React, { useState, useEffect } from 'react';
import { Language, PlayerProgress, Question, GameState, Reward } from '../types';
import { t } from '../utils/translations';
import { questionGenerator } from '../systems/QuestionGenerator';
import { progressManager } from '../systems/ProgressManager';
import { foods } from '../data/database';

interface PlayPageProps {
  language: Language;
  progress: PlayerProgress | null;
  onUpdateProgress: () => void;
}

const PlayPage: React.FC<PlayPageProps> = ({ language, progress, onUpdateProgress }) => {
  const [gameState, setGameState] = useState<GameState>({
    currentQuestion: null,
    selectedAnswer: null,
    isSubmitting: false,
    showResult: false,
    isCorrect: false,
    comboCount: 0,
    sessionXp: 0,
    sessionCoins: 0,
    questionsAnswered: 0
  });

  const [showFoodInfo, setShowFoodInfo] = useState(false);
  const [currentFoodId, setCurrentFoodId] = useState<string | null>(null);

  useEffect(() => {
    generateNewQuestion();
  }, []);

  const generateNewQuestion = () => {
    const difficulty = 'Medium';
    const question = questionGenerator.getRandomQuestion(difficulty, language);
    
    if (question) {
      setGameState(prev => ({
        ...prev,
        currentQuestion: question,
        selectedAnswer: null,
        isSubmitting: false,
        showResult: false,
        foodId: question.foodId || null
      }));
      setCurrentFoodId(question.foodId || null);
    }
  };

  const handleAnswerSelect = (optionId: string) => {
    if (gameState.isSubmitting || gameState.showResult) return;
    
    setGameState(prev => ({
      ...prev,
      selectedAnswer: optionId
    }));
  };

  const handleSubmitAnswer = async () => {
    if (!gameState.currentQuestion || !gameState.selectedAnswer || gameState.isSubmitting) {
      return;
    }

    setGameState(prev => ({ ...prev, isSubmitting: true }));

    const isCorrect = gameState.selectedAnswer === gameState.currentQuestion.correctAnswerId;
    
    // Process rewards with stale state protection
    let reward: Reward = { xp: 0, coins: 0 };
    
    if (isCorrect) {
      const comboMultiplier = 1 + (gameState.comboCount * 0.1);
      reward = progressManager.handleCorrectAnswer(10, 5, comboMultiplier);
      
      // Discover food if it's a food question
      if (gameState.currentQuestion.foodId) {
        const isNewDiscovery = progressManager.discoverFood(gameState.currentQuestion.foodId);
        
        if (isNewDiscovery && gameState.currentQuestion.countryId) {
          progressManager.updateCountryProgress(gameState.currentQuestion.countryId, gameState.currentQuestion.foodId);
        }
        
        if (isNewDiscovery && gameState.currentQuestion.cityId) {
          progressManager.updateCityProgress(gameState.currentQuestion.cityId, gameState.currentQuestion.foodId);
        }
      }
    } else {
      progressManager.handleWrongAnswer();
    }

    setGameState(prev => ({
      ...prev,
      isSubmitting: false,
      showResult: true,
      isCorrect,
      comboCount: isCorrect ? prev.comboCount + 1 : 0,
      sessionXp: prev.sessionXp + reward.xp,
      sessionCoins: prev.sessionCoins + reward.coins,
      questionsAnswered: prev.questionsAnswered + 1
    }));

    onUpdateProgress();
  };

  const handleNextQuestion = () => {
    generateNewQuestion();
    setShowFoodInfo(false);
  };

  const getFoodName = (foodId: string | null): string => {
    if (!foodId) return '';
    const food = foods.find(f => f.id === foodId);
    if (!food) return '';
    
    switch (language) {
      case 'fa': return food.persianName;
      case 'ar': return food.arabicName;
      default: return food.englishName;
    }
  };

  const getOptionText = (text: Record<string, string>): string => {
    return text[language] || text.en || '';
  };

  if (!gameState.currentQuestion) {
    return (
      <div className="play-page">
        <p>{t('message.loading', language)}</p>
      </div>
    );
  }

  return (
    <div className="play-page">
      <div className="question-container">
        <div className="question-header">
          <span className="question-type">
            {t(`question.${gameState.currentQuestion.type}`, language)}
          </span>
          <span className="combo-badge">
            🔥 {gameState.comboCount}x
          </span>
        </div>

        <h2 className="question-text">
          {gameState.currentQuestion.text[language] || gameState.currentQuestion.text.en}
        </h2>

        {gameState.currentQuestion.foodId && (
          <div className="food-image-placeholder">
            🍽️
            <p>{getFoodName(gameState.currentQuestion.foodId)}</p>
          </div>
        )}

        <div className="options-grid">
          {gameState.currentQuestion.options.map((option) => {
            const isSelected = gameState.selectedAnswer === option.id;
            const isCorrect = option.isCorrect;
            const showCorrect = gameState.showResult && isCorrect;
            const showWrong = gameState.showResult && isSelected && !isCorrect;

            return (
              <button
                key={option.id}
                className={`option-btn ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showWrong ? 'wrong' : ''}`}
                onClick={() => handleAnswerSelect(option.id)}
                disabled={gameState.showResult || gameState.isSubmitting}
              >
                {getOptionText(option.text)}
              </button>
            );
          })}
        </div>

        {!gameState.showResult ? (
          <button
            className="btn btn-primary btn-large submit-btn"
            onClick={handleSubmitAnswer}
            disabled={!gameState.selectedAnswer || gameState.isSubmitting}
          >
            {gameState.isSubmitting ? t('message.loading', language) : t('button.submit', language)}
          </button>
        ) : (
          <div className="result-section">
            <div className={`result-message ${gameState.isCorrect ? 'correct' : 'wrong'}`}>
              {gameState.isCorrect ? (
                <>
                  <h3>{t('feedback.correct', language)}</h3>
                  <p>+{gameState.sessionXp} XP | +{gameState.sessionCoins} 🪙</p>
                </>
              ) : (
                <>
                  <h3>{t('feedback.wrong', language)}</h3>
                  <p>{t('feedback.combo', language)}</p>
                </>
              )}
            </div>

            <div className="explanation">
              <h4>{t('food.facts', language)}</h4>
              <p>
                {gameState.currentQuestion.explanation[language] || 
                 gameState.currentQuestion.explanation.en}
              </p>
            </div>

            <div className="result-actions">
              <button
                className="btn btn-secondary"
                onClick={() => setShowFoodInfo(!showFoodInfo)}
              >
                {showFoodInfo ? 'Hide Info' : 'View Food Info'}
              </button>
              <button
                className="btn btn-primary btn-large"
                onClick={handleNextQuestion}
              >
                {t('button.next', language)}
              </button>
            </div>

            {showFoodInfo && currentFoodId && (
              <FoodInfoCard foodId={currentFoodId} language={language} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Food Info Card Component
const FoodInfoCard: React.FC<{ foodId: string; language: Language }> = ({ foodId, language }) => {
  const food = foods.find(f => f.id === foodId);
  
  if (!food) return null;

  return (
    <div className="food-info-card">
      <h3>{food.name}</h3>
      <p><strong>{t('food.difficulty', language)}:</strong> {t(`difficulty.${food.difficulty.toLowerCase()}`, language)}</p>
      <p><strong>{t('food.rarity', language)}:</strong> {t(`rarity.${food.rarity.toLowerCase()}`, language)}</p>
      <p><strong>{t('food.prepTime', language)}:</strong> {food.preparationTime} {t('time.minutes', language)}</p>
      <p><strong>{t('food.cookTime', language)}:</strong> {food.cookingTime} {t('time.minutes', language)}</p>
      <div className="food-description">
        {food.description[language] || food.description.en}
      </div>
    </div>
  );
};

export default PlayPage;
