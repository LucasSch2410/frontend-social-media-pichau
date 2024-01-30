import SignUp from '../pages/SignUp';
import Login from '../pages/Login';
import { Home } from '../pages/Home';
import { Route, Routes } from 'react-router-dom';
import { ProtectedRoutes } from '../components/ProtectedRoutes';

export const AllRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login/>}/> 
            <Route path="/signup" element={<SignUp/>}/>
            <Route element={<ProtectedRoutes/>}>
                <Route path="/home" element={<Home/>}/>
            </Route> 
        </Routes>
    )
}