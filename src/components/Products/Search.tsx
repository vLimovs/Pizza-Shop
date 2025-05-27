import { useEffect, useState } from "react"
import filterStore from "../../store/filterStore"

const Search = () => {
  const [searchText, setSearchText] = useState('')
  const {setSearchValue} = filterStore()
  useEffect(() => {
    setSearchValue(searchText)
  }, [searchText])
  
  return (
    <form className="form">
      <input 
        type="text"
        placeholder="Введите название"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <img src="/search.svg" alt="" />
    </form>
  )
}

export default Search