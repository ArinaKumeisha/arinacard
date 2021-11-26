import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

type ResponseType = {
    addedUser: {
        email: string
        isAdmin: boolean
        name: string
        publicCardPacksCount: number
        rememberMe: boolean
        updated: string
        _id: string
    }
}

export const registrationAPI = {
    registration(email: string, password: string ){
        return instance.post<ResponseType>(`auth/register`, { email, password} )
    }
}
