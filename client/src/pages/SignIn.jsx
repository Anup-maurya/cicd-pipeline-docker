import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Avatar, AvatarGroup } from "flowbite-react";
import { useDispatch, useSelector } from 'react-redux';
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      return dispatch(signInFailure('Please fill all the fields'));
    }
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailure(data.message));
      }

      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate('/');
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-2 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        {/* left */}
        <div className='flex-1'>
        <div className="max-w-md rounded-3xl bg-gradient-to-t from-blue-700 via-blue-700 to-blue-600  py-10 text-white sm:px-10 md:m-6 md:mr-8 px-4" >
          <div className='mb-3 '>
          <Link to='/' className='font-bold  dark:text-white text-2xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
              InfoShare
            </span>
            For Your Org
          </Link>

          </div>
       
    <p className="mb-4 text-2xl font-bold md:text-4xl md:leading-snug">
      Start your <br />
      journey with us
    </p>
    <p className="mb-28 leading-relaxed text-gray-200">Share achievements, access knowledge, and stay informed about organizational updates.</p>
    <div className="bg-blue-600/80 rounded-2xl px-4 py-8">
     
        <div className="flex content-center items-center  gap-1">
        <AvatarGroup className=' border-gray-300 items-center content-center dark:border-gray-600 md:mb-0 md:mr-4 md:border-r md:pr-4'>
        <Avatar img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" rounded stacked />
        <Avatar img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" rounded stacked />
        <Avatar img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" rounded stacked />
        <Avatar img="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/avatars/thomas-lean.png" rounded stacked />
        <Avatar.Counter total={99} href="#" />
      </AvatarGroup>
        <p>Over 2000+ People Using InfoShare</p>
    </div>
       
    </div>
  </div>
      
        </div>
        {/* right */}
        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit} >
          <div>
              <Label value='Your email' />
              <TextInput
                type='email'
                placeholder='name@company.com'
                id='email'
                onChange={handleChange}
              />
            </div>
            <div>
              <Label value='Your password' />
              <TextInput
                type='password'
                placeholder='**********'
                id='password'
                onChange={handleChange}
              />
            </div>
            <Button
              gradientDuoTone='purpleToPink'
              type='submit'
              disabled={loading}
             
            >{
              loading ?( 
                <>
                <Spinner size='sm'/>
                <span className='pl-3'>Loading ...</span>
                </>    
              ): 'Sign In'
            }
            </Button>
            <OAuth />
          </form>
          <div className='flex gap-2 text-sm mt-5'>
            <span>Dont Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
            </Link>
          </div>
          {errorMessage && (
            <Alert className='mt-5' color='failure'>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );

}

export default SignIn;

