import React, {
    ReactNode,
    useEffect,
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
    loading: boolean;
    buttonLoading: boolean;
    setButtonLoading: React.Dispatch<React.SetStateAction<boolean>>;
    sheetLoading: iSheetLoading;
    setSheetLoading: React.Dispatch<React.SetStateAction<iSheetLoading>>;
    clearStorage: () => void;
    submitLogin({ username, password }: iLogin): void;
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

export const GlobalContext = createContext<iGlobalContext>(
    {} as iGlobalContext
);

export const GlobalProvider = ({ children }: iGlobalContextProps) => {
    const [user, setUser] = useState<iUser | null>(null);
    const [dbxToken, setDbxToken] = useState('');
    const [loading, setLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [sheetLoading, setSheetLoading] = useState<iSheetLoading>({button: false, download:false, images: false});
    const navigate = useNavigate()

    useEffect(() => {
        async function loadUser() {
            const id = localStorage.getItem("@id");
            const token = localStorage.getItem("@token");
            if (id && token) {
                try {
                    setLoading(true);
                    api.defaults.headers.common.authorization = `Bearer ${token}`;
                    const { data } = await api.get<iUser>(`/users/${id}`);
                    setUser(data);
                } catch (error) {
                    console.error(error);
                    clearStorage();
                } finally {
                    setLoading(false);
                }
            }
        }
        loadUser();
    });

    const clearStorage = () => {
        localStorage.clear()
        setUser(null);
    };

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
                loading,
                buttonLoading,
                setButtonLoading,
                sheetLoading,
                setSheetLoading,
                clearStorage,
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