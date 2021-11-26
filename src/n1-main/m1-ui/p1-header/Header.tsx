import React from 'react';
import {NavLink} from "react-router-dom";
import s from './Header.module.scss'
import {useDispatch} from "react-redux";
import {LogoutTC} from "../../m2-bll/authReducer";

export const Header = () => {
    const dispatch = useDispatch()
    const logout = () => {
        dispatch(LogoutTC())
    }

    return (
        <div className={s.header}>
            <NavLink to={'/profile'}><div className={s.logo}>BrightCards</div></NavLink>
            <div className={s.links}>
                <NavLink className={s.item} to={'/table'}>Table</NavLink>
                <NavLink className={s.item} to={'/login'}>Login</NavLink>
                <NavLink className={s.item} to={'/registration'}>Registration</NavLink>
                <NavLink className={s.item} to={'/profile'}>Profile</NavLink>
                <NavLink className={s.item} to={'/passwordrecovery'}>PasswordRecovery</NavLink>
                <NavLink className={s.item} to={'/tests'}>Tests</NavLink>
                <a className={s.link} onClick={logout}>Log out</a>
            </div>

        </div>
    );
}