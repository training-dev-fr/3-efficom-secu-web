const Entities = require('./Entities.js');

const define = (name, schema) => {
    return new Entities(name,schema);
}

module.exports = {define};