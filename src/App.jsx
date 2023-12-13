import './App.css';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import { Outlet } from 'react-router-dom';
import ThemeContextProvider from './Contexts/ThemeContext';
import UserContextProvider from './Contexts/UserContext';

function App() {

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <UserContextProvider>
          <ThemeContextProvider>
            <Outlet/>
          </ThemeContextProvider>          
        </UserContextProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
