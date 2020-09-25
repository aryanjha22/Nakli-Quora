const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validatePostInput(data){
    let errors = {}

    data.text = !isEmpty(data.text) ? data.text : ''
  
    if(!Validator.isLength(data.text, {min:5, max:200})){
        errors.text = 'Post length exceeds!'
    }

    if(Validator.isEmpty(data.text)){
        errors.text = "Question Empty!"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}