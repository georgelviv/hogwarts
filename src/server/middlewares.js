const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser')

const router = express.Router();

router.use(morgan('tiny'));
router.use(bodyParser.json());
router.use(function (err, _, res, _) {
  console.error(err)
  res.status(500).send('Something went wrong!')
})

module.exports = router;
