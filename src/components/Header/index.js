import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoCartSharp} from 'react-icons/io5'
import './index.css'

const Header = props => {
  const {details, cartItems} = props
  const {restaurantName} = details

  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onCartButton = () => {
    const {history} = props
    history.replace('/cart')
  }

  return (
    <nav className="NavContainer">
      <Link className="link-item" to="/">
        <h1>{restaurantName}</h1>
      </Link>
      <div className="NavCartContainer">
        <button className="logout-button" onClick={onLogout}>
          LOGOUT
        </button>
        <p className="NavPara">My Orders</p>
        <button className="cart-button" onClick={onCartButton}>
          <IoCartSharp color="blue" size="55" />
          <p className="NavCartCount">{cartItems}</p>
        </button>
      </div>
    </nav>
  )
}

export default withRouter(Header)
