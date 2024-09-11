const { default: axios } = require("axios");
// const host = process.env.HOST || 'localhost'; 
// const port = process.env.PORT || 3000;  
const baseUrl = process.env.API_URL

function getMealId(user_id){
    return axios.get(`${baseUrl}/api/mealplan/${user_id}`)
    .then((response) => {
        if(response.data.user.meals.length === 0){
            return 1
        }
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