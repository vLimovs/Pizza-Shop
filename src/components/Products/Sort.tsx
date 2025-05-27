import { useState } from "react"
import Select from "react-select"
import filterStore from "../../store/filterStore"

const options = [
  {value: 'price', label: 'По цене'},
  {value: 'rating', label: 'По рейтингу'},
  {value: 'title', label: 'По названию'},
]
const Sort = () => {
  const [selectedOption, setSelectedOption] = useState()
  const { setSortValue } = filterStore()
  const changeOption = (option:any) => {
    setSelectedOption(option)
    setSortValue(option.value)
  }
  return (
    <Select
      placeholder="Сортировать по:"
      options={options}
      value={selectedOption}
      onChange={changeOption}
      className="sort"
      classNamePrefix="sort"
    />
  )
}

export default Sort