const express = require('express');
const { userHandler } = require('hanlders');
const router = express.Router();

router.use('/users', userHandler);

router.use('*', (req, res) => {
  res.status(404).send('Not found');
});

module.exports = router;