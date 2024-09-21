import React from 'react';
import Logo from './Logo';
import { useUser } from '@/hooks/user-hooks';

export default function Header() {
  const { user } = useUser();

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    };
    const dateString = date.toLocaleDateString('pt-BR', options);

    return dateString.charAt(0).toUpperCase() + dateString.slice(1);
  };

  const today = new Date();

  return (
    <div className="pb-6  sm:items-center flex w-full sm:flex-row sm:justify-between justify-start border-b-[1px] border-mainGray flex-col">
      <Logo />

      <p className="text-2xl text-black font-semibold">
        Bem-vindo de volta, {user.firstName}
      </p>

      <p className="text-base text-black/55">{formatDate(today)}</p>
    </div>
  );
}
