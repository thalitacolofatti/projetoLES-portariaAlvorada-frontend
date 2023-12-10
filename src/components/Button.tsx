"use client";

import React, { HTMLAttributes } from 'react';
import styles from '../styles/button.module.css';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default Button;