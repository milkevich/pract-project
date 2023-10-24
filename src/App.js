import './App.css';
import LogIn from './Pages/LogIn';
import { ThemeProvider } from '@mui/material';
import theme from './theme';
import Posts from './Posts';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Router>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/posts" component={Posts} />
        </Router>
      </ThemeProvider>
      
    </div>
  );
}

export default App;
