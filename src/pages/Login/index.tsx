import { useState } from 'react'
import pichauLogo from '../../assets/logo-pichau.png'
import Button from '../../components/Button/Button'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/LoginContext'

const createUserFormSchema = z.object({

  username: z.string().min(1, "O usuário é obrigatório!"),
  password: z.string().min(1, "A senha é obrigatória!")

})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

  export default function App() {

    const [output, setOutput] = useState('')
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
      resolver: zodResolver(createUserFormSchema),
    })

    const { signIn } = useAuth()

    async function handleLogin(data: any){
      signIn(data)
    }

    return (
      <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center'>
        <div className=''>
            <img src={pichauLogo} className="logo h-40" alt="Pichau logo"/>
        </div>
        <h1 className='text-white text-center py-8 text-5xl'>Login</h1>

        <form 
          onSubmit={handleSubmit(handleLogin)}
          className='flex flex-col gap-4 w-full max-w-xs'
        >
          <div className='flex flex-col gap-1'>
            <label htmlFor="">Usuário</label>
            <input 
              type="text" 
              className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
              {...register('username')}
              />
              {errors.username && <span>{errors.username.message}</span>}
          </div>

          <div className='flex flex-col gap-1'>
            <label htmlFor="">Senha</label>
            <input 
              type="password" 
              className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
              {...register('password')}
              />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="card m-auto">
            <Button>Entrar</Button>
          </div>
          <div className='text-white'>
            <Link to="/signup">Registrar-se</Link>
          </div>
        </form>
      </main>
    )
}
