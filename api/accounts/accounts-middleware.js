const Accounts = require('./accounts-model');

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  const trimmed = name.trim();
  const error = { status: 400 };

  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
    next(error);
  } else if (trimmed.length < 3 || trimmed.length > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
    next(error);
  } else if (typeof budget !== 'number' || isNaN(budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
    next(error);
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
    next(error);
  } else {
    next();
  }
}

const checkAccountNameUnique = (req, res, next) => {
  // DO YOUR MAGIC
}

const checkAccountId = (req, res, next) => {
  const { id } = req.params;

  Accounts.getById(id)
    .then(result => {
      if (result === null || result === undefined) {
        res.status(404).json({ message: "account not found" }  );
      } else {
        req.account = result;
        next();
      }
    })
    .catch(err => {
      next(err);
    });
}

module.exports = {
  checkAccountId,
  checkAccountNameUnique,
  checkAccountPayload,
};