let listProduct = require('./../data/product.json');
const fs = require('fs');
const USER_FILE = './data/product.json';
let currentId = listProduct.length > 0 ? Math.max(...listProduct.map(u => u.id)) : 0;

const save = () => {
    fs.writeFileSync(USER_FILE, JSON.stringify(listProduct));
}

const getAll = () => {
    return listProduct;
}

const getById = (id) => {
    return listProduct.find(product => product.id === parseInt(id));
}

const create = (product) => {
    let newProduct = { id: ++currentId };
    if (product.title) {
        newProduct.title = product.title;
    }
    if (product.description) {
        newProduct.description = product.description;
    }
    if (product.price) {
        newProduct.price = product.price;
    }
    if (product.userId) {
        newProduct.userId = product.userId;
    }
    listProduct.push(newProduct);
    save();
    return newProduct;
}

const update = (id, product) => {
    let productToUpdate = listProduct.find(product => product.id === parseInt(id));
    if (!productToUpdate) {
        return false;
    }
    if (product.title) {
        productToUpdate.title = product.title;
    }
    if (product.description) {
        productToUpdate.description = product.description;
    }
    if (product.price) {
        productToUpdate.price = product.price;
    }
    save();
}

const remove = (id) => {
    listProduct = listProduct.filter(product => product.id !== parseInt(id));
    save();
}



module.exports = { getAll, getById, create, update, remove };