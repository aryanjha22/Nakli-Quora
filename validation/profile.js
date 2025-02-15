const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateProfileInput(data){
    let errors = {}

    //change if change in profile db
    //only for required fields in db
    data.handle = !isEmpty(data.handle) ? data.handle : ''

    
    if(!Validator.isLength(data.handle, {min:2, max:40})){
        errors.handle = 'Handle Exceeds!'
    } 
        
    if(Validator.isEmpty(data.handle)){
        errors.handle = 'Handle required!'
    }

    //URL checking
    if(!isEmpty(data.twitter)){
        if(!Validator.isURL(data.twitter)){
            errors.twitter = 'Not valid URL!'
        }
    }    

    if(!isEmpty(data.facebook)){
        if(!Validator.isURL(data.facebook)){
            errors.facebook = 'Not valid URL!'
        }
    }    

    if(!isEmpty(data.linkedin)){
        if(!Validator.isURL(data.linkedin)){
            errors.linkedin = 'Not valid URL!'
        }
    }    

    if(!isEmpty(data.instagram)){
        if(!Validator.isURL(data.instagram)){
            errors.instagram = 'Not valid URL!'
        }
    }    
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}