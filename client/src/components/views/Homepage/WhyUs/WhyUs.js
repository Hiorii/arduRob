import React from 'react';
import styles from './WhyUs.module.scss';
import Button from '../../../common/Button/Button';

const WhyUs = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.faceContent}>
          <div className={styles.img}>
            <img src='/images/whyus2.png' alt='whyus_phono_share'/>
          </div>
          <div className={styles.content}>
            <span>Why us?</span>
            <h1>Reach every single Arduino project you want</h1>
            <span>Imagination is your only limit</span>
            <p>ArduRob is a perfect place to start if: </p>
            <ul>
              <li>you want to buy some finished project to play in home</li>
              <li>you are planning to build your own Arduino project from beginning</li>
              <li>you already start some project and stuck with next steps</li>
            </ul>
            <p>Or do you maybe miss some parts? For this check out our shop:</p>
            <div className={styles.btn}>
              <Button data='Shop Now!' url='/'/>
            </div>
          </div>
        </div>
        <div className={styles.notSure}>
          <h3>Are you still not sure?</h3>
          <h5>Check how we work:</h5>
          <div className={styles.notSureContainer}>
            <div className={styles.notSureItem}>
              <img src='/images/tools.png' alt='tools'/>
              <h5>Constructing</h5>
              <p>
                You are good with wiring and coding but do not like
                to spend time on mechanical design?
                We prepare each construction from
                <span> total zero. </span>
              </p>
              <p className={styles.extra}>Choose parts you want to be used for your order.</p>
            </div>
            <div className={styles.notSureItem}>
              <img src='/images/electric.png' alt='tools'/>
              <h5>Wiring</h5>
              <p>
                Electrical connection is your weakness?
                Or maybe you just do not like wire?
                Me can prepare all wiring, send it to you
                or connect directly with your solution if you send it
                for us.
              </p>
              <p className={styles.extra}>Choose controllers and sensors you want to be used for your order.</p>
            </div>
            <div className={styles.notSureItem}>
              <img src='/images/coding.png' alt='tools'/>
              <h5>Programming</h5>
              <p>
                If you can prepare full construction from beginning but
                you stuck in coding zone
                <span> do not worry! </span>
                We will write for you application for each construction you need.
              </p>
              <p className={styles.extra}>Send us data about parts you use and we will revive it with code.              </p>
            </div>
          </div>
          <h5>...or do you rather need some ready solution? </h5>
          <div className={styles.readySolDesc}>
            <p>Check our shop for already prepared solution which we design based
              on our experience and suggestions from our customers.
            </p>
          </div>
          <div className={styles.btn}>
            <Button data='Check Shop' url='/' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
