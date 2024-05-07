const errorHandler = (req,res) =>res.status(500).send({msg:'something went wrong'})

module.exports = errorHandler;