const models = require('../models')
const user = require('../models/user')
const journalController = {}

journalController.create = async (req, res) => {
    try {
        // find a user, if there is an user, let it create a post
        const user = await models.user.findOne({
            where: {id: req.headers.authorization}
        })
        console.log(user)
        if(user === null ){
            res.status(404).json({message: 'user not found'})
            return
        }
        
        const newPost = await models.post.create({
            date: req.body.date,
            entry: req.body.entry
        })
        await user.addPost(newPost)
        await newPost.reload()
        //Reload() is a good option when the association doesn't if you db has it, but your JS doesn't have it like when you test it i postman, that's when you want to use reload, so Post is up to date(it has what db has)
        res.json({user, newPost})
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

journalController.getJournal = async (req, res) => {
    try {
        let allPosts = await models.post.findAll({include:models.user})
        //I wanted to add user's name along with post's title that's why I am using include

        
          res.json({allPosts})
    } catch (error) {
        res.json({error})
    }
}

journalController.getSinglePost = async (req, res) => {
    try {
        let singlePost = await models.post.findOne({
            where:{
                id: req.params.id
            }
        })

        let user = await singlePost.getUser()
        
          res.json({singlePost, user})
    } catch (error) {
        res.json({error})
    }
}

module.exports = journalController