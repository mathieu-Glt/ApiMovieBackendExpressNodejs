const fs = require('fs');
const parseurl = require('parseurl');
const multer  = require('multer');
const path = require('path');
const upload = require('../multerConfig');
const xss = require('xss');
const hergeModel = require('../models/HergeModel')


exports.getAllHerge = async (req, res, next) => {
    try {
        const herge = await hergeModel.getAllHerge();
        console.log("🚀 ~ exports.getAllHerge= ~ herge:", herge)
        if(herge.length > 0) {
            return res.status(200).json({
                status: 200,
                msg: 'Collection found',
                results: herge
            })

        } else {
            return res.status(404).json({
                status: 404,
                msg: 'Collection not found',
                results: herge
            })

        }
    } catch (error) {
        console.log('error register route', error.message);
        res.status(500).json({ status: 500, msg: 'The server encountered an error' })

    }
}


exports.getHergeById = async  (req, res, next) => {
    console.log("🚀 ~ exports.getHergeById= ~ req:", req.params.id)
    
        try {
            const id = req.params.id;
            const herge = await  hergeModel.getHergeById(id);
            console.log("🚀 ~ exports.getHergeById= ~ herge:", herge)
            if (herge.length > 0) {
                return res.status(200).json({
                    status: 200,
                    msg: 'herge found',
                    results: herge
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'herge not found',
                    results: herge
                })
    
            }
    
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    }
    
