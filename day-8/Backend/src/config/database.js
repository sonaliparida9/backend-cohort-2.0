const mongoose = require("mongoose");

async function connectToDB() {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined");
        }

        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        process.exit(1); // stop app if DB fails
    }
}

module.exports = connectToDB;