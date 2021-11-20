import { useState } from "react";
import { useHistory } from "react-router";
import "./LoginPage.css";

export const LoginPage = ({
  setIsLoggedIn,
  setUserName,
  setIsAdmin
}) => {

  const history = useHistory()

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e) => {
    e.preventDefault();

    if (login === 'admin') {
      if (password === '123456') setIsAdmin(true);
      else {
        alert('Введите правильный логин или пароль!');
        return false
      }
    }

    localStorage.setItem('isLoggedIn', true);
    localStorage.setItem('userName', login);

    setUserName(login);
    setIsLoggedIn(true);
    history.push('/');

  }

  return (
    <h1>
      <form className="loginForm" onSubmit={handleLogIn}>
        <h2>Авторизация</h2>
        <div>
          <input
            className="loginFormInput"
            type="text"
            placeholder="Логин"
            onChange={handleLoginChange}
            value={login}
            required
          />
        </div>
        <div>
          <input
            className="loginFormInput"
            type="password"
            placeholder="Пароль"
            onChange={handlePasswordChange}
            value={password}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Войти
          </button>
        </div>
      </form>
    </h1>
  );
};
