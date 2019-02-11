const { API_MESSAGES_TYPES } = require('constants');

const getApiMessage = (data, type = API_MESSAGES_TYPES.status) => {
  return {
    type,
    data
  };
};

module.exports = getApiMessage;
