const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://172.0.0.1:27017/jbbrntDB';

connect(connectionString);

module.exports = connection;
