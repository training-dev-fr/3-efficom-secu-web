const express = require('express');
const router = express.Router();
const productController = require('./../controller/product.controller.js');
const auth = require('../middleware/auth.middleware.js');
const productOwner = require('../middleware/productOwner.middleware.js');

router.get('/', productController.getAll);
router.get('/:id', productController.getById);

router.post('/',auth, productController.create);

router.put('/:id',auth, productOwner, productController.update);
router.delete('/:id',auth, productOwner, productController.remove);

module.exports = router;