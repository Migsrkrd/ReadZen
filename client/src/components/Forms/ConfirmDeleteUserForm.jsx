import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { useMutation } from '@apollo/client';
import { DELETE_USER } from '../../utils/mutations';

import Auth from '../../utils/auth';

const StyledTextField = styled(TextField)({
  '& label.Mui-focused': {
    color: '#a80038',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: '#a80038',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#a80038',
    },
    '&:hover fieldset': {
      borderColor: '#a80038',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#a80038',
    },
  },
});

const ConfirmDeleteUserForm = ({ setOpen }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ 
    password: '',
  });
  const [errorMessages, setErrorMessages] = useState({});

  // set state for form validation
  // const [validated] = useState(false);
  // set state for alert
  // const [showAlert, setShowAlert] = useState(false);

  // update the mutation for updating the username
  const { _id: userId } = Auth.getProfile().data;
  const [deleteUser, { error }] = useMutation(DELETE_USER, {
    variables: {
      id: userId,
      ...userFormData,
    }
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserFormData({ ...userFormData, [id]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      // use the mutation for updating the username
      const { data } = await deleteUser();
      
      if (data) {
        Auth.logout();
      }

    } catch (e) {
      console.error(e);
      handleError(e)
      // setShowAlert(true);
    }

    clearForm()
  };

  const handleCancel = () => {
    setOpen(false);
    clearForm();
  };

  const clearForm = () => {
    setUserFormData({
      password: '',
    });
  }

  const handleError = (error) => {
    // single error message for any validation error:
    // const message = error.message;
    // const messages = {};
    // messages.main = message.split(':')[0];
    // setErrorMessages(messages);
    // console.log('error message', messages.main);
  
    const message = error.message;
    const messageArray = message.slice(message.indexOf(':') + 1).split(',');
    const messages = {};
    messages.main = message.split(':')[0];
    messageArray.forEach((index) => {
      const property = index.split(':')[0].trim();
      messages[property] = index.split(':')[1].trim();
    });
    // console.log('error message', messages.main);
    // console.log('error array', messageArray);
    // console.log('error object', messages);
    setErrorMessages(messages);
  }

  return (
    <>
      {/* This is needed for the validation functionality above */}
      {/* <Form noValidate validated={validated} onSubmit={handleFormSubmit}> */}
        {/* show alert if server response is bad */}
        {/* <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your signup!
        </Alert> */}
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1 },
        }}
        onSubmit={handleFormSubmit}
        noValidate
        autoComplete="off"
      >
        <h1 className='confirm-header'>Confirm Account Delete</h1>

        <StyledTextField
          id="password"  
          label="Password"
          type="password"
          value={userFormData.password}
          helperText={error ? errorMessages.main : ''}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{
            '& .MuiInputLabel-root.Mui-focused': {
              color: '#a80038',
            },
          }}
        />

        <Button
          disabled={!userFormData.password}
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#a80038',
            '&:hover': {
              backgroundColor: '#fd0054',
            },
          }}
        >
          Confirm Delete Account
        </Button>

        <Button
          variant='contained'
          onClick={handleCancel}
          sx={{
            backgroundColor: '#a80038',
            '&:hover': {
              backgroundColor: '#fd0054',
            },
          }}
        >
          Cancel
        </Button>

      </Box>

      {/* Note about Readmes and Comments deletion */}
      <p style={{ marginTop: '16px', color: '#a80038' }}>
        Warning: Deleting your account will also remove all of your ReadMes and Comments!
      </p>

    </>
  );
};

export default ConfirmDeleteUserForm;
