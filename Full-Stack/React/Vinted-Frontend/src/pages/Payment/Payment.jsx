import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/CheckoutForm";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51TOFYkIRPtdhaRfl84MwBbvpousFwjrxt7vcjfbX46YD1Loin59FDuFPAWchQqoqyaaTsjp06D4w7ouyYc73sTbN00nAWVD6iX",
);

const Payment = () => {
  const location = useLocation().state;
  const { data } = location;
  console.log(data);
  const userToken = Cookies.get("userToken");

  console.log(userToken);
  const price = 20;

  const options = {
    mode: "payment",

    amount: Number((price * 100).toFixed(0)),

    currency: "eur",
  };

  return userToken ? (
    <Elements stripe={stripePromise} options={options}>
      {" "}
      <div>
        <span>Nom de l'offre:</span>
        <span>{data.product_name}</span>
      </div>
      <div>
        <span>Prix:</span>
        <span>{data.product_price}</span>
      </div>
      <CheckoutForm />
    </Elements>
  ) : (
    <Navigate to="/login" />
  );
};

export default Payment;
