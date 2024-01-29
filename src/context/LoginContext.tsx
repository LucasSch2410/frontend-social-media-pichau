import { createContext, useContext, useState} from "react"
import { api } from "../services/api.js"
import { toast } from 'react-toastify'
const AuthContext = createContext({})


function AuthProvider({ children } : any){

    const [data, setData] = useState({})

    async function signIn({username, password}: string){

        let formData = new FormData()

        formData.append('username', username)
        formData.append('password', password)

        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        }

        try{
            const response = await api.post("/login", formData, config)
            const { username, access_token, dropbox_token, id } = response.data

            api.defaults.headers.authorization = `Bearer ${access_token}`

            setData({username, dropbox_token, id})
        }
        catch (error){
            if (error.response){
                toast.error(error.response.data.detail)
            } else {
                toast.error('Não foi possível entrar.')
            }
        }
    }

    return(
        <AuthContext.Provider value={{signIn, user: data.username, id: data.id, dropbox_token: data.dropbox_token}}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }