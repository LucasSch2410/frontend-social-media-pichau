import pichauLogo from '../../assets/logo-pichau.png'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import Button from '../../components/Button/Button'
import { useAuth } from '../../context/LoginContext'
import { TailSpin } from 'react-loader-spinner';

type Product = {
    key: string;
    product: string;
    price: number;
    installment: number;
    loading: boolean;
  };

type FormData = {
    sheet_url: string;
};
  
export default function Home() {

    const [products, setProducts] = useState<Product[] | null>(null)
    const [userData, setData] = useState<ReturnType<typeof useAuth>>(useAuth())
    const [typeSocialDownload, setTypeSocial] = useState()
    const [downloadReady, setDownload] = useState(false)
    const { register, handleSubmit, formState: { errors }} = useForm<FormData>()

    async function requestSheet(data: FormData){
        await api.post('/images/sheet', data)
        .then((res: Response) => {
            setProducts(res.data.map(product => ({ ...product, loading: false })));
        })
        .catch((error: Response) => {
            if (error.response){
            toast.error(error.response.data.detail)
            } else {
            toast.error('Não foi possível acessar a planilha.')
            console.log(error)
            }
        })


    }

    async function requestImages(typeSocial: string){
        try{
            await Promise.all(
                products.map(async (product) => {
                    setProducts((current: any) =>
                        current.map((product: any) => ({ ...product, loading: true }))
                    );
        
                    await api.post('/images/create', {
                        access_token: userData.dropbox_token,
                        product_name: product.product,
                        price: product.price,
                        installment: product.installment,
                        typeSocial: typeSocial,
                        username: userData.user,
                    })
                    .then((res: any) => {
                    })
                    .catch((error: any) => {
                        if (error.response){
                            toast.error(`Não foi possível baixar a imagem: ${product.product}`)
                            toast.error(error.response.data.detail)
                        } else {
                            toast.error(`Não foi possível baixar a imagem: ${product.product}`)
                            console.log(error)
                        }
                    })
                    .finally(() => {
                        setProducts((current: any) =>
                        current.map((p: any) =>
                          p.key === product.key ? { ...p, loading: false } : p
                        )
                      )
                    });
                })
            )
        } catch (error: any){
            toast.error(error.response.data.detail)
        } finally {
            toast.success(`Imagens do tipo ${typeSocial} foram produzidas, download disponível.`)
            setTypeSocial(typeSocial)
            setDownload(true)
        }
    }

    async function requestDownload(){
        await api.post('/images/download', {
            username: userData.user,
            typeSocial: typeSocialDownload
        })
        .then(res => {
            window.location.href = res.data.url
        })
    }

    return (
        <main className='h-screen bg-zinc-950 text-zinc-300 grid grid-cols-12 grid-rows-12'>
            <div className='
                col-start-5 col-span-4 row-start-4 row-span-6
                flex flex-col items-center justify-center'>
                <div>
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
            </div>

                {products ? <div className='
                    col-start-9 col-span-4 row-start-1 row-span-6
                  bg-neutral-900 mt-20 h-5/6 w-5/6 p-5 rounded border-white border-2 overflow-auto '>{
                    products.map((product) =>
                        <div key={product.key} className='pb-10'>
                            <p>{product.product}</p>
                            {product.loading && (
                                <TailSpin />
                            )}
                        </div>
                        )    
                    }
                </div> 
                : ""}

                {products ? 
                    <div className='grid grid-cols-2 w-5/6 col-start-9 col-span-4 gap-6 row-start-8'>
                        <Button className='col-span-1' onClick={() => requestImages('stories')}>Stories</Button>
                        <Button className='col-span-1' onClick={() => requestImages('wide')}>Wide</Button>
                        <Button className='col-span-1' onClick={() => requestImages('push')}>Push</Button>
                        <Button className='col-span-1' onClick={() => requestImages('post')}>Post</Button>
                    </div>
                : ""}

                {downloadReady && 
                    <div className='flex justify-center col-start-5 col-span-4 row-start-11'>
                        <Button className='w-2/6 bg-white text-black hover:bg-neutral-900 hover:text-white'
                        onClick={() => requestDownload()}>
                            Download
                        </Button>
                    </div>
                }
                

        </main>

    )
}


