import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom/cjs/react-router-dom';

function LogIn() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
  const [formReady, setFormReady] = useState(false);

  useEffect(() => {
    setFormReady(!emailError && !passwordError && (email !== '' && password !== ''));
  }, [email, password, emailError, passwordError]);

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

  const submit = (e) => {
    e.preventDefault();
    if (!emailError || !passwordError) {
      alert('велкам ❤️');
    }
  };

  return (
    <div>
      <CssBaseline />
      <Container maxWidth="sm">
        <TextField
          error={emailError}
          helperText={emailErrorMessage}
          id="email"
          onChange={emailValidation}
          value={email}
          required
          sx={{ position: 'relative', marginTop: '100px', width: '300px' }}
          label="Email"
          variant="outlined"
        />
        <TextField
          error={passwordError}
          helperText={passwordErrorMessage}
          type="password"
          required
          sx={{ position: 'relative', marginTop: '20px', width: '300px' }}
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={passwordValidation}
        />
        <Button
          onClick={submit}
          sx={{ position: 'relative', marginTop: '20px', width: '300px' }}
          variant="contained"
          disabled={!formReady}>
          <Link className='router-link' to={{pathname: '/posts'}}>
            Log In
          </Link>
        </Button>
      </Container>
    </div>
  );
}

export default LogIn;
