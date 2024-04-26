import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {username: '', password: '', showError: false, errroMsg: ''}

  getUserDetails = async () => {
    const {username, password} = this.state
    const userDetails = {
      username,
      password,
    }
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    if (response.ok) {
      const token = data.jwt_token
      const {history} = this.props
      Cookies.set('jwt_token', token, {expires: 20})
      history.replace('/')
    } else {
      const errorMsg = data.error_msg
      this.setState({showError: true, errorMsg})
    }
  }

  onChangeUsername = event => {
    const {value} = event.currentTarget
    this.setState({username: value})
  }

  onChangePassword = event => {
    const {value} = event.currentTarget
    this.setState({password: value})
  }

  onLoginSubmit = event => {
    event.preventDefault()
    this.getUserDetails()
  }

  render() {
    const {username, password, showError, errorMsg} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-page-container">
        <form className="form-container" onSubmit={this.onLoginSubmit}>
          <h1 className="heading">Enter Login Details!</h1>
          <div className="input-container">
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              placeholder="username"
              className="input"
              id="username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="input-container">
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <input
              className="input"
              type="password"
              placeholder="password"
              id="password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <button className="login-button" type="submit">
            Login
          </button>
          {showError && <p className="error-para">{errorMsg}</p>}
        </form>
      </div>
    )
  }
}

export default Login
