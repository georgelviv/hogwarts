const express = require('express')
const morgan = require('morgan');
const router = express.Router();

router.use(morgan('tiny'));


module.exports = router;
