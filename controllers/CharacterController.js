const characterModel = require('../models/CharacterModel');
const userModel = require('../models/UserModel')
const xss = require('xss');


exports.getAllCharacters = async (req, res, next) => {
    try {
        const characters = await characterModel.getAllCharacters();
        console.log("🚀 ~ exports.getAllCharacters= ~ characters:", characters)
        if(characters.length > 0) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: characters
            })

        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: characters
            })

        }
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}

exports.putCharacter = async (req, res, next) => {
    console.log("🚀 ~ exports.putCharacter= ~ req.body:", req.body)
    console.log("🚀 ~ exports.putCharacter= ~ req.id:", req.id)
    console.log("🚀 ~ exports.putCharacter= ~ req.params.id:", req.params.id)

    let user = await userModel.getRoleUser(req.id);
    console.log("🚀 ~ exports.putCharacter= ~ user:", user)
    if(user[0].role === 'admin') {
        console.log('ADMIN !!!');
        try {
            const id = req.params.id;
            const cleanedNomCharacter = xss(req.body.nom)
            const cleanedPrenomCharacter = xss(req.body.prenom)
            const cleanedPictureCharacter = xss(req.body.picture)
            const cleanedProfessionCharacter = xss(req.body.profession)
            const cleanedPersonnageCharacter = xss(req.body.personnage)
            const cleanedPersonnageSuiteCharacter = xss(req.body.personnage_suite)
            const cleanedSlugCharacter = xss(req.body.slug)

            const body = {
                nom: cleanedNomCharacter,
                prenom: cleanedPrenomCharacter,
                picture: cleanedPictureCharacter,
                profession: cleanedProfessionCharacter,
                personnage: cleanedPersonnageCharacter,
                personnage_suite: cleanedPersonnageSuiteCharacter,
                slug: cleanedSlugCharacter
            }

            const putCharacter = await characterModel.putCharacter(id, body);
            console.log("🚀 ~ exports.putCharacter= ~ putCharacter:", putCharacter)
            if (putCharacter.affectedRows > 0 ) {
                return res.status(200).json({
                    status: 201,
                    msg: `The character ${cleanedNomCharacter} ${cleanedPrenomCharacter} has been updated !`,
                    results: putCharacter
                })
            } 




        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })

        }
    }
 

}

