const mongoose= require('mongoose');
async function connectToMongoDB(url){
    return mongoose.connect(url,
        {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            serverSelectionTimeoutMS: 15000, // Increase timeout duration
            socketTimeoutMS: 45000 // Increase socket timeout
        }
    );
}

module.exports= {
    connectToMongoDB
}