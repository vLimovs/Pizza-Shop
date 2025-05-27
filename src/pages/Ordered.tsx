import { useNavigate } from "react-router"
import CustomBtn from "../components/UI/CustomBtn"
import UserLayout from "../layouts/UserLayout"

const Ordered = () => {
    const navigate = useNavigate()
    return (
        <UserLayout>
            <div className="ordered">
                <img src="pizza.svg" alt="" />
                <h1>Ваш заказ успешно оформлен!</h1>
                <CustomBtn text="ОФОРМИТЬ НОВЫЙ" width={248} height={60} onClick={() => navigate('/')} />
            </div>
        </UserLayout>
    )
}

export default Ordered