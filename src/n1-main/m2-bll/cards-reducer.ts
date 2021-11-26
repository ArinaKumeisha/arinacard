import {cardsAPI, CardsPackType, CardType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";
import {getCardsPackTC} from "./table-reducer";

const initialState: InitialStateType = {
    cards: []
}

export const cardsReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "CARDS/SET-CARDS":
            return {...state, cards: action.cards}
        default:
            return state
    }

}

type InitialStateType = {
    cards: Array<CardType>
}

export const setCardsAC = (cards: Array<CardType>) =>
    ({type: 'CARDS/SET-CARDS', cards} as const)

//todo: need to fix @ts-ignore here
export const getCardsTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.getCards(cardsPack_id)
            .then(res => {
                console.log('getCardsTC then:', res.data)
                // @ts-ignore
                dispatch(setCardsAC(res.data.cards))

            })
            .catch(res => {
                console.log('getCardsTC catch:', res.response.data.error)
            })
    }
}

export const addCardTC = (cardsPack_id: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.addCard(cardsPack_id)
            .then(res => {
                console.log('addCardTC then:', res)
                dispatch(getCardsTC(cardsPack_id))
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('addCardTC catch:', res.response.data.error)
            })
    }
}

export const updateCardTC = (cardId: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.updateCard(cardId)
            .then(res => {
                // dispatch(getCardsTC(cardsPack_id))
                console.log('updateCardTC then:', res)
            })
            .catch(res => {
                console.log('updateCardTC catch:', res.response.data.error)
            })
    }
}

export const deleteCardTC = (cardId: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        // const packId = getState().table

        cardsAPI.deleteCard(cardId)
            .then(res => {
                dispatch(getCardsTC(cardId))
                console.log('deleteCardTC then:', res)
            })
            .catch(res => {
                console.log('deleteCardTC catch:', res.response.data.error)
            })
    }
}

type ActionType =
    | ReturnType<typeof setCardsAC>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
