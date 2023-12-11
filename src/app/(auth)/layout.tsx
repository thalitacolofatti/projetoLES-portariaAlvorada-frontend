import stylesh from '../../styles/Home.module.css';
import React from 'react';

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <main className={stylesh.main}>
      {children}
    </main>
  );
}