/* eslint-disable react/button-has-type */
import React, { FC } from 'react';
import style from './button.module.scss';

type Props = {
  children?: React.ReactNode;
  type?: 'button' | 'submit' | 'reset';
  size?: 'small' | 'medium' | 'large';
  color?: 'primary' | 'success' | 'warning';
  handleClick?: () => void;
  propsClass?: string;
};

const Button: FC<Props> = ({
  children = 'button',
  type = 'button',
  handleClick,
  propsClass,
  size = 'medium',
  color = 'primary',
}) => {
  const buttonSize = () => {
    if (size === 'small') return '4px 8px';
    if (size === 'large') return '12px 32px';
    return '6px 16px';
  };
  const buttonColor = () => {
    if (color === 'success') return '#fca311';
    if (color === 'warning') return '#cc6b6b';
    return '#e5e5e5';
  };

  const fontSize = () => {
    if (size === 'small') return '16px';
    if (size === 'large') return '32px';
    return '24px';
  };
  return (
    <button
      className={`${style.button} ${propsClass}`}
      type={type}
      style={{ padding: buttonSize(), backgroundColor: buttonColor(), fontSize: fontSize() }}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
