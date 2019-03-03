const { getApiMessage } = require('helpers');
const { API_MESSAGES_TYPES } = require('constants');

const handler = (fn) => {
  return (req, res) => {
    return Promise.resolve()
      .then(() => {
        return fn(req, res);
      })
      .then((result) => {
        let response = result;

        if (result) {
          if (result.data) {
            response = getApiMessage(result.data, API_MESSAGES_TYPES.data);
          }
          if (result.msg) {
            response = getApiMessage(result.msg, API_MESSAGES_TYPES.info);
          }
          if (result.error) {
            throw result;
          }

          res.send(response);
        }
      })
      .catch((err) => {
        console.log('err', err);
        if (err.statusCode && err.msg) {
          const response = getApiMessage(err.msg, API_MESSAGES_TYPES.error);
          res.status(err.statusCode).json(response);
        } else if (err.msg) {
          const response = getApiMessage(err.msg, API_MESSAGES_TYPES.error);
          res.status(500).json(response);
        } else {
          const response = getApiMessage(err, API_MESSAGES_TYPES.error);
          res.status(500).json(response);
        }
      });
  };
};

module.exports = handler;
