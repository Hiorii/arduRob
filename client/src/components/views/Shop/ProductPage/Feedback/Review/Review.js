import React from 'react';
import styles from './Review.module.scss';
import {BsStar} from 'react-icons/bs';
import Button from '../../../../../common/Button/Button';

const Review = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.rating}>
          <div className={styles.start}>
            <p>4,5</p>
            <span><BsStar/><BsStar/><BsStar/><BsStar/><BsStar/></span>
            <p>30 reviews</p>
            <Button data='Write a review' url='/'/>
          </div>
          <div className={styles.ratingChart}>
            <p>30 rating</p>
            <span>diagram</span>
          </div>
        </div>
        <div className={styles.commentsContainer}>
          <h5>1-10 of 30 reviews</h5>
          <div className={styles.comment}>
            <div className={styles.commentData}>
              <span><BsStar/><BsStar/><BsStar/><BsStar/><BsStar/></span>
              <p>date</p>
              <p>user</p>
            </div>
            <div className={styles.commentText}>
              <h3>title</h3>
              <p>text</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
