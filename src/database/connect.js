const mongoose = require('mongoose');

async function connectToDatabase() {
    await mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cursonodejs.9onvazp.mongodb.net/?retryWrites=true&w=majority`,
        err => {
            if (err) {
                return console.log('ocorreu errro: ', err)
            }
            return console.log('conectado ao db');
        }
    )
}

module.exports = connectToDatabase