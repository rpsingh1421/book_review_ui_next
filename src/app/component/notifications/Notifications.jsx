"use client";

import { useEffect, useState } from 'react';
import useSocket from '../hooks/useSocket';
import { Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const Notifications = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on('notification', (data) => {
        showNotification(data);
      });
    }
  }, [socket]);

  const showNotification = (data) => {
    let notificationMessage = '';
    switch (data.type) {
      case 'reviewAdded':
        notificationMessage = `New review added for "${data.data.bookTitle}"`;
        break;
      case 'reviewEdited':
        notificationMessage = `Review updated for "${data.data.bookTitle}"`;
        break;
      case 'reviewDeleted':
        notificationMessage = `Review deleted for book ID: ${data.data}`;
        break;
      default:
        notificationMessage = 'New activity in book reviews';
    }
    setMessage(notificationMessage);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={message}
      action={action}
    />
  );
};

export default Notifications;