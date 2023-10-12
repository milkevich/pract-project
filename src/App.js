import './App.css';
import { TextField } from '@mui/material';

function App() {
  return (
    <div className="App">
      <TextField sx={{position: 'relative', marginTop: '100px'}} id="outlined-basic" label="Outlined" variant="outlined"></TextField>
    </div>
  );
}

export default App;
