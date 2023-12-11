'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { makeRequest } from '../../../../axios';

import ContainerTitle from '@/components/ContainerTitle';
import Button from '../../../components/Button';
import styles from '../../../styles/Login.module.css';

export default function CadastroResponsavel() {
  const [nomeresp, setNomeResp] = useState ('');
  const [rg, setRg] = useState ('');
  const [email, setEmail] = useState ('');
  const [telefone, setTelefone] = useState ('');
  const [endereco, setEndereco] = useState ('');
  const [respImg, setRespImg] = useState ('');
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleRegisterGuardian = (e: React.FormEvent) => {
    e.preventDefault();
    makeRequest
      .post('responsaveis/create-guardian', {
        nomeresp,
        rg,
        email, 
        telefone, 
        endereco,
        respImg
      })
      .then((res) => {
        console.log(res.data);
        setSuccess(res.data.msg);
        setErro('');
        router.push('/vincular');
      }).catch((err) => {
        console.log(err);
        setErro(err.response.data.msg);
        setSuccess('');
      });
      
  };

  return (
    <> 
      <div className="flex flex-row gap-14">
        <ContainerTitle title="Cadastro Responsável">
          <form className={styles.form}> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="text" placeholder="Nome" onChange={(e) => setNomeResp(e.currentTarget.value)} /> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="text" placeholder="RG" onChange={(e) => setRg(e.currentTarget.value)} /> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="email" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)} /> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="text" placeholder="Telefone" onChange={(e) => setTelefone(e.currentTarget.value)} /> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="text" placeholder="Endereço" onChange={(e) => setEndereco(e.currentTarget.value)} /> 
            <input className="px-8 py-4 b-0 outline-none text-black bg-[#e6e6e6] focus:bg-[#e5e5e5]"  type="text" placeholder="Link Imagem" onChange={(e) => setRespImg(e.currentTarget.value)} /> 
            {erro.length > 0 && <span className="text-red-900 font-semibold">*{erro}</span>}
            {success.length > 0 && <span className="text-green-900 font-semibold">{success}</span>}
            <Button onClick={(e) => handleRegisterGuardian(e)}>
              Cadastrar
            </Button>
          </form>
        </ContainerTitle>
      </div>
    </>
  );
}