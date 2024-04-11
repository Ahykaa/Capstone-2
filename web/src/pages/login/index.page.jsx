import { Button } from 'flowbite-react';
import Image from 'next/image';

import TextInput from '@/components/organisms/TextInput';

import { useHooks } from './hooks';

const Login = () => {
  const { formState, handleSubmit } = useHooks();

  return (
    <section className='bg-white dark:bg-gray-900'>
      <div className='flex flex-col gap-2 items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0'>
        <Image src='/bc-seal.png' alt='logo' width={120} height={100} />

        <h1 className='text-xl font-bold text-green-400'>BC Flow System</h1>

        <form onSubmit={handleSubmit}>
          <div className='space-y-8 mt-8 w-80'>
            <TextInput
              label='Username'
              name='username'
              {...formState}
              variant='outlined'
              color='success'
            />
            <TextInput
              label='Password'
              name='password'
              type='password'
              {...formState}
              variant='outlined'
              color='success'
            />

            <Button color='success' className='w-full' type='submit'>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
