const express = require('express');
const app = express();
const userRouter = require('./route/user.route.js');
const authRouter = require('./route/auth.route.js');
const productRouter = require('./route/product.route.js');
const roleRouter = require('./route/role.route.js');
const log = require('./middleware/log.middleware.js');

app.use(express.json());

app.use(log);

app.use('/user',userRouter);
app.use('/auth',authRouter);
app.use('/product',productRouter);
app.use('/role',roleRouter);


module.exports = app;