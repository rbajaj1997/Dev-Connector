const mongoose = require('mongoose');
const config = require('config');

const db = config.get('mongoURI');
// mongodb+srv://rohit123:rohit123@cluster0-2k9rb.mongodb.net/test2?retryWrites=true&w=majority
const connectDB = async () => {
    try {
        await mongoose.connect(db,
            {
                useNewUrlParser: true,
                useCreateIndex: true,
                useUnifiedTopology: true,
                useFindAndModify: false
            });
        console.log('MongoDB Connected!');
    } catch (error) {
        console.error(error.message);
    }
}

module.exports = connectDB;