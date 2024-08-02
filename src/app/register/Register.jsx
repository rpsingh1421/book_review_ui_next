"use client"
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Link from 'next/link';
import defaultNodeApi from '@/utils/api';


const api = defaultNodeApi();
const Register = () => {
  const router = useRouter();
  const userInitial={ 
    username:'',
    email:'',
    password:''
  }
  const [userData,setUserData] = useState(userInitial);
  const {control,handleSubmit,formState:{errors}} = useForm();
  const submitRegistrationData = async (data) => {
    console.log("registration data:",data)
    try {
      const response =await api.post('/api/auth/register', data)
      
      console.log("registration response:",response);
      router.push('/login');
    } catch (err) {
      console.error(err);
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
        <Box className='my-[5%]'>
          <Typography className='text-center font-semibold text-3xl'>User Registration</Typography>
        </Box>
        <Box component={'form'} onSubmit={handleSubmit(submitRegistrationData)} className=''>
          <Box className='my-[1%] flex justify-center items-center'>
          <Typography className='w-[20%] font-semibold text-md'>Name </Typography>
            <Controller
              name='username'
              control={control}
              rules={{
                required:'username empty not allowed',
                pattern:{
                  value:/^[a-zA-Z ]*$/,
                  message:"only alphabets and space allowed"
                },
                minLength:{
                    value:3,
                    message:"minimum 3 digit"
                },
                maxLength:{
                    value:30,
                    message:"maximum 30 digit"
                }
              }}
              render={({field,fieldState:{error}})=>(
                <TextField
                  {...field}
                  className='w-[35%]'
                  size='small'
                  label='enter your name'
                  error={!!error}
                  helperText={error&&error?.message}
                  autoComplete='off'
                />
              )}        
            />
          </Box>
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
                    pattern:{
                        value:/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&]).{6,32}$/,
                        message:"should be min.6 digit with atleast one Uppercase,lowercase,special symbol and numeric"
                    }
                  
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
                <Typography className='font-thin text-xs text-red-500'>{errors.password&&errors.password?.message}</Typography>
              </Box>
            </Box>
            
          
          <Box className='my-[3%] flex gap-[3%] justify-center'>
            <Button size='small' variant='contained' color='primary' type='submit'> register</Button>
            <Button size='small' variant='contained' color='error'> cancel</Button>
          </Box>
          
        </Box>

        <Box className='flex items-center justify-center my-[2%]'>
          <Typography>If already registered...</Typography>
          <Typography className='text-sm font-semibold text-blue-400 cursor-pointer' onClick={()=>router.push('/login')}>Sign In</Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Register;
