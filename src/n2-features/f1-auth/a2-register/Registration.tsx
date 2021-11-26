import React, {ChangeEvent} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from '../../../n1-main/m2-bll/store'
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import s from "../../f0-test/Examples/Examples.module.scss";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './Registration.module.scss'
import {setErrorMessageAC} from "../../../n1-main/m2-bll/registrationReducer";


type PropsType = {
    email: string
    setEmail: (email: string) => void
    password: string
    setPassword: (password: string) => void
    repeatPassword: string
    setRepeatPassword: (repeatPassword: string) => void
    register: () => void
}
export const Registration = (props: PropsType) => {
    const {
        email,
        setEmail,
        password,
        setPassword,
        repeatPassword,
        setRepeatPassword,
        register
    } = props

    const error = useSelector<AppStoreType, null | string>(state => state.registration.error)
    const dispatch = useDispatch()

    const emailHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        dispatch(setErrorMessageAC(''))
    }

    const setPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        dispatch(setErrorMessageAC(''))
    }
    const setRepeatPasswordHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRepeatPassword(e.currentTarget.value)
        dispatch(setErrorMessageAC(''))
    }

    return (

        <div className={style.block}>
            <div className={style.form}>
                <p className={style.text}>Registration</p>

                <label>
                    <SuperInputText
                        value={email}
                        onChange={emailHandler}
                        className={`${s.testSpanError}${style.placeholder}`}
                        placeholder={'enter your email'}
                    />
                </label>

                <label>
                    <SuperInputText
                        type={'password'}
                        value={password}
                        onChange={setPasswordHandler}
                        className={s.testSpanError}
                        placeholder={'enter  your password'}
                    />
                </label>

                <label>
                    <SuperInputText
                        type={'password'}
                        value={repeatPassword}
                        onChange={setRepeatPasswordHandler}
                        className={s.testSpanError}
                        placeholder={'repeat  your password'}
                    />
                </label>

                {error !== null && <div className={style.error}>{error}</div>}

                <div>
                    <SuperButton onClick={register} className={s.superButton}>
                        registration
                    </SuperButton>
                </div>
            </div>
        </div>
    );
}