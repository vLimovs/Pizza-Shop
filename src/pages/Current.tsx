import { useParams } from "react-router"
import ProductItem from "../components/Products/ProductItem"
import UserLayout from "../layouts/UserLayout"
import { useGetProductById } from "../services/products"
import cartStore from "../store/cartStore"
import { IProduct } from "../types/types"

const Current = () => {
  const { id } = useParams()
  const { data } = useGetProductById({ id: id })
  const { setCartValue } = cartStore()
  const handleAddToCart = () => {
    alert('Товар добавлен в корзину...')
  }
  const handleAlreadyInCart = () => {
    alert('Товар уже в корзине...')
  }
  const addToCart = () => {
    if (!data) return;
    const storedCart = JSON.parse(localStorage.getItem('cart') || '[]')
    const isProductInCart = storedCart.some((product: { id: any }) => product.id === data.id)
    if (isProductInCart) {
      handleAlreadyInCart()
    } else {
      const amount = 1
      const updateCart: IProduct[] = [...storedCart, { ...data, amount }]
      localStorage.setItem('cart', JSON.stringify(updateCart))
      setCartValue(updateCart)
      handleAddToCart()
    }
  }
  return (
    <UserLayout>
      {data ? <ProductItem current={true} {...data} addToCart={addToCart} /> : 'Ничего не найдено'}
    </UserLayout>
  )
}

export default Current