const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegisterInput(data) {
    let errors = {};

    //conver the empty fields to an empty sring so we can use validator functions
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.password = !isEmpty(data.password) ? data.password : '';
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ?
        data.passwordConfirm :
        '';

    //check the names
    if (Validator.isEmpty(data.name)) {
        errors.name = 'name field is required';
    }

    // Email Checks
    if (Validator.isEmpty(data.email)) {
        errors.email = 'Email field is required';
    }

    // password checks
    if (Validator.isEmpty(data.password)) {
        errors.password = 'Password field is required';
    }

    if (Validator.isEmpty(data.passwordConfirm)) {
        errors.password = 'Confirm password field is required';
    }

    if (!Validator.isLength(data.password, { min: 8, max: 128 })) {
        errors.password = 'Password must be at least 8 characters';
    }

    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = 'Passwords must match';
    }
    //if registration passes basic validation allow registration
    return {
        errors,
        isValid: isEmpty(errors),
    };
};