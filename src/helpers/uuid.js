const uuid = (len) => {
  return Array.from(new Array(len)).fill(0).map(() => {
    return Math.floor(Math.random() * 10);
  }).join('');
};

module.exports = uuid;
