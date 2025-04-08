const express = require('express');
const router = express.Router();
const userController = require('./../controller/user.controller.js');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);

router.post('/', userController.create);

router.put('/:id', userController.update);
router.delete('/:id', userController.remove);

router.put('/role/:userId/:roleId', userController.addRole);
router.delete('/role/:userId/:roleId', userController.removeRole);

module.exports = router;