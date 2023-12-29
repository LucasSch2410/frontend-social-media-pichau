import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider, Navigate, useSearchParams } from "react-router-dom";
import App from './pages/App';

const StateParamWrapper = () => {
  const [searchParams] = useSearchParams();
  const access_token = searchParams.get('access_token');

  if (access_token) {
    localStorage.setItem('access_token', access_token)
    return <Navigate to="/sheet" replace/>
  }
  return <App />
};

const router = createBrowserRouter([
  {
      path: "/",
      element: <StateParamWrapper />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
