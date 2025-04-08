let listRole = require('./../data/role.json');
const fs = require('fs');
const USER_FILE = './data/role.json';
let currentId = listRole.length > 0 ? Math.max(...listRole.map(u => u.id)) : 0;

const save = () => {
    fs.writeFileSync(USER_FILE, JSON.stringify(listRole));
}

const getAll = () => {
    return listRole;
}

const getById = (id) => {
    return listRole.find(role => role.id === parseInt(id));
}

const getByName = (name) => {
    return listRole.find(role => role.name === name);
}

const create = (role) => {
    let newRole = { id: ++currentId };
    if (role.name) {
        newRole.name = role.name;
    }
    listRole.push(newRole);
    save();
    return newRole;
}

const update = (id, role) => {
    let roleToUpdate = listRole.find(role => role.id === parseInt(id));
    if (!roleToUpdate) {
        return false;
    }
    if (role.name) {
        roleToUpdate.name = role.name;
    }
    save();
}

const remove = (id) => {
    listRole = listRole.filter(role => role.id !== parseInt(id));
    save();
}



module.exports = { getAll, getById, create, update, remove, getByName };