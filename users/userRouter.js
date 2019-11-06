const express = require('express');
const User = require('./userDb.js');
const router = express.Router();

// READY TO TEST
router.post('/', validateUser, (req, res) => {
  const { body } = req.params;
  User.insert(body)
    .then(user => {
      res.status(200).json(req.user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'unable to save new user' });
    });
});

// READY TO TEST
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { id } = req.params;
  const { body, text } = req.params;

  User.update(id, text)
    .then(posts => {
      res.status(200).json(req.posts);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'failed to create post' });
    });
});

// WORKS
router.get('/', (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not fetch users data' });
    });
});

// WORKS
router.get('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  User.getById(id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not fetch user data' });
    });
});

// READY TO TEST
router.get('/:id/posts', validateUserId, validatePost, (req, res) => {
  const { id, post } = req.params;

  User.getById(post)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not fetch post data' });
    });
});

// READY TO TEST
router.delete('/:id', validateUserId, (req, res) => {
  const { id } = req.params;

  User.remove(id)
    .then(deletedUser => {
      res.status(204).end();
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not delete user' });
    });
});

// READY TO TEST
router.put('/:id', validateUserId, validateUser, (req, res) => {
  const { id, body } = req.params;

  User.update(id, body)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not update user' });
    });
});

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
  const { body, name } = req.params;

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
  const { body, text } = req.params;

  User.get(body)
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
