const { check, validationResult } = require("express-validator");

exports.validateUser = [
  check("name", "Name is required").not().isEmpty(),
  check("balance", "Balance is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      // return res.status(422).json({ errors: errors.array() });
      res.send({
        status: false,
        message: "Validation Errors",
        data: errors.errors,
        code: 400,
      });
    next();
  },
];

exports.validateTransfer = [
  check("senderAccountId", "senderAccountId is required").not().isEmpty(),
  check("receiverAccountId", "receiverAccountId is required").not().isEmpty(),
  check("amount", "amount is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      // return res.status(422).json({ errors: errors.array() });
      res.send({
        status: false,
        message: "Validation Errors",
        data: errors.errors,
        code: 400,
      });
    next();
  },
];

exports.account = [
  check("accountId", "accountId is required").not().isEmpty(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      // return res.status(422).json({ errors: errors.array() });
      res.status(400).json({
        status: false,
        message: "Validation Errors",
        data: errors.errors,
        code: 400,
      });
    next();
  },
];
