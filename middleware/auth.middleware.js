const jwt = require("jsonwebtoken");
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    try {
        req.payload = jwt.verify(token, process.env.JWT_KEY);
        next();
    } catch (e) {
        return res.status(401).json({message: "Vous devez être authentifié pour réaliser cette action"});
    }
}

module.exports = auth;