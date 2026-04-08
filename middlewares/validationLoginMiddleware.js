const validateLogin = require("../utils/validatorLogin")

// middleware permettant de contrôler la validité des champs de fromaulaire login
const  mwValidateLogin  = (req, res, next) => {
    // reception les requêtes de  body
    const {email, password} = req.body


    // verification de tous les champs
    const results = validateLogin({email, password})
    console.log("🚀 ~ mwValidateLogin ~ results:", results)

    // si echec je renvoie une erreur
    if (results.success === false) {
        res.status(400).json({errors: results.errors})
        return 
    }
    // si success je continue avec next
    next()

}

module.exports =  mwValidateLogin;