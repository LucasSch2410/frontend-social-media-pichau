import { createContext, useContext, useState} from "react"
import api from "../services/api"
import { toast } from 'react-toastify'

interface SignInData {
    username: string;
    password: string;
}

interface UserData {
    username: string;
    id: string;
    dropbox_token: string;
}

interface AuthContextProps {
    signIn: (data: SignInData) => Promise<void>;
    username: string;
    id: string;
    dropbox_token: string;
}
  
const AuthContext = createContext({} as AuthContextProps);
  

function AuthProvider({ children }: any){

    const [data, setData] = useState<UserData>({ username: '', id: '', dropbox_token: '' });

    async function signIn({ username, password }: SignInData){
        let formData = new FormData();

        formData.append('username', username);
        formData.append('password', password);

        const config = {
            headers: { 'content-type': 'multipart/form-data'}
        };

        try{
            const response = await api.post("/login", formData, config)
            const { username, access_token, dropbox_token, id } = response.data

            api.defaults.headers.authorization = `Bearer ${access_token}`

            setData({username, dropbox_token, id})
        }
        catch (error: any){
            if (error.response){
                toast.error(error.response.data.detail)
            } else {
                toast.error('Não foi possível entrar.')
            }
        }
    }

    return(
        <AuthContext.Provider value={{signIn, username: data.username, id: data.id, dropbox_token: data.dropbox_token}}>
            { children }
        </AuthContext.Provider>
    )
}

function useAuth() {
    const context = useContext(AuthContext)
    return context
}

export { AuthProvider, useAuth }