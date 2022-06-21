const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const jwtauthentication = require('../middlewares/authentication');
const { body, validationResult } = require('express-validator');
const usersdairy = require('../models').usersdairy;

exports.getDairy = [
    jwtauthentication,
    async (req, res) => {
        console.log('inside getdairy');
        try {
            const dairy_list = await usersdairy.findAll();
            return res.send({ status: 200, dairy_list });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];
exports.addEntryToDairy = [
    body('description')
        .isLength({ min: 5, max: 200 })
        .withMessage('description must be lenght of min 5 and max 200 characters'),
    body('date')
        .exists()
        .not()
        .isEmpty()
        .withMessage('date cannot be empty')
        .isISO8601('yyyy-mm-dd')
        .withMessage('start must be in correct format yyyy:mm:dd '),
     jwtauthentication,
    async (req, res) => {
        const { userid, description,date } =
            req.body;
        const newEntry = {
            userid,
            description,
            date,
        };
        console.log(`userid ${userid} description: ${description} date:${date}`);
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            try {
                const findEntry = await usersdairy.findOne({
                    where: { description,userid,date },
                });
                if (findEntry) {
                    return res.send({ status: 400, data: 'Entry already exist' });
                } else {
                    await usersdairy.create(newEntry);
                    return res.send({ status: 200, data: 'Entry created successfully' });
                }
            } catch (error) {
                return res.send({ status: 500, data: error.message });
            }
        }
    }
];
exports.editEntry = [
    body('description')
        .isLength({ min: 5, max: 200 })
        .withMessage('description must be lenght of min 5 and max 200 characters'),
    jwtauthentication,
    async (req, res) => {
        const id = req.params.userid;
        const errors = validationResult(req);
        console.log(errors);
        if (!errors.isEmpty()) {
            res.json({ status: 0, debug_data: errors });
        } else {
            try {
                const findEntry = await usersdairy.findOne({
                    where: { id },
                });
                if(!findEntry){
                    return res.send({status: 500, data:'No id Found'})
                }
                else{
                    findEntry.description = req.body.description;
                    findEntry.date=req.body.date;
                    await findEntry.save();
                    return res.send({ status: 200, data: 'Entry updated successfully' });
                }
                 } catch (error) {
                return res.send({ status: 500, data: error.message });
            }
        }
    },
];
exports.entryById = [
    jwtauthentication,
    async (req, res) => {
        const userid = req.params.userid;
        console.log("inside entrybyid");
        try {
            const findEntry = await usersdairy.findAll({
                where: { userid },
            });
            return res.send({ status: 200, entry_data: findEntry });
        } catch (err) {
            return res.send({ status: 500, data: err.message });
        }
    },
];
exports.deleteEntry = [
    jwtauthentication,
    async (req, res) => {
        const id = req.params.userid;
        try {
            const findEntry = await usersdairy.findOne({
                where: { id },
            });
            await findEntry.destroy();
            return res.json({ status: 200, message: 'entry Deleted successfully' });
        } catch (error) {
            return res.send({ status: 500, data: error.message });
        }
    },
];

exports.entryByDate = [
    jwtauthentication,
    async (req, res) => {
        console.log("inside entrybydate");
        const date = req.params.date;
        const userid=req.params.userid;
        try {
            const findEntry = await usersdairy.findAll({
                where: { userid,date },
            });
            return res.send({ status: 200, entry_data: findEntry });
        } catch (err) {
            return res.send({ status: 500, data: err.message });
        }
    },
];