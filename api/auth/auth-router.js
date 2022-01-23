const router = require('express').Router();
const { BCRYPT_ROUNDS,JWT_SECRET } = require('../../config');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const database = require ('../../data/dbConfig')

router.post('/register', (req, res) => {
  const user = req.body
  const hash = bcrypt.hashSync(user.password, BCRYPT_ROUNDS)
  user.password = hash
  database('users')
    .insert(user)
    .then((ids) => {
      res.status(201).json(ids);
    })
    .catch((err) => res.status(400).json(err));
});


router.post('/login', (req, res, next) => {
  let { username, password } = req.body
  database('users')
    .where({ username: username })
    .first()
  .then((user) => {
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = makeToken(user)
      res.status(200).json({
        message: `Welcome, ${user.username}...`,
        token
      })
    } else {
      next({ status: 401, message: 'Invalid Credentials' })
    }
  })
  .catch(next)
})
function makeToken(user){
const payload = {
  subject: user.id,
  username: user.username,
  role: user.role
}
const options = {
  expiresIn: "500s"
}
return jwt.sign(payload,JWT_SECRET,options)
}

module.exports = router;
