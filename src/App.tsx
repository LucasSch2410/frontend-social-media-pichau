import { useAuth } from './context/LoginContext';
import './index.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';



const AppRoutes = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
  ])
  
  const AuthRoutes = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },  
    {
      path: "/signup",
      element: <SignUp />
    }
  ])
  

const App = () => {
    const { user : any} = useAuth()

    return (
        <>
            <ToastContainer />
            {user ? <RouterProvider router={AppRoutes} /> : <RouterProvider router={AuthRoutes} />}
        </>
    )
}

export default App

