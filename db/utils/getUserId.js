const { default: axios } = require("axios");
const baseUrl = `https://be-prep-master.vercel.app/api`;

async function getUserId(){
    return axios.get(`${baseUrl}/users`)
    .then((response) => {
        if(response.data.users.length === 0){
            return 1
        }
        const user_ids = response.data.users.map((user) => {
            return user.user_id
        })
        const highestId = Math.max(...user_ids)
        return highestId + 1
    })
}

module.exports = {getUserId}