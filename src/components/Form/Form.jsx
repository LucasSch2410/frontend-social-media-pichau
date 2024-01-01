import { useForm } from 'react-hook-form';
import Button from '../../components/Button/Button'
import axios from 'axios';
import { useState } from 'react';

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [sheet, setSheet] = useState(null)
    const [images, setImages] = useState([])

    const getSheet = () => {
        axios
            .get('http://localhost:3000/sheet?sheet_url=https://docs.google.com/spreadsheets/d/1vqH68vivryDylooOunH2qSYsUkfQ1-q-sOn6PSjOkBA/edit#gid=758726048')
            .then(res => (
                setSheet(res.data)
            ))
            .catch((err) => console.log(err))
    }

    const downloadImages = (e) => {
        Object.values(sheet).map((product, index) => 
        (
            axios
                .get(`http://localhost:3000/instagram?product=${product}`)
                .then((res) => (
                    setImages( arr => [...arr, `${res.data}`])
                ))
        ))
    }

    return (
        <div className='bg-zinc-800 text-white'>
                {sheet ? 
                (
                <div className='flex flex-col'>
                    <div className='overflow-y-scroll h-40 px-5 mx-auto'>
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
                        <input name="firstName" {...register("firstName", { required: true })} onChange={handleSubmit} />
                        <Button className='mt-5' type='submit'>Enviar</Button>
                    </form>
                    <p>Click the button to fetch API data.</p>
                </>
                 )}
                {
                    images ?
                    (
                       <div className='flex flex-wrap max-w-screen-xl gap-5'>
                        {Object.values(images).map(
                            (e) =>
                            <div className=''>
                                <img className='w-60 flex-shrink-0' src={`data:image/jpeg;base64, ${e}`} alt="" />
                            </div>
                        )}
                       </div>
                    )
                     : (
                        <p>Download the images</p>
                     )
                }
        </div>
    );
}

