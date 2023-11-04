import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Router } from 'react-router-dom';
import LogIn from './Pages/LogIn';
import Posts from './Pages/Posts';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route path='/log-in' element={<LogIn />}/>
        <Route path='/posts' element={<Posts />}/>  
      </Route>

    
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router}/>
);
