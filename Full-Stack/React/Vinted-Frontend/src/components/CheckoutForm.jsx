import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = () => {
  const [errorMessage, setErrorMessage] = useState("");

  const [success, setSuccess] = useState(false);

  const [isPaying, setIsPaying] = useState(false);

  const stripe = useStripe();

  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsPaying(true);

      if (elements == null) {
        return;
      }

      const { error: submitError } = await elements.submit();

      if (submitError) {
        setErrorMessage(submitError.message);
        return;
      }

      const response = await axios.post("http://localhost:4000/payment");

      //console.log(response.data.client_secret);
      const clientSecret = response.data.client_secret;

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements: elements,
        clientSecret: clientSecret,

        confirmParams: {
          return_url: "http://localhost:5174/",
        },
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(error.message);
      }

      if (paymentIntent.status === "succeeded") {
        setSuccess(true);
      }
    } catch (error) {
      console.log(error);
    }
    setIsPaying(false);
  };
  return success ? (
    <p>Merci pour votre achat !</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button disabled={!stripe || !elements || isPaying}>Payer</button>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </form>
  );
};

export default CheckoutForm;
