import {cardsAPI} from "./api/cards-api";
import {Dispatch} from "redux";

const initialState = {
    forgot: {
        info: '',
        errorText: ''
    },
    setNew: {
        info: '',
        errorText: ''
    }
}

export const recoveryReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "FORGOT-PASS/SHOW-INFO-AND-ERROR":
            return {...state, forgot: {info: action.forgot.infoText, errorText: action.forgot.errorText}}
        case "RESTORE-PASS/SHOW-INFO-AND-ERROR":
            return {...state, setNew: {info: action.setNew.infoText, errorText: action.setNew.errorText}}
        default:
            return state
    }
}

export const forgotShowInfoAndErrorAC = (infoText: string, errorText: string) =>
    ({type: 'FORGOT-PASS/SHOW-INFO-AND-ERROR', forgot: {infoText, errorText}} as const)
export const setNewShowInfoAndErrorAC = (infoText: string, errorText: string) =>
    ({type: 'RESTORE-PASS/SHOW-INFO-AND-ERROR', setNew: {infoText, errorText}} as const)

export const forgotPasswordTC = (email: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.recoveryPassword(email)
            .then(res => {
                dispatch(forgotShowInfoAndErrorAC(res.data.info, ''))
            })
            .catch(res => {
                dispatch(forgotShowInfoAndErrorAC('', res.response.data.error))
            })
    }
}

export const setNewPasswordTC = (password: string, resetPasswordToken: string) => {
    return (dispatch: Dispatch<ActionType>) => {
        cardsAPI.changePassword(password, resetPasswordToken)
            .then(res => {
                dispatch(setNewShowInfoAndErrorAC(res.data.info, ''))
            })
            .catch(res => {
                dispatch(setNewShowInfoAndErrorAC('', res.response.data.error))
            })
    }
}

type InitialStateType = {
    forgot: {
        info: string
        errorText: string
    }
    setNew: {
        info: string
        errorText: string
    }

}
type ActionType = ReturnType<typeof forgotShowInfoAndErrorAC> | ReturnType<typeof setNewShowInfoAndErrorAC>
