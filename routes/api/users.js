const express = require('express')
const gravatar = require('gravatar')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//Validators
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


const User = require('../../models/User')

router.get('/test', (req,res) =>{res.json({msg : "User Works!"})})


//register
router.post('/register', (req,res) =>{
    const {errors, isValid} = validateRegisterInput(req.body)
    
    //Checking Validations
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({ email : req.body.email})
        .then(user =>{
            if(user){
                errors.email = 'Email already exists!'
                return res.status(400).json(errors)
            } else{
                const avatar = gravatar.url(req.body.email, {
                    s: '200',  //size
                    r: 'pg',   //rating
                    d: 'mm'    //default
                })

                const newUser = new User({
                    first_name: req.body.first_name,
                    last_name: req.body.last_name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password
                })

                bcrypt.genSalt(10, (err, salt) =>{
                    bcrypt.hash(newUser.password, salt, (err, hash) =>{
                        if(err) throw err;
                        newUser.password = hash;
                        newUser.save()
                            .then(user => res.json(user))
                            .catch(err => console.log(err))
                    })
                })
            }
        })
})

// LOGIN/returning JWT token
router.post('/login', (req,res)=>{
    const {errors, isValid} = validateLoginInput(req.body)
    
    //Checking Validations
    if(!isValid){
        return res.status(400).json(errors)
    }


    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email})
        .then(user => {
            //Check for User
            if(!user){
                errors.email = 'User not found!'
                return res.status(404).json(errors);
            }

            //password checking
            bcrypt.compare(password, user.password)
                .then(isMatch =>{
                    if(isMatch){
                        //jwt passing

                        const payload = { id: user.id, first_name: user.first_name, last_name: user.last_name, avatar: user.avatar}

                        //sign-in token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey,
                            { expiresIn: 3600}, 
                            (err, token)=>{
                                res.json({
                                    success:true,
                                    token: 'Bearer ' + token
                                })
                        })
                    } else{
                        errors.password = 'Password Incorrect!'
                        return res.status(400).json(errors);
                    }
                })
        })
})

//Protected Routes
router.get(
    '/current', 
    passport.authenticate('jwt', 
    {session:false}), 
    (req,res)=>{
        res.json({
            id: req.user.id,
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            email: req.user.email
        })
    })


module.exports = router;