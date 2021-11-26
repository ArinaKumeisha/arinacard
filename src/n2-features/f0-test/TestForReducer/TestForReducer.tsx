import React from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {setTestValueAC} from "../../../n1-main/m2-bll/test-reducer";
import s from './TestForReducer.module.scss'

export const TestForReducer = () => {

    const dispatch = useDispatch()
    let reducerValue = useSelector<AppStoreType, string>(state => state.testReducer.testValue)

    return <div className={s.testForReducer}>
        <div>Hi, I am test for reducer. I will set 'test value' to state and will show it at the input, if you click the
            button.
        </div>
        <div>
            <SuperInputText value={reducerValue}/>
            <SuperButton onClick={() => {dispatch(setTestValueAC('test value'))}}>Click Me</SuperButton>
        </div>
    </div>


}