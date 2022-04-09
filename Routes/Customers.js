const express = require("express");
const router = express.Router();
const customerController = require("../Controllers/CustomerController");
const customerValidator = require("../Middlewares/validateCustomer");
// Api for registering customer

router.post(
  "/createAccount",
  customerValidator.validateUser,
  customerController.createAccount
);

router.post(
  "/transferAmount",
  customerValidator.validateTransfer,
  customerController.transferAmount
);

router.post(
  "/customerAccount",
  customerValidator.account,
  customerController.customerAccount
);

router.get("/transferHistory/:accountId", customerController.transferHistory);

module.exports = router;
