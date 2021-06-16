const express = require("express");
const router = express.Router();
const User = require("../models/user.model"); // user model

router.get("/profile", async (req, res, next) => {
  await User.findById(req.user._id)
    .then((doc) => {
      if (!doc) {
        res.status(400).send({
          loginStatus: false,
          error: "There is a problem",
        });
      } else {
        let userType = doc.userType;
        res.status(200).send({
          message: "You made it to the secure route",
          loginStatus: true,
          userType: userType,
          user: req.user.email,
          token: req.query.secret_token,
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        loginStatus: false,
        error: "There is a problem, contact support.",
      });
    });
});

router.get("/info", (req, res, next) => {
  User.findOne({
    _id: req.user._id,
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Sen yoksun.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "Bilgileri başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.get("/info_by_mail", (req, res, next) => {
  User.findOne({
    email: req.body.email,
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Sen yoksun.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "Bilgileri başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.put("/editCompany", async (req, res) => {
  User.findOneAndUpdate(
    {
      _id: req.user._id,
    },
    {
      ...req.body,
    }
  )
    .then((doc) => {
      //TODO: DOCS if check olması lazım
      res.status(200).send({
        message: "Company added successfully.",
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: "Company is not added",
      });
    });
});

module.exports = router;
