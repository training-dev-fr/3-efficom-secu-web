const User = require('./../model/user.model.js');
const Role = require('./../model/role.model.js');
const bcrypt = require('bcrypt');

const getAll = (req, res, next) => {
    let result = User.getAll();
    res.status(200).json(result);
}

const getById = (req, res, next) => {
    let result = User.getById(req.params.id);
    res.status(200).json(result);
}

const create = (req, res, next) => {
    let member = Role.getByName("Member");
    if(!member){
        return res.status(404).json({message: "Le rôle Member n'as pas été trouvé"});
    }
    let result = User.create({
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        roles: [member.id]
    });
    res.status(201).json(result);
}

const update = (req, res, next) => {
    let result = User.update(req.params.id, req.body);
    res.status(201).json(result);
}

const remove = (req, res, next) => {
    let result = User.remove(req.params.id);
    res.status(200).json(result);
}

const addRole = (req, res, next) => {
    try {
        User.addRole(req.params.userId, req.params.roleId);
        return res.status(201).json({message: "Le rôle a bien été ajouté à l'utilisateur"});
    } catch (e) {
        return res.status(404).json(e.message);
    }
}

const removeRole = (req, res, next) => {
    try {
        User.removeRole(req.params.userId, req.params.roleId);
        return res.status(201).json({message: "Le rôle a bien été retiré de l'utilisateur"});
    } catch (e) {
        return res.status(404).json(e.message);
    }
}

module.exports = { getAll, create, getById, update, remove, addRole, removeRole };