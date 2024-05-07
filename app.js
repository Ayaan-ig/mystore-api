require('dotenv').config()


const express = require('express');
const cors = require('cors')

const app = express();

const connectDB = require('./db/connect');
const productRouter = require('./routes/products');
const authRouter = require('./routes/auth')


const notFoundMiddleware = require('./middlewares/notFoundMiddleware')
const errorHandler = require('./middlewares/error-handler')    

const authenticationMiddleware = require('./middlewares/authentication')

app.use(express.json());
app.use(cors())

//routes

app.get('/',(req,res)=>res.send('<h1>Cart API</h1> <a href="/api/v1/cart">go to cart api</a>'))

app.use('/api/v1/cart',authenticationMiddleware,productRouter);
app.use('/api/v1/auth',authRouter);

app.use(notFoundMiddleware);
app.use(errorHandler);

const port = process.env.PORT || 3000;

const start = async ()=>{
    try {
        
        await connectDB(process.env.MONGO_URI);
        app.listen(port,console.log(`server is listening on port ${port}`) )
    } catch (error) {
        console.error(error);
    }
}

start();