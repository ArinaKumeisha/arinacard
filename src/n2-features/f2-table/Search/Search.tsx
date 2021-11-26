import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from "react-redux";
import {setCardsCountAC, setSearchPackNameAC} from "../../../n1-main/m2-bll/table-reducer";
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import style from './Search.module.css'
import PriceRange from "../Range/Range";

const Search = () => {
    const dispatch = useDispatch()
    const [state, setState] = useState('')

    const [values, setValues] = useState([0, 100]);
    const currentHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setState(e.currentTarget.value)
    }

    const onClickHandler = () => {
        dispatch(setSearchPackNameAC(state))
        dispatch(setCardsCountAC(values[0], values[1]))
        setState('')
    }

    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickHandler()
        }
    }

    return (
        <div className={style.block}>

            <SuperInputText
                value={state}
                onChange={currentHandler}
                onKeyPress={onKeyPressHandler}
                placeholder={'enter name'}/>

            <PriceRange
                values={values}
                setValues={setValues}/>

            <SuperButton
                onClick={onClickHandler}
                className={style.search}>Search
            </SuperButton>
        </div>
    );
}

export default Search;