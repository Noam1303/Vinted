const express = require('express');
const User = require("./models/User");
const router =  express.Router();
const SHA256 = require('crypto-js/sha256');
const encBase64 = require('crypto-js/enc-base64');
const uid2 = require("uid2");
require('dotenv').config(); 
const fileUpload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const { request } = require('http');

router.use(express.json());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const convertToBase64 = (file) => {
    return `data:${file.mimetype};base64,${file.data.toString("base64")}`;
}

router.post("/user/signup", fileUpload(), async(req, res) => {
    try{        
        const username = req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        let newsletter = req.body.newsletter;
        console.log(email);

        if(newsletter === "on") {
            newsletter = false;
        }
        else {
            newsletter = true;
        }
        
        const salt = uid2(16);
        const hash = SHA256(password + salt).toString(encBase64);
        const token = uid2(16);        
        if(username !== null && email !== null && password !== null && newsletter !== null){
            const userExist = await User.findOne({email: email});            
            if(userExist){
                console.log(userExist);                
                res.status(409).json({message: "an user already exist with this email"})
                return;
            }
            
            const newUser = new User({
                email: email,
                account: {
                    username: username,
                    avatar: null
                },
                newsletter: newsletter,
                token: token,
                hash: hash,
                salt: salt
            });
            await newUser.save();
            let pictureToUpload = null;
            let result = null;
            let result2 = null;
            if(req.body.file !== null && req.body.file !== undefined){
                pictureToUpload = req.body.file;              
                result = await cloudinary.uploader.upload(pictureToUpload, {
                    folder: "Vinted/user/"+newUser._id,
                    public_id: "avatar"
                });
                result2 = await User.findOneAndUpdate({_id: newUser._id},
                        { 
                            $set:{
                                "account.avatar": {
                                    cloud_id: result.public_id,
                                    secure_url: result.secure_url,
                                    width: result.width,
                                    height: result.height,
                                }
                            }
                        }
                    )
            }
            res.status(200).json({_id: newUser._id,                
                                token: newUser.token,
                                account:{
                                    username: newUser.account.username,
                                }
            })
            return;
    }
        else {
            res.status(400).json({message: "erreur sur les champs renseignés"})
        }
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Erreur lors de la création de l'utilisateur"})
    }
})

router.get("/user/:token", async(req, res) => {
    try{
        const token = req.params.token
        if(token && token.trim() !== ""){
            console.log(token);
            const result = await User.findOne({token: token});
            console.log(result);
            if(result) {
                res.status(200).json({
                    _id: result._id,
                    token: result.token,
                    account:{
                                username: result.account.username
                            }
                })
                return;
            }
            else {
                res.status(404).json({message: "User not found"});
                return;
            }
        }
        else {
            res.status(400).json({message: "Token manquant"})
            return;
        }
        
        
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Erreur lors de la récupération du token"})
    }
})


router.post("/user/login", async(req, res) => {
    try{
        const {email, password} = req.body;
        if(email !== null && password !== null){
            const findUser = await User.findOne({email: email});
            if(!findUser){
                res.status(404).json({message: "Utilisateur non trouvé"})
                return;
            }
            const hash = SHA256(password + findUser.salt).toString(encBase64);                        
            if(hash === findUser.hash){
                res.status(200).json({_id: findUser._id,
                                token: findUser.token,
                                account:{
                                    username: findUser.account.username
                                }
                })
                return;
            }
            else res.status(404).json({message: "Mot de passe incorrect"})
        }
        else res.status(400).json({message: "Erreur sur les champs renseignés"})
    }
    catch(error){
        console.error(error);
        res.status(500).json({message: "Erreur lors de la connexion"})
    }
})

module.exports = router;