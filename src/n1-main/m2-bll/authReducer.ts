import {Dispatch} from 'redux'
import {authAPI, AuthLoginType} from "../../n2-features/f1-auth/a1-login/AuthApi";
import {setProfile, SetProfileType} from "./profileReducer";


let initialState = {
    isLoggedIn: false,
    error: null,
    isInitilize: false
}


type InitialStateType = {
    isLoggedIn: boolean
    error: string | null
    isInitilize: boolean
}


export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'login/SET-IS-LOGGED-IN':
            return {...state, isLoggedIn: action.value}
        case 'login/SET-IS-ERROR':
            return {...state, error: action.error}
        case 'login/SET-IS-INITIALIZE':
            return {...state, isInitilize: action.isInitilize}
        default:
            return {...state}
    }

}


//ActionsCreators

export const setIsLoggedId = (value: boolean) => {
    return ({type: 'login/SET-IS-LOGGED-IN', value} as const)
}
export const setIsInitialize = (isInitilize: boolean) => {
    return ({type: 'login/SET-IS-INITIALIZE', isInitilize} as const)
}

export const setIsError = (error: string) => {
    return ({type: 'login/SET-IS-ERROR', error} as const)
}

//Thunks
export const LoginTC = (email: string, password: string, rememberMe: boolean) => (dispatch: Dispatch<ActionsType | SetProfileType>) => {
    authAPI.login({email, password, rememberMe}).then(res => {
            dispatch(setIsLoggedId(true))
            dispatch(setProfile(res.data))

        }
    ).catch(e => {
            e.response ? dispatch(setIsError(e.response.data.error))
                : dispatch(setIsError(e.message + ', more details in the console'));
        }
    )
}

export const InitializeTC = () => (dispatch: Dispatch) => {
    authAPI.me().then(res => {
            dispatch(setIsLoggedId(true))
            dispatch(setProfile(res.data))
        }
    ).catch(e => {
            dispatch(setIsLoggedId(false))
        }
    ).finally(() => {
        dispatch(setIsInitialize(true))
    })
}
export const LogoutTC = () => (dispatch: Dispatch) => {
    authAPI.logout().then(res => {
            dispatch(setIsLoggedId(false))

        }
    ).catch(e => {
            e.response ? dispatch(setIsError(e.response.data.error))
                : dispatch(setIsError(e.message + ', more details in the console'));
        }
    )
}


//Types

type SetIsLoggedIdType = ReturnType<typeof setIsLoggedId>
type SetIsErrorType = ReturnType<typeof setIsError>
type SetIsInitializeType = ReturnType<typeof setIsInitialize>

type ActionsType = SetIsLoggedIdType | SetIsErrorType | SetIsInitializeType