import {Component} from 'react'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/Home'
import Login from './components/Login'
import CartRoute from './components/CartRoute'
import RestaurantContext from './components/Context/ReactContext'
import './App.css'

class App extends Component {
  state = {cartList: []}

  removeAll = () => {
    this.setState({cartList: []})
  }

  onitemAdd = item => {
    const {cartList} = this.state
    if (cartList.length >= 1) {
      const result = cartList.map(eachOne => {
        if (eachOne.id === item.id) {
          const {quantity} = eachOne
          return {...eachOne, quantity: quantity + item.quantity}
        }
        return eachOne
      })
      console.log(result)
      for (const i of cartList) {
        if (i.id === item.id) {
          this.setState({cartList: result})
          break
        } else {
          this.setState(prevState => ({
            cartList: [...prevState.cartList, item],
          }))
          break
        }
      }
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, item]}))
    }
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const result = cartList.filter(eachOne => eachOne.id !== id)
    this.setState({cartList: result})
  }

  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const result = cartList.map(eachOne => {
      const {quantity} = eachOne
      if (eachOne.id === id && quantity >= 1) {
        return {...eachOne, quantity: quantity - 1}
      }
      return eachOne
    })
    const updatedResult = result.filter(eachOne => eachOne.quantity !== 0)
    this.setState({cartList: updatedResult})
  }

  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const result = cartList.map(eachOne => {
      const {quantity} = eachOne
      if (eachOne.id === id) {
        return {...eachOne, quantity: quantity + 1}
      }
      return eachOne
    })
    this.setState({cartList: result})
  }

  render() {
    const {cartList} = this.state
    return (
      <RestaurantContext.Provider
        value={{
          cartList,
          removeAllCartItems: this.removeAll,
          addCartItem: this.onitemAdd,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <BrowserRouter>
          <Switch>
            <ProtectedRoute exact path="/" component={Home} />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute exact path="/cart" component={CartRoute} />
          </Switch>
        </BrowserRouter>
      </RestaurantContext.Provider>
    )
  }
}

export default App
