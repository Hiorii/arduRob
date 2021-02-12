import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import styles from './Feedback.module.scss';
import {BsChatQuote} from 'react-icons/bs';

const Feedback = () => {
  const feedbackUser = useSelector(state => state.feedback);
  const [currentUser, setCurrentUser] = useState(feedbackUser.filter(user=> user.id === 3));

  const showFeedbackUser = () => {
    let counter = 1;
    setInterval(()=> {
      setCurrentUser(feedbackUser.filter(user=> user.id === counter));
      counter ++;
      if(counter === 4) {
        counter = 1;
      }
    },7000);
  };

  useEffect(()=> {
    showFeedbackUser();
  },[]);

  return (
    <div className={styles.root}>
      <h1>Join to peoples who already trusted us</h1>
      {currentUser.map((users, index) => {
        return (
          <div key={index} className={styles.feedback}>
            <div className={styles.quote}><BsChatQuote /></div>
            <div className={styles.feedbackText}>{users.text}</div>
            <div className={styles.feedbackFoto}>
              <img src={users.image} alt={users.name}/>
            </div>
            <div className={styles.feedbackName}>
              <p>{users.name}</p>
            </div>
          </div>
        );
      })}
      <div className={styles.btn}>
        <Link to='/'>Check out for all feedbacks.</Link>
      </div>
    </div>
  );
};

export default Feedback;
