const express = require('express');
const imageController = require('../controllers/images');
const router = express.Router();


router.post('/:usersdairy_id',imageController.upload,imageController.multipleFileUpload);
router.get('/:usersdairy_id', imageController.getallMultipleFiles);


module.exports = router;