import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";

import rip from "../../assets/img/rip.svg";

const Home = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/");
      //console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log("Erreur: ", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return isLoading ? (
    <p>En cours de chargement ... </p>
  ) : (
    <>
      <section className="hero">
        <div className="container">
          <div className="hero-card">
            <h1>Prêts à faire du tri dans vos placard ?</h1>
            <Link to="/publish" className="sold-btn-hero">
              Commencer à vendre
            </Link>
          </div>
        </div>
        <img className="rip-img" src={rip} alt="rip-img" />
      </section>
      <div className="container">
        <div className="home-card-wrapper">
          {data.offers.map((offer) => {
            return (
              <Link
                key={offer._id}
                to={`/offer/${offer._id}`}
                className="card-container"
              >
                <div className="card-avatar-username">
                  {offer.owner.account.avatar?.secure_url && (
                    <img
                      src={offer.owner.account.avatar.secure_url}
                      alt="avatar"
                    />
                  )}
                  <span>{offer.owner.account.username}</span>
                </div>
                <img src={offer.product_image.secure_url} alt="clothe" />
                <div className="card-details">
                  <ol>
                    <li>
                      <p>{offer.product_price} €</p>
                    </li>
                    {offer.product_details.map((product_detail, index) => {
                      return (
                        <span key={index}>
                          {product_detail.TAILLE && (
                            <li>
                              {" "}
                              <h4>{product_detail.TAILLE}</h4>
                            </li>
                          )}
                          {product_detail.MARQUE && (
                            <li>
                              <h4>{product_detail.MARQUE}</h4>
                            </li>
                          )}
                        </span>
                      );
                    })}
                  </ol>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Home;
