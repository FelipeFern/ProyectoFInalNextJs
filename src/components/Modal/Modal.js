import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import { useAuth } from '../../common/context/AuthContext';

export default function Modal(props) {
  const { setOpenModal } = props;
  const [_document, set_document] = useState(null);
  const { logout } = useAuth();

  useEffect(() => {
    set_document(document);
  }, []);

  if (!_document) return null;

  return ReactDom.createPortal(
    <>
      <div className='fixed w-screen h-screen top-0 left-0 bg-white twxt-slate-900 flex flex-col text-lg sm:text-xl'>
        <div className='flex items-center justify-between border-b border-solid border-slate-900 p-4  s'>
          <h1 className='text-2xl font-extrabold sm:text-5xl select-none'>
            Login
          </h1>
          <i
            onClick={() => setOpenModal(false)}
            className='fa-solid fa-xmark duration-500 hover:rotate-90 cursor-pointer text-lg sm:text-3xl'
          ></i>
        </div>
        <div className='flex-1 flex flex-col gap=3'>
          <h2
            onClick={() => {
              logout();
              setOpenModal(false);
            }}
            className='select-none duration-500 hover:pl-2 cursor-pointer'
          >
            Logout
          </h2>
        </div>
      </div>
    </>,
    _document.getElementById('portal')
  );
}
