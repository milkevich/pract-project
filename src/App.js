import './App.css';
import LogIn from './Pages/LogIn';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Posts from './Posts';

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <LogIn/>
        <Posts/>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
