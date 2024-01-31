import { useState } from 'react'
import { api } from '../../services/api'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import Button from '../../components/Button/Button'
import pichauLogo from '../../assets/logo-pichau.png'
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import { useGlobalContext } from '../../context/GlobalContext'

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


export const Home = () => {

    const {
        user,
        dbxToken,
        sheetLoading, 
        setSheetLoading
    } = useGlobalContext();
    const [timePreview, setPreview] = useState(0)
    const [counterProductDownload, setProductDownload] = useState(0)

    const [products, setProducts] = useState<Product[] | null>(null)

    const [typeSocialDownload, setTypeSocial] = useState('')
    const [downloadReady, setDownload] = useState(false)
    const { register, handleSubmit } = useForm<FormData>()

    const updateProductState = (key: string, updates: any) => {
        setProducts((current: any) =>
            current.map((p: any) =>
                p.key === key ? { ...p, ...updates } : p
            )
        );
    };

    async function requestSheet(data: FormData) {

        setSheetLoading({...sheetLoading, button: true})
        try {
            await api.post('/images/sheet', data)
                .then((res) => {
                    setProducts(res.data.map((product: Product) => ({ ...product, loading: false })));
                })
                .catch((error) => {
                    if (error.response) {
                        toast.error(error.response.data.detail)
                    } else {
                        toast.error('Não foi possível acessar a planilha.')
                        console.log(error)
                    }
                })
        } catch (error: any) {
            if (error.response) {
                toast.error(error.response.data.detail)
            } else {
                toast.error('Não foi possível acessar a planilha.')
                console.log(error)
            }
        } finally {
            setSheetLoading({...sheetLoading, button: false})
        }

    }

    async function requestImages(typeSocial: string) {
        setSheetLoading({...sheetLoading, images: true})

        try {
            for (const product of products!) {
                updateProductState(product.key, { loading: true });
                const start: number = new Date().getTime()

                await api.post('/images/create', {
                    access_token: dbxToken,
                    product_name: product.product,
                    price: product.price,
                    installment: product.installment,
                    typeSocial: typeSocial,
                    username: user?.username,
                })
                    .catch((error: any) => {
                        if (error.response) {
                            toast.error(`Não foi possível baixar a imagem: ${product.product}`)
                            toast.error(error.response.data.detail)
                        } else {
                            toast.error(`Não foi possível baixar a imagem: ${product.product}`)
                            console.log(error)
                        }
                    })
                    .finally(() => {
                        updateProductState(product.key, { loading: false });
                        setProductDownload(current => current + 1)

                        const timeTake = (new Date().getTime()) - start;
                        setPreview(current => current + timeTake)
                    });
            }
        } finally {
            toast.success(`Imagens do tipo ${typeSocial} foram produzidas, download disponível.`)
            setTypeSocial(typeSocial)
            setDownload(true)
            setSheetLoading({...sheetLoading, images: false})
            setPreview(0)
            setProductDownload(0)
        }
    }

    async function requestDownload() {
        setSheetLoading({...sheetLoading, download: true})
        try {
            await api.post('/images/download', {
                username: user?.username,
                typeSocial: typeSocialDownload
            })
                .then(res => {
                    window.location.href = res.data.url
                })
        } catch (error: any) {
            if (error.response) {
                toast.error(`Não foi possível fazer o download!`)
                toast.error(error.response.data.detail)
            } else {
                toast.error(`Não foi possível fazer o download!`)
                console.log(error)
            }
        } finally {
            setSheetLoading({...sheetLoading, download: false})
            setDownload(false)
        }
    }

    return (
        <main className='h-screen bg-zinc-950 text-zinc-300 grid grid-cols-12 grid-rows-12'>
            <div className='
                col-start-5 col-span-4 row-start-4 row-span-6
                flex flex-col items-center justify-center'>
                <div>
                    <img src={pichauLogo} className="logo h-40" alt="Pichau logo" />
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
                    </div>
                    <div className="card m-auto">
                        {sheetLoading.button ? (
                            <Button className='w-80 flex justify-center border-none cursor-not-allowed bg-white' disabled><ThreeDots color='#000000' height={35} /></Button>
                        ) : (
                            <Button className='w-80'>Requisitar produtos</Button>
                        )}
                    </div>
                </form>
            </div>

            {products ? <div className='
                    col-start-9 col-span-4 row-start-1 row-span-6
                  bg-neutral-900 mt-20 h-5/6 w-5/6 p-5 rounded overflow-auto border-r-0'>{
                    products.map((product) =>
                        <div key={product.key} className='pb-10 flex'>
                            <p className='w-5/6 text-justify'>{product.product}</p>
                            {product.loading && (
                                <TailSpin height={30} strokeWidth={7} color='#FFFFFF'/>
                            )}
                        </div>
                    )
                }
            </div>
                : ""}

            {products ?
                <div className='grid grid-cols-2 w-5/6 col-start-9 col-span-4 gap-6 row-start-8 box-border'>
                    {sheetLoading.images ? (
                        <>
                            <>
                                <Button className='h-16 col-span-1 cursor-not-allowed border-none' disabled>Stories</Button>
                                <Button className='h-16 col-span-1 cursor-not-allowed border-none' disabled>Wide</Button>
                                <Button className='h-16 col-span-1 cursor-not-allowed border-none' disabled>Push</Button>
                                <Button className='h-16 col-span-1 cursor-not-allowed border-none' disabled>Post</Button>
                            </>
                            <>
                                <Button className='h-16 col-span-2 cursor-not-allowed border-none' disabled>Todas</Button>
                            </>
                        </>

                    ) : (
                        <>
                            <>
                                <Button className='h-16 col-span-1' onClick={() => requestImages('stories')}>Stories</Button>
                                <Button className='h-16 col-span-1' onClick={() => requestImages('wide')}>Wide</Button>
                                <Button className='h-16 col-span-1' onClick={() => requestImages('push')}>Push</Button>
                                <Button className='h-16 col-span-1' onClick={() => requestImages('post')}>Post</Button>
                            </>
                            <>
                                <Button className='h-16 col-span-2' onClick={() => requestImages('stories')}>Todas</Button>
                            </>
                        </>
                    )}
                    {timePreview > 1 &&(
                        <div className='col-span-2'>
                            <p>Tempo restante previsto: {Math.round((((timePreview / counterProductDownload) * products!.length) - timePreview) / 1000)} segundos </p>
                        </div>
                    )}
                </div>
                : ""}

            {downloadReady && sheetLoading.images === false &&(
                <div className='flex justify-center col-start-5 col-span-4 row-start-11'>
                    {sheetLoading.download ? (
                        <Button disabled className='flex justify-center items-center w-2/6 bg-white cursor-not-allowed'>
                            <ThreeDots color='#000000' />
                        </Button>

                    ) : (
                        <Button className='w-2/6 bg-white text-black hover:bg-neutral-900 hover:text-white'
                            onClick={() => requestDownload()}>
                            Download
                        </Button>
                    )}
                </div>

            )}


        </main>

    )
}


