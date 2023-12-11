"use client";

import Link from 'next/link';
import { FaSearch, FaPlus, FaObjectGroup } from 'react-icons/fa';
import Image from 'next/image';
import { useContext, useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { makeRequest } from '../../axios';
import { UserContext } from '../context/UserContext';

import stylesh from '../styles/header.module.css';

export default function Header() {    
  const { user, setUser } = useContext(UserContext);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return await makeRequest.post('auth/logout').then((res) => { 
        res.data; 
      });
    },
    onSuccess: () => {
      setUser(undefined);
      localStorage.removeItem('portariacolegio:user');
      router.push('/login');
    },
  });

  return (
    <header className={stylesh.header}>
      <div className={stylesh.titlec}>
        <h2>Colégio Alvorada</h2>
      </div>
      <div className="flex gap-[8px] items-center outline-none border-0">
        <div className="flex justify-evenly">
          <Link href="/main" className='flex gap-3 text-neutral-950 mr-12'>
            <FaSearch className='w-6 h-6'/> Pesquisar
          </Link>
          <Link href="/cadastrar" className='flex gap-3 text-neutral-950 mr-10'>
            <FaPlus className='w-6 h-6'/>Cadastrar Responsável
          </Link>
          <Link href="/vincular" className='flex gap-3 text-neutral-950 mr-10'>
            <FaObjectGroup className='w-6 h-6'/>Vincular Responsável a Aluno
          </Link>

        </div>
        <div className={stylesh.menuclosed} onMouseLeave={() => setShowMenu(false)}>
          <button className={stylesh.icons} onClick={() => setShowMenu(!showMenu)}>
            <Image 
              width={48}
              height={48} 
              src={
                user 
                  ? user.userImg
                  : 'https://img.freepik.com/free-icon/user_318-159711.jpg'
              } alt='Imagem usuário' 
              style={{borderRadius: '50%', border: '0'}} 
            />
            <span className={stylesh.name}>{user?.nome}</span>
          </button>
          {showMenu && (
            <div className={stylesh.menuopened}>
              <button onClick={() => mutation.mutate()}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}