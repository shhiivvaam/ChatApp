const mongoose = require('mongoose')
require('dotenv').config();

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: true
        })

        console.log('Database Connected Successfully.'.bgBrightGreen);
    } catch(error) {
        console.log('Database Connection failed');
        console.log(error.message);
        console.log(error);
        process.exit(1);
    }
}

module.exports = connectDB;