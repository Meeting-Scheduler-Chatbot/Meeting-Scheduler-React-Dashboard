const express = require("express");
const Group = require("../models/group.model");
const User = require("../models/user.model");
const router = express.Router();
const chalk = require("chalk");
const utils = require("../utils/utils");

// what we need?
// get access token
//      ilk once google'in izin sayfasina gonder
//      ordan bir code donecek onu al ve get access token'e istek at
// refresh access token
// get calendar list 
// get events of primary calendar


router.post("/", async (req, res) => {
  let belongCompany = await utils.getCompanyId(req.user._id, res);

  let group = {
    createdBy: req.user._id,
    belongCompany: belongCompany,
    name: req.body.name,
    members: [{ userId: req.user._id }],
  };

  Group.create(group)
    .then((result) => {
      User.findOneAndUpdate(
        {
          _id: req.user._id,
        },
        {
          $push: {
            belongGroups: {
              groupId: result._id,
            },
          },
        }
      )
        .then((doc) => {
          if (!doc) {
            res.status(200).send({ message: "User not found" });
          } else {
            res.status(200).send({
              message: "Success!.",
            });
          }
        })
        .catch((err) => {
          try {
            Group.findOneAndDelete({ _id: result._id });
          } catch {
            res.status(400).send({
              error: "Support'a ulaşın",
            });
          }
        });
    })
    .catch((err) => {
      res.status(400).send({
        error: "Cannot create group.",
      });
    });
});

router.get("/auth", async (req, res) => {

    try{
        console.log("#################################################",req.query.code);
        res.status(200).send({
          message: req.query.code,
        });
        
    //   if (docs.length === 0) {
    //     res.status(200).send({
    //       data: docs,
    //       message: req.params,
    //     });
    //   } else {
    //     res.status(200).send({
    //       data: docs,
    //       message: "Success.",
    //     });
    //   }
    }
    catch (err) {
      res.status(400).send({
        error: "Cannot create group.",
      });
    }
});

// router.get("/my_groups", async (req, res, next) => {
//   User.findOne({
//     _id: req.user._id,
//   })
//     .then(async (docs) => {
//       if (docs.length === 0) {
//         res.status(200).send({
//           data: docs,
//           message: "User not found.",
//         });
//       } else {
//         let ids = [];
//         for (let i = 0; i < docs.belongGroups.length; i++) {
//           if (docs.belongGroups[i] != "") {
//             ids.push(docs.belongGroups[i].groupId);
//           }
//         }
//         const records = await Group.find().where("_id").in(ids).exec();
//         res.status(200).send({
//           data: records,
//           message: "Success.",
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({
//         error: "Error.",
//       });
//     });
// });

// router.put("/remove_member", async (req, res) => {
//   Group.findOneAndUpdate(
//     {
//       _id: req.body.groupId,
//     },
//     {
//       $pull: { members: { userId: req.body.memberId } },
//     }
//   )
//     .then((doc) => {
//       if (!doc) {
//         res.status(200).send({ message: "Cannot find group" });
//       } else {
//         User.findOneAndUpdate(
//           {
//             _id: req.body.memberId,
//           },
//           {
//             $pull: {
//               belongGroups: {
//                 groupId: doc._id,
//               },
//             },
//           }
//         )
//           .then((doc) => {
//             if (!doc) {
//               res.status(200).send({ message: "User not found!" });
//             } else {
//               res.status(200).send({
//                 message: "Success.",
//               });
//             }
//           })
//           .catch((err) => {
//             try {
//               Group.findOneAndDelete({ _id: doc._id });
//             } catch {
//               res.status(400).send({
//                 error: "Support!",
//               });
//             }
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({
//         error: "Error.",
//       });
//     });
// });

// router.put("/add_member", async (req, res) => {
//   Group.findOneAndUpdate(
//     {
//       _id: req.body.groupId,
//     },
//     {
//       $push: { members: { userId: req.body.memberId } },
//     }
//   )
//     .then((doc) => {
//       if (!doc) {
//         res.status(200).send({ message: "Cannot find group" });
//       } else {
//         User.findOneAndUpdate(
//           {
//             _id: req.body.memberId,
//           },
//           {
//             $push: {
//               belongGroups: {
//                 groupId: doc._id,
//               },
//             },
//           }
//         )
//           .then((docs) => {
//             if (!docs) {
//               res.status(200).send({ message: "User not found." });
//             } else {
//               res.status(200).send({
//                 message: "Success.",
//               });
//             }
//           })
//           .catch((err) => {
//             try {
//               Group.findOneAndDelete({ _id: doc._id });
//             } catch {
//               res.status(400).send({
//                 error: "Support.",
//               });
//             }
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({
//         error: "Error.",
//       });
//     });
// });

// router.delete("/", (req, res) => {
//   Group.findOneAndDelete({
//     _id: req.query.id,
//   })
//     .then((doc) => {
//       if (!doc) {
//         res.status(200).send({ message: "Cannot find group." });
//       } else {
//         User.updateMany(
//           {},
//           {
//             $pull: { belongGroups: { groupId: doc._id } },
//           }
//         )
//           .then((docs) => {
//             if (!docs) {
//               res.status(200).send({ message: "User not found." });
//             } else {
//               res.status(200).send({ message: "Success." });
//             }
//           })
//           .catch((err) => {
//             res.status(400).send({
//               error: "Error.",
//             });
//           });
//       }
//     })
//     .catch((err) => {
//       res.status(400).send({
//         error: "Error.",
//       });
//     });
// });

module.exports = router;
