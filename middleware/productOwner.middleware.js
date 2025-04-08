const Product = require('./../model/product.model');

const productOwner = (req,res,next) => {
    let product = Product.getById(req.params.id);
    if(req.payload.id !== product.userId){
        return res.status(403).json({message: "Vous n'avez pas les droits pour gérer ce produit"});
    }
    next();
}

module.exports = productOwner;