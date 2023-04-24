import React from 'react';

export default function Footer() {
  return (
    <div className='flex justify-center items-center gap-3 py-3'>
      <a
        href='https://www.facebook.com/OMICBahiaBlanca'
        target='_blank'
        rel='noopener noreferrer'
      >
        <i className='fab fa-facebook-square text-2xl duration-300 hover:opacity-40 cursor-pointer'></i>
      </a>
      <a
        href='https://www.bahia.gob.ar/omic/'
        target='_blank'
        rel='noopener noreferrer'
      >
        <i className='fa-solid fa-building-columns text-2xl duration-300 hover:opacity-40 cursor-pointer'></i>
      </a>
    </div>
  );
}
