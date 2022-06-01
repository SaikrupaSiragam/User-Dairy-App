const jwt = require('jsonwebtoken');
const bcrypt=require('bcrypt');
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
    async (req, res) => {
        const { name, age, email, password } = req.body;
        const newUser = {
            name,
            age,
            email,
            password,
        };
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
];
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    console.log(`request: ${req.body.email} password: ${password}`);
    try {
        const userDetails = await users.findOne({ where: { email } });
        console.log(userDetails.dataValues);
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
};

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
