"use client";

import { makeRequest } from '../../../../axios';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { IBond } from "@/context/interfaces";
import ContainerTitle from "../../../components/ContainerTitle";
import styles from '../../../styles/miniCard.module.css';
import { useRouter } from 'next/navigation';
import { FaTrashCan } from 'react-icons/fa6';

export default function DetalheAluno({searchParams}:{searchParams:{id:string}}) {
  const router = useRouter();
  const [bondId, setBondId]= useState<number|string>('');
  // const queryClient = useQueryClient();

  const alunoQuery = useQuery({
    queryKey: ['detalhe-aluno', searchParams.id],
    queryFn: () => makeRequest.get('alunos/?id='+searchParams.id).then((res)=>{
      return res.data[0]
    })
  })

  if(alunoQuery.error) {
    console.log(alunoQuery.error);
  }

  const bondQuery = useQuery({
    queryKey: ['get-bond-byaluno', searchParams.id],
    queryFn: () => makeRequest.get(`vinculo/get-bond-byaluno?id=${+searchParams.id}`).then((res) => {
      return res.data.data;
    })
  })

  if(bondQuery.error) {
    console.log(bondQuery.error);
  }

  const deleteBondMutation = useMutation({
    mutationFn: async (id: number) => {
      return await makeRequest.put(`vinculo/delete-bond`, {id}).then((res) => res.data.data);
    },
    onSuccess: () => {
      bondQuery.refetch();
      console.log('Deletado');
    },
      onError: (error: Error) => {
        console.error('Erro ao deletar:', error);
      },
    }
  );

  const handleDeleteBond = async (id:number) => {
    setBondId(id);
    if(id) {
      deleteBondMutation.mutate(id);
    }
    
  };

  return (
      <div className='flex flex-row gap-14'>
        <ContainerTitle title="Detalhes Aluno">
          <div id='row' className='flex flex-row bg-white shadow-lg shadow-slate-300 mt-3'>
            <div className='flex flex-col pl-[10px] w-[210px] justify-center gap-1'>
              <span className='pt-1 color-[#000] font-sans text-base font-semibold'>Matrícula: {alunoQuery.data?.matricula}</span>
              <span className='color-[#000] font-sans text-base font-semibold'>{alunoQuery.data?.nomeAluno}</span>
              <span className='color-[#000] font-sans text-base font-semibold'>{alunoQuery.data?.nomeserie} {alunoQuery.data?.nivel}</span>
              <span className='pb-1 color-[#000] font-sans text-base font-semibold capitalize'>{alunoQuery.data?.turno}</span>
            </div>
            <div className='w-[110px] h-[110px] ml-[70px]'>
              <img 
                className='h-[110px] w-auto l-[50%] overflow-hidden' 
                src={alunoQuery.data?.alunoImg ? alunoQuery.data.alunoImg : 'https://img.freepik.com/free-icon/user_318-159711.jpg'} 
                alt='Imagem do aluno'
              /> 
            </div>
          </div>
        </ContainerTitle>
        <ContainerTitle title="Autorizados">
          <div className='flex flex-col items-center gap-4 mt-2'>
            {bondQuery.data && bondQuery.data.map((item: IBond) => {
              const linkHref = item.respId ? `/detalhe-responsavel?id=${item.respId}` : null;
              return (
                <div key={item.id} className='flex flex-row'>
                  <div id="link-resp" className='flex flex-row bg-[#fff] items-center gap-8 shadow-lg shadow-slate-300'
                    onClick={() => {
                      console.log(item.id)
                      console.log('Link clicked:', linkHref);
                      if (linkHref){
                        router.push(linkHref)
                      }
                      }}>
                    <div className='flex flex-col w-[180px] pl-[10px] justify-center gap-1'>
                      <span className='color-[#000] font-sans text-base font-semibold'>{item.nomeresp}</span>
                      <span className='color-[#000] font-sans text-base font-semibold'>RG: {item.rg}</span>
                    </div>
                    <div className={styles.imgbox}>
                      <img 
                        className={styles.imginfo} 
                        src={item.respImg ? item.respImg : 'https://img.freepik.com/free-icon/user_318-159711.jpg'}
                        alt='Imagem do responsável'
                      /> 
                    </div>
                  </div>
                  <div className='mr-2 mt-10 ml-3'>
                    <button onClick={() => handleDeleteBond(item.id)} id='trash'><FaTrashCan /></button>
                  </div>
                </div>
              )
            })}
          </div>
        </ContainerTitle>
      </div>
  );
}