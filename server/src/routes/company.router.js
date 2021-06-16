const express = require("express");
const Company = require("../models/company.model"); // post lessonPacket
const router = express.Router();
const chalk = require("chalk");
const utils = require("../utils/utils");
const User = require("../models/user.model"); // post lessonPacket
var multer = require("multer");
var upload = multer();
const fs = require("fs");
var parse = require("csv-parse");

router.post("/", async (req, res) => {
  // let belongStudio = await utils.getStudioId(req.user._id, res)
  var newCompany = {
    name: req.body.name,
    createdBy: req.user._id,
  };

  Company.create(newCompany)
    .then((result) => {
      res.status(201).send({
        message: "Company succesfully created.",
      });
    })
    .catch((err) => {
      res.status(400).send({
        error: "Company is not created.",
      });
    });
});

// get company that i created
router.get("/", async (req, res) => {
  // let belongCompany = await utils.getCompanyId(req.user._id, res)
  Company.find({
    createdBy: req.user._id,
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Henüz hiç templateiniz yok.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "templateleriniz başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

// spesifik gruptayken get members
router.post("/members", async (req, res) => {
  // const group_id = req.body.group_id; // all members - bu grubun memberlari
  console.log("##########################", req.body.groupId);
  let belongCompany = await utils.getCompanyId(req.user._id, res);
  User.find({
    belongCompany: belongCompany,
    belongGroups: { $not: { $elemMatch: { groupId: req.body.groupId } } },
    // _id: { $not: list }
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Henüz hiç templateiniz yok.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "templateleriniz başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.get("/all_members", async (req, res) => {
  // const group_id = req.body.group_id; // all members - bu grubun memberlari
  User.find({
    // _id: { $not: list }
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Henüz hiç templateiniz yok.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "templateleriniz başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.get("/all_members_to_add_company", (req, res) => {
  // const group_id = req.body.group_id; // all members - bu grubun memberlari
  User.find({
    belongCompany: "6086aaac5fe0b800647463d1", // default company
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Henüz hiç templateiniz yok.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "templateleriniz başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.post("/add_members_to_company", async (req, res) => {
  // const group_id = req.body.group_id; // all members - bu grubun memberlari
  let belongCompany = await utils.getCompanyId(req.user._id, res);
  User.updateMany(
    {
      _id: { $in: req.body.memberList },
    },
    {
      belongCompany: belongCompany,
    }
  )
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "Henüz hiç templateiniz yok.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "templateleriniz başarı ile aldınız.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Yetkisiz Erişim Talebi",
      });
    });
});

router.post(
  "/add_members_to_company_by_csv",
  upload.any(),
  async (req, res) => {
    let belongCompany = await utils.getCompanyId(req.user._id, res);
    let mails = [];
    parse(
      req.files[0].buffer,
      { columns: true, trim: true },
      function (err, rows) {
        for (let i = 0; i < rows.length; i++) {
          mails.push(rows[i].mail);
        }
        User.updateMany(
          {
            email: { $in: mails },
          },
          {
            belongCompany: belongCompany,
          }
        )
          .then((docs) => {
            if (docs.length === 0) {
              res.status(200).send({
                data: docs,
                message: "Henüz hiç templateiniz yok.",
              });
            } else {
              res.status(200).send({
                data: docs,
                message: "templateleriniz başarı ile aldınız.",
              });
            }
          })
          .catch((err) => {
            res.status(400).send({
              error: "Yetkisiz Erişim Talebi",
            });
          });
      }
    );
    //let emails = JSON.parse(req.files[0].buffer);

    // User.updateMany(
    //   {
    //     _id: { $in: req.body.memberList },
    //   },
    //   {
    //     belongCompany: belongCompany,
    //   }
    // )
    //   .then((docs) => {
    //     if (docs.length === 0) {
    //       res.status(200).send({
    //         data: docs,
    //         message: "Henüz hiç templateiniz yok.",
    //       });
    //     } else {
    //       res.status(200).send({
    //         data: docs,
    //         message: "templateleriniz başarı ile aldınız.",
    //       });
    //     }
    //   })
    //   .catch((err) => {
    //     res.status(400).send({
    //       error: "Yetkisiz Erişim Talebi",
    //     });
    //   });
  }
);

router.delete("/", (req, res) => {
  Company.findOneAndDelete({
    _id: req.query.id,
  })
    .then((doc) => {
      if (!doc) {
        res.status(200).send({ message: "Böyle bir template zaten yoktu." });
      } else {
        res.status(200).send({ message: "Başarı ile templateiniz silindi." });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "İşlem başarısız parametrelerinizi kontrol ediniz",
      });
    });
});

module.exports = router;
