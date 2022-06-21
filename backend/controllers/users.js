const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
const salt=bcrypt.genSaltSync(10);
const { body, validationResult } = require('express-validator');
const users = require('../models').users;
const jwtauthentication = require('../middlewares/authentication');
exports.getUsers = [
    jwtauthentication,
    async (req, res) => {
        try {
            const users_list = await users.findAll();
            return res.send({ status: 200, users_list });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];
exports.signupUser = [
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
        const { name, age, email, password } = req.body;
        const encryptpassword = bcrypt.hashSync(password,salt);
        console.log(encryptpassword);
        const newUser = {
            name,
            age,
            email,
            password: encryptpassword,
        };
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
        try {
            const findUser = await users.findOne({
                where: { email },
            });
            if (findUser) {
                return res.send({ status: 400, error: 'User with this email already exist' });
            } else {
                await users.create(newUser);
                return res.send({ status: 200, data: 'User Signup created successfully' });
            }
        } catch (error) {
            return res.send({ status: 500, error: error.message });
        }
    }
}
];
exports.loginUser = [
    body('email')
        .trim()
        .isEmail()
        .withMessage('invalid email format')
        .exists()
        .withMessage('email is required'),
    body('password')
        .trim()
        .exists()
        .withMessage('password is required')
        .isLength({ min: 8, max: 16 })
        .withMessage('password should range from 8 to 16 chars'),
async (req, res) => {
    const { email, password } = req.body;
    console.log(`email: ${req.body.email} password: ${password}`);
             const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
        res.json({ status: 500, debug_data: errors });
    } else {
    try {
        const userDetails = await users.findOne({ where: { email } });
        if (userDetails) {
            const passCorrect = await bcrypt.compareSync(password, userDetails.password);
             if (!passCorrect) {
                console.log(passCorrect);
                console.log(password);
                console.log(userDetails.password);
                res.status(400).json({ error: 'user credentials wrong' });
            } else {
                const payload = {
                    userDetails: {
                        email: email,
                        password: password,
                    },
                };
                const token = jwt.sign(payload, 'secret123', { expiresIn: 5200 });
                res.status(200).json({ token, userDetails });
            }
        } else {
            res.status(400).json({ error: 'email not exist' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'temporary error in backend' });
    }
}
}];

exports.getUserById = [
    jwtauthentication,
    async (req, res) => {
        const id = req.params.id;
        try {
            const findUser = await users.findOne({
                where: { id },
            });
            return res.send({ status: 200, users_data: findUser });
        } catch (err) {
            return res.send({ status: 500, data: err.message });
        }
    },
];
