const Product = require('../models/Product');
const statusCodes = require('http-status-codes');
const {NotFoundError} = require('../errors/index');

const getAllProducts = async (req,res)=>{
    const products = await Product.find({createdBy: req.user.userId}).sort('createdAt');
    res.status(statusCodes.OK).json({products,count: products.length});
}

const getSingleProduct =async (req,res)=>{
    const {user: {userId}, params: {productId}} = req;
    const product = await Product.find({_id: productId,createdBy:userId});
    
}
const deleteProduct =async (req,res)=>{
    const {user: {userId}, params: {productId}} = req;
    const product = await Product.findOneAndDelete({_id: productId,createdBy:userId});
    
    if (!product) {
        throw new NotFoundError(`no product with id ${productId}`)
    }
    
    res.status(statusCodes.OK).send();
}
const updateQuantity =async (req,res)=>{
    const {body: {count},user:{userId},params:{productId}} = req

    const product = await Product.findOneAndUpdate({createdBy:userId,id: productId},{count:count});
    product.count = count;
    res.status(statusCodes.OK).json({product});
} 
const createProduct = async(req,res)=>{
    req.body.createdBy = req.user.userId;
    const product = await Product.create(req.body);

    res.status(statusCodes.OK).json(product);
}
module.exports = {
    getAllProducts,getSingleProduct,createProduct,deleteProduct,updateQuantity
}