import { Link, useNavigate } from 'react-router'
import './User.scss'
import CustomBtn from '../UI/CustomBtn'
import { cartIcon, exitIcon, menuIcon, profileIcon, userIcon } from '../../utils/reExportImages'
import { paths } from '../../routes/paths'
import userStore from '../../store/userStore'
import UserSkeleton from './UserSkeleton'

const User = () => {
  const links = [
    { name: 'Меню', icon: menuIcon, url: paths.menu },
    { name: 'Корзина', icon: cartIcon, url: paths.cart },
    { name: 'Профиль', icon: profileIcon, url: paths.profile },
  ]
  const { user, logout } = userStore()
  console.log(user);
  
  const navigate = useNavigate()

  const logoutUser = () => {
    logout()
    localStorage.clear()
    navigate('/login')
  }

  return (
    <aside className='user'>
      {user ? (
        <>
          <div className="user__info">
            <img src={user.avatar ? `https://prowebapi.tech${user.avatar}` : userIcon} alt="avatar" />
            <h2>{user?.username}</h2>
            <a href={`mailto:${user?.email}`}>{user?.email}</a>
          </div>
          <ul className='user__list'>
            {links.map((link, idx) => (
              <li key={idx}>
                <Link to={link.url}>
                  <img src={link.icon} alt={link.name} />
                  {link.name}
                </Link>
              </li>
            ))}

          </ul>
        </>
      ) : <UserSkeleton />
      }

      <CustomBtn
        text="Выйти"
        icon={exitIcon}
        width={117}
        height={43}
        onClick={logoutUser}
      />
    </aside>
  )
}

export default User