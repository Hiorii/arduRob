import React from 'react';
import { stack as Menu } from 'react-burger-menu';
import './Burder.scss';

const Burger = () => {
  return (
    <Menu right className={'menuBar'} width={ '100%' }>
      <div className={'logo'}>
        <a href='/'>
          <img src='/images/logo.png' alt='logo'/>
        </a>
      </div>
      <div id='list' className='list'>
        <a href='/'>Home</a>
        <a href='/shop'>Shop</a>
        <a href='/about'>About</a>
        <a href='/contact'>Contact</a>
      </div>
    </Menu>
  );
};

export default Burger;
