import { useState, useEffect } from "react";
import axios from "axios";
import logo from "./assets/deliveroo-logo.png";

function App() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur :", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  let subTotal = 0;
  cart.forEach((meal) => {
    subTotal += meal.quantity * meal.price;
  });

  const deliveryFees = 2.5;

  let total = cart.length > 0 ? subTotal + deliveryFees : 0;

  const addToCart = (meal) => {
    const newCart = [...cart];
    const mealExists = newCart.find((elem) => elem.id === meal.id);
    if (mealExists) {
      mealExists.quantity++;
    } else {
      const newMeal = { ...meal, quantity: 1 };
      newCart.push(newMeal);
    }
    setCart(newCart);
  };

  const removeFromCart = (meal) => {
    const newCart = [...cart];
    const mealInTab = newCart.find((elem) => elem.id === meal.id);
    if (mealInTab.quantity === 1) {
      const index = newCart.indexOf(mealInTab);
      newCart.splice(index, 1);
    } else {
      mealInTab.quantity--;
    }
    setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <>
      <header>
        <div className="container">
          <img className="logo" src={logo} alt="delivroo-logo" />
        </div>
      </header>
      <main>
        <div className="upper-container">
          <div className="container">
            <section className="hero">
              <div className="hero-text">
                <h2>{data.restaurant.name}</h2>
                <p>{data.restaurant.description}</p>
              </div>
              <div className="hero-img">
                <img src={data.restaurant.picture} alt={data.restaurant.name} />
              </div>
            </section>
          </div>
        </div>
        <div className="container">
          <div className="menu-left-container">
            {data.categories.map((category, index) => {
              if (category.meals.length > 0) {
                return (
                  <div key={index} className="category-container">
                    <h3>{category.name}</h3>
                    <div className="meals-container">
                      {category.meals.map((meal) => (
                        <div
                          key={meal.id}
                          className="meal-container"
                          onClick={() => {
                            addToCart(meal);
                          }}
                        >
                          <div className="meal-text">
                            <h4>{meal.title}</h4>
                            <p>{meal.description}</p>
                            <span>
                              {meal.price} €{" "}
                              {meal.popular && (
                                <span className="popular-star">
                                  ★ Populaire
                                </span>
                              )}
                            </span>
                          </div>
                          {meal.picture && (
                            <div className="meal-img">
                              <img src={meal.picture} alt={meal.title} />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
          </div>
          <div className="cart-right-container">
            <button
              className={cart.length > 0 ? "validate-btn" : "empty-cart-btn"}
            >
              Valider mon panier
            </button>
            {cart.length > 0 ? (
              <>
                <div className="cart-list">
                  {cart.map((meal, index) => {
                    return (
                      <div className="cart-line" key={index}>
                        <div className="cart-line-left">
                          <div className="cart-item-quantity">
                            <button
                              className="btn-qty"
                              onClick={() => {
                                removeFromCart(meal);
                              }}
                            >
                              -
                            </button>
                            <span>{meal.quantity}</span>
                            <button
                              className="btn-qty"
                              onClick={() => {
                                addToCart(meal);
                              }}
                            >
                              +
                            </button>
                          </div>
                          <span className="cart-item-title">
                            {" "}
                            {meal.title}{" "}
                          </span>
                        </div>
                        <div className="cart-item-price">
                          <span>
                            {(meal.price * meal.quantity).toFixed(2)} €
                          </span>{" "}
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="cart-total-result">
                  <div className="cart-subTotal-fees">
                    <div className="cart-line-detail">
                      <span>Sous-total :</span>{" "}
                      <span>{subTotal.toFixed(2)} €</span>
                    </div>
                    <div className="cart-line-detail">
                      <span>Frais de livraison:</span>
                      <span> 2,50 €</span>
                    </div>
                  </div>
                </div>
                <div className="cart-total">
                  <span>Total :</span> <span>{total.toFixed(2)} €</span>
                </div>
              </>
            ) : (
              <div className="cart-empty-message">Votre panier est vide</div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
