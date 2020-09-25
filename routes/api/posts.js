const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

const validatePostInput = require('../../validation/question')

//models
const Question = require('../../models/Question')
const Profile = require('../../models/Profile')

// /api/posts/test
router.get('/test', (req,res) =>{res.json({msg : "Posts Works!"})})

//get questions - public
router.get('/', (req,res) =>{
    Question.find()
        .sort({date :-1})
        .then((posts => res.json(posts)))
        .catch(err => res.status(404).json({nopostfound: 'No question found with that id!'}))
})

//get question by id - public
router.get('/:id', (req,res) =>{
    Question.findById(req.params.id)
        .then((post => res.json(post)))
        .catch(err => res.status(404).json({nopostfound: 'No question found with that id!'}))
})


//create question - private
router.post('/', passport.authenticate('jwt', {session:false}), (req,res) =>{
    const {errors, isValid} = validatePostInput(req.body)

    //check validation
    if(!isValid){
        return res.status(400).json(errors)        
    }

    const newQuestion = new Question({
        question: req.body.question,
        avatar: req.body.avatar,
        user: req.user.id
    })
    newQuestion.save()
        .then(question => res.json(question))

})


//delete question
router.delete('/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    Profile.findOne({user : req.user.id})
        .then(profile =>{
            Question.findById(req.params.id)
                .then(post =>{
                    //check question owner
                    if(post.user.toString() !== req.user.id){
                        return res.status(401).json({notauthorized : 'User unauthorized!'})
                    }
                    
                    //Delete
                    post.remove().then(() => res.json({success : true}))
                })
                    
                .catch(err => res.status(404).json({postnotfound: 'No question!'}))
        })
})


 
//Upvotes - post  api/posts/like/:id
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    Profile.findOne({user : req.user.id})
        .then(profile =>{
            Question.findById(req.params.id)
                .then(post =>{
                    //check already upvoted
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0){
                        return res.status(400).json({alreadyliked : 'User Already Liked this post!'}); 
                    }

                    //add user-id to likes
                    post.likes.unshift({user: req.user.id})

                    post.save().then(post => res.json(post))
                    
                })
                .catch(err => res.status(404).json({postnotfound: 'No question!'}))
        })
})



//Upvotes -- UNLIKEEEEEE - post  api/posts/like/:id
router.post('/unlike/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    Profile.findOne({user : req.user.id})
        .then(profile =>{
            Question.findById(req.params.id)
                .then(post =>{
                    //check already upvoted
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0){
                        return res.status(400).json({notLiked : 'You have not yet Liked this answer!'}); 
                    }

                    //get remove index
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id)
                    
                    //Splice out of array
                    post.likes.splice(removeIndex, 1)

                    post.save().then(post => res.json(post))
                    
                })
                .catch(err => res.status(404).json({postnotfound: 'No question!'}))
        })
})



//Comment - api/posts/comment/:id
router.post('/comment/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    //check validations
    const {errors, isValid} = validatePostInput(req.body)

    //check validation
    if(!isValid){
        return res.status(400).json(errors)        
    }

    Question.findById(req.params.id)
        .then(post =>{
            const newComment ={
                text: req.body.text,
                name: req.body.name,
                avatar : req.body.avatar,
                user: req.user.id
            }

            //add comments to array
            post.comments.unshift(newComment)

            //save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})



//Comment DELETE - api/posts/comment/:id/:comment_id
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', {session: false}), (req,res) =>{

    Question.findById(req.params.id)
        .then(post =>{
            //check if comment exist
            if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0){
                return res.status(404).json({commentnotexists: 'Comment doesnt exist!'})
            }
            //get remove index
            const removeIndex = post.comments
                .map(item => item._id.toString())
                .indexOf(req.params.comment_id)
            
                //splice the comment
                post.comments.splice(removeIndex, 1)

                post.save().then(post => res.json(post))

        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})





//ANSWER - api/posts/answer/:id
router.post('/answer/:id', passport.authenticate('jwt', {session: false}), (req,res) =>{
    //check validations
    const {errors, isValid} = validatePostInput(req.body)

    //check validation
    if(!isValid){
        return res.status(400).json(errors)        
    }

    Question.findById(req.params.id)
        .then(post =>{
            const newAnswer ={
                text: req.body.text,
                name: req.body.name,
                avatar : req.body.avatar,
                user: req.user.id
            }

            //add comments to array
            post.answers.unshift(newAnswer)

            //save
            post.save().then(post => res.json(post))
        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})



//ANSWER DELETE - api/posts/answer/:id/:answer_id
router.delete('/answer/:id/:answer_id', passport.authenticate('jwt', {session: false}), (req,res) =>{

    Question.findById(req.params.id)
        .then(post =>{
            //check if comment exist
            if(post.answers.filter(answer => answer._id.toString() === req.params.answer_id).length === 0){
                return res.status(404).json({answernotexists: 'Answer doesnt exist!'})
            }
            //get remove index
            const removeIndex = post.answers
                .map(item => item._id.toString())
                .indexOf(req.params.answer_id)
            
                //splice the comment
                post.answers.splice(removeIndex, 1)

                post.save().then(post => res.json(post))

        })
        .catch(err => res.status(404).json({postnotfound: 'No post found'}))
})

    
module.exports = router;