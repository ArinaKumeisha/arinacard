import {Dispatch} from "react";
import {cardsAPI, CardsPackType} from "./api/cards-api";
import {AppStoreType} from "./store";
import {ThunkAction} from "redux-thunk";

const initialState: InitialStateType = {
    cardPacks: [],
    cardPacksTotalCount: 10,
    pageCount: 5,
    page: 1,
    userIdAfterRadio: '',
    packName: '',
    sortPacks:'',
    max: 4,
    min: 0,

}

export const tableReducer = (state = initialState, action: ActionType): InitialStateType => {
    switch (action.type) {
        case "TABLE/SET-CARD-PACKS":
            return {...state, cardPacks: action.cardPacs}
        case "TABLE/SET-CURRENT-PAGE":
            return {...state, page: action.page}
        case "TABLE/SET-TOTAL-COUNT":
            return {...state, cardPacksTotalCount: action.cardPacksTotalCount}
        case "TABLE/SET-PAGE-COUNT":
            return {...state, pageCount: action.pageCount}
        case "TABLE/SET-USER-ID-AFTER-RADIO":
            return {...state, userIdAfterRadio: action.userIdAfterRadio}
        case "TABLE/SET-SEARCH-PACK-NAME":
            return {...state, packName: action.packName}
        case "TABLE/SORT-PACKS":
            return {...state, sortPacks: action.sortPacks}
        case "TABLE/SET-CARDS-COUNT":
            return {...state, max: action.max, min: action.min}
        default:
            return state
    }
}

type InitialStateType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number
    pageCount: number
    page: number
    userIdAfterRadio: string
    packName: string
    sortPacks: string
    min: number
    max: number

}

export const setSearchPackNameAC = (packName: string) =>
    ({type: 'TABLE/SET-SEARCH-PACK-NAME', packName} as const)

export const setCardPacksAC = (cardPacs: Array<CardsPackType>) =>
    ({type: 'TABLE/SET-CARD-PACKS', cardPacs} as const)

export const setCurrentPageAC = (page: number) =>
    ({type: 'TABLE/SET-CURRENT-PAGE', page} as const)

export const setTotalCountAC = (cardPacksTotalCount: number) =>
    ({type: 'TABLE/SET-TOTAL-COUNT', cardPacksTotalCount,} as const)

export const setPageCountAC = (pageCount: number) =>
    ({type: 'TABLE/SET-PAGE-COUNT', pageCount,} as const)

export const setUserIdAfterRadioAC = (userIdAfterRadio: string) =>
    ({type: 'TABLE/SET-USER-ID-AFTER-RADIO', userIdAfterRadio} as const)

export const sortPacksAC = (sortPacks: string) =>
    ({type: 'TABLE/SORT-PACKS', sortPacks} as const)

export const setCardsCountAC = (min: number,max: number ) =>  //минимальное и максимальное число карт
    ({type: 'TABLE/SET-CARDS-COUNT', min, max,} as const)

export const getCardsPackTC = () => {
    return (dispatch: Dispatch<ActionType>, getState: () => AppStoreType) => {
        const page = getState().table.page
        const cardPacksTotalCount = getState().table.cardPacksTotalCount
        const packName = getState().table.packName
        const pageCount = getState().table.pageCount.toString()
        const userIdAfterRadio = getState().table.userIdAfterRadio
        const sortPacks = getState().table.sortPacks
        const min = getState().table.min
        const max = getState().table.max

        cardsAPI.getCardsPack(userIdAfterRadio, pageCount, page, cardPacksTotalCount,
            packName, sortPacks, min, max,)
            .then((res) => {
                dispatch(setCardPacksAC(res.data.cardPacks))
                dispatch(setTotalCountAC(res.data.cardPacksTotalCount))
                dispatch(setCurrentPageAC(res.data.page))
                console.log('getCardsPack then:', res.data.cardPacks)
            })
            .catch((res) => {
                console.log('getCardsPack catch:', res.response.data.error)
            })

    }
}

export const addCardsPackTC = (cardPackName: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.addCardPack(cardPackName)
            .then(res => {
                console.log('addCardsPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('addCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const deleteCardsPackTC = (cardPackId: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.deleteCardPack(cardPackId)
            .then(res => {
                console.log('deleteCardsPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('deleteCardsPackTC catch:', res.response.data.error)
            })
    }
}

export const updateCardPackTC = (cardPackId: string, newName: string): AppThunk => {
    return (dispatch, getState: () => AppStoreType) => {
        cardsAPI.updateCardPack(cardPackId, newName)
            .then(res => {
                console.log('updateCardPackTC then:', res)
                dispatch(getCardsPackTC())
            })
            .catch(res => {
                console.log('updateCardPackTC catch:', res.response.data.error)
            })
    }
}

type ActionType =
    | ReturnType<typeof setCardPacksAC>
    | ReturnType<typeof setCurrentPageAC>
    | ReturnType<typeof setTotalCountAC>
    | ReturnType<typeof setPageCountAC>
    | ReturnType<typeof setUserIdAfterRadioAC>
    | ReturnType<typeof setSearchPackNameAC>
    | ReturnType<typeof sortPacksAC>
    | ReturnType<typeof setCardsCountAC>
    | ReturnType<typeof setSearchPackNameAC>

type AppThunk = ThunkAction<void, AppStoreType, unknown, ActionType>
