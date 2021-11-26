import React from 'react';
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