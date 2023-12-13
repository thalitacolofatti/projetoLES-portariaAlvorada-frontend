'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { makeRequest } from '../../../axios';
import { ReactNode } from 'react';

import Header from '../../components/Header';

export default function MainHome({children}:{children:ReactNode}) {
  const router = useRouter();

  const { data, error, isSuccess, isError } = useQuery ({
    queryKey: ['refresh'],
    queryFn: () => 
      makeRequest.get('auth/refresh').then((res) => {
        return res.data;
      }),
    retry: false,
    refetchInterval: 60 * 50 * 1000,
  });

  if (isSuccess) {
    console.log(data.msg);
  }

  if (isError) {
    console.log(error);
    router.push('/login');
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Header/>
      {children}      
    </main>
  );
}