const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')

const app = express()


//body-parsing middleware
app.use(express.urlencoded({extended:false}))
app.use(express.json())


// DB CONFIG
const db = require('./config/keys').mongoURI

mongoose
    .connect(db, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))


//Passport middle-ware
app.use(passport.initialize())

//Passport Config 
require('./config/passport.js')(passport)

//Routes
app.use('/api/users', users);
app.use('/api/profile', profile);
app.use('/api/posts', posts);



//BACKEND PORT
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}...`))