import { BrowserRouter as Router, Route, Switch,  } from "react-router-dom";
import "./App.css";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";
import { BlogPage } from "./containers/BlogPage/BlogPage";
import { LoginPage } from "./containers/LoginPage/LoginPage";

export function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <main>
          <Switch>
            <Route exact path="/" component={BlogPage} />
            <Route exact path="/login" component={LoginPage} />
          </Switch>
        </main>

        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
  );
}
