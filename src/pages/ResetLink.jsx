/**
 * @copyright 2025 codewithaman
 * @license Apache-2.0
*/
/**
 * Node modules
 */
import {Form,useNavigation, useActionData } from 'react-router-dom';
import { useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
/**
 * Assest
 */

import { Banner } from '../assets/assets';
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
import { CircularProgress,LinearProgress } from '../components/Progress';
import Logo from '../components/Logo';

const ResetLink = () => {

  //Get error data from form submission using useActionData (Likely from react router)
 const actionData = useActionData();
   
  //Get navigation satate e.g.loading/submitting  etc
  const navigation = useNavigation();

  const {showSnackbar}= useSnackbar();
  useEffect(() =>{
      if(actionData){
        showSnackbar({message: actionData.message,type:actionData.ok ? 'info' : 'error',
            timeout : 8000,
        });
      }
  },[actionData,showSnackbar]);


  return (
    <>
      <PageTitle title='Reset Password' />
      <div className='relative w-screen h-dvh p-2 grid grid-cols-1 lg:grid-cols-[0.9fr,0.7fr] lg:gap-2'>
        <div className='flex flex-col p-4'>
          <Logo classes='mb-auto mx-auto lg:mx-0'/>

          <div className='flex flex-col gap-2 max-w-[480px] w-full mx-auto'>
            <h2 className='text-displaySmall font-semibold text-light-onBackground
            dark:text-dark-onBackground text-center'>Forget your pasword?</h2>

            <p className='text-bodyLarge text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant mt-1 mb-5 text-center px-2'>
              Enter your email, and we&apos;ll send a password reset link.
            </p>

            <Form
              method='POST'
              className='grid grid-cols-1 gap-4'
            >

              <TextField
                type='email'
                name='email'
                label='Email'
                placeholder='Email'
                helperText='The verification link send to your email address will be valid for 1 hour.'
                required={true}
                autoFocus={true}
              />

              <Button type='submit' 
              disabled = {navigation.state === 'submitting'}
              >
                {navigation.state ==='submitting' ? (<CircularProgress size='small' />)
                  :(
                    'Get link'

                  )}
              </Button>
            </Form>
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
      <AnimatePresence>
      {navigation.state ==='loading' && (
        <LinearProgress classes='absolute top-0 left-0 right-0'/>
      )}
      </AnimatePresence>
    </>
  );
};

export default ResetLink;
