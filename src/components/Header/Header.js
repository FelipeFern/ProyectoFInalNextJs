import React from 'react';

export default function Header() {
  return (
    <div className='sticky top-0 w-full left-0  bg-inherit flex items-center justify-between p-4 border-b border-solid border-white '>
      <h1 className='text-3xl text-center sm:text-6xl'>OMIC Bahia Blanca</h1>
      <i className='fa-regular fa-user text-xl sm:text3xl duration-300 hover:opacity-40 cursor-pointer'></i>
    </div>
  );
}
