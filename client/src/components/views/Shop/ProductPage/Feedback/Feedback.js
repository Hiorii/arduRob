import React, {useState} from 'react';
import styles from './Feedback.module.scss';
import Review from './Review/Review';
import Questions from './Questions/Questions';

const Feedback = () => {
  const [isReviews, setIsReviews] = useState(true);
  const [isQuestions, setIsQuestions] = useState(false);

  const reviewHandler = () => {
    setIsReviews(true);
    setIsQuestions(false);
  };
  const questionHandler = () => {
    setIsQuestions(true);
    setIsReviews(false);
  };
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.list}>
          <p
            onClick={reviewHandler}
            className={isReviews ? styles.active : ''}
          >
            Reviews
          </p>
          <p
            onClick={questionHandler}
            className={isQuestions ? styles.active : ''}
          >
            Questions
          </p>
        </div>
        {isReviews && <Review />}
        {isQuestions && <Questions />}
      </div>
    </div>
  );
};

export default Feedback;
