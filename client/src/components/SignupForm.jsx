import { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

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

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  const [errorMessages, setErrorMessages] = useState({});

  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  //allows for a user to be added
  const [addUser, { error }] = useMutation(ADD_USER, {
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
      handleError(e)
      console.log("error", e)
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  const handleError = (error) => {
    const message = error.message;
    const messageArray = message.slice(message.indexOf(':') + 1).split(',');
    const messages = {};
    messages.main = message.split(':')[0];
    messageArray.forEach((index) => {
      const property = index.split(':')[0].trim();
      messages[property] = index.split(':')[1].trim();
    });
    console.log('error message', messages.main);
    console.log('error array', messageArray);
    console.log('error object', messages);
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
        <StyledTextField
        id='username'  
        label="Username"
        value={userFormData.username}
        helperText={error ? errorMessages.main : ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
        />
        <StyledTextField
        id='email'
        label="Email"
        value={userFormData.email}
        helperText={error ? errorMessages.email : ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
      />
        <StyledTextField
        id='password'
        label="Password"
        type='password'
        value={userFormData.password}
        helperText={error ? errorMessages.password : ''}
        onChange={handleInputChange}
        fullWidth
        margin="normal"
        sx={{
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#a80038',
          }
          
        }}
      />
      {/* <CssTextField label="Custom CSS" id="custom-css-outlined-input" /> */}
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
