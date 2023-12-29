import pichauLogo from '../../assets/logo-pichau.png'
import Button from '../../components/Button/Button'

export default function App() {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "https://www.dropbox.com/oauth2/authorize?client_id=emm8mikk0bmdwbn&redirect_uri=http://localhost:5000/auth2&response_type=code"
  }

  return (
    <div className='container mx-auto grid h-screen place-content-center'>
      <div className='m-auto'>
          <img src={pichauLogo} className="logo h-40" alt="Pichau logo"/>
      </div>
      <h1 className='text-white text-center py-8 text-5xl'>Social Media Pichau</h1>
      <div className="card m-auto">
        <Button onClick={handleClick}>LOGIN</Button>
      </div>
    </div>

  )
}
