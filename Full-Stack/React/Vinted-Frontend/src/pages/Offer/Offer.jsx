import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useParams } from "react-router-dom";

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
    <div className="container">
      <p>Offer</p> <img src={data.product_image.secure_url} alt="clothe" />
      <p>{data.product_price} €</p>
      {data.product_details.map((product_detail, index) => {
        const keyName = Object.keys(product_detail);
        return (
          <div key={index}>
            <span>{keyName[0]}: </span>
            <span>{product_detail[keyName[0]]}</span>
          </div>
        );
      })}
      <p>{data.product_name}</p>
      <p>{data.product_description}</p>
      {data.owner.account.avatar?.secure_url && (
        <img src={data.owner.account.avatar.secure_url} alt="avatar" />
      )}{" "}
      <span>{data.owner.account.username}</span>
      <Link to="/payment" state={{ data: data }}>
        Acheter
      </Link>
    </div>
  );
};

export default Offer;
