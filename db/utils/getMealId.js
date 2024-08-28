const { default: axios } = require("axios");
const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;  

function getMealId(user_id){
    return axios.get(`http://${host}:${port}/api/mealplan/${user_id}`)
    .then((response) => {
        const meal_ids = response.data.user.meals.map((meal) => {
            return meal.meal_id
        })
        const highestId = Math.max(...meal_ids)
        return highestId + 1
    })
    .catch((err) => {
        console.log(err, ' axios err ')
    })
}

module.exports = {getMealId}