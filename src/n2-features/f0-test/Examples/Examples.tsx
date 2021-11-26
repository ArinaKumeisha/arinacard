import React, {ChangeEvent, useState} from 'react';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import s from './Examples.module.scss'
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import SuperCheckbox from "../../../n1-main/m1-ui/common/c3-SuperCheckbox/SuperCheckbox";
import SuperEditableSpan from "../../../n1-main/m1-ui/common/c4-SuperEditableSpan/SuperEditableSpan";
import SuperSelect from "../../../n1-main/m1-ui/common/c5-SuperSelect/SuperSelect";
import SuperRadio from "../../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio";
import {TestForReducer} from "../TestForReducer/TestForReducer";

export const Examples = () => {
    const [text, setText] = useState<string>('') // for SuperInputText
    const [checked, setChecked] = useState<boolean>(false) // for SuperCheckbox
    const [value, setValue] = useState<string>('') // for SuperEditableSpan
    const arr = ['x', 'y', 'z'] // for SuperSelect & SuperRadio
    const [valueForSsSr, onChangeOption] = useState(arr[1]) // for SuperSelect & SuperRadio

    const error = text ? '' : 'error'

    const showAlert = () => { // for SuperButton
        if (error) {
            alert('введите текст...')
        } else {
            alert(text) // если нет ошибки показать текст
        }
    }


    const testOnChange = (e: ChangeEvent<HTMLInputElement>) => setChecked(e.currentTarget.checked)

    return (
        <div className={s.examples}>
            <TestForReducer />
            <h1>This is examples of common components.</h1>
            <hr/>
            <div className={s.column}>
                <h2>с1-SuperInputText:</h2>
                <div className={s.inputContainer}>
                    <SuperInputText
                        value={text}
                        onChangeText={setText}
                        onEnter={showAlert}
                        error={error}
                        spanClassName={s.testSpanError}
                    />
                </div>
                <div>
                    <SuperInputText
                        className={s.blue} // проверьте, работает ли смешивание классов
                    />
                </div>
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <h2>с2-SuperButton:</h2>
                <SuperButton className={s.superButton}>
                    default
                </SuperButton>
                <SuperButton
                    red // пропсу с булевым значением не обязательно указывать true
                    onClick={showAlert}
                    className={s.superButton}
                >
                    delete {/*// название кнопки попадёт в children*/}
                </SuperButton>
                <SuperButton disabled className={s.superButton}>
                    disabled
                </SuperButton>
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <h2>с3-SuperCheckbox:</h2>
                <SuperCheckbox
                    checked={checked}
                    onChangeChecked={setChecked}
                >
                    some text {/*// этот текст попадёт в children*/}
                </SuperCheckbox>

                {/*// onChange тоже должен работать*/}
                <SuperCheckbox checked={checked} onChange={testOnChange}/>
            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div>
                <h2>с4-SuperEditableSpan:</h2>
                <div className={s.SuperEditableSpanContainer}>
                    <SuperEditableSpan
                        value={value}
                        onChangeText={setValue}
                        spanProps={{children: value ? undefined : 'enter text...'}}
                    />
                </div>

            </div>
            <hr/>
            {/*----------------------------------------------------*/}
            <div className={s.column}>
                <h2>с5-SuperSelect and SuperRadio:</h2>
                <SuperSelect
                    options={arr}
                    value={valueForSsSr}
                    onChangeOption={onChangeOption}
                />
                <div className={s.radioContainer}>
                    <SuperRadio
                        options={arr}
                        value={valueForSsSr}
                        onChangeOption={onChangeOption}
                    />
                </div>

            </div>
        </div>
    );
}