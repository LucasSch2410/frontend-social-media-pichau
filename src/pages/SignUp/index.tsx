import { z } from 'zod'
import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { ThreeDots } from 'react-loader-spinner'
import Button from '../../components/Button/Button'
import { useNavigate, Link } from 'react-router-dom'
import { zodResolver } from '@hookform/resolvers/zod'
import pichauLogo from '../../assets/logo-pichau.png'

const createUserFormSchema = z.object({
    username: z.string().min(1, "O usuário é obrigatório!"),
    password: z.string().min(1, "A senha é obrigatória!")
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>

export default function App() {
    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema),
    })

    const [buttonLoading, setButtonLoading] = useState(false)

    const navigate = useNavigate()

    async function createUser(data: any) {
        setButtonLoading(true)

        try{
            await api.post('/users/create', data)
            .then(() => {
                toast.success('Usuário criado.')
                navigate("/")
            })
            .catch((error) => {
                if (error.response) {
                    toast.error(error.response.data.detail)
                } else {
                    toast.error('Não foi possível cadastrar.')
                }
            })
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.detail)
            } else {
                toast.error('Não foi possível cadastrar.')
            }
        } finally {
            setButtonLoading(false)
        }
    }

    return (
        <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center'>
            <div className=''>
                <img src={pichauLogo} className="logo h-40" alt="Pichau logo" />
            </div>
            <h1 className='text-white text-center py-8 text-5xl'>Registro</h1>

            <form
                onSubmit={handleSubmit(createUser)}
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
                    {buttonLoading ? (
                        <Button className='w-60 flex justify-center border-none cursor-not-allowed bg-white' disabled><ThreeDots color='#000000' height={35} /></Button>
                    ) : (
                        <Button className='w-60'>Registrar-se</Button>
                    )}
                </div>
                <div className='text-white'>
                    <Link to="/">Login</Link>
                </div>
            </form>
        </main>
    )
}
