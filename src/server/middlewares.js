const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getApiMessage } = require('helpers');

const router = express.Router();

router.use(morgan('tiny'));
router.use(bodyParser.json());
router.use((err, _, res) => {
  console.error(err);
  const response = getApiMessage('Something went wrong!');
  res.status(500).json(response);
});

module.exports = router;
