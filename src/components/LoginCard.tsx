import React from 'react';
import styles from '../styles/Login.module.css';

interface LoginCardProps {
  title: string;
  children: React.ReactNode;
}

const LoginCard = ({ title, children }: LoginCardProps) => {
  return (
    <div className={styles.card}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default LoginCard;