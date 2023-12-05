const mongoose = require('mongoose');

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.DATABASE_URL)
        const connectionHost = conn.connection.host
         console.log('MongoDB connected: %d', connectionHost);

    }catch (err){
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;