const router = require('express').Router()
const Accounts = require('./accounts-model');
const { checkAccountId, checkAccountPayload } = require('./accounts-middleware');

router.get('/', (req, res, next) => {
  Accounts.getAll()
    .then(accounts => {
      res.status(200).json(accounts);
    })
    .catch(err => {
      next(err);
    });
})

router.get('/:id', checkAccountId, (req, res) => {
  res.status(200).json(req.account);
})

router.post('/', checkAccountPayload, (req, res, next) => {
  const { name, budget } = req.body;

  Accounts.create({ name, budget })
    .then(acc => {
      res.status(201).json(acc);
    })
    .catch(err => {
      next(err);
    });
})

router.put('/:id', checkAccountId, checkAccountPayload, (req, res, next) => {
  const { id } = req.params;

  Accounts.updateById(id, req.body)
    .then(acc => {
      res.status(200).json(acc);
    })
    .catch(err => {
      next(err);
    })
});

router.delete('/:id', checkAccountId, (req, res, next) => {
  const { id } = req.params;

  Accounts.getById(id)
    .then(account => {
      res.status(200).json(account);
      return Accounts.deleteById(id);
    })
    .catch(err => {
      next(err);
    })
})

// router.use((err, req, res, next) => { // eslint-disable-line
//   // DO YOUR MAGIC
// })

module.exports = router;
