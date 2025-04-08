const Role = require('./../model/role.model.js');

const getAll = (req,res,next) => {
    let result = Role.getAll();
    res.status(200).json(result);
}

const getById = (req,res,next) => {
    let result = Role.getById(req.params.id);
    res.status(200).json(result);
}

const create = (req,res,next) => {
    let result = Role.create({
        name: req.body.name
    });
    res.status(201).json(result);
}

const update = (req,res,next) => {
    let result = Role.update(req.params.id,req.body);
    res.status(201).json(result);
}

const remove = (req,res,next) => {
    let result = Role.remove(req.params.id);
    res.status(200).json(result);
}

module.exports = {getAll, create, getById,update,remove};