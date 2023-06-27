import { useNavigate, Link } from 'react-router-dom'
import { useState, useCallback } from 'react'
import authService from '../services/auth.service'
import './stylesPages/RegisterPage.css'

function RegisterPage(){
    const navigate = useNavigate()

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

        authService.register({userName, password})
        .then(({account, token}) => {
            console.log("Registrado", {account, token})
            setError('')
            localStorage.setItem('token', token)
            navigate('/login', {replace: true})
           
        })
        .catch(err => {
            setError(err.error.message)
        })
    }, [userName, password, navigate, setError])


    return (
        <div className="register-container">
          <form onSubmit={onSubmit} className="register-form">
            <h1 className="register-title">Registrarse</h1>
            <label className="register-label">
              Nombre de usuario:
              <input
                type="text"
                className="register-input"
                onChange={onChangeUserName}
                value={userName}
              />
            </label>
            <label className="register-label">
              Contraseña:
              <input
                type="password"
                className="register-input"
                onChange={onChangePassword}
                value={password}
              />
            </label>
            <p className="register-error">{error}</p>
            <button type="submit" className="register-submit">Registrarse</button>
          </form>
          <p className="register-login-link">¿No tienes una cuenta? Haz clic en <Link to="/login">Iniciar Sesión</Link></p>
        </div>
      );
}

export default RegisterPage