const isEmail = require("validator/lib/isEmail");
const isStrongPassword = require("validator/lib/isStrongPassword");
const isEmpty = require("validator/lib/isEmpty");
const { isAlpha } = require("validator");

 // fonction de vérification des entrées de l'utilisateur dans le formulaire

function validateRegister(fields) {
    console.log("🚀 ~ validateRegister ~ fields:", fields)
    const { firstname, lastname, email, password } = fields;
    const errors = { firstname: '', lastname: '', email: '', password: '' };
    console.log(Object.keys(errors));
    let success = true;

    if(!isEmpty(firstname)) { 
        if (isAlpha(firstname, 'fr-FR', { ignore: ' - '})) {
            console.log('validé champs firstname !');
            success = true;
        } else {
            errors.firstname = 'Ce type de format  n\'est pas accepté';
            success = false;
        }
    } else {
        errors.firstname  = 'That fields must not be empty'; 
        success = false;
    }

    if(!isEmpty(lastname)) { 
        if (isAlpha(lastname, 'fr-FR', { ignore: ' - '})) {
            console.log('validé champs lastname !');
            success = true;
        } else {
            errors.lastname = 'This type of format is not accepted';
            success = false;
        }
    } else {
        errors.lastname  = 'That fields must not be empty'; 
        success = false;
    }

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

module.exports = { validateRegister }