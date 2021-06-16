const userModel = require('../models/user.model');
// const invoiceModel = require('../models/invoice.model');

const getCompanyId = async (id, res) => {
  let companyId;
  await userModel
    .findOne({
      _id: id,
    })
    .then((data) => {
      companyId = data.belongCompany;
    })
    .catch((error) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
  return companyId;
};

const getUser = async (id, res) => {
    let user;
    await userModel.findOne({
        _id: id
    })
    .then((docs) => {
        user = docs
    })
    .catch((err) => {
        res.status(400).send({
            error: "Yetkisiz Erişim Talebi"
        });
    })
    return user
};

module.exports = {
  getCompanyId,
  getUser,
};