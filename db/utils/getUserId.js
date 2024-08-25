const { default: axios } = require("axios");
const host = process.env.HOST || 'localhost'; 
const port = process.env.PORT || 3000;  

function getUserId(){
    return axios.get(`http://${host}:${port}/api/users`)
    .then((response) => {
        return response.data.users.length + 1
    })
}

module.exports = {getUserId}