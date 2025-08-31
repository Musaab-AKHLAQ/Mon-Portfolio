const axios = require("axios");

currencyConverter(amount, baseCurrency, currencyToConvert, func) => {

axios
  .get(
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_8tnQN4xAf1z1RtutcG4gbE6DaaMowqm89m8EKdNt&base_currency=EUR"
  )

  .then((response) => {

    let result=amount * response.data.USD

    const message= `${amount} EUR > ${result} USD (taux de change appliqué: ${response.data.USD})`

    func(message)
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });

}