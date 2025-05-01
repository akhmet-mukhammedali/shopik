export type ProductType = {
    id: number
    title: string
    image: string
    rating?: number
    price: number
    quantity?: number
    isFavorite: boolean
    reviews: UserType[]
}

export type UserType = {
    name: string
    date: string
    comment: string
    rating: number
}