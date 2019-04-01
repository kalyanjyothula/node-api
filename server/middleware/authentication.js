const { users } = require('../models/user');

let authentication = (req, res, next) => {
  const token = req.header("x-auth");

  users
    .findByToken(token) 
    .then(user => {
      if (!user) {
        return res.status(401).send();
      }
      req.user = user;
      req.token = token;
      next();
    })
    .catch(err => {
      res.status(401).send();
    });
};

module.exports = { authentication };

