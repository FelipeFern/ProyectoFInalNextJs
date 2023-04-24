import React from 'react';
import { useAuth } from '@/common/context/AuthContext';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLogginIn, setIsLogginIn] = React.useState(false);

  const { login, signup, currentUser } = useAuth();
  console.log(currentUser.email);

  async function submitHandler() {
    if (!email || !password) setError('Please fill all the fields');
    if (isLogginIn) {
      try {
        await login(email, password);
      } catch (error) {
        setError('Incorrect email or password');
      }
      return;
    } else {
      await signup(email, password);
    }
  }

  return (
    <div className='flex-1 flex flex-col justify-center items-center gap-2 sm:gap-4'>
      {error && <div className='text-red-500'>{error}</div>}
      <h1 className='font-extrabold twxt-2xl'>
        {isLogginIn ? 'Login' : 'Register'}
      </h1>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type='text'
        placeholder='Email Address'
        className='outline-none p-2 w-full max-w-md text-slate-900'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        className='outline-none p-2 w-full max-w-md text-slate-900'
      />
      <button
        className='p-2 py-2 w-full border border-white border-solid max-w-md'
        onClick={submitHandler}
      >
        Submit
      </button>

      <h2 onClick={() => setIsLogginIn(!isLogginIn)}>
        {!isLogginIn ? 'Login' : 'Register'}
      </h2>
    </div>
  );
}
