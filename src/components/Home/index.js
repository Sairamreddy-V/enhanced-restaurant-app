import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import RestaurantContext from '../Context/ReactContext'
import './index.css'

import DishCard from '../DishCard'

class Home extends Component {
  state = {
    details: [],
    cartItems: 0,
    showDishes: 'Salads and Soup',
    menuCategory: [],
    isApiSuccess: false,
  }

  componentDidMount() {
    this.fetchData()
  }

  fetchData = async () => {
    const response = await fetch(
      'https://run.mocky.io/v3/77a7e71b-804a-4fbd-822c-3e365d3482cc',
    )
    if (response.ok) {
      const data = await response.json()
      const updatedData = {
        restaurantName: data[0].restaurant_name,
        restaurantImage: data[0].restaurant_image,
        nexturl: data[0].nexturl,
        tableMenuList: data[0].table_menu_list,
      }
      this.setState({
        details: updatedData,
        menuCategory: updatedData.tableMenuList.map(eachOne => {
          if (eachOne.menu_category_id === '11') {
            return {
              category: eachOne.menu_category,
              isClicked: true,
              id: eachOne.menu_category_id,
            }
          }
          return {
            category: eachOne.menu_category,
            isClicked: false,
            id: eachOne.menu_category_id,
          }
        }),
        isApiSuccess: true,
      })
    }
  }

  onLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  onCategoryClick = event => {
    const {value} = event.currentTarget
    console.log(value)
    const {details, menuCategory} = this.state
    let newShowDishes
    const newShow = details.tableMenuList.filter(eachOne => {
      if (eachOne.menu_category_id === value) {
        newShowDishes = eachOne.menu_category
      }
    })
    this.setState({
      showDishes: newShowDishes,
    })
  }

  onQuantityIncrement = () => {
    this.setState(prevState => ({cartItems: prevState.cartItems + 1}))
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" size="55" />
    </div>
  )

  renderCategoryMenu = () => {
    const {menuCategory} = this.state
    return (
      <ul className="CategoryUlContainer">
        {menuCategory.map(eachOne => {
          const name = eachOne.isClicked
            ? 'CategoryLiItemActive'
            : 'CategoryLiItem'
          const buttonName = eachOne.isClicked
            ? 'CategoryButtonActive'
            : 'CategoryButton'
          return (
            <li key={eachOne.id}>
              <button
                className={buttonName}
                value={eachOne.id}
                onClick={this.onCategoryClick}
              >
                {eachOne.category}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  renderHeader = cartList => (
    <Header details={this.state.details} cartItems={cartList.length} />
  )

  renderDishes = addCartItem => {
    const {isApiSuccess, details, showDishes} = this.state

    // Find the matching category dishes. If no match is found, default to an empty object with an empty category_dishes array.
    const dishes = details.tableMenuList.find(
      eachOne => eachOne.menu_category === showDishes,
    ) || {category_dishes: []}

    // Log to ensure that the 'dishes' variable is properly assigned

    return (
      isApiSuccess && (
        <ul className="DishesUlcontainer">
          {dishes.category_dishes.map(eachDish => (
            <DishCard
              quantityIncrement={this.onQuantityIncrement}
              quantityDecrement={this.onQuantityDecrement}
              key={eachDish.dish_id}
              addCartItem={addCartItem}
              details={eachDish}
            />
          ))}
        </ul>
      )
    )
  }

  render() {
    const {isApiSuccess} = this.state
    return (
      <RestaurantContext.Consumer>
        {value => {
          const {
            addCartItem,
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
          } = value
          return isApiSuccess ? (
            <>
              {this.renderHeader(cartList)}
              {this.renderCategoryMenu()}
              {this.renderDishes(addCartItem)}
            </>
          ) : (
            this.renderLoadingView()
          )
        }}
      </RestaurantContext.Consumer>
    )
  }
}

export default Home
