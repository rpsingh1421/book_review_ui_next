"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';
import { setToken } from '@/utils/auth';
import defaultNodeApi from '@/utils/api';

const api = defaultNodeApi();
const Login = () => {
  const router = useRouter();
  const userInitial={ 
    email:'',
    password:''
  }
  const [userData,setUserData] = useState(userInitial);
  const {control,handleSubmit,formState:{errors,isDirty},} = useForm({
    defaultValues:userData
  });
  const [responseDetails,setResponseDetails] = useState({
    status:'',
    message:'',
  })
  const submitLoginData = async (data) => {
    console.log("submitted data:",data)
    try {
      const res = await api.post('/api/auth/login', data);
      console.log('login response:',res);
      setToken(res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.userData));
      router.push('/reviews');
    } catch (err) {
      setResponseDetails({status:false,message:'invalid email/password'})
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box className='h-[100vh] flex items-center justify-center'>
      <Paper className='w-[50%] h-auto'>
        <Box className='my-[2%] text-center'>
        <Typography className='text-center font-semibold text-3xl'>Sign In</Typography>
        </Box>
        <Typography className={`text-center font-semibold text-xl my-[2%] ${responseDetails.status?'text-green-300':'text-red-400'}`}>{responseDetails.message}</Typography>
        <Box component={'form'} onSubmit={handleSubmit(submitLoginData)} className=''>
          <Box className='my-[1%] flex justify-center items-center'>
            <Typography className='w-[20%] font-semibold text-md'>Email </Typography>
            <Controller
              name='email'
              control={control}
              rules={{
                required:'username empty not allowed',
                pattern:{
                  value:/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message:"Enetr a valid email"
              },
              }}
              render={({field,fieldState:{error}})=>(
                <TextField
                  {...field}
                  className='w-[35%]'
                  size='small'
                  label='Enter your Email'
                  error={!!error}
                  helperText={error&&error?.message}
                  autoComplete='off'
                />
              )}        
            />
          </Box>
          
            <Box className='my-[1%] flex justify-center items-center'>
              <Typography className='w-[20%] font-semibold text-md'>Password </Typography>
              <Box className='w-[35%] text-center'>
                <Controller
                  name='password'
                  control={control}
                  rules={{
                    required:'password should not be empty',                  
                  }}
                  render={({field,fieldState:{error}})=>(
                    <FormControl variant="outlined" size='small'>
                      <InputLabel htmlFor="outlined-adornment-password" className='w-[]'>Password</InputLabel>
                      <OutlinedInput
                        {...field}
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                        error={!!error}
                      />
                    </FormControl>
                    
                  )}        
                />
                <Typography className='font-thin text-xs text-red-500 text-left pl-[5%]'>{errors.password&&errors.password?.message}</Typography>
              </Box>
            </Box>
            
          
          <Box className='my-[3%] flex gap-[3%] justify-center'>
            <Button disabled={!isDirty} size='small' variant='contained' color='primary' type='submit'> Sign in</Button>
            <Button size='small' variant='contained' color='error'> cancel</Button>
          </Box>
          
        </Box>

        <Box className='flex items-center justify-center my-[2%] gap-[2%]'>
          <Typography>If not registered...click here for</Typography>
          <Typography className='text-sm font-semibold text-blue-400 cursor-pointer' onClick={()=>router.push('/register')}>registeration</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
