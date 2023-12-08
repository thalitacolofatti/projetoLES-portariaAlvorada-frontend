"use client";

import ContainerTitle from './ContainerTitle';
import { FaSearch } from 'react-icons/fa';
import { useEffect, useState, ChangeEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import { IAluno } from '@/context/interfaces';
import { IResponsavel } from "@/context/interfaces";

import stylesh from '../styles/input.module.css';
import { useRouter } from 'next/navigation';

export default function SearchFilter() {
  const [searchAluno, setSearchAluno] = useState<string|null>(null);
  const [searchResponsavel, setSearchResponsavel] = useState<string|null>(null);
  const [suggestionsA, setSuggestionsA] = useState<IAluno[]>([]);
  const [suggestionsR, setSuggestionsR] = useState<IResponsavel[]>([]);

  const router = useRouter();

  const handleChangeAluno = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAluno(e.target.value);
  }

  const handleChangeResponsavel = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResponsavel(e.target.value);
  }

  const { data, error } = useQuery({
    queryKey: ['search', searchAluno, searchResponsavel],
    queryFn:()=>{
      const url = searchAluno
        ? `buscar/busca-aluno?params=${searchAluno}`
        : searchResponsavel
        ? `buscar/busca-responsavel?params=${searchResponsavel}`
        : null;
      
      return url ? makeRequest.get(url).then((res)=>{
        console.log("API response:", res.data);
        return res.data}) : null;
      },
    enabled: !!searchAluno || !!searchResponsavel, 
  });

  useEffect(() => {    
    if (error) {
      console.log(error);
    }

    if (data && searchAluno) {
      setSuggestionsA(data);
    } 

    if (data && searchResponsavel) {
      setSuggestionsR(data);
    }

  }, [data, error, searchAluno, searchResponsavel]);
  
  return (
    <div className='flex flex-row gap-14'>
      <ContainerTitle title="Pesquisar por Aluno">
        <form className="flex bg-zinc-200 items-center text-gray-700 mt-4 rounded-full relative" 
          onClick={()=>setSuggestionsA(data || [])}
          onMouseLeave={()=>setSuggestionsA([])}>
            <input onChange={handleChangeAluno} value={ searchAluno ? searchAluno : "" } type='text' placeholder="Buscar pelo nome" className={stylesh.inputSearch}/>
            <FaSearch className="flex ml-6"/>
        </form>
        { searchAluno && suggestionsA.length > 0 && (
          <div id="sugestao-aluno" className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap">
            {suggestionsA?.map((aluno:IAluno, id:number)=>{
              const linkHref = aluno.id ? `/detalhe-aluno?id=${aluno.id}` : null;
              console.log('Aluno ID:', aluno.id);
              return (
                <div 
                  id="link-aluno" 
                  key={id} 
                  className='flex items-center gap-2'
                  onClick={() => {
                    console.log('Link clicked:', linkHref);
                    setSearchAluno(''); 
                    setSuggestionsA([]);
                    if (linkHref){
                      router.push(linkHref)
                    }
                    }}
                >
                  <span>{aluno.nomeAluno}</span>
                </div>
              );
            })}
          </div>
        )}
      </ContainerTitle>
            
      <ContainerTitle title="Pesquisar por Responsável">
        <form className="flex bg-zinc-200 items-center text-gray-700 mt-4 rounded-full relative" 
          onClick={()=>setSuggestionsR(data || [])}
          onMouseLeave={()=>setSuggestionsR([])}>
            <input onChange={handleChangeResponsavel} value={ searchResponsavel ? searchResponsavel : "" } type='text' placeholder="Buscar pelo nome" className={stylesh.inputSearch} />
            <FaSearch className="flex ml-6"/>
        </form>
        {searchResponsavel && suggestionsR.length > 0 && (
          <div className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap">
            {suggestionsR?.map((responsavel:IResponsavel, id:number)=>{
              const linkHrefResp = responsavel.id ? `/detalhe-responsavel?id=${responsavel.id}` : null;
              console.log('Resp ID:', responsavel.id);
              return (
                <div 
                  id="link-resp" 
                  key={id} 
                  className='flex items-center gap-2'
                  onClick={() => {
                    console.log('Link clicked:', linkHrefResp);
                    setSearchAluno(''); 
                    setSuggestionsA([]);
                    if (linkHrefResp){
                      router.push(linkHrefResp)
                    }
                    }}
                >
                  <span>{responsavel.nomeresp}</span>
                </div>
              );
            })}
          </div>
        )}
      </ContainerTitle>
    </div>
  )
}