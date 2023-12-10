import React, { HTMLAttributes } from 'react';
import styles from '../styles/input.module.css';

interface InputProps extends HTMLAttributes<HTMLInputElement> {}

const Input: React.FC<InputProps> = (props) => {
  return <input className={styles.input} {...props} />;
};

export default Input;