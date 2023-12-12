import { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  //allows for a user to be added
  const [addUser] = useMutation(ADD_USER, {
    variables: userFormData,
  });

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserFormData({ ...userFormData, [id]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log('submit')
    try {
      //creates a new user in the db
      const { data } = await addUser({
        variables: { ...userFormData },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

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
        <TextField
        id='username'  
        label="Username"
        value={userFormData.username}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
        />
        <TextField
        id='email'
        label="Email"
        value={userFormData.email}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
      />
        <TextField
        id='password'
        label="Password"
        type='password'
        value={userFormData.password}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
      />
        <Button
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}

          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#a80038',
            '&:hover': {
              backgroundColor: '#fd0054',
            },
          }}>
          Submit
        </Button>
        </Box>
      {/* </Form> */}
    </>
  );
};

export default SignupForm;
