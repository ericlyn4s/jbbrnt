const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://172.17.0.2:27017/jbbrntDB';

connect(connectionString);

module.exports = connection;
