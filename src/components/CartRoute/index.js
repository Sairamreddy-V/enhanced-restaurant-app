import React from 'react';
import { MdDelete } from 'react-icons/md';
import Header from '../Header';
import RestaurantContext from '../Context/ReactContext';
import './index.css';

class CartRoute extends React.Component {
  static contextType = RestaurantContext;

  onRemoveAll = () => {
    this.context.removeAllCartItems();
  }

  onDelete = (event) => {
    const { value } = event.currentTarget;
    console.log(value);
    this.context.removeCartItem(value);
  }

  onDecrement = (event) => {
    const { value } = event.currentTarget;
    this.context.decrementCartItemQuantity(value);
  }

  onIncrement = (event) => {
    const { value } = event.currentTarget;
    this.context.incrementCartItemQuantity(value);
  }

  render() {
    const { cartList } = this.context;
    const details = {
      restaurantName: 'UNI Resto Cafe',
    };

    return (
      <div className="page-container">
        <Header details={details} cartItems={cartList.length} />
        {cartList.length !== 0 ? (
          <div className="cart-page">
            <button className="remove-all-button" onClick={this.onRemoveAll}>
              Remove All
            </button>
            <ul className="ul-container">
              {cartList.map(eachOne => (
                <li key={eachOne.id} className="li-container">
                  <div className="cart-card-container">
                    <img
                      className="dish-image"
                      alt="dish image"
                      src={eachOne.dishImage}
                    />
                    <div className="card-text-con">
                      <h1 className="card-dish-name">{eachOne.dishName}</h1>
                      <p className="card-dish-para">{eachOne.dishPrice}</p>
                    </div>
                    <div className="button-container">
                      <button
                        value={eachOne.id}
                        onClick={this.onDecrement}
                        className="buttons"
                      >
                        -
                      </button>
                      <p className="quantity">{eachOne.quantity}</p>
                      <button
                        value={eachOne.id}
                        onClick={this.onIncrement}
                        className="buttons"
                      >
                        +
                      </button>
                    </div>
                    <button
                      value={eachOne.id}
                      onClick={this.onDelete}
                      className="delete-button"
                    >
                      <MdDelete className="delete-icon" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className="empty-cart-container">
            <img
              className="empty-cart-img"
              alt="empty cart"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
            />
          </div>
        )}
      </div>
    );
  }
}

export default CartRoute
