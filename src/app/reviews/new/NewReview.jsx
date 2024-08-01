"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Rating, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Close } from '@mui/icons-material';
import defaultNodeApi from '@/utils/api';
import authNodeApi from '@/utils/authApi';


const api = authNodeApi();
const NewReview = (props) => {
  const{isEditing,setIsEditing,selectedReviewData,onClose}= props;
  const router = useRouter();

  const{control,handleSubmit,formState:{errors,isDirty},reset} = useForm({
    defaultValues:{
      bookTitle:'',
      review:'',
      rating:'',
      author:'',
    }
  });
  const submitReview = async (data) => {
    // e.preventDefault();
    console.log("submitted data:",data);
    if(isEditing){
      try {
        const updateResponse = await api.put(`/api/reviews/${data._id}`,data);
        onClose();
      } catch (error) {
        console.log("something went wrong:",error)
      }
    }else{
      try {
        const createResponse = await api.post('/api/reviews',data);
        onClose();
      } catch (error) {
        console.log("something went wrong:",error)
      }
    }
    // try {
    //   const token = getToken();
    //   await axios.post(
    //     '/api/reviews',
    //     { bookTitle, review, rating },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     }
    //   );
    //   router.push('/reviews');
    // } catch (err) {
    //   console.error(err);
    // }
  };
  useEffect(()=>{
    if(isEditing){
      reset(selectedReviewData);
    }
  },[reset])
  return (
    <Dialog open fullScreen>
      <DialogTitle className='bg-green-300 flex justify-between p-[1%]'>
        <Typography className='font-semibold text-normal'>{isEditing?'Edit':'Add New'} Review</Typography>
        <IconButton onClick={()=>onClose()} size='small' className='bg-red-500 p-1 text-sm hover:bg-red-700'><Close className='text-[1rem] text-white'/></IconButton>
      </DialogTitle>
      <DialogContent >
        <Box component={'form'} onSubmit={handleSubmit(submitReview)} className='my-[2%]'>
          <Box className='my-[1%] flex justify-center items-center'>
            <Typography className='w-[20%] font-semibold text-md'>Author </Typography>
            <Controller
              name='author'
              control={control}
              rules={{
                required:'empty not allowed',
                pattern: {
                  value: /^[a-zA-Z .]+$/,
                  message: "Only alphabets, spaces are allowed"
                }
              }}
              render={({field,fieldState:{error}})=>(
                <TextField
                  {...field}
                  className='w-[70%]'
                  size='small'
                  label='Enter Author Name'
                  error={!!error}
                  helperText={error&&error?.message}
                  autoComplete='off'
                />
              )}        
            />
          </Box>
          <Box className='my-[1%] flex justify-center items-center'>
            <Typography className='w-[20%] font-semibold text-md'>Book </Typography>
            <Controller
              name='bookTitle'
              control={control}
              rules={{
                required:'empty not allowed',
                pattern: {
                  value: /^[a-zA-Z .\-!&]+$/,
                  message: "Only alphabets, spaces, periods, hyphens, exclamation marks, and ampersands are allowed"
                }
              }}
              render={({field,fieldState:{error}})=>(
                <TextField
                  {...field}
                  className='w-[70%]'
                  size='small'
                  label='Enter Book Name'
                  error={!!error}
                  helperText={error&&error?.message}
                  autoComplete='off'
                />
              )}        
            />
          </Box>
          <Box className='my-[1%] flex justify-center items-center'>
            <Typography className='w-[20%] font-semibold text-md'>Review </Typography>
            <Controller
              name='review'
              control={control}
              rules={{
                required:'empty not allowed',
                pattern: {
                  value: /^[a-zA-Z .\-!&,""'']+$/,
                  message: "Only alphabets, spaces, periods, hyphens, exclamation marks, and ampersands are allowed"
                }
              }}
              render={({field,fieldState:{error}})=>(
                <TextField
                  {...field}
                  className='w-[70%]'
                  size='small'
                  label='Review message '
                  error={!!error}
                  helperText={error&&error?.message}
                  autoComplete='off'
                  multiline
                  rows={3}
                />
              )}        
            />
            
          </Box>
          <Box className='my-[1%] flex justify-center items-center'>
            <Typography className='w-[20%] font-semibold text-md'>Rating </Typography>
            <Box className='w-[70%] flex items-center'>
              <Controller
                name='rating'
                control={control}
                rules={{
                  required:'rate it',                  
                }}
                render={({field,fieldState:{error}})=>(
                  <Rating
                    {...field}
                  />
                )}        
              />
              <Typography className='font-thin text-xs text-red-500 text-left pl-[5%]'>{errors.rating&&errors.rating?.message}</Typography>
            </Box>
          </Box>
          <Box className='flex justify-center'>
            <Button disabled={!isDirty} type='submit' variant='contained' >{isEditing?'update':'save'}</Button>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default NewReview;
