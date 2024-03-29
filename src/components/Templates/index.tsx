import { api } from "../../services/api"
import { toast } from "react-toastify"
import handleApiError from "../Error/handleApiError"
import { useEffect, useState } from "react"
import Button from "../Button/Button"
import { ThreeDots } from "react-loader-spinner"
import { useGlobalContext } from "../../context/GlobalContext"

export default function Templates() {
    const {
        user
    } = useGlobalContext();

    const [loading, setLoading] = useState(false)
    const [templates, setTemplates] = useState({
        stories: 'https://backend-social-media-pichau.onrender.com/images/static/templates/stories',
        push: 'https://backend-social-media-pichau.onrender.com/images/static/templates/push',
        post: 'https://backend-social-media-pichau.onrender.com/images/static/templates/post',
        wide: 'https://backend-social-media-pichau.onrender.com/images/static/templates/wide'
    })

    const [file, setFile] = useState({
        stories: null,
        push: null,
        post: null,
        wide: null
    })

    const [url, setUrl] = useState({
        stories: null,
        push: null,
        post: null,
        wide: null
    })
    
    async function fileSelected(event: any) {
        setFile((prevFile) => ({...prevFile, [event.target.name]: event.target}))
        setUrl((prevUrl) => ({...prevUrl, [event.target.name]: URL.createObjectURL(event.target.files[0])}));
    }

    async function sendFiles() {
        setLoading(true)
        try {
            for (const key in file) {
                const value = (file as any)[key]
    
                if (value != null){
                    const formData = new FormData()
                    formData.append('file', value.files[0])
    
                    await api.put(`/images/templates/upload/${user?.id}/${value.name}`, formData)
                    .then(() => {
                        toast.success(`Template ${value.name} alterado!`)
                    })
                    .catch((error: any) => {
                        setUrl((prevUrl) => ({...prevUrl, [value.name]: null}))
                        handleApiError(error, `Erro ao trocar o template ${value.name}.`)
                    })
                    .finally(() => {
                        setFile((prevFile) => ({...prevFile, [value.name]: null}))
                    })
                }
            }
        } finally {
            setLoading(false)
        }
    }

    async function get_templates() {
        for (const temp in templates){
            await api.get(`/images/templates/${user?.id}/${temp}`)
            .then((res) => {
                if (res.data != null) {
                    setTemplates((prevTemp) => ({...prevTemp, [temp]: res.data}))
                }
            })
            .catch((error) => {
                handleApiError(error, `Erro ao carregar os templates.`)
            })
        }
    }

    useEffect(()=>{
        get_templates()
    }, [])

    return (    
    
    <div className="lg:col-start-1 lg:col-span-4 lg:row-span-12 lg:row-start-1 lg:row-end-13 flex flex-col align-middle justify-center">
        <div className="flex flex-wrap items-center justify-center">
            <div className="w-2/6 flex-shrink-0 m-6 relative overflow-hidden bg-orange-500 rounded-lg max-w-xs shadow-lg hover:scale-110 transition">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{transform: 'scale(1.5)', opacity: 0.1}}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2}}></div>
                        { url.stories ? (
                            <a href={url.stories} target="_blank">         
                                <img className="relative w-40" src={url.stories} alt=""/>
                                {(file.stories == null && url.stories) ? "" : <p className="text-white text-center">preview</p>}
                            </a>
                        ) : (
                            <a href={templates.stories} target="_blank">
                                <img className="relative w-40" src={templates.stories} alt=""/>
                            </a> 
                        )}
                </div>
                <div className="relative text-white px-5 pb-5 mt-6">
                    <span className="block opacity-75 -mb-1">Template</span>
                    <div className="flex justify-between">
                    <span className="block font-semibold text-xl">Stories</span>
                    <span className="relative bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Alterar
                        <input type="file" name="stories" accept="image/*" className="absolute opacity-0" onChange={fileSelected}/>
                    </span>                
                    </div>
                </div>
            </div>

            <div className="w-2/6 flex-shrink-0 m-6 relative overflow-hidden bg-teal-500 rounded-lg max-w-xs shadow-lg hover:scale-110 transition">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{transform: 'scale(1.5)', opacity: 0.1}}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2}}></div>
                    { url.push ? (
                            <a href={url.push} target="_blank">         
                                <img className="relative w-40" src={url.push} alt=""/>
                                {(file.push == null && url.push) ? "" : <p className="text-white text-center">preview</p>}
                            </a>
                        ) : (
                            <a href={templates.push} target="_blank">
                                <img className="relative w-40" src={templates.push} alt=""/>
                            </a> 
                        )}
                </div>
                <div className="relative text-white px-5 pb-5 mt-6">
                    <span className="block opacity-75 -mb-1">Template</span>
                    <div className="flex justify-between">
                    <span className="block font-semibold text-xl">Push</span>
                    <span className="relative bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Alterar
                        <input type="file" name="push" accept="image/*" className="absolute opacity-0" onChange={fileSelected}/>
                    </span>
                    </div>
                </div>
            </div>

            <div className="w-2/6 flex-shrink-0 m-6 relative overflow-hidden bg-purple-500 rounded-lg max-w-xs shadow-lg hover:scale-110 transition">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{transform: 'scale(1.5)', opacity: 0.1}}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2}}></div>
                    { url.post ? (
                            <a href={url.post} target="_blank">         
                                <img className="relative w-40" src={url.post} alt=""/>
                                {(file.post == null && url.post) ? "" : <p className="text-white text-center">preview</p>}
                            </a>
                        ) : (
                            <a href={templates.post} target="_blank">
                                <img className="relative w-40" src={templates.post} alt=""/>
                            </a> 
                        )}
                </div>
                <div className="relative text-white px-5 pb-5 mt-6">
                    <span className="block opacity-75 -mb-1">Template</span>
                    <div className="flex justify-between">
                    <span className="block font-semibold text-xl">Post</span>
                    <span className="relative bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Alterar
                    <input type="file" name="post" accept="image/*" className="absolute opacity-0" onChange={fileSelected}/>
                    </span>
                    </div>
                </div>
            </div>

            <div className="w-2/6 flex-shrink-0 m-6 relative overflow-hidden bg-red-500 rounded-lg max-w-xs shadow-lg hover:scale-110 transition">
                <svg className="absolute bottom-0 left-0 mb-8" viewBox="0 0 375 283" fill="none" style={{transform: 'scale(1.5)', opacity: 0.1}}>
                    <rect x="159.52" y="175" width="152" height="152" rx="8" transform="rotate(-45 159.52 175)" fill="white"/>
                    <rect y="107.48" width="152" height="152" rx="8" transform="rotate(-45 0 107.48)" fill="white"/>
                </svg>
                <div className="relative pt-10 px-10 flex items-center justify-center">
                    <div className="block absolute w-48 h-48 bottom-0 left-0 -mb-24 ml-3" style={{background: 'radial-gradient(black, transparent 60%)', transform: 'rotate3d(0, 0, 1, 20deg) scale3d(1, 0.6, 1)', opacity: 0.2}}></div>
                    { url.wide ? (
                            <a href={url.wide} target="_blank">         
                                <img className="relative w-40" src={url.wide} alt=""/>
                                {(file.wide == null && url.wide) ? "" : <p className="text-white text-center">preview</p>}
                            </a>
                        ) : (
                            <a href={templates.wide} target="_blank">
                                <img className="relative w-40" src={templates.wide} alt=""/>
                            </a> 
                        )}
                </div>
                <div className="relative text-white px-5 pb-5 mt-6">
                    <span className="block opacity-75 -mb-1">Template</span>
                    <div className="flex justify-between">
                    <span className="block font-semibold text-xl">Wide</span>
                    <span className="relative bg-white rounded-full text-purple-500 text-xs font-bold px-3 py-2 leading-none flex items-center">Alterar
                    <input type="file" name="wide" accept="image/*" className="absolute opacity-0" onChange={fileSelected}/>
                    </span>
                    </div>
                </div>
            </div>
        </div>

    {(file.stories || file.post || file.push || file.wide != null) && (
        <div className="flex justify-center">
            {loading ? (
                <Button disabled className='flex justify-center items-center w-3/6 h-16 bg-white cursor-not-allowed'>
                    <ThreeDots height={25} color='#000000' />
                </Button>
            ) : (
                <Button className="text-black bg-white w-3/6 h-16 hover:bg-black hover:text-white" onClick={() => sendFiles()}>
                    Trocar templates
                </Button>
            )}
        </div>
    )}
    </div>
)}
