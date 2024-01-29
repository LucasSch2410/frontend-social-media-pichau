import pichauLogo from '../../assets/logo-pichau.png'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'

export default function Home() {

  const [products, setProducts] = useState('')
  const { register, handleSubmit, formState: { errors } } = useForm()

  async function requestSheet(data: any){
    api.post('/images/sheet', data)
    .then((res) => {
      setProducts(res.data)
    })
    .catch((error) => {
      if (error.response){
        toast.error(error.response.data.detail)
      } else {
        toast.error('Não foi possível acessar a planilha.')
      }
    })

  }
  return (
    <main className='h-screen bg-zinc-950 text-zinc-300 flex flex-col items-center justify-center'>
    <div className=''>
        <img src={pichauLogo} className="logo h-40" alt="Pichau logo"/>
    </div>
    <h1 className='text-white text-center py-8 text-5xl'>Planilha</h1>

    <form 
      onSubmit={handleSubmit(requestSheet)}
      className='flex flex-col gap-4 w-full max-w-xs'
    >
      <div className='flex flex-col gap-1'>
        <label htmlFor="">URL da planilha</label>
        <input 
          type="text" 
          className='border border-zinc-800 shadow-sm rounded h-10 px-3 bg-zinc-900 text-white'
          {...register('sheet_url')}
          />
        {errors.password && <span>{errors.password.message}</span>}
      </div>
      <div className="card m-auto">
        <Button>Requisitar produtos</Button>
      </div>
      </form>
    </main>

  )
}


