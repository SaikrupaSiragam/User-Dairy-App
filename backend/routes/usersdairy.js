const express = require('express');
const dairyController = require('../controllers/usersdairy');
const router = express.Router();
router.get('/', dairyController.getDairy);
router.post('/:userid', dairyController.addEntryToDairy);
router.put('/:userid', dairyController.editEntry);
router.delete('/:userid', dairyController.deleteEntry);
router.get('/:userid/:date', dairyController.entryByDate);
router.get('/:userid', dairyController.entryById);

module.exports = router;
