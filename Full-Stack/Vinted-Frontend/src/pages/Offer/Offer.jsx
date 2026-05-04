import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Offer.css";

const Offer = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`,
        );
        //console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  return isLoading ? (
    <div>En cours de chargement ...</div>
  ) : (
    <div className="offer-body-background">
      <div className="offer-container">
        <section className="pic-section">
          <img src={data.product_image.secure_url} alt="clothe" />
        </section>
        <section className="details-section">
          <h3>{data.product_price} €</h3>
          {data.product_details.map((product_detail, index) => {
            const keyName = Object.keys(product_detail);
            return (
              <div key={index} className="offer-list">
                <p>{keyName[0]} </p>
                <p>{product_detail[keyName[0]]}</p>
              </div>
            );
          })}
          <div className="offer-detail">
            <p>{data.product_name}</p>
            <p>{data.product_description}</p>
          </div>
          <div className="offer-avatar-username">
            {data.owner.account.avatar?.secure_url && (
              <img src={data.owner.account.avatar.secure_url} alt="avatar" />
            )}{" "}
            <span>{data.owner.account.username}</span>
          </div>
          <Link to="/payment" className="buy-btn" state={{ data: data }}>
            Acheter
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Offer;
