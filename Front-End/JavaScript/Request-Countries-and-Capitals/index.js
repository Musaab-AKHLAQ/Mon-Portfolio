const axios = require("axios");

axios
  .get(" https://countriesnow.space/api/v0.1/countries/capital")
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
