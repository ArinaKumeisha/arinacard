import React, {FormEvent, useState} from 'react';
import {Login} from "./Login";
import {authAPI} from "./AuthApi";
import {LoginTC} from "../../../n1-main/m2-bll/authReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {Redirect} from "react-router-dom";


export const LoginContainer: React.FC = () => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [rememberMe, setRememberMe] = useState<boolean>(false)
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStoreType, boolean>(state => state.auth.isLoggedIn)

    const LoggedIn = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        dispatch(LoginTC(email, password, rememberMe));
        setEmail('');
        setPassword('');

    }
    if (isLoggedIn) {
        return <Redirect to='/profile'/>
    }
    return <Login email={email} password={password} rememberMe={rememberMe}
                  setEmail={setEmail} setPassword={setPassword} setRememberMe={setRememberMe} LoggedIn={LoggedIn}/>
}