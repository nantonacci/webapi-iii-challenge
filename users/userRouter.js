const express = require('express');

const router = express.Router();

router.post('/', (req, res) => {});

router.post('/:id/posts', (req, res) => {});

router.get('/', (req, res) => {});

router.get('/:id', (req, res) => {});

router.get('/:id/posts', (req, res) => {});

router.delete('/:id', (req, res) => {});

router.put('/:id', (req, res) => {});

//custom middleware

// READY TO TEST
function validateUserId(req, res, next) {
  const { id } = req.params;

  User.getById(id)
    .then(user => {
      if (user) {
        req.user = user;
        next();
      } else {
        res.status(400).json({ message: 'invalid user id' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception' }, err);
    });
}

// READY TO TEST
function validateUser(req, res, next) {
  const { body } = req.params;

  User.get(body)
    .then(user => {
      if (!body) {
        res.status(400).json({ message: 'missing user data' });
      }
      if (!name) {
        res.status(400).json({ message: 'missing required name field' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception', err });
    });
  next();
}

// READY TO TEST
function validatePost(req, res, next) {
  const { body } = req.params;

  Post.get(body)
    .then(user => {
      if (!body) {
        res.status(400).json({ message: 'missing post data' });
      }
      if (!text) {
        res.status(400).json({ message: 'missing required text field' });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'exception', err });
    });
  next();
}

module.exports = router;
