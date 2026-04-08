const isEmail = require("validator/lib/isEmail");
const isAlpha = require("validator/lib/isAlpha");
const isStrongPassword = require("validator/lib/isStrongPassword");
const isEmpty = require("validator/lib/isEmpty")


 // fonction de vérification des entrées de l'utilisateur dans le formulaire
 function validateLogin(fields) {
    const { email, password } = fields;
    const errors = { email: '', password: '' };
    console.log(Object.keys(errors));
    let success = true;


    if(!isEmpty(email)) { 
        if (isEmail(email)) {
            console.log('validé champs email !');
            success = true;
        } else {
            errors.email = 'This type of format is not accepted';
            success = false;
        }
    } else {
        errors.email  = 'That fields must not be empty'; 
        success = false;
    }

    if(!isEmpty(password)) { 
        if (isStrongPassword(password)) {
            console.log('validé champs password !');
            success = true;
        } else {
            errors.password = 'This type of format is not accepted';
            success = false;
        }
    } else {
        errors.password  = 'That fields must not be empty'; 
        success = false;
    }

    return { success, errors };



    
}

module.exports = validateLogin;
