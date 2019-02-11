const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');

const router = express.Router();

router.use(morgan('tiny'));
router.use(bodyParser.json());
router.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err);
  const response = getApiMessage('Something went wrong!', API_MESSAGES_TYPES.error);
  res.status(500).send(response);
});

module.exports = router;
