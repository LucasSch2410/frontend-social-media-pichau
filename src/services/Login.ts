import { iUser } from "../context/GlobalContext";
import { api } from "./api";

export interface iLogin {
    username: string;
    password: string;
}

export interface iDataLogin {
    user: iUser;
    access_token: string;
    dropbox_token: string;
}

export const Login = async (userLogin: iLogin): Promise<iDataLogin> => {
    let formData = new FormData();

    formData.append('username', userLogin.username);
    formData.append('password', userLogin.password);

    const config = {
        headers: { 'content-type': 'multipart/form-data'}
    };

    const { data } = await api.post<iDataLogin>("/login", userLogin, config);

    console.log(data)

    return data;
};