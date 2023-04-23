import React from 'react';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);
  const [isLogginIn, setIsLogginIn] = React.useState(false);

  function submitHandler() {
    if (!email || !password) setError('Please fill all the fields');
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
        className='outline-none p-2 w-full max-w-md'
      />
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type='password'
        placeholder='Password'
        className='outline-none p-2 w-full max-w-md color:black'
      />
      <button
        className='p-2 py-2 w-full border border-white border-solid'
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
