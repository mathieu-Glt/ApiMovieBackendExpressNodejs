const authModel = require('../models/AuthModel')
const fs = require('fs');
const parseurl = require('parseurl');
const multer  = require('multer');
const path = require('path');
const upload = require('../multerConfig');
const xss = require('xss');


exports.getUser = async  (req, res, next) => {
    console.log("🚀 ~ exports.getUser= ~ req:", req.id)
    
        try {
            const id = req.id;
            const user = await  authModel.getUser(id);
            console.log("🚀 ~ exports.getUser= ~ user:", user)
            if (user) {
                return res.status(200).json({
                    status: 200,
                    msg: 'user found',
                    results: user
                })
            } else {
                return res.status(404).json({
                    status: 404,
                    msg: 'user not found',
                    results: user
                })
    
            }
    
    
        } catch (error) {
            console.log('error register route', error.message);
            res.status(500).json({ status: 500, msg: 'The server encountered an error' })
    
        }
    }
    