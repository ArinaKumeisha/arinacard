import React, {useState} from 'react';
import s from './PasswordNew.module.scss'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setNewPasswordTC} from "../../../n1-main/m2-bll/recovery-reducer";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

export const PasswordNew = () => {
    // test
    const [newPassword, setNewPassword] = useState<string>('')
    const [newPassword2, setNewPassword2] = useState<string>('')
    let infoText = useSelector<AppStoreType, string>(state => state.recoveryPassword.setNew.info)
    let errorText = useSelector<AppStoreType, string>(state => state.recoveryPassword.setNew.errorText)
    const dispatch = useDispatch()
    const [matchStatus, setMatchStatus] = useState('')

    const {token} = useParams<{ token: string }>();


    const onClickHandler = () => {
        if (newPassword !== newPassword2) {
            setMatchStatus('passwords do not match')
        } else {
            setMatchStatus('')
            dispatch(setNewPasswordTC(newPassword, token))
        }
    }

    let statusText = ''
    let classColor = ''
    if (infoText !== '') {
        statusText = infoText
        classColor = s.green
    } else {
        statusText = errorText
        classColor = s.red
    }

    return (
        <div className={s.passwordNew}>
            <h1>This page for changing you password.</h1>
            <p className={s.element}>It will take token from address link and new password from inputs and then new
                password will be set to you.</p>
            <div className={s.element}>
                <label className={s.oneSizeEl}>
                    <div>New password:</div>
                    <SuperInputText value={newPassword} onChangeText={setNewPassword} type={'password'}
                                    className={s.input}/>
                </label>
            </div>
            <div className={s.element}>
                <label className={s.oneSizeEl}>
                    <div>Password confirmation:</div>
                    <SuperInputText value={newPassword2} onChangeText={setNewPassword2} type={'password'}
                                    className={s.input}/>
                </label>
            </div>
            <div className={s.element}><SuperButton onClick={onClickHandler} className={s.button}>Change
                password</SuperButton></div>
            <div className={s.red}>{matchStatus}</div>
            <div className={classColor}>{statusText}</div>
        </div>
    )
}