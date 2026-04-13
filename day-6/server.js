// server ko start krna 
// databasebse connect krna

const app = require('./src/app');
const mongoose = require('mongoose')

function connectToDb(){
    mongoose.connect("mongodb+srv://sonaliparida805_db_user:hzHY0ZVzuzwc5crQ@cluster0.up4rion.mongodb.net/day-5")
    .then(()=>{
        console.log("connected to database")
    })
}
connectToDb()



app.listen(3000, ()=>{
    console.log("server is running")
})