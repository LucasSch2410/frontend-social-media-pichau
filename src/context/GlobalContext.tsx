import React, {
    ReactNode,
    useState,
    createContext,
    useContext,
    useEffect,
} from "react";

import Cookies from "js-cookie";
import { api } from "../services/api";
import { iLogin, Login } from "../services/Login";
import { useNavigate } from "react-router-dom";
import handleApiError from '../components/Error/handleApiError'

interface iGlobalContext {
    user: iUser | null;
    setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
    dbxToken: string | null;
    setDbxToken: React.Dispatch<React.SetStateAction<string>>;
    pageLoading: boolean;
    setPageLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sheetLoading: iSheetLoading;
    setSheetLoading: React.Dispatch<React.SetStateAction<iSheetLoading>>;
    submitLogin({ username, password }: iLogin): void;
    buttonLoading: boolean;
    setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

interface iSheetLoading {
    button: boolean;
    download: boolean;
    images: boolean;
}

interface iGlobalContextProps {
    children: ReactNode;
}

export interface iUser {
    id: any;
    username: string;
}

export const GlobalContext = createContext<iGlobalContext>({} as iGlobalContext);

export const GlobalProvider = ({ children }: iGlobalContextProps) => {
    const [user, setUser] = useState<iUser | null>(null);
    const [dbxToken, setDbxToken] = useState('');
    const [pageLoading, setPageLoading] = useState(false)
    const [sheetLoading, setSheetLoading] = useState<iSheetLoading>({button: false, download:false, images: false});
    const [buttonLoading, setButtonLoading] = useState(false);
    
    const navigate = useNavigate()

    useEffect(() => {
        async function load(){
            const token = Cookies.get('jwt_token')
            const dbx_token = Cookies.get('dbx_token')
            const user_id = Cookies.get('user_id')

            if (token && dbx_token) {
                try {
                    setPageLoading(true)
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                    const { data } = await api.get<iUser>(`/users/${user_id}`)
                    setUser(data)
                    setDbxToken(dbx_token)

                    navigate("/home", { replace: true })
                } catch (error) {
                    handleApiError(error, "Não foi possível acessar!")
                } finally {
                    setPageLoading(false)
                }
            }
        }
        load()
    }, [navigate])

    const submitLogin = async ({ username, password }: iLogin) => {
        const userLogin = { username, password };
        try {
            setButtonLoading(true);
            const data = await Login(userLogin);

            setUser(data.user);
            setDbxToken(data.dropbox_token);

            api.defaults.headers.common.authorization = `Bearer ${data.access_token}`;
            Cookies.set('jwt_token', data.access_token, { expires: 0.1 })
            Cookies.set('dbx_token', data.dropbox_token, { expires: 0.1 })
            Cookies.set('user_id', data.user.id, { expires: 0.1})

            navigate("/home")
        } catch (error: any) {
            handleApiError(error, "Não foi possível entrar!")
        } finally {
            setButtonLoading(false);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                user,
                setUser,
                dbxToken,
                setDbxToken,
                pageLoading,
                setPageLoading,
                buttonLoading,
                setButtonLoading,
                sheetLoading,
                setSheetLoading,
                submitLogin,
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobalContext = (): iGlobalContext => {
    const context = useContext(GlobalContext);

    return context;
};