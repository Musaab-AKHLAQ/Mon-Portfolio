import "./App.css";
import Header from "./components/Header";
import Counter from "./components/Counter";
import Footer from "./components/Footer";

const App = () => {
  return (
    <>
      <Header />
      <main>
        <Counter />
      </main>
      <Footer />
    </>
  );
};
export default App;
