import {Dispatch} from "redux";
import {registrationAPI} from "../../n2-features/f1-auth/a2-register/RegistrationAPI";

type InitialStateType = typeof initialState

export const initialState = {
    error: null as null | string,
    isRegistered: false
}
export const registrationReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case  'REGISTRATION-USER':
            return {...state, isRegistered: action.isRegistered}

        case  'SET-ERROR-MESSAGE':
            return {...state, error: action.error}

        default:
            return state
    }
}

export const registrationAC = (isRegistered: boolean) => ({type: 'REGISTRATION-USER', isRegistered} as const)
export const setErrorMessageAC = (error: string | null) => ({type: 'SET-ERROR-MESSAGE', error} as const)

export const registrationTC = (email: string, password: string) => {
    return async (dispatch: Dispatch) => {
        try {
            const response = await registrationAPI.registration(email, password)
            dispatch(registrationAC(true))

        } catch (e: any) {
            const errorMessage = e.response ? e.response.data.error :
                (e.message + ', more details in the the console')
            dispatch(setErrorMessageAC(errorMessage))
            dispatch(registrationAC(false))
        }
    }
}
export type RegistrationType = ReturnType<typeof registrationAC>
export type SetErrorMessageType = ReturnType<typeof setErrorMessageAC>

type ActionType = RegistrationType | SetErrorMessageType