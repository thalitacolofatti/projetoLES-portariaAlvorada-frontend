"use client";

import { makeRequest } from '../../../../axios';
import { useQuery } from '@tanstack/react-query';
import { IBond } from "@/context/interfaces";
import { useState } from 'react';
import ContainerTitle from "../../../components/ContainerTitle";
import styles from '../../../styles/miniCard.module.css';
import { useRouter } from 'next/navigation';
import { FaTrashCan } from 'react-icons/fa6';

export default function DetalheResponsavel({searchParams}:{searchParams:{id:string}}) {
  const router = useRouter();
  const [bondId, setBondId]= useState<number|string>('');
  
  const respQuery = useQuery({
    queryKey: ['detalhe-responsavel', searchParams.id],
    queryFn: () => makeRequest.get('responsaveis/get-guardian?id='+searchParams.id).then((res)=>{
      return res.data[0]
    })
  })

  if(respQuery.error) {
    console.log(respQuery.error);
  }

  console.log('searchParams.id:', searchParams.id);

  const bondQuery = useQuery({
    queryKey: ['get-bond-byresponsavel', searchParams.id],
    queryFn: () => 
      makeRequest
        .get(`vinculo/get-bond-byguardian?id=${+searchParams.id}`)
        .then((res) => res.data.data)
        .catch((error) => {
          console.error('Erro na solicitação:', error);
          throw error;
        })
  })

  if(bondQuery.error) {
    console.log(bondQuery.error);
  }

  const handleDeleteBond = async (id:number) => {
    setBondId(id);
    try {
      await bondDeleteQuery.refetch();
      console.log('Deletado');
    } catch (error) {
      console.error('Erro ao deletar:', error);
    }
  };

  const bondDeleteQuery = useQuery({
    queryKey: ['delete-bond', bondId],
    queryFn: async () => {
      try {
        const res = await makeRequest.put(`vinculo/delete-bond`, {
          id: bondId, 
        });
        return res.data.data;
      } catch (error) {
        console.error('Error in bond deletion:', error);
        throw error;
      }
    },
  });

  return (
      <div className='flex flex-row gap-14'>
        <ContainerTitle title="Detalhes Responsável">
          <div id='row' className='flex flex-row bg-white shadow-lg shadow-slate-300 mt-3 py-3'>
            <div className='flex flex-col pl-[10px] w-[200px] justify-center gap-1'>
              <span className='color-[#000] font-sans text-sm font-semibold'>{respQuery.data?.nomeresp}</span>
              <span className='color-[#000] font-sans text-sm font-semibold'>RG: {respQuery.data?.rg}</span>
              <span className='color-[#000] font-sans text-sm font-semibold'>E-mail: {respQuery.data?.email}</span>
              <span className='color-[#000] font-sans text-sm font-semibold'>Telefone: {respQuery.data?.telefone}</span>
              <span className='color-[#000] font-sans text-sm font-semibold capitalize'>Endereço: {respQuery.data?.endereco}</span>
              {bondQuery.data?.principal === 1 && <span className='color-[#FF0606] font-sans text-sm font-bold'>Principal Responsável</span> }
            </div>
            <div className='w-[110px] h-[110px] ml-[70px]'>
              <img 
                className='h-[110px] w-auto l-[50%] overflow-hidden pr-2' 
                src={respQuery.data?.respImg ? respQuery.data.respImg : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} 
                alt='Imagem do responsavel'
              /> 
            </div>
          </div>
        </ContainerTitle>
        <ContainerTitle title="Alunos vinculados">
          <div className='flex flex-col items-center gap-4 mt-2'>
            {bondQuery.data && bondQuery.data.map((item: IBond) => {
              const linkHref = item.alunoId ? `/detalhe-aluno?id=${item.alunoId}` : null;
              return (
                <div className='flex flex-row'>
                  <div id="link-resp" key={item.alunoId} className='flex flex-row bg-[#fff] items-center gap-8 shadow-lg shadow-slate-300'
                    onClick={() => {
                      console.log('Link clicked:', linkHref);
                      console.log('item', item);
                      if (linkHref){
                        router.push(linkHref)
                      }
                    }}>
                    <div className='flex flex-col w-[180px] pl-[10px] justify-center gap-1'>
                      <span className='color-[#000] font-sans text-base font-semibold'>{item.nomeAluno}</span>
                      <span className='color-[#000] font-sans text-base font-semibold'>{item.nomeserie} {item.nivelnome}</span>
                      <span className='color-[#000] font-sans text-base font-semibold capitalize'>{item.turno}</span>
                    </div>
                    <div className={styles.imgbox}>
                      <img 
                        className={styles.imginfo} 
                        src={item.alunoImg ? item.alunoImg : 'https://img.freepik.com/free-icon/user_318-159711.jpg'}
                        alt='Imagem do aluno'
                      /> 
                    </div>
                  </div>
                  <div key={item.id}>
                    <button id='trash' onClick={() => handleDeleteBond(item.id)} className='mr-2 mt-10 ml-3'><FaTrashCan/></button>
                  </div>
              </div>
            )})}
          </div>
        </ContainerTitle>
      </div>
  );
};

