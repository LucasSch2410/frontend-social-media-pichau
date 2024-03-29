import { z } from 'zod'
import { Link } from 'react-router-dom'
import { loginUserFormSchema } from './schema'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import Button from '../../components/Button/Button'
import pichauLogo from '../../assets/logo-pichau.png'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGlobalContext } from '../../context/GlobalContext'

type CreateUserFormData = z.infer<typeof loginUserFormSchema>

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(loginUserFormSchema),
    })

    const { submitLogin, buttonLoading } = useGlobalContext();

    const handleForm = handleSubmit((data) => submitLogin(data));

    return (
        <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center'>
            <div className=''>
                <img src={pichauLogo} className="logo h-40" alt="Pichau logo" />
            </div>
            <h1 className='text-white text-center py-8 text-5xl'>Login</h1>

            <form
                onSubmit={handleForm}
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

                <div className="my-5 card m-auto">
                    {buttonLoading ? (
                        <Button className='w-40 flex justify-center border-none cursor-not-allowed bg-white' disabled><ThreeDots color='#000000' height={35} /></Button>
                    ) : (
                        <Button className='w-40'>Entrar</Button>
                    )}
                </div>
                <div className='text-white'>
                    <Link to="/signup">Registrar-se</Link>
                </div>
            </form>
        </main>
    )
}
