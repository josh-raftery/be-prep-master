const { default: axios } = require("axios");
const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;  

function getMealId(user_id){
    return axios.get(`http://${host}:${port}/api/mealplan/${user_id}`)
    .then((response) => {
        return response.data.user.meals.length + 1
    })
    .catch((err) => {
        console.log(err, ' axios err ')
    })
}

module.exports = {getMealId}