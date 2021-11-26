import axios from "axios";

const settings = {
    withCredentials: true
}

const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    // baseURL: 'https://neko-back.herokuapp.com/2.0/',
    ...settings
})

export const cardsAPI = {
    recoveryPassword(email: string) {
        const dataForPost = {
            email,
            from: "Briws <brightwiths@gmail.com>",
            message: `<div>password recovery link:<a href='http://localhost:3000/#/passwordnew/$token$'>link</a></div>` // todo: need to change this before yarn deploy
        }
        return instance.post<ResponseType>('auth/forgot', dataForPost)
    },
    changePassword(password: string, resetPasswordToken: string) {
        return instance.post<ResponseType>('auth/set-new-password', {password, resetPasswordToken})
    },
    getCardsPack(userId: string, pageCount: string, page: number, cardPacksTotalCount: number,
                 packName: string,sortPacks: string, min: number, max: number) {
        return instance.get<CardsResponseType>(`cards/pack`, {params: {
                user_id: userId, pageCount, page, cardPacksTotalCount,packName,
                sortPacks, min, max,
            }})
    },
    addCardPack(cardPackName: string) {
        const dataForPost: addCardsPostType = {
            cardsPack: {
                name: cardPackName
            }
        }
        return instance.post('cards/pack', dataForPost)
    },
    deleteCardPack(cardPackId: string) {
        return instance.delete(`cards/pack?id=${cardPackId}`)
    },
    updateCardPack(cardPackId: string, newName: string) {
        const dataForPost: updateCardsPostType = {
            cardsPack: {
                _id: cardPackId,
                name: newName,
            }
        }
        return instance.put('cards/pack', dataForPost)
    },
    getCards(cardsPack_id: string) {
        return instance.get<ResponseType<cardDataType>>('/cards/card', {params: {cardsPack_id}})
    },
    addCard(cardsPack_id: string) {
        const dataForPost = {
            card: {
                cardsPack_id
            }
        }
        return instance.post('cards/card', dataForPost)
    },
    deleteCard(cardsPack_id: string) {
        return instance.delete(`cards/card?id=${cardsPack_id}`)
    },
    updateCard(cardsPack_id: string) {
        const dataForPost: updateCardsPostType = {
            cardsPack: {
                _id: cardsPack_id
            }
        }
        return instance.put('cards/pack', dataForPost)
    },
}

type ResponseType<D = {}> = {
    info: string
    response: {
        data: D
    }
}

export type CardsPackType = {
    cardsCount: number
    created: string
    deckCover?: string
    grade: number // средняя оценка карточек
    more_id: string
    name: string
    path: string // папка
    private: boolean
    rating: number // лайки
    shots: number // количество попыток
    type: string // ещё будет "folder" (папка)
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}

type CardsResponseType = {
    cardPacks: Array<CardsPackType>
    cardPacksTotalCount: number // количество колод
    maxCardsCount: number
    minCardsCount: number
    page: number // выбранная страница
    pageCount: number // количество элементов на странице
}
type addCardsPostType = {
    cardsPack: {
        name?: string
        path?: string
        grade?: number
        shots?: number
        rating?: number
        deckCover?: "url" | "base64"
        private?: boolean
        type?: string
    }
}
type updateCardsPostType = {
    cardsPack: {
        _id: string
        name?: string // не обязательно
    }
}

type cardDataType = {
    cards: Array<CardsPackType>
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    packUserId: string
    page: number
    pageCount: number
    token: string
    tokenDeathTime: number
}

export type CardType = {
    answer: string
    cardsPack_id: string
    comments: string
    created: string
    grade: number
    more_id: string
    question: string
    rating: number
    shots: number
    type: string
    updated: string
    user_id: string
    __v: number
    _id: string
}