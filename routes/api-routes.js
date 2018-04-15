const router = require('express').Router();
const db = require('../models');

router.get('/articles', (req, res) => {
  db.Article.find({}, {}, { sort: { _id: 1 } }, (err, result) => {
    if (err) console.log(err);
    res.json(result);
  });
});

router.get('/articles/comment/:id', (req, res) => {
  db.Article.find({ _id: req.params.id }).populate('comment').then((result) => {
    res.json(result);
  }).catch((err) => {
    res.json(err);
  });
});

router.get('/articles/saved', (req, res) => {
  db.Article.find({ saved: true }, (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

router.post('/add/comment/:id', (req, res) => {
  console.log(req.body);
  db.Comment.create(req.body).then((dbComment) => {
    db.Article.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { comment: dbComment._id } },
      { new: true },
    ).then((dbArticle) => {
      res.json(dbArticle);
    }).catch((err) => {
      res.json(err);
    });
  });
});

router.put('/save/:id', (req, res) => {
  db.Article.findOne({ _id: req.params.id }, (error, found) => {
    if (found.saved) {
      res.send('Already saved');
    } else {
      db.Article.updateOne({ _id: req.params.id }, { $set: { saved: true } }, (err, result) => {
        if (err) {
          res.sendStatus(404);
        } else {
          res.sendStatus(200);
        }
      });
    }
  });
});

router.put('/unsave/:id', (req, res) => {
  db.Article.updateOne({ _id: req.params.id }, { $set: { saved: false } }, () => {
    res.json('Article removed from saved list');
  });
});

router.delete('/delete/comment/:id', (req, res) => {
  db.Comment.remove({ _id: req.params.id }).then(() => {
    res.status(200).send('deleted');
  });
});

module.exports = router;
