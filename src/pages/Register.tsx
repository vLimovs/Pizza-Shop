import { Link, useNavigate } from "react-router"
import AuthLayout from "../layouts/AuthLayout"
import CustomInput from "../components/UI/CustomInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { IRegister } from "../types/types"
import { useRegisterMutation } from "../services/auth"
import { useState } from "react"
import { errorMessage } from "../utils/errorMessage"

const Register = () => {
  const {
    watch,
    register, // функция для регистрации
    handleSubmit,//функция для подтверждения
    reset,// сброс
    formState: {
      isValid, // валидация
      errors // массив с ошибками
    } // объект с инфой о ошибках
  } = useForm<IRegister>(
    {
      mode: 'onChange'
    }
  )
  
  const navigate = useNavigate()
  const registerMutation = useRegisterMutation()
  const password = watch('password')
  const [error, setError] = useState('')
  const registerUser:SubmitHandler<IRegister> = async (data) => {
    try {
      await registerMutation.mutateAsync(data)
      console.log('Register completed');
      setError('')
      navigate('/login')
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
          <h1>Регистрация</h1>
          <form 
            className="inputs__form"
            onSubmit={handleSubmit(registerUser)}
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
              type="email"
              holder="Ваш email"
              register={register('email', {
                required: 'Email не может быть пустым',
              })}
              errors={errors.email}
            />
            <CustomInput 
              type="password"
              holder="Ваш пароль"
              register={register('password', {
                required: 'Пароль не может быть пустым',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов'
                }
              })}
              errors={errors.password}
              
            />
            <CustomInput 
              type="password"
              holder="Повторить пароль"
              register={register('password2', {
                required: 'Пароль не может быть пустым',
                minLength: {
                  value: 6,
                  message: 'Минимум 6 символов'
                },
                validate: value => value === password || "Пароли не совпадают"
              })}
              errors={errors.password2}
            />
            <button disabled={!isValid}>Зарегистрироваться</button>
          </form>
          <div className="inputs__info">
            { error && <h3 className="error">{error}</h3> }
            <p>Есть аккаунт?</p>
            <Link to='/login'>Войти</Link>
          </div>
        </div>
      </AuthLayout>
    </>
  )
}

export default Register