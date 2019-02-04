const onExit = (cb) => {
  process.on('SIGTERM', cb);
  process.on('SIGINT', cb); 
};

module.exports = onExit;