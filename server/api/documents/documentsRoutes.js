const express = require('express');

const docs = require('./documentsModel.js');

const router = express.Router();

// route is /documents
router.get('/', (req, res) => {
  docs
    .find()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;

  docs
    .findAllByUser(userId)
    .then(docs => {
      if (docs) {
        res.status(200).json(docs);
      } else {
        res.status(404).json({
          message: `No documents found associated to the supplied user.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.get('/id/:id', (req, res) => {
  const { id } = req.params;

  docs
    .findById(id)
    .then(doc => {
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: `No document at specified ID.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post('/', (req, res) => {
  const document = req.body;

  docs
    .addDoc(document)
    .then(ids => {
      // TODO: GET user_id from logged in user token
      // use user_id and ids[0] to call addUserToDoc here
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.post('/add/:document_id/:user_id', (req, res) => {
  const { document_id, user_id } = req.params;
  const userDoc = { document_id, user_id };

  docs
    .addUserToDoc(userDoc)
    .then(ids => {
      res.status(201).json(ids[0]);
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const document = req.body;

  docs
    .updateDoc(id, document)
    .then(updatedCount => {
      if (updatedCount > 0) {
        res.status(200).json(updatedCount);
      } else {
        res.status(404).json({
          message: `No document found at specified ID to update, or the required document field was insufficient.`,
        });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  docs
    .removeDoc(id)
    .then(removedCount => {
      if (removedCount > 0) {
        res.status(200).json(removedCount);
      } else {
        res
          .status(404)
          .json({ message: `No document at specified ID found to remove.` });
      }
    })
    .catch(err => {
      res.status(500).json({ ErrorMessage: err.message });
    });
});

module.exports = router;
