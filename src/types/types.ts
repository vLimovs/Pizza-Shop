export interface IRegister {
    username: string
    email?: string
    password: string
    password2?: string
    avatar?: FileList | undefined;
}
export interface IUser {
    username: string
    email: string
    id: number
    avatar?: null | string
}
export interface IUserStore {
    user: null | IUser
    isAuth: boolean
    setUser: (data: IUser) => void
    logout: () => void
}

export interface IProduct {
    title: string
    description: string
    image: string
    rating: number
    price: number
    quantity: number
    id: number
    current?: boolean
    amount: number
    addToCart?: () => void
}