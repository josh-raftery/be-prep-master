const mongoose = require("mongoose")
require('dotenv').config()
const MONGOURI = process.env.MONGOURI
function mongoDatabase(){
    
mongoose.connect(MONGOURI)
mongoose.connection.on("connected", ()=>{
console.log("database connected successfully");
})
mongoose.connection.on("error", (err)=>{
console.log(err);
console.log("an error occured");
})
}
module.exports = {mongoDatabase}