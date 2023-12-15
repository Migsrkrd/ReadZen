// see SignupForm.js for comments
import { useState } from 'react';
// import { Form, Button, Alert } from 'react-bootstrap';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button'
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
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

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  //allows the user to login
  const [login, {error}] = useMutation(LOGIN_USER)

  const handleInputChange = (event) => {
    const { id, value } = event.target;
    setUserFormData({ ...userFormData, [id]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      //logs the user in
      const { data } = await login({
        variables: { ...userFormData },
      });
      //checks the users authentication
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };
  
  return (
    <div>
            <Box className='loginForm'
          component="form"
          sx={{
            '& > :not(style)': { m: 1 },
          }}
          onSubmit={handleFormSubmit}
          noValidate
          autoComplete="off"
          >
        <StyledTextField
        id='email'
        label="Email"
        value={userFormData.email}
        helperText={error ? error.message : ''}
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
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='contained'
          sx={{
            backgroundColor: '#a80038',
            '&:hover': {
              backgroundColor: '#fd0054',
            },
          }}
          >
          Submit
        </Button>
        </Box>
    </div>
  );
};

export default LoginForm;