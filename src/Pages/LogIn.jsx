import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';

function LogIn() {
  return (
    <div>
            <CssBaseline />
                <Container maxWidth="sm">
                    <TextField required sx={{position: 'relative', marginTop: '100px', width: '300px'}} id="outlined-basic" label="Email" variant="outlined"></TextField>
                    <TextField required sx={{position: 'relative', marginTop: '20px', width: '300px'}} id="outlined-basic" label="Password" variant="outlined"></TextField>
                    <Button sx={{position: 'relative', marginTop: '20px', width: '300px'}} variant="contained">Log In</Button>
                </Container>
    </div>
  );
}

export default LogIn;
