const express = require('express')


const router = (db) => {
  const routes = express.Router();

  routes.get('/', (_, res) => {
    db.users.read()
      .then((users) => {
        res.send(users);
      });
  });

  routes.get('/:id', (req, res) => {
    const userId = req.params.id;
    db.users.read(userId)
      .then((user) => {
        if (!user) {
          res.status(404).send(`No user with id: ${ userId }`);
        } else {
          res.send(user);
        }
      });
  });

  routes.post('/', (req, res) => {
    // const userId = req.params.id;
    res.send('end');
    // db.users.read(userId)
    //   .then((user) => {
    //     if (!user) {
    //       res.status(404).send(`No user with id: ${ userId }`);
    //     } else {
    //       res.send(user);
    //     }
    //   });
  });

  return routes;
}

module.exports = router;