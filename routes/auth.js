const router = require('express').Router();
const User = require('../models/User');
const { registerValidation, loginValidation }= require('./validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

router.post('/register', async (req,res)=>{
    const { error } = registerValidation(req.body);
    if(error) return res.status.send(error.details[0].message)

    const existEmail = await User.findOne({email:req.body.email})
    if(existEmail) return res.status(400).send('email already exist')
    // hash password
     const salt = await bcrypt.genSalt(10);
     const hashPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name:req.body.name,
        email:req.body.email,
        password:hashPassword
    })
    try{
  const savedUser = await user.save();
  res.send(savedUser);
    }catch(err){
        res.status(400).send(err)
    }
})
router.post('/login', async (req, res)=>{
    const { error } = loginValidation(req.body);
    if(error) return res.status.send(error.details[0].message)

    const user = await User.findOne({email:req.body.email})
    if(!user) return res.status(400).send('email or password in not exist')
    // hash password
     const validPassword = await bcrypt.compare(req.body.password, user.password)
     if(!validPassword) return res.status(400).send('password wrong')

     const token = jwt.sign({_id:user._id},process.env.TOKEN_SECRET)

     res.header('auth-token',token).send(token)
})

module.exports = router;