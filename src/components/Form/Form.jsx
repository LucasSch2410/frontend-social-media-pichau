import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button'
import Cookies from 'js-cookie'
import axios from 'axios';
import { api } from '../../services/api';
import { useState } from 'react';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [sheet, setSheet] = useState(null)
    const [images, setImages] = useState([])

    const getSheet = () => {
        api
            .get('/sheet?sheet_url=https://docs.google.com/spreadsheets/d/1vqH68vivryDylooOunH2qSYsUkfQ1-q-sOn6PSjOkBA/edit#gid=758726048')
            .then(res => (
                setSheet(res.data)
            ))
            .catch((err) => console.log(err))
    }

    const downloadImages =  (e) => {
        Object.values(sheet).forEach(async (product) => {
            await api.post(`/instagram`, {
              product: `${product}`,
              access_token: Cookies.get('access_token'),
            })
          })
        }

    return (
        <div className='bg-zinc-800 text-white'>
                {sheet ? 
                (
                <div className='flex flex-col'>
                    <div className='overflow-y-auto h-40 px-5 mx-auto'>
                        {Object.values(sheet).map((product, index) => (
                            <div key={index} className='py-2'>{index} : {product}</div>
                            ))}
                    </div>
                    <Button className='my-10 mx-auto' type='submit' onClick={downloadImages}>Download</Button>
                </div>
                )
                 : (
                <>
                    <form className='flex flex-col text-black' onSubmit={handleSubmit(getSheet)}>
                        <input name="sheet_url" {...register("sheet_url", { required: true })} onChange={handleSubmit} />
                        <Button className='mt-5' type='submit'>Enviar</Button>
                    </form>
                    <p>Click the button to fetch API data.</p>
                </>
                 )}
        </div>
    );
}

