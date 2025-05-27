import { useQuery } from "react-query"
import api from "./api"
interface IServicesProducts {
    sort: any
    search: any
    offset: any
}

interface IServicesGetProduct {
    id: any
}

export const useGetProducts = ({ sort, search, offset }: IServicesProducts) => {
    return useQuery(['products', sort, search, offset], () => api.get(`products?limit=6&ordering=${sort}&search=${search}&offset=${offset}`), {
        select: (response) => response.data
    })
}

export const useGetProductById = ({ id }: IServicesGetProduct) => {
    return useQuery(['current', id], () => api.get(`products/${id}`), {
        select: (response) => response.data
    })
}