exports.postCharacter = async (req, res, next) => {
    console.log("🚀 ~ exports.postCharacter= ~ req:", req.body)
    console.log("🚀 ~ exports.postCharacter= ~ req:", req.id)

    let user = await userModel.getRoleUser(req.id);
    console.log("🚀 ~ exports.postCharacter= ~ user:", user)
    if(user[0].role === 'admin') {
        console.log('ADMIN !!!');
        try {
            const cleanedNomCharacter = xss(req.body.nom)
            const cleanedPrenomCharacter = xss(req.body.prenom)
            const cleanedPictureCharacter = xss(req.body.picture)
            const cleanedProfessionCharacter = xss(req.body.profession)
            const cleanedPersonnageCharacter = xss(req.body.personnage)
            const cleanedPersonnageSuiteCharacter = xss(req.body.personnage_suite)
            const cleanedSlugCharacter = xss(req.body.slug)

            const body = {
                nom: cleanedNomCharacter,
                prenom: cleanedPrenomCharacter,
                picture: cleanedPictureCharacter,
                profession: cleanedProfessionCharacter,
                personnage: cleanedPersonnageCharacter,
                personnage_suite: cleanedPersonnageSuiteCharacter,
                slug: cleanedSlugCharacter
            }

            const postCharacter = await characterModel.postCharacter(body);
            console.log("🚀 ~ exports.postCharacter= ~ postCharacter:", postCharacter)
            if (postCharacter.affectedRows > 0 ) {
                return res.status(200).json({
                    status: 201,
                    msg: `The character ${cleanedNomCharacter} ${cleanedPrenomCharacter} has been created !`,
                    results: postCharacter
                })
            } 


        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }
    
}


exports.getCharacterById = async  (req, res, next) => {
    console.log("🚀 ~ exports.getCharacterById= ~ req:", req.params.id)
    
        try {
            const id = req.params.id;
            const character = await  characterModel.getCharacterById(id);
            console.log("🚀 ~ exports.getCharacterById= ~ character:", character)
            if (character) {
                return res.status(200).json({
                    status: 200,
                    msg: 'character found',
                    results: character
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'character not found',
                    results: character
                })
    
            }
    
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    }


    exports.getCharacterByName = async  (req, res, next) => {
        console.log("🚀 ~ exports.getCharacterByName= ~ req:", req.params.name)
        
            try {
                const name = req.params.name;
                const character = await  characterModel.getTintinByName(name);
                console.log("🚀 ~ exports.getCharacterByName= ~ character:", character)
                if (character) {
                    return res.status(200).json({
                        status: 200,
                        msg: 'character found',
                        results: character
                    })
                } else {
                    return res.status(404).json({
                        status: 404,
                        msg: 'character not found',
                        results: character
                    })
        
                }
        
        
            } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
        
            }
        }

        exports.getCharacterBySLug = async  (req, res, next) => {
            console.log("🚀 ~ exports.getCharacterBySLug= ~ req:", req.params.slug)
            
                try {
                    const slug = req.params.slug;
                    const character = await  characterModel.getCharacterBySlug(slug);
                    console.log("🚀 ~ exports.getCharacterBySLug= ~ tintin:", character)
                    if (character) {
                        return res.status(200).json({
                            status: 200,
                            msg: 'character found',
                            results: character
                        })
                    } else {
                        return res.status(404).json({
                            status: 404,
                            msg: 'character not found',
                            results: character
                        })
            
                    }
            
            
                } catch (error) {
                    console.log('error register route', error.message);
                    res.status(500).json({ status: 500, msg: 'The server encountered an error' })
            
                }
            }

exports.deleteCharater = async (req, res, next) => {
    console.log("🚀 ~ exports.deleteCharater= ~ req.body.rate:", req.body.rate)
    console.log("🚀 ~ exports.deleteCharater= ~ req.id:", req.id)
    console.log("🚀 ~ exports.deleteCharater= ~ req.params.id:", req.params.id)
    
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.deleteTintin= getRoleUser ~ user:", user.role)
    if(user[0].role === 'admin') {
        console.log('User admin !');
        try {
            const id = req.params.id;
            const character = await characterModel.getCharacterById(id);
            console.log("🚀 ~ exports.deleteCharater ~ character:", character)
            const deleteCharacter = await characterModel.deleteCharacterById(req.params.id)
            console.log("🚀 ~ exports.deleteCharater ~ deleteCahracter:", deleteCharacter)
            if(deleteCharacter.affectedRows > 0 ) {
                return res.status(200).json({
                    msg: `the character ${character.nom} ${character.prenom} has been deleted !`,
                    results: deleteCharacter
               })
            }

        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })

        }
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });

    }

}


exports.uploadPicture = async  (req, res, next) => {
    console.log("🚀 ~ uploadPicture: ~ req:", req.files)  
    console.log("🚀 ~ exports.postTintin= ~ req.id:", req.id)
    let user = await userModel.getRoleUser(req.id)        
    console.log("🚀 ~ exports.postTintin= getRoleUser ~ user:", user.role)
    if (user[0].role === 'admin') {
        console.log('User admin !');
        try {
            if (!req.files || Object.keys(req.files).length === 0) {
                res.json({ status: 400, msg: "La photo n'a pas pu être récupérée" });
            } else {
                console.log('Il y a la présence d\'un fichier !');
                //on sauvegarde notre image dans le dossier que l'on souhaite
                req.files.image.mv('public/perso/' + req.files.image.name, function (err) {
                    console.log('ça passe', '/public/perso/' + req.files.image.name)
                    if (err) {
                        res.json({ status: 500, msg: "La photo n'a pas pu être enregistrée" })
                    } else {
                        res.json({ status: 200, msg: 'ok file registered', url: req.files.image.name });
                    }
                });
            }
                
        } catch (error) {
                console.log('error register route', error.message);
                res.status(500).json({ status: 500, msg: 'The server encountered an error' })
                    
        }
    
    } else {
        res.json({ status: 401, msg: 'unauthorized !' });
    }


}

        
    
    
