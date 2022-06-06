const express = require('express');
const credentialController = require('../controllers/usercredentials');
const router = express.Router();
router.get('/', credentialController.getUserCredentials);
router.post('/:userid', credentialController.addNewCredentials);
router.put('/:userid', credentialController.editCredentials);
router.delete('/:userid', credentialController.deleteCredentials);
router.get('/:userid', credentialController.credentialsById);

module.exports = router;
