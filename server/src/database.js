const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// mongoose options
const options = {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    autoIndex: false,
    poolSize: 10,
    bufferMaxEntries: 0
};

// mongodb environment variables
const {
    MONGO_DB,
    MONGO_USER,
    MONGO_PASSWORD
} = process.env;

const dbConnectionURL = {
    'URL': `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.yimfm.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`
};

// console.log("#####################################cavit:",`mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.yimfm.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`)

mongoose.connect(dbConnectionURL.URL, options);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongodb Connection Error:' + dbConnectionURL.URL));
db.once('open', () => {
    // we're connected !
    console.log('Mongodb Connection Successful');
});