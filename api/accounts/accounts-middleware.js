const Accounts = require('./accounts-model');

const checkAccountPayload = (req, res, next) => {
  const { name, budget } = req.body;
  const trimmed = name.trim();

  if (name === undefined || budget === undefined) {
    res.status(400).json({ message: "name and budget are required" });
  } else if (!Number.isInteger(budget)) {
    res.status(400).json({ message: "budget of account must be a number" });
  } else if (budget < 0 || budget > 1000000) {
    res.status(400).json({ message: "budget of account is too large or too small" });
  } else if (trimmed < 3 || trimmed > 100) {
    res.status(400).json({ message: "name of account must be between 3 and 100" });
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