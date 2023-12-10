"use client";

import { useState, useContext } from 'react';
import { makeRequest } from '../../../../axios';
import { useRouter } from 'next/navigation';
import { UserContext } from '../../../context/UserContext';

import LoginCard from '../../../components/LoginCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import styles from '../../../styles/Login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [error, setError] = useState('');
  const {setUser} = useContext(UserContext);

  const router = useRouter();

  const handleLogin = (e: any) => {
    e.preventDefault();
    makeRequest
      .post('auth/login', {email, password})
      .then((res)=>{
        localStorage.setItem(
          'portariacolegio:user', 
          JSON.stringify(res.data.user)
        );
        setUser(res.data.user);
        setError('');
        router.push('/main');
      }).catch((err)=>{
        console.log(err);
        setError(err.response.data.msg)
      });
  };

  return (
    <>
      <div className='fixed z-10 mt-10'>
        <div className={styles.titlec}>
          <h2>Colégio Alvorada</h2>
        </div>
      </div>
      <div className={styles.background}>
        <LoginCard title="Login">
          <form className={styles.form} > 
            <Input type="email" placeholder="Seu email" onChange={(e: any) => setEmail(e.currentTarget.value)} /> 
            <Input type="password" placeholder="Sua senha" onChange={(e:any) => setPassword(e.currentTarget.value)}/> 
            {error.length > 0 && <span className={styles.error}>*{error}</span>}
            <Button onClick={(e: any)=>handleLogin(e)}>ENTRAR</Button>
          </form>
        </LoginCard>
      </div>
    </>
  )
}