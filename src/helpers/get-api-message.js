const getApiMessage = (message, type = 'error') => {
  return {
    type,
    message,
  }
};

module.exports = getApiMessage;
