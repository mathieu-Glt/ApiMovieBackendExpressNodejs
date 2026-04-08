const { validateRegister } = require("../utils/validatorRegister")

// middleware permettant de contrôler la validité des champs de fromaulaire regsiter
const mwValidateRegister = (req, res, next) => {
    // reception les requêtes de  body
    const {firstname, lastname, email, password} = req.body


    // verification de tous les champs
    const results = validateRegister({firstname, lastname, email, password})
    console.log("🚀 ~ mwValidateRegister ~ results:", results)

    // si echec je renvoie une erreur
    if (results.success === false) {
        res.status(400).json({errors: results.errors})
        return 
    }
    // si success je continue avec next
    next()

}

module.exports = mwValidateRegister;