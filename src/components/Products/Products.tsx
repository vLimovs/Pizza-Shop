import { useEffect, useState } from 'react'
import { useGetProducts } from '../../services/products'
import filterStore from '../../store/filterStore'
import { IProduct } from '../../types/types'
import ProductItem from './ProductItem'
import './Products.scss'
import Search from './Search'
import Sort from './Sort'
import Skeleton from '../UI/Skeleton'
import { Link } from 'react-router'

const Products = () => {
  const { sortValue, searchValue } = filterStore()
  const [offset, setOffset] = useState(0)
  const { data } = useGetProducts({ sort: sortValue, search: searchValue, offset: offset })
  const products = data?.results.map((item: IProduct) => (<Link to={`/product/${item.id}`} key={item.id}><ProductItem {...item}/></Link>))
  const skeleton = [...new Array(6)].map((_, idx) => <Skeleton key={idx} />)
  const [currentPage, setCurrentPage] = useState(1)
  const whichPage = () => {
    switch (offset) {
      case 0: setCurrentPage(1); break;
      case 6: setCurrentPage(2); break;
      case 12: setCurrentPage(3); break;
      case 18: setCurrentPage(4); break;
      case 24: setCurrentPage(5); break;
    }
  }
  useEffect(() => whichPage(), [offset])

  return (
    <div className="products">
      <div className="products__filter">
        <div className="products__filter-left">
          <h1>Меню</h1>
          <Sort />
        </div>
        <div className="products__pagination">
          <button disabled={currentPage === 1} onClick={() => setOffset(offset - 6)}>Назад</button>
          <output>{currentPage}</output>
          <button disabled={currentPage === 5} onClick={() => setOffset(offset + 6)}>Вперед</button>
        </div>
        <Search />
      </div>
      <div className="products__list">
        {data ? products : skeleton}
      </div>

    </div>
  )
}

export default Products