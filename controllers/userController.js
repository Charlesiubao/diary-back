const models = require('../models')

const  userController ={}

//signup
userController.create = async (req, res) => {
    try {
        const user = await models.user.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message})
    }
}

//login

userController.login = async(req, res) => {
    try {
      const user = await models.user.findOne({
        where: { email: req.body.email }
      })
  
      if (user.password === req.body.password) {
        res.json({ user, message: 'login successful' })
      } else {
        res.status(401).json({ message: 'login failed' })
      }
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: error.message })    
    }
  }





module.exports = userController