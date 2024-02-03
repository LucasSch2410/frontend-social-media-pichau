import { api } from "../../services/api"
import { toast } from "react-toastify"
import handleApiError from "../Error/handleApiError"
import { useState } from "react"
import Button from "../Button/Button"

export default function Templates() {

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
        for (const key in file) {
            const value = (file as any)[key]

            if (value != null){
                const formData = new FormData()
                formData.append('file', value.files[0])

                await api.put(`/images/templates/upload/${value.name}`, formData)
                .then(() => {
                    toast.success(`Template ${value.name} alterado!`)
                })
                .catch((error: any) => (
                    handleApiError(error, `Erro ao trocar o template ${value.name}.`)
                ))
                .finally(() => {
                    setUrl((prevUrl) => ({...prevUrl, [value.name]: null}))
                    setFile((prevFile) => ({...prevFile, [value.name]: null}))
                })
            }
        }
    }

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
                                <p className="text-white text-center">preview</p>
                            </a>
                        ) : (
                            <a href="https://backend-social-media-pichau.onrender.com/images/templates/stories" target="_blank">
                                <img className="relative w-40" src="https://backend-social-media-pichau.onrender.com/images/templates/stories" alt=""/>
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
                                <p className="text-white text-center">preview</p>
                            </a>
                        ) : (
                            <a href="https://backend-social-media-pichau.onrender.com/images/templates/push" target="_blank">
                                <img className="relative w-40" src="https://backend-social-media-pichau.onrender.com/images/templates/push" alt=""/>
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
                                <p className="text-white text-center">preview</p>
                            </a>
                        ) : (
                            <a href="https://backend-social-media-pichau.onrender.com/images/templates/post" target="_blank">
                                <img className="relative w-40" src="https://backend-social-media-pichau.onrender.com/images/templates/post" alt=""/>
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
                                <p className="text-white text-center">preview</p>
                            </a>
                        ) : (
                            <a href="https://backend-social-media-pichau.onrender.com/images/templates/wide" target="_blank">
                                <img className="relative w-40" src="https://backend-social-media-pichau.onrender.com/images/templates/wide" alt=""/>
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

    {(url.stories || url.post || url.push || url.wide != null) &&                 
        <div className="flex justify-center">
            <Button className="text-black bg-white hover:bg-black hover:text-white" onClick={() => sendFiles()}>
                Trocar templates
            </Button>
        </div>
    }
    
    </div>
)}
