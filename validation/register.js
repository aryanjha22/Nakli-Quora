const Validator = require('validator')
const isEmpty = require('./is-empty')

module.exports = function validateRegisterInput(data){
    let errors = {}

    data.first_name = !isEmpty(data.first_name) ? data.first_name : ''
    data.last_name = !isEmpty(data.last_name) ? data.last_name : ''
    data.email = !isEmpty(data.email) ? data.email : ''
    data.password = !isEmpty(data.password) ? data.password : ''
    data.password2 = !isEmpty(data.password2) ? data.password2 : ''

    if(!Validator.isLength(data.first_name, {min: 2, max:30})){
        errors.first_name = 'Name Invalid!'
    }

    if(!Validator.isLength(data.last_name, {min: 1, max:30})){
        errors.last_name = 'Name Invalid!'
    }

    if(Validator.isEmpty(data.first_name)){
        errors.first_name = "Field Empty!"
    }

    if(Validator.isEmpty(data.last_name)){
        errors.last_name = "Field Empty!"
    }

    if(!Validator.isEmail(data.email)){
        errors.email = "Email Invalid!"
    }

    if(Validator.isEmpty(data.email)){
        errors.email = "Field Empty!"
    }

    if(Validator.isEmpty(data.password)){
        errors.password = "Field Empty!"
    }

    if(!Validator.isLength(data.password, {min:6, max:30})){
        errors.password = "Password must be 6 characters long!"
    }

    if(Validator.isEmpty(data.password2)){
        errors.password2 = "Field Empty!"
    }

    if(!Validator.equals(data.password, data.password2)){
        errors.password2 = "Password must match!"
    }
    

    return {
        errors,
        isValid: isEmpty(errors)
    }
}