import React, {useEffect} from 'react';
import SuperButton from "../../../n1-main/m1-ui/common/c2-SuperButton/SuperButton";
import {v1} from "uuid";
import {TableHeaderModelType} from "../Table";
import {addCardTC, deleteCardTC, getCardsTC, updateCardTC} from "../../../n1-main/m2-bll/cards-reducer";
import {useDispatch, useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {AppStoreType} from "../../../n1-main/m2-bll/store";
import {CardsPackType, CardType} from "../../../n1-main/m2-bll/api/cards-api";
import {TableContent} from "./TableContent";
import s from "../Table.module.scss";

const Cards = () => {
    const {packid} = useParams<{ packid: string }>();
    const dispatch = useDispatch()
    const cards = useSelector<AppStoreType, Array<CardType>>(state => state.cards.cards)

    useEffect(() => {
        if (!!packid) {
            dispatch(getCardsTC(packid))
        }
    }, [packid])

    const addCardButtonHandler = () => {
        dispatch(addCardTC(packid))
    }

    const delCardsHandler = (cardId: string) => {
        dispatch(deleteCardTC(cardId))
    }

    const updateCardsHandler = (cardId: string) => {
        dispatch(updateCardTC(cardId))
    }



    const CardsHeader: TableHeaderModelType = [
        {id: '1', element: 'answer'},
        {id: '2', element: 'question'},
        {id: '3', element: 'created'},
        {id: '4', element: <SuperButton onClick={addCardButtonHandler}>Add Card</SuperButton>}
    ]

    let cardHeader = CardsHeader.map(el => {
        return {id: v1(), element: el.element}
    })
    const cardsMapped = cards.map(e => {
        return {id: e._id,
            element: [
                e.question,
                e.answer,
                e.created,
                <div>
                    <SuperButton className={s.button} onClick={() => delCardsHandler(e._id)}>del</SuperButton>
                    <SuperButton className={s.button} onClick={() => updateCardsHandler(e._id)}>update</SuperButton>
                </div>
            ]}
    })
    return (
        <div>
            <h1>This is table of Cards for selected Card Pack.</h1>

            <div className={s.selectedCardPackInfo}>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack Name:</div>
                    {/*   <div className={s.elementValue}>{selectedCardsPack ? selectedCardsPack.name : ''}</div>*/}
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack updated:</div>
                </div>
                <div className={s.element}>
                    <div className={s.elementHeader}>Selected CardPack id:</div>
                </div>
            </div>
            <TableContent headerModel={cardHeader} bodyModel={cardsMapped}/>
        </div>
    );
};

export default Cards;