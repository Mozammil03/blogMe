import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './store/store.js'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Protected from './components/AuthLayout.jsx'
import SignUp from './pages/SignUp.jsx'
import AllPosts from './pages/AllPosts.jsx'
import AddPost from './pages/AddPost.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import StepForm from './components/StepForm.jsx'
// import Experiment from './Experiment.jsx'




const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    children: [
      {
        path: '/',
        element: <><Home/></>
      },
      {
        path: '/login',
        element: (
        <Protected authentication>
          <Login/>
        </Protected>)
      },
      {
        path: '/signup',
        element: (
        <Protected authentication = {false}>
          <SignUp/>

          </Protected>)
      },
      {
        path: '/signup/step1', // Separate path for StepForm, outside of SignUp's children
        element: (
          <Protected authentication={false}>
            <StepForm />
          </Protected>
        )
      },
      {
        path: '/all-Posts',
        element: (
        <Protected authentication = {true}>
          <AllPosts/>

        </Protected>)
      },
      {
        path: '/add-Post',
        element: (
        <Protected authentication = {true}>
          <AddPost/>

        </Protected>)
      },
      {
        path: '/edit-post/:slug',
        element: (
        <Protected authentication ={true}>
          <EditPost/>

        </Protected>)
      },
      {
        path: '/post/:slug',
        element: (
        <Protected authentication = {true}>
          <Post/>
          

        </Protected>)
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router = {router}/>

    </Provider>
  </React.StrictMode>,
)
