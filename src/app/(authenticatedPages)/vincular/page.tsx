"use client";

import { useState, ChangeEvent, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../../../axios';

import ContainerTitle from '@/components/ContainerTitle';
import { IAluno } from '@/context/interfaces';
import { IResponsavel } from '@/context/interfaces';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

export default function CadastroResponsavel() {
  const [respId, setRespId] = useState<number|string>('');
  const [respNome, setRespNome] = useState ('');
  const [respImg, setRespImg] = useState ('');
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [alunoId, setAlunoId] = useState<number|string>('');
  const [alunoNome, setAlunoNome] = useState ('');
  const [alunoImg, setAlunoImg] = useState ('');
  
  const [erro, setErro] = useState('');
  const [success, setSuccess] = useState('');
  const [searchAluno, setSearchAluno] = useState('');
  const [searchResponsavel, setSearchResponsavel] = useState<string|null>(null);
  const [suggestionsA, setSuggestionsA] = useState<IAluno[]>([]);
  const [suggestionsR, setSuggestionsR] = useState<IResponsavel[]>([]);

  const principal = isChecked ? 1 : 0;

  const handleChangeAluno = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchAluno(e.target.value);
    setSuccess('');
    setErro('');
  };

  const handleChangeResponsavel = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchResponsavel(e.target.value);
  };

  const handleChangePrincipal = (e: ChangeEvent<HTMLInputElement>) => {
    setIsChecked((prev) => !prev);
  };
  
  const alunoQuery = useQuery({
    queryKey: ['search', searchAluno],
    queryFn:() =>
      makeRequest
        .get(`buscar/busca-aluno?params=${searchAluno}`)
        .then((res) => {return res.data;})
        .catch((error) => {
          console.error('Erro na solicitação:', error);
          throw error;
        }),
    enabled: !!searchAluno ,
  });

  const respQuery = useQuery({
    queryKey: ['search', searchResponsavel],
    queryFn:() =>
      makeRequest
        .get(`buscar/busca-responsavel?params=${searchResponsavel}`)
        .then((res) => {return res.data;})
        .catch((error) => {
          console.error('Erro na solicitação:', error);
          throw error;
        }),
    enabled: !!searchResponsavel, 
  });

  useEffect(() => {    
    if (alunoQuery.error) {
      console.log(alunoQuery.error);
    }

    if (respQuery.error) {
      console.log(respQuery.error);
    }
    
    if (alunoQuery.data && searchAluno) {
      setSuggestionsA(alunoQuery.data);
    } 
  
    if (respQuery.data && searchResponsavel) {
      setSuggestionsR(respQuery.data);
    }

  }, [alunoQuery.data, alunoQuery.error, respQuery.data, respQuery.error, searchAluno, searchResponsavel]);

  const handleRegisterBond = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await makeRequest
        .post('vinculo/add-bond', {
          alunoId,
          respId,
          principal
        });
      console.log(res.data);
      setSuccess(res.data.msg);
      setAlunoNome('');
      setRespNome('');
      setErro('');
    } catch (err: any) {
      console.log(err);
      setErro(err.response.data.msg);
      setSuccess('');
    }
  };

  return (
    <>
      <div className="flex flex-row gap-14">
        <ContainerTitle title="Vincular aluno e responsável">
          <div id="input-map-aluno" className="flex bg-zinc-200 items-center text-gray-700 mt-4 rounded-full relative" 
            onClick={() => setSuggestionsA(alunoQuery.data || [])}
          >
            <input onChange={handleChangeAluno} value={ searchAluno ? searchAluno : '' } type='text' placeholder="Buscar aluno" className='w-full px-5 py-2 border-none outline-none text-black bg-white rounded-full'/>
            <FaSearch className="flex bg-white ml-4 mr-4"/>
          </div>
          { searchAluno && suggestionsA.length > 0 && (
            <>
              <div id="sugestao-aluno" className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap">
                {suggestionsA?.map((aluno:IAluno, id:number) => {
                  return ( 
                    <div 
                      id="link-aluno" 
                      key={id} 
                      className='flex items-center gap-2'
                      onClick={() => {
                        setAlunoId(aluno.id);
                        setAlunoNome(aluno.nomeAluno);
                        setAlunoImg(aluno.alunoImg);
                        setSuggestionsA([]);
                        setSuggestionsR([]);
                        setSearchAluno('');
                      }}
                    >
                      <span>{aluno.nomeAluno}</span>
                    </div>
                  );
                  
                })}
                
              </div>
              
            </>
          )} 
          <div id='result-aluno' className='mt-5 ml-3'>
            <span className='font-semibold'>Aluno selecionado: {alunoNome}</span>
            <Image 
              width={110}
              height={110}
              src={alunoImg ? alunoImg : ''} 
              alt=''
            />
          </div>
          <div id="input-map-responsavel" className="flex bg-zinc-200 items-center text-gray-700 mt-4 rounded-full relative" 
            onClick={() => setSuggestionsR(respQuery.data || [])}
          >
            <input onChange={handleChangeResponsavel} value={ searchResponsavel ? searchResponsavel : '' } type='text' placeholder="Buscar responsável" className='w-full px-5 py-2 border-none outline-none text-black bg-white rounded-full'/>
            <FaSearch className="flex bg-white ml-4 mr-4"/>
          </div>
          {searchResponsavel && suggestionsR.length > 0 && (
            <>
              <div id="sugestao-aluno" className="absolute flex flex-col bg-white p-4 shadow-md rounded-md gap-2 border-t whitespace-nowrap">
                {suggestionsR?.map((responsavel:IResponsavel, id:number) => {
                  return ( 
                    <div 
                      id="link-aluno" 
                      key={id} 
                      className='flex items-center gap-2'
                      onClick={() => {
                        setRespId(responsavel.id);
                        setRespNome(responsavel.nomeresp);
                        setRespImg(responsavel.respImg);
                        setSuggestionsA([]);
                        setSuggestionsR([]);
                        setSearchResponsavel('');
                      }}
                    >
                      <span>{responsavel.nomeresp}</span>
                    </div>
                  );
                  
                })}
                
              </div>
              
            </>
          )} 
          
          <div id='result-resp' className='mt-5 ml-3'>
            <span className='font-semibold'>Responsável selecionado: {respNome}</span>
            <Image 
              width={110}
              height={110}
              src={respImg ? respImg : ''} 
              alt=''
            />
          </div>
          <input id='principal' onChange={handleChangePrincipal} value="" type='checkbox' checked={isChecked} className='w-4 h-4 border-none outline-none text-black bg-white items-center'/><label className="ml-3 items-center" htmlFor='principal'>Responsável Principal</label>
          <div>
            {erro.length > 0 && <span className="text-red-900 font-semibold">*{erro}</span>}
            {success.length > 0 && <span className="text-green-900 font-semibold">{success}</span>}
          </div>
          
          <button className='w-full bg-black text-white font-bold uppercase py-3 rounded-md mt-5' 
            onClick={(e) => handleRegisterBond(e)}>Vincular</button>
        </ContainerTitle>
      </div>
    </>
  );
}