const jwt = require('jsonwebtoken');
const   users = require('../models').users;
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
        const {name,age,mobile,email,password } =req.body;
        const newUser = {
            name,
            age,
            mobile,
            email,
            password,
        };
        try {
            const findUser = await users.findOne({
                where: { email},
            });
            if (findUser) {
                return res.send({ status: 400, data: 'User with this email already exist' });
            } else {
                await users.create(newUser);
                return res.send({ status: 200, data: 'User Signup created successfully' });
            }
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    }
];

exports.loginUser = async (req, res) => {
    console.log("inside login");
    const { email, password } = req.body;
    try {
        const userDetails = await users.findOne({ where: { email} });
       if (!userDetails) {
                res.status(400).json({ error: 'user credentials wrong' });
            } else {
                const payload = {
                    userDetails: {
                        email: email,
                        password: password,
                    },
                };
                const token = jwt.sign(payload, 'secret123', { expiresIn: 1200 });
                res.status(200).json({ token, userDetails });
            }
    } catch (error) {
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