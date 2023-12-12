import React from 'react';

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen flex flex-col justify-between items-center p-0 ">
      {children}
    </main>
  );
}