const getApiMessage = (message, type = 'error') => ({
  type,
  message,
});

module.exports = getApiMessage;
