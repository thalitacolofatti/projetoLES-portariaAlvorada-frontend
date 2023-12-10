"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { makeRequest } from '../../../../axios';

import ContainerTitle from '@/components/ContainerTitle';
import Input from '../../../components/Input';
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
      .then((res)=>{
        console.log(res.data);
        setSuccess(res.data.msg);
        setErro('');
        router.push("/vincular");
      }).catch((err)=>{
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
            <Input type="text" placeholder="Nome" onChange={(e) => setNomeResp(e.currentTarget.value)} /> 
            <Input type="text" placeholder="RG" onChange={(e) => setRg(e.currentTarget.value)} /> 
            <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.currentTarget.value)} /> 
            <Input type="text" placeholder="Telefone" onChange={(e) => setTelefone(e.currentTarget.value)} /> 
            <Input type="text" placeholder="Endereço" onChange={(e) => setEndereco(e.currentTarget.value)} /> 
            <Input type="text" placeholder="Link Imagem" onChange={(e) => setRespImg(e.currentTarget.value)} /> 
            {erro.length > 0 && <span className="text-red-900 font-semibold">*{erro}</span>}
            {success.length > 0 && <span className="text-green-900 font-semibold">{success}</span>}
            <Button onClick={(e)=>handleRegisterGuardian(e)}>
              Cadastrar
            </Button>
          </form>
        </ContainerTitle>
      </div>
    </>
  )
}