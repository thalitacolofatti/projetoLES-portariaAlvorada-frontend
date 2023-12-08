"use client";

import { useState } from 'react';
import Link from 'next/link'
import { makeRequest } from '../../../../axios';

import styles from '../../../styles/Login.module.css';

import LoginCard from '../../../components/LoginCard';
import Input from '../../../components/Input';
import Button from '../../../components/Button';


export default function RegisterPage() {
  const [nome, setNome] = useState ('');
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfirmPassword] = useState ('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = (e: any) => {
    e.preventDefault();
    makeRequest
      .post('auth/register', {
        nome,
        email, 
        password, 
        confirmPassword
      })
      .then((res)=>{
        console.log(res.data);
        setSuccess(res.data.msg);
        setError('');
      }).catch((err)=>{
        console.log(err);
        setError(err.response.data.msg);
        setSuccess('');
      });
  };

  return (
    <> 
      <div className={styles.background}>
        <LoginCard title="Cadastro Portaria">
          <form className={styles.form}> 
            <Input type="text" placeholder="Nome" onChange={(e: any) => setNome(e.currentTarget.value)} /> 
            <Input type="email" placeholder="Email" onChange={(e: any) => setEmail(e.currentTarget.value)} /> 
            <Input type="password" placeholder="Senha" onChange={(e: any) => setPassword(e.currentTarget.value)} /> 
            <Input type="password" placeholder="Confirme a senha" onChange={(e: any) => setConfirmPassword(e.currentTarget.value)} /> 
            {error.length > 0 && <span className={styles.error}>*{error}</span>}
            {success.length > 0 && <span className={styles.success}>{success}</span>}
            <Button onClick={(e: any)=>handleRegister(e)}>Cadastrar</Button>
            <Link className={styles.link} href="/login">Já tem conta?</Link>
          </form>
        </LoginCard>
      </div>
    </>
  )
}