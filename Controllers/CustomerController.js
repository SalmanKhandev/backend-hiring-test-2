const CustomerModel = require("../Models/customerModel");
const HistoryModel = require("../Models/HistoryModel");

exports.createAccount = async function (req, res) {
  const { name, balance } = req.body;

  await CustomerModel.create({
    name,
    balance,
  });

  res.status(200).json({
    status: true,
    message: "Customer Registered Successfully",
    data: [],
    code: 200,
  });
};

exports.transferAmount = async function (req, res) {
  const { senderAccountId, receiverAccountId, amount } = req.body;

  const findSenderAccount = await findCustomer(senderAccountId);
  if (!findSenderAccount) {
    return res.status(400).json({
      status: false,
      message: "No Account Associated with your account",
      data: [],
      code: 400,
    });
  }

  if (findSenderAccount.balance < amount || findSenderAccount.balance == 0) {
    return res.status(400).json({
      status: false,
      message: "Amount Exceeds Limit, Please select a different amount",
      data: [],
      code: 400,
    });
  }

  const findReceiverAccount = await findCustomer(receiverAccountId);

  if (!findReceiverAccount) {
    return res.status(400).json({
      status: false,
      message: "No Account Associated with your account",
      data: [],
      code: 400,
    });
  }

  await HistoryModel.create({
    senderAccountId,
    receiverAccountId,
    amount,
  });

  const sendRemainingBalance = findSenderAccount.balance - amount;
  const receiverNewAmount = findReceiverAccount.balance + amount;

  await findAndUpdateAmount(senderAccountId, sendRemainingBalance);
  await findAndUpdateAmount(receiverAccountId, receiverNewAmount);

  res.status(200).json({
    status: true,
    message: "You have successfully transferred the amount",
    data: [],
    code: 200,
  });
  //   res.status(200).json(findSenderAccount);
};

exports.customerAccount = async (req, res) => {
  const { accountId } = req.body;

  const findAccount = await CustomerModel.findOne(
    { _id: accountId },
    { _id: 0, createdAt: 0, updatedAt: 0 }
  ).select("name balance");

  if (!findAccount) {
    return res.status(400).json({
      status: false,
      message: "No Account is Associated with this ID",
      data: [],
      code: 400,
    });
  }

  return res.status(200).json({
    status: true,
    message: "Your Account Details",
    data: findAccount,
    code: 200,
  });
};

exports.transferHistory = async (req, res) => {
  const id = req.params.accountId;

  const customer = await HistoryModel.find({}, { _id: 0 })
    .populate("receiverAccountId", "name ")
    .select("name amount");

  console.log(customer);

  res.status(200).json({
    status: true,
    message: "Your Transfers Details",
    data: customer,
    code: 200,
  });
};

async function findCustomer(id) {
  const findSenderAccount = await CustomerModel.findOne({
    _id: id,
  });

  return findSenderAccount;
}

async function findAndUpdateAmount(id, amount) {
  const update = await CustomerModel.findOneAndUpdate(
    { _id: id },
    { balance: amount }
  );

  return update;
}
