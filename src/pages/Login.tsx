import { Link, useNavigate } from "react-router"
import AuthLayout from "../layouts/AuthLayout"
import { IRegister } from "../types/types"
import { SubmitHandler, useForm } from "react-hook-form"
import { useState } from "react"
import { errorMessage } from "../utils/errorMessage"
import CustomInput from "../components/UI/CustomInput"
import { useLoginMutation } from "../services/auth"

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors
    }
  } = useForm<IRegister>(
    {
      mode: 'onChange'
    }
  )

  const navigate = useNavigate()
  const loginMutation = useLoginMutation()

  const [error, setError] = useState('')
  const loginUser: SubmitHandler<IRegister> = async (data) => {
    try {
      await loginMutation.mutateAsync(data)
      setError('')
      navigate('/')
      reset()
    } catch (err) {
      setError('')
      setError(errorMessage(err))
    }
  }

  return (
    <>
      <AuthLayout>
        <div className="inputs">
          <h1>Вход</h1>
          <form
            className="inputs__form"
            onSubmit={handleSubmit(loginUser)}
          >
            <CustomInput
              type="text"
              holder="Ваш логин"
              register={register('username', {
                required: 'Логин не может быть пустым',
                minLength: {
                  value: 3,
                  message: 'Логин слишком короткий'
                }
              })}
              errors={errors.username}
            />
            <CustomInput
              type="password"
              holder="Ваш пароль"
              register={register('password', {
                required: 'Пароль не может быть пустым',
                minLength: {
                  value: 3,
                  message: 'Пароль слишком короткий'
                }
              })}
              errors={errors.password}
            />

            <button>Войти</button>
          </form>
          <div className="inputs__info">
            {error && <h3 className="error">{error}</h3>}
            <p>Нет аккаунта?</p>
            <Link to='/register'>Зарегистрироваться</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default Login