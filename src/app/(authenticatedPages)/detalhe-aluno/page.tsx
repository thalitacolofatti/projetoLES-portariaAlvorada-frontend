"use client";

import { makeRequest } from '../../../../axios';
import { useQuery } from '@tanstack/react-query';
import { IBond } from "@/context/interfaces";
import ContainerTitle from "../../../components/ContainerTitle";
import styles from '../../../styles/miniCard.module.css';
import { useRouter } from 'next/navigation';

export default function DetalheAluno({searchParams}:{searchParams:{id:string}}) {
  const router = useRouter();

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

  console.log('Data: ',alunoQuery.data);

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
                <div id="link-resp" key={item.respId} className='flex flex-row bg-[#fff] items-center gap-8 shadow-lg shadow-slate-300'
                  onClick={() => {
                    console.log('Link clicked:', linkHref);
                    if (linkHref){
                      router.push(linkHref)
                    }
                    }}>
                  <div className='flex flex-col w-[210px] pl-[10px] justify-center gap-1'>
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
              )
            })}
          </div>
        </ContainerTitle>
      </div>
  );
}