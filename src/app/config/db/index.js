const mongoose = require('mongoose');

const connect = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/quanlibanhang');
        console.log("connect successfully !");
    } catch (error) {
            console.log('fail');
    }
}

module.exports = {connect};