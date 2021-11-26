import React from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './SortPacks.module.css';
import {sortPacksAC} from "../../../n1-main/m2-bll/table-reducer";
import {useDispatch} from "react-redux";

const SortPacks = () => {
    const dispatch = useDispatch()


    const upperSortHandler = () => {
        dispatch(sortPacksAC('0created'))
    }
    const lowerSortHandler = () => {
        dispatch(sortPacksAC('1created'))
    }
    return (
        <div className={style.container}>
            <span className={style.elem}>updated  </span>
            <div className={style.block}>
                <SuperButton className={style.btn} onClick={upperSortHandler}>
                    ^
                </SuperButton>
                <SuperButton className={style.btn} onClick={lowerSortHandler}>
                    v
                </SuperButton>
            </div>

        </div>
    );
};

export default SortPacks;