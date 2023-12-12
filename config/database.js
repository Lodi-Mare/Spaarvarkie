const mongoose = require('mongoose');
const connectionStateArr = { '0': 'disconnected', '1': 'connected', '2': 'connecting', '3': 'disconnecting' };

const dbState = [
    {
        value: 0,
        label: "disconnected"
    },
    {
        value: 1,
        label: "connected"
    },
    {
        value: 2,
        label: "connecting"
    },
    {
        value: 3,
        label: "disconnecting"
    }

]

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://127.0.0.1:27017/spaarvarkie')
        let connectionState = mongoose.connection.readyState

        console.log('MongoDB connected: %d', connectionState);

    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDB;