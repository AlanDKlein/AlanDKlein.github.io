// Function to retrieve the destination picture from Pixaby
let getPictures = (key, city, country) => {
  fetch(
    `https://pixabay.com/api/?key=${key}&category=places&q=${city}&image_type=photo`
  )
    .then((res) => {
      return res.json();
    })
    .then(function (data) {
      // If no pictures found for the city, try the country
      if (data.total === 0) {
        fetch(
          `https://pixabay.com/api/?key=${key}&category=places&q=${country}&image_type=photo`
        )
          .then((res) => {
            return res.json();
          })
          .then(function (data) {
            // If no pictures found for the city, display a message
            if (data.total === 0) {
              alert("No picutures were found for this destination");
              let pageURL = "../media/pexels-porapak-apichodilok-346885.jpg";
              document.getElementById("image").src = pageURL;
            } else {
              let pageURL = data.hits[0].webformatURL;
              document.getElementById("image").src = pageURL;
            }
          });
      } else {
        let pageURL = data.hits[0].webformatURL;
        document.getElementById("image").src = pageURL;
      }
    });
};
// export { getPictures }
