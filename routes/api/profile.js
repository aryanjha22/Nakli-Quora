const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validateProfileInput = require('../../validation/profile')

//Models require
const Profile = require('../../models/Profile')
const User = require('../../models/User')


router.get('/test', (req,res) =>{res.json({msg : "Profile Works!"})})

//protected route -- get
router.get('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const errors = {}

    Profile.findOne({ user: req.user.id })
        .populate('user', ['first_name','last_name', 'avatar'])
        .then(profile =>{
            if(!profile){
                errors.nonprofile = "There is no profile for this user!"
                return res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})


//all profiles - public
router.get('/all', (req,res) =>{
    const errors = {}

    Profile.find()
        .populate('user', ['first_name','last_name', 'avatar'])
        .then(profiles =>{
            if(!profiles){
                errors.nonprofile = 'There is no profiles!'
                return res.status(404).json(errors)
            }
            res.json(profiles)
        })
        .catch(err => res.status(404).json({profile: 'There is no profile!'}))

})


//public - get - api/profile/handle/:handle
//for id fetching
router.get('/handle/:handle', (req,res) =>{
    const errors ={}

    Profile.findOne({handle: req.params.handle})
        .populate('user', ['first_name','last_name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.nonprofile = 'There is no profile for this user!'
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json(err))
})

//public - by user id
router.get('/user/:user_id', (req,res) =>{
    const errors = {}

    Profile.findOne({user: req.params.user_id})
        .populate('user', ['first_name','last_name', 'avatar'])
        .then(profile => {
            if(!profile){
                errors.nonprofile = 'There is no profile for this user!'
                res.status(404).json(errors)
            }
            res.json(profile)
        })
        .catch(err => res.status(404).json({profile: 'There is no profile for this user!'}))
})



//protected route -- post for create and update profile
router.post('/', passport.authenticate('jwt', {session: false}), (req,res) =>{
    const {errors, isValid} = validateProfileInput(req.body)

    //check validations
    if(!isValid){
        return res.status(400).json(errors)
    }

    //fields backend for profile
    const profileFields ={}
    profileFields.user = req.user.id
    //change if you change the model
    if(req.body.handle) profileFields.handle = req.body.handle
    if(req.body.location) profileFields.location = req.body.location
    if(req.body.bio) profileFields.bio = req.body.bio
    if(req.body.education) profileFields.education = req.body.education
    
    //social
    profileFields.social = {}
    if(req.body.twitter) profileFields.social.twitter = req.body.twitter
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin
    if(req.body.instagram) profileFields.social.instagram = req.body.instagram


    //if db data in form of array
    // if(typeof req.body.name_in_db !== 'undefined'){
    //     profileFields.skills = req.body.name_in_db.split(',')
    // }

    Profile.findOne({user: req.user.id})
        .then(profile =>{
            if(profile){
                //update
                Profile.findOneAndUpdate({user: req.user.id},
                    {$set: profileFields},
                    {new: true}
                    )
                    .then(profile => res.json(profile))
            } else{
                //create
                Profile.findOne({handle: profileFields.handle})
                    .then(profile =>{
                        if(profile){
                            errors.handle = 'That handle already exists!'
                            res.status(400).json(errors)
                        }

                        //save
                        new Profile(profileFields).save()
                            .then(profile =>res.json(profile))
                    })
            }
        })
})

//

module.exports = router;