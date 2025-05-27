import { create } from "zustand";

interface IFilterStore {
    sortValue: string
    searchValue: string
    setSortValue: (value:string) => void
    setSearchValue: (value:string) => void
}

const filterStore = create<IFilterStore>((set) => ({
    sortValue: '',
    searchValue: '',
    setSortValue: (value) => set({sortValue: value}),
    setSearchValue: (value) => set({searchValue: value})
}))

export default filterStore