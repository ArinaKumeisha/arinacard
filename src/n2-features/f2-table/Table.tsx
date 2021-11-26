import React, {ChangeEvent, useEffect, useState} from 'react';
import sContainer from '../../n1-main/m1-ui/common/components/Container.module.scss'
import s from './Table.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {
    addCardsPackTC,
    deleteCardsPackTC,
    getCardsPackTC,
    setPageCountAC,
    setUserIdAfterRadioAC,
    updateCardPackTC
} from "../../n1-main/m2-bll/table-reducer";
import {AppStoreType} from "../../n1-main/m2-bll/store";
import {CardsPackType} from "../../n1-main/m2-bll/api/cards-api";
import SuperButton from "../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import Pagination from "./Pagination/Pagination";
import Search from "./Search/Search";
import {Settings} from "./Settings/Settings";
import {TableContent} from "./TableContent/TableContent";
import {NavLink} from "react-router-dom";

export const Table = () => {

    const dispatch = useDispatch()
    const userID = useSelector<AppStoreType, string>(state => state.profile._id)
    const pageCount = useSelector<AppStoreType, number>(state => state.table.pageCount).toString()
    const page = useSelector<AppStoreType, number>(state => state.table.page)
    const packName = useSelector<AppStoreType, string>(state => state.table.packName)
    const superRadioArr = ['Profile', 'Public']  // for SuperRadio in Settings
    const sortPacks = useSelector<AppStoreType, string>(state => state.table.sortPacks)
    const min = useSelector<AppStoreType, number>(state => state.table.min)
    const max = useSelector<AppStoreType, number>(state => state.table.max)

    const [profileOrPublic, onChangeProfileOrPublic] = useState(superRadioArr[0]) // for SuperRadio is Settings
    const cardsPacks = useSelector<AppStoreType, Array<CardsPackType>>(state => state.table.cardPacks)

    useEffect(() => {
        if (profileOrPublic === 'Public') {
            dispatch(setUserIdAfterRadioAC(''))
        } else {
            dispatch(setUserIdAfterRadioAC(userID))
        }
        dispatch(getCardsPackTC())

    }, [profileOrPublic, pageCount, page, packName, sortPacks, min, max])

    // this doesn't work, when packId changed in the

    const addPackButtonHandler = () => {
        dispatch(addCardsPackTC('BrightPack'))
    }

    const setPageCountHandler = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.currentTarget.value) < 1) e.currentTarget.value = '1'
        dispatch(setPageCountAC(Number(e.currentTarget.value)))
    }

    const CardsPackHeader: TableHeaderModelType = [
        {id: '1', element: 'Name'},
        {id: '2', element: 'cardsCount'},
        {id: '3', element: 'updated'},
        {id: '4', element: <SuperButton onClick={addPackButtonHandler}>Add CardPack</SuperButton>},
    ]
    /*const selectedCardsPack = cardsPacks.find(e => e._id === packid)*/

    const delCardsPackHandler = (cardPackId: string) => {
        dispatch(deleteCardsPackTC(cardPackId))
    }
    const updateCardsPackHandler = (cardPackId: string) => {
        dispatch(updateCardPackTC(cardPackId, 'BrightUpdatedName'))
    }


    // remapping arrays for TableContent
    const cardsPackMapped = cardsPacks.map(e => {
        return {
            id: e._id,
            element: [
                <NavLink className={s.item} exact to={`/cards/${e._id}`}>{e.name}</NavLink>,
                e.cardsCount,
                e.updated,
                <div><SuperButton className={s.button} onClick={() => delCardsPackHandler(e._id)}>del</SuperButton>
                    <SuperButton className={s.button} onClick={() => updateCardsPackHandler(e._id)}>update</SuperButton>
                </div>
            ]
        }
    })

    return (
        <div className={`${sContainer.container} ${s.table}`}>
            <h1>This is table of Card Packs.</h1>
            <Search/>
            <Settings setPageCountHandler={setPageCountHandler}
                      superRadioArr={superRadioArr}
                      profileOrPublic={profileOrPublic}
                      onChangeProfileOrPublic={onChangeProfileOrPublic}
            />

            <TableContent headerModel={CardsPackHeader} bodyModel={cardsPackMapped}/>
            <Pagination/>


        </div>
    );
};

type HeaderModelElementType = {
    id: string,
    element: string | JSX.Element
}

export type TableHeaderModelType = Array<HeaderModelElementType>
