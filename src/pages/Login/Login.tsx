import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";

type LoginProps = {
  setIsLoggedIn: (value: boolean) => void
  setUserName: (value: string) => void
  setIsAdmin: (value: boolean) => void
}

export const Login = ({
  setIsLoggedIn,
  setUserName,
  setIsAdmin
}: LoginProps) => {

  const history = useHistory()

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleLogIn = (e: React.SyntheticEvent) => {
    e.preventDefault();

    if (login === 'admin') {
      if (password === '123456') setIsAdmin(true);
      else {
        alert('Введите правильный логин или пароль!');
        return false
      }
    }

    localStorage.setItem('isLoggedIn', 'true');
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
