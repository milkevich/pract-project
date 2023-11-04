import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { Outlet } from 'react-router-dom';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Outlet/>
      </ThemeProvider>
    </div>
  );
}

export default App;
