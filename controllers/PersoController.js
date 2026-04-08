const fs = require('fs');
const parseurl = require('parseurl');
const multer  = require('multer');
const path = require('path');
const upload = require('../multerConfig');
const xss = require('xss');
const persoModel = require('../models/PersoModel')

exports.getAllPersoTintin = async (req, res, next) => {
    try {
        const persoTintin = await persoModel.getAllPerso();
        console.log("🚀 ~ exports.getAllHerge= ~ herge:", persoTintin)
        if(persoTintin.length > 0) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: persoTintin
            })

        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: persoTintin
            })

        }
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}


exports.getPersoTintinById = async  (req, res, next) => {
    console.log("🚀 ~ exports.getPersoTintinById= ~ req:", req.params.id)
    
        try {
            const id = req.params.id;
            const persoTintin = await  persoModel.getPersoById(id);
            console.log("🚀 ~ exports.getPersoTintinById= ~ herge:", persoTintin)
            if (persoTintin.length > 0) {
                return res.status(200).json({
                    status: 200,
                    msg: 'persoTintin found',
                    results: persoTintin
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'persoTintin not found',
                    results: persoTintin
                })
    
            }
    
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    }

