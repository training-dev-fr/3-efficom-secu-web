const {bdd} = require('./connection.js');
const User = require('./../model/user.schema.js');

const sync = async () => {
    await bdd.sync();
}

module.exports = sync;