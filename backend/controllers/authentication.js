const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    
    let user = await User.findOne({
        where: { email: req.body.email }
    })

    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        // res.session.userId = user.userId
        res.json({ user })                                       
    }
})
// Add a request handler to the authentication controller
router.get('/profile', async (req, res) => {
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        })
        res.json(user)
    } catch {
        res.json(null)
    }
})


// router.post('/super-important-route', async (req, res) => {
//     if(req.session.userId){
//         console.log('Do the really super important thing')
//         res.send('Done')
//     } else {
//         console.log('You are not authorized to do the super important thing')
//         res.send('Denied')
//     }
// })




module.exports = router