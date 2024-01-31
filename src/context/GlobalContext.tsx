import React, {
    ReactNode,
    useState,
    createContext,
    useContext,
} from "react";

import { api } from "../services/api";
import { toast } from "react-toastify";
import { iLogin, Login } from "../services/Login";
import { useNavigate } from "react-router-dom";

interface iGlobalContext {
    user: iUser | null;
    setUser: React.Dispatch<React.SetStateAction<iUser | null>>;
    dbxToken: string | null;
    setDbxToken: React.Dispatch<React.SetStateAction<string>>;
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
    const [sheetLoading, setSheetLoading] = useState<iSheetLoading>({button: false, download:false, images: false});
    const [buttonLoading, setButtonLoading] = useState(false);
    
    const navigate = useNavigate()

    const submitLogin = async ({ username, password }: iLogin) => {
        const userLogin = { username, password };
        try {
            setButtonLoading(true);
            const data = await Login(userLogin);

            setUser(data.user);
            setDbxToken(data.dropbox_token);

            api.defaults.headers.common.authorization = `Bearer ${data.access_token}`;

            navigate("/home")
        } catch (error) {
            toast.error("Usuário inválido!");
            console.log(error)
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