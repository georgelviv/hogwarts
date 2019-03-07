const { API_MESSAGES_TYPES } = require('constants');

const getApiMessage = (data, type = API_MESSAGES_TYPES.info, meta = {}) => {
  return {
    type,
    data,
    ...meta
  };
};

module.exports = getApiMessage;
