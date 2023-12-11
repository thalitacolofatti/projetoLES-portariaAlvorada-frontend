import stylesh from '../../styles/Home.module.css';

export default function AuthPage({ children }: { children: React.ReactNode }) {
  return (
    <main className={stylesh.main}>
      {children}
    </main>
  );
}