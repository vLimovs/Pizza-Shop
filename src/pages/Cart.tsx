import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import CustomBtn from "../components/UI/CustomBtn"
import UserLayout from "../layouts/UserLayout"
import { IProduct } from "../types/types"

const Cart = () => {

  const [cartItems, setCartItems] = useState<IProduct[]>([])
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }


  }, [])

  const updateCartInLocalStorage = (updateCart: IProduct[]) => {
    localStorage.setItem('cart', JSON.stringify(updateCart))
    setCartItems(updateCart)
  }

  const handleAmountChange = (id: number, delta: number) => {
    const updateCart = cartItems.map((item: IProduct) => {
      if (id === item.id) {
        const newAmount = item.amount + delta
        if (newAmount > item.quantity) {
          handleExceedAmount()
          return item
        }
        return { ...item, amount: Math.max(newAmount, 1) }
      }
      return item
    })
    updateCartInLocalStorage(updateCart)
  }

  const handleRemoveItem = (id: number) => {
    const updateCard = cartItems.filter((item) => id !== item.id)
    updateCartInLocalStorage(updateCard)
    handleCartRemove()
  }
  const handlePromoSuccess = () => {
    alert('Промокод активирован..')
  }
  const handlePromoDenied = () => {
    alert('Промокод не найден..')
  }
  const handleCartRemove = () => {
    alert('Товар удален из корзины..')
  }
  const handleExceedAmount = () => {
    alert('Больше заказать нельзя..')
  }
  const [promo, setPromo] = useState('')
  const [discount, setDiscount] = useState(0)
  const handleApplyPromo = () => {
    if (promo === 'PROWEB10') {
      handlePromoSuccess()
      setDiscount(0.1)
    } else {
      handlePromoDenied()
      setDiscount(0)
    }
  }
  const totalSumm = () => {
    let totalSumm = cartItems.reduce((total: number, item: IProduct) => total + item.price * item.amount, 0) + 5
    return discount > 0 ? totalSumm * (1 - discount) : totalSumm
  }
  const navigate = useNavigate()
  const orderCheckout = () => {
    localStorage.removeItem('cart')
    navigate('/ordered')
  }
  return (
    <UserLayout>
      <h1>Корзина</h1>
      <div className="cart__container">
        {cartItems.length > 0 ? (
          cartItems.map((item, idx) => (
            <div className="cart__container-card" key={idx}>
              <img src={item.image} alt="" />
              <div className="cart__container-card-info">
                <h2>{item.title}</h2>
                <p>$ {item.price}</p>
              </div>
              <div className="cart__container-card-amount">
                <button className="button" onClick={() => handleAmountChange(item.id, -1)}>-</button>
                <output>{item.amount}</output>
                <button className="button" onClick={() => handleAmountChange(item.id, 1)}>+</button>
                <button className="button" onClick={() => handleRemoveItem(item.id)}>x</button>
              </div>
            </div>
          ))
        ) : (<p>Ваша корзина пуста</p>)}
        <div className="cart__promocode">
          <input
            type="text"
            placeholder="Промокод"
            value={promo}
            onChange={(e) => setPromo(e.target.value)}
          />
          <CustomBtn text='Применить' width={141} height={44} onClick={handleApplyPromo} />
        </div>
        <div className="cart__summary">
          {discount > 0 && <div className="cart__summary-item">
            <span>Скидка</span>
            <span>10%</span>
          </div>}
          <div className="cart__summary-item">
            <span>Доставка</span>
            <span>$5</span>
          </div>
          <div className="cart__summary-item">
            <span>Итого</span>
            <span>${totalSumm()}</span>
          </div>
        </div>
        <CustomBtn text="ОФОРМИТЬ" width={248} height={60} onClick={orderCheckout} />
      </div>
    </UserLayout>
  )
}

export default Cart