const {BadRequestError,UnauthenticatedError} = require('../errors/index');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes')

const login = async (req, res) => { 
    const { email, password } = req.body
  
    if (!email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({message:'Please provide email and password'})
      throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({ email })
    if (!user) {
      
      return res.status(StatusCodes.UNAUTHORIZED).json({message:'Please Create an Account'})
      throw new UnauthenticatedError('Please provide Valid Email');
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
      return res.status(StatusCodes.UNAUTHORIZED).json({message:'Invalid Password'})
      throw new UnauthenticatedError('Invalid Password');
    }
    const token = user.createJWT();
    // compare password 
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token })
  }
  
const register = async (req,res) =>{
    const {name, email, password} = req.body;
    if(!name || !email || !password){
        return res.status(StatusCodes.BAD_REQUEST).json({message:'Please provide all credentials'});
          throw BadRequestError('Please provide all credentials');
    }
    try {
      
      const user =await User.create({name,email,password});
      const token = user.createJWT();
      return res.status(StatusCodes.CREATED).json({user: {name :user.name},token});
    } catch (error) {
      console.log('here user creation error')
      console.log(`${error}`);
      return res.status(StatusCodes.BAD_REQUEST).json({err:error})

    }
}
const logout = (req,res) =>{
    return res.status(200).send('logout user')
}


module.exports = {login,register,logout}