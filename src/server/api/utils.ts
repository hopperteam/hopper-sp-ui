import {Config} from './../../config';
import axios, {AxiosInstance} from 'axios';

function initAPI(): AxiosInstance {
    return axios.create({
        baseURL: Config.instance.backendUrl,
        timeout: 5000,
    });
}

export async function getWithToken(url: string, token: string): Promise<any> {
    const api = initAPI();
    const {data} = await api.get(url, {
        params: {
            "token": token,
        }
    });

    return data;
}

export async function post(url: string, body: any): Promise<any> {
    const api = initAPI();
    const {data} = await api.post(url, body);

    return data;
}

export async function postWithToken(url: string, body: any, token: string): Promise<any> {
    const api = initAPI();
    const {data} = await api.post(url, body, {
        params: {
            "token": token
        }
    });

    return data;
}

export async function putWithToken(url: string, body: any, token: string): Promise<any> {
    const api = initAPI();
    const {data} = await api.put(url, body, {
        params: {
            "token": token
        }
    });

    return data;
}