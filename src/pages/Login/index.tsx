import {Navigate, useSearchParams } from 'react-router-dom';
import pichauLogo from '../../assets/logo-pichau.png'
import Button from '../../components/Button/Button'
import Cookies from 'js-cookie'

export default function App() {

  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "http://localhost:3000/auth2"
  }

  const [searchParams] = useSearchParams();
  const access_token = searchParams.get('access_token');

  if (access_token){
    Cookies.set('access_token', access_token, { expires: 0.1 })
    return <Navigate to="/home" replace={true} />
  }
  else if (Cookies.get('access_token'))
  {
    return <Navigate to="/home" replace={true} />
  }
  
  return (
    <div className='container mx-auto grid h-screen place-content-center'>
      <div className='m-auto'>
          <img src={pichauLogo} className="logo h-40" alt="Pichau logo"/>
      </div>
      <h1 className='text-white text-center py-8 text-5xl'>Social Media Pichau</h1>
      <div className="card m-auto">
        <Button onClick={handleClick}>Entrar</Button>
      </div>
    </div>
  )
}
