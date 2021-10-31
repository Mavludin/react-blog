import { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { PublicRoute } from "./components/PublicRoute/PublicRoute";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { LoginPage } from "./containers/LoginPage/LoginPage";
import { NoMatch } from "./containers/NoMatch/NoMatch";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  return (
    <Router>
      <div className="App">
        <Header
          userName={userName}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <main>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                if (isLoggedIn) return <Redirect to="/blog" />;
                return <Redirect to="/login" />;
              }}
            />

            <PublicRoute isLoggedIn={isLoggedIn} path="/login">
              <LoginPage
                setIsLoggedIn={setIsLoggedIn}
                setUserName={setUserName}
              />
            </PublicRoute>

            <PrivateRoute isLoggedIn={isLoggedIn} path="/blog">
              <BlogPage />
            </PrivateRoute>

            <Route path="*">
              <NoMatch />
            </Route>
          </Switch>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
