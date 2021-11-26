import React, {useState} from 'react';
import {registrationTC, setErrorMessageAC} from "../../../n1-main/m2-bll/registrationReducer";
import {useDispatch, useSelector} from "react-redux";
import {Registration} from "./Registration";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";

export const RegistrationContainer = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')

    const dispatch = useDispatch()
    const isRegistered = useSelector<AppStoreType, boolean>(state => state.registration.isRegistered)

    const register = () => {
        dispatch(setErrorMessageAC(null))
        if (password === repeatPassword) {
            dispatch(registrationTC(email, password))
        } else {
            dispatch(setErrorMessageAC('password mismatch'))
        }
        setEmail('')
        setPassword('')
        setRepeatPassword('')
    }

    if (isRegistered) {
        return <Redirect to={'/login'}/>
    }

    return (
        <div>
            <Registration
                email={email}
                setEmail={setEmail}
                password={password}
                repeatPassword={repeatPassword}
                setPassword={setPassword}
                setRepeatPassword={setRepeatPassword}
                register={register}
            />
        </div>
    );
};
