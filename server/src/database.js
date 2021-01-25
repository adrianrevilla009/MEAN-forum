const mongoose = require('mongoose');
const config = require('./config/database');

// DB connect and error
mongoose.connect(config.database, { useFindAndModify: false });
mongoose.connection.on('connected', () => {
    console.log('Connected to database', config.database)
});
mongoose.connection.on('error', (err) => {
    console.log('Database error', err)
});