/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
*/
/**
 * Node modules
 */
import { Link, Form,useNavigation, useActionData } from 'react-router-dom';
import { useEffect } from 'react';
/**
 * Assest
 */

import { logoLight, logoDark, Banner } from '../assets/assets';
/**
 * Custom hooks
 */
import { useSnackbar } from '../hooks/useSnackbar';

/**
 * Component
 */
import PageTitle from '../components/PageTitle';
import TextField from '../components/TextField';
import { Button } from '../components/Button';
import { CircularProgress } from '../components/Progress';

const Register = () => {

  //Get error data from form submission using useActionData (Likely from react router)
 const error = useActionData();
   
  //Get navigation satate e.g.loading/submitting  etc
  const navigation = useNavigation();

  const {showSnackbar}= useSnackbar();
  useEffect(() =>{
      if(error?.message){
        showSnackbar({message: error.message,type:'error',
        });
      }
  },[error,showSnackbar]);


  return (
    <>
      <PageTitle title='Create an account' />
      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[0.9fr,0.7fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Link 
          to='/'
          className='max-w-max mb-auto mx-auto lg:mx-0'
          >
            <img
              src={logoLight}
              alt='whizzcaht logo'
              width={133}
              height={40}
              className='dark:hidden'
            />
            <img
              src={logoDark}
              alt='whizzcaht logo'
              width={133}
              height={40}
              className='hidden dark:block'
            />
          </Link>

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground
            dark:text-dark-onBackground text-center'>Create and account</h2>

            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Register today and gain access to powerful tools that will
              supercharge your ideas.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >
              <TextField
                type='text'
                name='name'
                label='Full name'
                placeholder='Full name'
                required={true}
                autoFocous={true}
              />
              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                required={true}
              />
              <TextField
                type='password'
                name='password'
                label='Password'
                placeholder='Enter your Password '
                required={true}
              />

              <Button type='submit' 
              disabled = {navigation.state === 'submitting'}
              >
                {navigation.state ==='submitting' ? (<CircularProgress size='small' />)
                  :(
                    'Create account'

                  )}
              </Button>
            </Form>
            <p className='text-bodyMedium
            text-light-onSurfaceVariant
            dark:text-dark-onSurfaceVariant text-center mt-4'> Already Have an account? 
            <Link to='/login' className='link inline-block ms-1
            text-light-onSurface
            dark:text-dark-onSurface'>
             Sign in
            </Link>
            </p>
          </div>
          <p className="mt-auto mx-auto
          text-light-onSurfaceVariant
          dark:text-dark-onSurfaceVariant"> &copy; 2024 codewithaman .All right reserved.</p>
        </div>
        <div className="hidden img-box lg:block lg:relative lg:rounded-large ">
          <img 
          src={Banner} 
          alt="" 
          className='img-cover'
          />

          <p className="absolute bottom-10 left-12 right-12 z-10 text-displayMedium font-semibold leading-tight text-right text-light-onSurface drop-shadow-sm 2xl:text-[50px]">
            Chat with whizzchat to supercharge your ideas.
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
