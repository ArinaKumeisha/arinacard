import React from 'react';
import {CardsPackType, CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import s from './TableContent.module.scss'
import {TableHeaderModelType} from "../Table";
import {v1} from "uuid";
import SortPacks from "../SortPacks/SortPacks";

type BodyType = {
    id: string,
    element: Array<string | number | JSX.Element>
}
type PropsType = {
    headerModel: TableHeaderModelType
    bodyModel: Array<BodyType>
}


export const TableContent: React.FC<PropsType> = (props) => {
    const userIdAfterRadio = useSelector<AppStoreType, string>(state => state.table.userIdAfterRadio)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    return (
        <div className={s.tableContent}>
            <div className={s.tableHeader}>
                {props.headerModel.map(m => <div key={m.id}>
                    {m.element === 'updated' ? <SortPacks/> : m.element}
                </div>)}
            </div>
            <div className={s.tableBody}>
                {props.bodyModel.map(e => {
                    return <div className={s.bodyModel} key={e.id}>{
                        e.element.map(e => {
                            return <div key={v1()}>{e}</div>
                        })
                    }</div>
                })
                }

            </div>
        </div>
    )
}