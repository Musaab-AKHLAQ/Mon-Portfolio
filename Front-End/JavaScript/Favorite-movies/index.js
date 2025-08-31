const axios = require("axios");

axios
  .get("https://www.omdbapi.com/?t=inception&apikey=c7678f53")

  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });

axios
  .get("https://www.omdbapi.com/?t=interstellar&apikey=c7678f53")

  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });

axios
  .get("https://www.omdbapi.com/?t=a-space-odyssey&apikey=c7678f53")

  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.message);
  });
