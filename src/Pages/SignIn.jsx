import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebaseConfig';



function SignIn() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

  const navigate = useNavigate()

  const submit = async (e) => {
    e.preventDefault();
    if (!emailError || !passwordError) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          navigate('/posts')
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(error)
          alert('Something went wrong, please try again')
        });
    }
  };

  const emailValidation = (e) => {
    const pattern = /^[^]+@[^]+\.[a-z]{2,3}$/;
    const emailValue = e.target.value;
    setEmail(emailValue);

    if (emailValue === '' || !emailValue.match(pattern)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address');
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }
  };

  const passwordValidation = (e) => {
    const passwordValue = e.target.value;
    setPassword(passwordValue);

    if (passwordValue === '' || passwordValue.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('You must have at least 6 characters');
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
  };

  const goToPosts = () => {
    navigate("/posts")
  }

  const logIn = () => {
    navigate('/log-in')
  }

  return (
    <div style={{maxWidth: '300px', margin: 'auto'}}>
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          onChange={emailValidation}
          value={email}
          required
          sx={{ marginTop: '100px', width: '300px' }}
          label="Email"
          variant="outlined"
        />
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          type="password"
          required
          sx={{ marginTop: '20px', width: '300px' }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={passwordValidation}
        />
        <Button
          onClick={submit}
          sx={{ marginTop: '20px', width: '300px' }}
          variant="contained">
          Sign In
        </Button>
        <Button
          onClick={goToPosts}
          sx={{ marginTop: '20px', width: '300px' }}
          variant="text">
              Go Back 
        </Button>
        <p style={{textAlign: "center"}}>Already have an account? <span onClick={logIn} style={{color: "#cd74d4", cursor: "pointer"}}>Log in here</span></p>
    </div>
  );
}

export default SignIn;
