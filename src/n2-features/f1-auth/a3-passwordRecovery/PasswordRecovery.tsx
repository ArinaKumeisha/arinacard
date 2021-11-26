import React, {useState} from 'react';
import s from './PasswordRecovery.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {forgotPasswordTC} from "../../../n1-main/m2-bll/recovery-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export const PasswordRecovery = () => {
    const [email, setEmail] = useState<string>('')
    const dispatch = useDispatch()
    let infoText = useSelector<AppStoreType, string>(state => state.recoveryPassword.forgot.info)
    let errorText = useSelector<AppStoreType, string>(state => state.recoveryPassword.forgot.errorText)

    let statusText = ''
    let classColor = ''
    if (infoText !== '') {
        statusText = infoText + ' You need to click recover link in you email.'
        classColor = s.green
    } else {
        statusText = errorText
        classColor = s.red
    }
    const onClickHandler = () => {
        dispatch(forgotPasswordTC(email))
    }

    return (
        <div className={s.passwordRecovery}>
            <h1>This page will recover you password.</h1>
            <p className={s.element}>Please enter you email to input bellow and click recover.</p>
            <div className={s.element}>
                <label>
                    Your email:
                    <SuperInputText value={email} onChangeText={setEmail} className={s.input}/>
                </label>
            </div>
            <div className={s.element}><SuperButton onClick={onClickHandler} >Recover</SuperButton></div>
            <div className={classColor}>{statusText}</div>
        </div>

    );
}