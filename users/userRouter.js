const express = require('express');
const User = require('./userDb.js');
const Post = require('../posts/postDb.js');
const router = express.Router();

// WORKS
router.post('/', validateUser, (req, res) => {
  const newUser = req.body;

  User.insert(newUser)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'unable to save new user' });
    });
});

// failed to create post
router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const text = req.body.text;

  Post.insert(text)
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

// WORKS
router.get('/:id/posts', validateUserId, (req, res) => {
  const id = req.params.id;

  User.getUserPosts(id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: 'could not fetch post data' });
    });
});

// WORKS
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

// WORKS
router.put('/:id', validateUserId, validateUser, (req, res) => {
  const id = req.params.id;
  const body = req.body;

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

// WORKS
function validateUserId(req, res, next) {
  const id = req.params.id;

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

// WORKS
function validateUser(req, res, next) {
  const name = req.body.name;
  const body = req.body;

  if (Object.entries(body).length === 0) {
    res.status(400).json({ message: 'missing user data' });
  }
  if (!name) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    next();
  }
}

// WORKS
function validatePost(req, res, next) {
  const text = req.body.text;
  const body = req.body;

  if (Object.entries(body).length === 0) {
    res.status(400).json({ message: 'missing post data' });
  }
  if (!text) {
    res.status(400).json({ message: 'missing required text field' });
  } else {
    next();
  }
}

module.exports = router;
