const express= require('express');
// const { body } = require('express-validator');


const AuthController =require('../controllers/authController');
const router =express.Router();


router.route("/register").post(AuthController.registerController);

module.exports =router;