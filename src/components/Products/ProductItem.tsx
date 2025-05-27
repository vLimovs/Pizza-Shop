import { Link } from "react-router"
import { IProduct } from "../../types/types"
import { productCart } from "../../utils/reExportImages"
import CustomBtn from "../UI/CustomBtn"

const ProductItem: React.FC<IProduct> = (P) => {

  return (
    <>
      {P.current &&
        <div className="products__current-nav">
          <Link to='/'><img src="/back.svg" alt="" /></Link>
          <h1>{P.title}</h1>
          <CustomBtn width={125} height={43} text="В корзину" icon={productCart} onClick={P.addToCart}/>
        </div>
      }
      <div className={`products__list-item ${P.current ? 'current' : ''}`}>
        <img src={P.image} alt={P.title} draggable={false} />
        {P.current ? <div><span>Цена</span><p>{P.price}</p></div> : <p>{P.price}</p>}
        {!P.current && <CustomBtn width={34} height={34} icon={productCart} onClick={P.addToCart}/>}
        {P.current ? <div><span>Рейтинг</span><p>{P.rating}</p></div> : <p>{P.rating}</p>}
        {!P.current && <h2>{P.title}</h2>}
        <p className="descr">{P.description}</p>
      </div>
    </>
  )
}

export default ProductItem