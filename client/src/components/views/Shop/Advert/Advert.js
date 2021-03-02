import React from 'react';
import styles from './Advert.module.scss';
import Typing from 'react-typing-animation';

const Advert = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.titleCont}>
          <h1>Make your projects alive</h1>
          <div className={styles.movingText}>
            <Typing speed={100} startDelay={500} loop={true} hideCursor={true}>
              <p>Create.</p>
              <Typing.Delay ms={1000} />
              <Typing.Backspace count={8} />
              <Typing.Delay ms={1000} />
              <p>Share.</p>
              <Typing.Delay ms={1000} />
              <Typing.Backspace count={7} />
              <Typing.Delay ms={1000} />
              <p>Imagination
                <Typing.Delay ms={500} />
                <span>&nbsp;is your only limit.</span>
              </p>
              <Typing.Delay ms={1000} />
              <Typing.Backspace count={31} speed={30} />
              <Typing.Delay ms={1000} />
            </Typing>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <img src='/images/shop/robo3d.png' alt=""/>
      </div>
    </div>
  );
};

export default Advert;
