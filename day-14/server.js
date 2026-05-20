require("dotenv").config();
const app = require("./src/app");
const connectToDatabase = require("./src/config/database");

connectToDatabase();


app.listen(8000, () => {
    console.log("Server is running on port 8000");
})