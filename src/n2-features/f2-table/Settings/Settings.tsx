import React, {ChangeEvent} from 'react';
import s from './Settings.module.scss';
import SuperInputText from "../../../n1-main/m1-ui/common/c1-SuperInputText/SuperInputText";
import SuperRadio from "../../../n1-main/m1-ui/common/c6-SuperRadio/SuperRadio";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";

type PropsType = {
    setPageCountHandler: (e: ChangeEvent<HTMLInputElement>) => void
    superRadioArr: Array<string>
    profileOrPublic: string
    onChangeProfileOrPublic: React.Dispatch<React.SetStateAction<string>>
}

export const Settings = (props: PropsType) => {
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()

    return <div className={s.settings}>
        <h2>Settings:</h2>
        <label className={s.settingEl}>
            How much Card Packs to show:
            <SuperInputText value={pageCount} onChange={props.setPageCountHandler} className={s.input}
                            type={"number"}/>
        </label>
        <label className={`${s.radioLabel} ${s.settingEl}`}>
            <div>Profile Card Packs only or Public:</div>
            <SuperRadio
                options={props.superRadioArr}
                value={props.profileOrPublic}
                onChangeOption={props.onChangeProfileOrPublic}
                className={s.radio}
            />
        </label>
    </div>
}