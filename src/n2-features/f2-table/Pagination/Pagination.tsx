import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import style from './Pagination.module.css'
import {getCardsPackTC, setCurrentPageAC} from "../../../n1-main/m2-bll/table-reducer";
import SuperButton from '../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton';

const Pagination = () => {
    let pageCount = useSelector<AppStoreType, any>(state => state.table.pageCount) // кол-во элементов на одной стр
    let cardPacksTotalCount = useSelector<AppStoreType, number>(state => state.table.cardPacksTotalCount)// кол-во колод
    let page = useSelector<AppStoreType, number>(state => state.table.page)// выбранная страница
    const dispatch = useDispatch()

    const currentPageHandler = (page: number) => {
        dispatch(setCurrentPageAC(page))
    }

    let pagesCount = Math.ceil(cardPacksTotalCount / pageCount); //количество страниц всех!!! до пагинатора
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }
    const portionSize = 10; // порция которая видна в пагинации
    const portionCount = Math.ceil(pagesCount / portionSize) // количество порций по 10 страниц

    const [portion, setPortion] = useState(1)
    const leftNumber = (portion - 1) * portionSize + 1
    const rightNumber = portion * portionSize
    const correctValue = pages.filter((p) => p ? p >= leftNumber && p <= rightNumber : '')

    return (
        <div className={style.pagination}> {portion > 1 &&
        <SuperButton onClick={() => {
            setPortion(portion - 1)
        }} className={style.btn}>Prev
        </SuperButton>
        }
            {correctValue.map(p => {
                return (
                    <span
                        key={p}
                        className={`${style.item} ${page === p ? style.select : style.item}`}
                        onClick={() => currentPageHandler(p)}>{p}
                    </span>
                )

            })}
            {portionCount > portion && <SuperButton onClick={() => {
                setPortion(portion + 1)
            }} className={style.btn}>Next
            </SuperButton>}
        </div>
    )
};


export default Pagination;