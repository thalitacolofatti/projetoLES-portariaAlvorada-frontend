'use client';

import React from 'react';
import styles from '../styles/search.module.css';

interface ContainerTitleProps {
  title: string;
  children: React.ReactNode;
}

const ContainerTitle = ({ title, children }: ContainerTitleProps) => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
};

export default ContainerTitle;