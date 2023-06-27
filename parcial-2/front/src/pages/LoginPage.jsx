import { useNavigate, Link } from 'react-router-dom'
import { useState, useCallback } from 'react'
import './stylesPages/LoginPage.css'
import authService from '../services/auth.service'
import profileService from '../services/profile.service'

function LoginPage(){
    const navigate = useNavigate()
    let userData = {
      name: "aasdadssd",
      avatar: "https://fastly.picsum.photos/id/237/200/300.jpg",
      email: "example@example.com",
      company: "aadsadsadssd",
      userId: ""
    };
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    const onChangeUserName = useCallback((event) => {
        setUserName(event.target.value)
    }, [setUserName])

    const onChangePassword = useCallback((event) => {
        setPassword(event.target.value)
    }, [setPassword])

    const onSubmit = useCallback((event) => {
        event.preventDefault()

        authService.login({userName, password})
        .then(({account, token}) => {
          userData = {
            ...userData,
            userId: account._id
          }
          profileService.initProfile(userData, token)
            console.log("Session iniciada", {account, token})
            setError('')
            localStorage.setItem('token', token)
            navigate('/', {replace: true})
           
        })
        .catch(err => {
            setError(err.error.message)
        })
    }, [userName, password, navigate, setError])


    return (
        <div className="login-container">
          <form onSubmit={onSubmit} className="login-form">
            <h1 className="login-title">Iniciar Sesión</h1>
            <label className="login-label">
              Nombre de usuario:
              <input
                type="text"
                className="login-input"
                onChange={onChangeUserName}
                value={userName}
              />
            </label>
            <label className="login-label">
              Contraseña:
              <input
                type="password"
                className="login-input"
                onChange={onChangePassword}
                value={password}
              />
            </label>
            <p className="login-error">{error}</p>
            <button type="submit" className="login-submit">Entrar</button>
          </form>
          <p>No tienes cuenta haz click en</p>
          <Link to="/register" className="login-register-link">Regístrate</Link>
        </div>
      );
}

export default LoginPage