const Product = require('./../model/product.model.js');

const getAll = (req,res,next) => {
    let result = Product.getAll();
    res.status(200).json(result);
}

const getById = (req,res,next) => {
    let result = Product.getById(req.params.id);
    res.status(200).json(result);
}

const create = (req,res,next) => {
    let result = Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        userId: req.payload.id
    });
    res.status(201).json(result);
}

const update = (req,res,next) => {
    let result = Product.update(req.params.id,req.body);
    res.status(201).json(result);
}

const remove = (req,res,next) => {
    let result = Product.remove(req.params.id);
    res.status(200).json(result);
}

module.exports = {getAll, create, getById,update,remove};