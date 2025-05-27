import { useNavigate } from "react-router"
import AuthLayout from "../layouts/AuthLayout"
import CustomInput from "../components/UI/CustomInput"
import { SubmitHandler, useForm } from "react-hook-form"
import { IRegister } from "../types/types"
import { useState } from "react"
import { errorMessage } from "../utils/errorMessage"
import CustomBtn from "../components/UI/CustomBtn"
import userStore from "../store/userStore"
import { useAvatarMutation, useProfileMutation } from "../services/auth"

const Profile = () => {
  const {
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
  const {
    register: registerAvatar,
    handleSubmit: handleAvatarSubmit,
    formState: { errors: errorsAvatar }
  } = useForm<IRegister>(
    {
      mode: 'onChange'
    }
  )

  const navigate = useNavigate()
  const { setUser, user } = userStore()
  const id = user?.id
  const profileMutation = useProfileMutation(id ?? 0)
  const avatarMutation = useAvatarMutation(id ?? 0)
  const [_, setError] = useState('')
  const profileUser: SubmitHandler<IRegister> = async (data) => {
    try {
      await profileMutation.mutateAsync(data)
      console.log('Change profile completed');
      setError('')
      navigate('/')
    } catch (err) {
      setError('')
      setError(errorMessage(err))
    }
    reset()
  }
  const profileAvatar: SubmitHandler<IRegister> = async (data) => {
    try {
      const formData = new FormData();

      if (data.avatar && data.avatar.length > 0) {
        formData.append('avatar', data.avatar[0]);
      } else {
        console.warn('Аватар не выбран');
        return; 
      }

      const updateUserResponse = await avatarMutation.mutateAsync(formData);
      const updateUser = updateUserResponse.data; 

      setUser(updateUser);
      console.log('Change avatar completed');
      navigate('/');
    } catch (err) {
      console.error('Ошибка при обновлении аватара', err);
    }
    reset();
  }


  return (
    <>
      <AuthLayout>
        <div className="inputs">
          <h1>Редактировать профиль</h1>
          <form
            className="inputs__form"
            onSubmit={handleSubmit(profileUser)}
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
            <CustomBtn disabled={!isValid} text="Изменить" width={200} height={50} />
          </form>
          <form
            encType="multipart/form-data"
            className="inputs__form"
            onSubmit={handleAvatarSubmit(profileAvatar)}

          >
            <CustomInput
              holder="Изменить фото профиля"
              type="file"
              label="Аватар"
              register={registerAvatar('avatar', {
                required: 'Аватар не может быть пустым'
              })}
              errors={errorsAvatar.avatar}
              accept="image/*"
            />
            <CustomBtn text="Изменить аватар" width={200} height={50} />
          </form>
        </div>
      </AuthLayout>
    </>
  )
}

export default Profile