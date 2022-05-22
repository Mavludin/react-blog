import { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import { AppRoutes } from './AppRoutes';
import { Footer } from './components/Footer/Footer';
import { Header } from './components/Header/Header';

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [userName, setUserName] = useState(localStorage.getItem('userName'));
  const [isAdmin, setIsAdmin] = useState(
    localStorage.getItem('userName') === 'admin'
  );

  return (
    <Router>
      <div className='App'>
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          setIsAdmin={setIsAdmin}
        />

        <main>
          <AppRoutes
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            setUserName={setUserName}
            setIsAdmin={setIsAdmin}
            isAdmin={isAdmin}
          />
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
