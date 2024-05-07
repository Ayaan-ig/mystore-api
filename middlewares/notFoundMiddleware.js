const notFound = (req,res) => res.status(404).send('Route does not even exist')

module.exports = notFound