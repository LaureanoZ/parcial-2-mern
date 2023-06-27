import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import Error404Page from './pages/Error404Page'
import ProjectPage from './pages/ProjectPage'
import LoginPage from './pages/LoginPage'
import ProjectDetailsPage from './pages/ProjectDetailsPage'
import RegisterPage from './pages/RegisterPage'
import RoutePrivate from './components/RoutePrivate'

import {createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/',
    element:<RoutePrivate><App /></RoutePrivate>,
    errorElement: <Error404Page />,
    children: [
      {
        path: '',
        element: <ProjectPage />,
      },
      {
        path: ':idProject',
        element: <ProjectDetailsPage />
      }
    ]
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
  
])


ReactDOM.createRoot(document.getElementById('root'))

.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
