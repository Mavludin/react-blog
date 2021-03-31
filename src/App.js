import "./App.css";
import { BlogContent } from "./components/BlogContent/BlogContent";
import { Footer } from "./components/Footer/Footer";
import { Header } from "./components/Header/Header";

export function App() {
  return (
    <div className="App">
      <Header />

      <main>
        <BlogContent random="Random props" />
      </main>

      <Footer year={new Date().getFullYear()} />
    </div>
  );
}
