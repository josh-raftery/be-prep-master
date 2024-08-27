const { default: axios } = require("axios");
const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;  

function getBasketId(){
   
    return axios.get(`http://${host}:${port}/api/baskets`)
    .then((response) => {
        return response.data.baskets.length + 1
    })
    .catch((err) => {
        console.log(err, ' axios err ')
    })
}

module.exports = {getBasketId}