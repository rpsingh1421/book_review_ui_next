"use client"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getToken } from '@/utils/auth';
import authNodeApi from '@/utils/authApi';
import { Box, Button, IconButton, Rating, Stack, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Delete, Edit } from '@mui/icons-material';
import NewReview from './new/NewReview';
import AuthLayout from '../component/AuthLayout';

const authApi = authNodeApi();
const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const fetchReviews = async () => {
    try {
      const res = await authApi.get('/api/reviews');
      console.log("reviews response:",res)
      setReviews(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchReviews();
  }, []);
  
  const columns=[
    { 
      field: 'id',
      headerAlign: 'center', 
      headerName: 'S.NO', 
      flex: 0.5,
      renderCell: (params) => {
        const rowIndex = params.api.getAllRowIds().indexOf(params.id)+1;
        return (
          <strong className='font-bold text-center self-center'>{rowIndex}</strong>
        );
      }
    },
    { field: 'bookTitle', headerAlign: 'center', headerName: 'BOOK', flex: 2 },
    { field: 'review', headerAlign: 'center', headerName: 'REVIEW', flex: 2 },
    { field: 'author', headerAlign: 'center', headerName: 'AUTHOR', flex: 1 },
    { 
      field: 'rating', 
      headerAlign: 'center', 
      headerName: 'RATING', 
      flex: 1,
      renderCell: (params) => {
        const rating = params.row.rating;
        return (
          <Rating
            name="simple-controlled"
            value={rating}
            readOnly
          />
        );
      }
    },
    { 
      field: 'action', 
      headerAlign: 'center', 
      headerName: '', 
      flex: 1,
      renderCell: (params) => {
        const handleEdit = ()=>{
          setSelectedReviewData(params.row);
          setIsEditing(true);
          setOpenReviewForm(true);
        }
        const handleDelete=async()=>{
          await authApi.delete(`/api/reviews/${params.row._id}`);
          fetchReviews();
        }
        return (
          <Stack direction={'row'}>
            <IconButton onClick={()=>handleEdit()}  size='small' color='warning'><Edit/></IconButton>
            <IconButton onClick={()=>handleDelete()}  size='small' color='error'><Delete/></IconButton>
          </Stack>
        );
      }
    },
  ]
  const [openReviewForm,setOpenReviewForm] = useState(false);
  const [isEditing,setIsEditing] = useState(false);
  const [selectedReviewData,setSelectedReviewData]=useState();
  return (
    <Box className='w-full md:w-[75%] md:m-auto'>
      <Box className='flex justify-between p-[1%]'>
        <Typography>Book Reviews</Typography>
        <Button className='' size='small' variant='contained' onClick={()=>setOpenReviewForm(true)}>Add new review</Button>
      </Box>
      <Box className='w-full overflow-auto'>
      <DataGrid
        rows={reviews}
        getRowId={(row) => row._id}
        columns={columns}
        initialState={{
          pagination: { paginationModel: { pageSize: 5 } },
        }}
        pageSizeOptions={[5, 10, 25]}
        disableRowSelectionOnClick
        autoHeight
        sx={{
          '--DataGrid-overlayHeight': '300px',
          '& .MuiDataGrid-root': {
            border: '1px solid lightgrey',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid lightgrey',
            borderRight: '1px solid lightgrey',
            '&:last-child': {
              borderRight: 'none',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            p: 1,
            whiteSpace: 'normal',
            wordWrap: 'break-word',
          },
          '& .MuiDataGrid-columnHeaders': {
            borderBottom: '2px solid lightgrey',
          },
          '& .MuiDataGrid-columnHeader': {
            borderRight: '1px solid lightgrey',
            '&:last-child': {
              borderRight: 'none',
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          },
          '& .MuiDataGrid-columnHeaderTitle': {
            fontWeight: 'bold',
            textTransform: 'uppercase',
          },
          '& .MuiDataGrid-row': {
            maxHeight: 'none !important',
          },
        }}
      />
      </Box>
      {openReviewForm && <NewReview isEditing={isEditing} setIsEditing={setIsEditing} selectedReviewData={selectedReviewData}
          onClose={()=>{
            fetchReviews();
            setSelectedReviewData();
            setIsEditing(false);
            setOpenReviewForm(false);
            fetchReviews();
          }}
      />}
    </Box>
  );
};

export default Reviews;