import pichauLogo from '../../assets/logo-pichau.png'
import Cookies from 'js-cookie'
import { Navigate } from 'react-router-dom';
import LoginForm from '../../components/Form/Form'

export default function Home() {
  if (!Cookies.get('access_token'))
  {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className='container mx-auto grid h-screen place-content-center'>
      <div className='m-auto'>
          <img src={pichauLogo} className="logo h-40" alt="Pichau logo"/>
      </div>
      <h1 className='text-white text-center py-8 text-5xl'>Planilha</h1>
      <div className="card m-auto">
        <LoginForm/>
      </div>
    </div>
  )
}
