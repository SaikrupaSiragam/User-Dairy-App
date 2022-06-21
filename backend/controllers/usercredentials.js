const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwtauthentication = require('../middlewares/authentication');
const usercredentials = require('../models').usercredentials;
exports.getUserCredentials = [
    async (req, res) => {
        try {
            const credentials = await usercredentials.findAll();
            return res.send({ status: 200, credentials });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];
exports.addNewCredentials = [
    body('platform')
        .trim()
        .isLength({ min: 4, max: 50 })
        .withMessage('platform should have length min 4 and max 50 chars'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('invalid email format')
        .exists()
        .withMessage('email is required'),
    body('password')
        .trim()
        .exists()
        .withMessage('email is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('password should range from 8 to 16 chars'),
    jwtauthentication,
    async (req, res) => {
        const userid = req.params.userid;
        const { platform, email, password } =
            req.body;
            console.log("inside add")
            console.log(platform)
        const newCredentials = {
            userid,
            platform,
            email,
            password
        };
        const errors = validationResult(req);
        console.log(errors);
        console.log(newCredentials);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            try {
                const findCredentials = await usercredentials.findOne({
                    where: { userid,email,password,platform },
                });
                if (!findCredentials) {
                    await usercredentials.create(newCredentials);
                    return res.send({ status: 200, data: 'Credentials created successfully' });
                }
                else {
                    return res.send({ status: 500, message: 'User exist with this credentials' })
                }

            }
            catch (error) {
                return res.send({ status: 500, data: error.message });
            }
        }
    }
];
exports.editCredentials = [
    jwtauthentication,
    body('platform')
        .trim()
        .isLength({ min: 4, max: 50 })
        .withMessage('platform should have length min 4 and max 50 chars'),
    body('email')
        .trim()
        .isEmail()
        .withMessage('invalid email format')
        .exists()
        .withMessage('email is required'),
    body('password')
        .trim()
        .exists()
        .withMessage('email is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('password should range from 8 to 16 chars'),
    async (req, res) => {
        const userid = req.params.userid;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            try {
                const findCredentials = await usercredentials.findOne({
                    where: { userid },
                });
                findCredentials.platform = req.body.platform;
                findCredentials.email = req.body.email;
                findCredentials.password = req.body.password;

                await findCredentials.save();
                return res.send({ status: 200, data: findCredentials });
            } catch (error) {
                return res.send({ status: 500, data: error.message });
            }
        }
    },
];
exports.credentialsById = [
    jwtauthentication,
    async (req, res) => {
        const userid = req.params.userid;
        console.log(userid);
        try {
            const findCredentials = await usercredentials.findAll({
                where: { userid },
            });
            return res.send({ status: 200, data: findCredentials });
        } catch (err) {
            return res.send({ status: 500, data: err.message });
        }
    },
];
exports.deleteCredentials = [
    jwtauthentication,
    async (req, res) => {
        const id = req.params.userid;
        try {
            const findCredentials = await usercredentials.findOne({
                where: { id },
            });
                await findCredentials.destroy();
                return res.json({ status: 200, message: 'credentials Deleted successfully' });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];