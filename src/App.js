import './App.css';
import { TextField, Button } from '@mui/material';

function App() {
  return (
    <div className="App">
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <TextField id="outlined-basic" label="Outlined" variant="outlined" />
      <Button variant="contained">Log In</Button>
    </div>
  );
}

export default App;
