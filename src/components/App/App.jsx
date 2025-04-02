import css from './App.module.css';
import { useEffect, useState } from 'react';
import Description from '../Description/Description.jsx';
import Options from '../Options/Options.jsx';
import Feedback from '../Feedback/Feedback.jsx';
import Notification from '../Notification/Notification.jsx';

const localStorageKey = 'feedbackRating';

const App = () => {
  const [rating, setRating] = useState(() => {
    const savedRating = localStorage.getItem(localStorageKey);
    return savedRating
      ? JSON.parse(savedRating)
      : {
          good: 0,
          neutral: 0,
          bad: 0,
        };
  });
  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(rating));
  }, [rating]);
  const updateFeedback = (feedbackType) => {
    setRating((prev) => ({
      ...prev,
      [feedbackType]: prev[feedbackType] + 1,
    }));
  };
  const resetFeedback = () => {
    setRating({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  const totalFeedback = rating.good + rating.neutral + rating.bad;

  return (
    <div className={css.appContainer}>
      <Description />
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          good={rating.good}
          neutral={rating.neutral}
          bad={rating.bad}
        />
      ) : (
        <Notification message="No feedback yet" />
      )}
    </div>
  );
};

export default App;
