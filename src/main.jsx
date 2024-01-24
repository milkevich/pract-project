import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route, Router } from 'react-router-dom';
import LogIn from './Pages/LogIn';
import Posts from './Pages/Posts';
import Protected from './Protected';
import { MainLayout } from './Components/MainLayout';
import CreateNewPost from './Pages/CreateNewPost';
import PostPage from './Pages/PostPage';
import Edit from '../src/Pages/Edit'
import SignIn from './Pages/SignIn';

const router = createBrowserRouter(
  
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route element={<MainLayout />}>
        <Route path='/log-in' element={<LogIn />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/posts' element={<Posts />} />
        <Route path={`/post/:postId`} element={<PostPage />} />
        <Route path={`/post/:postId/edit`} element={<Edit />} />
        <Route element={<Protected />}>
          <Route path='/create-new-post' element={<CreateNewPost/>}/>
        </Route>
      </Route>
    </Route>
  )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
