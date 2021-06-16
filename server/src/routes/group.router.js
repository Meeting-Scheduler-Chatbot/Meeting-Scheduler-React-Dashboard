const express = require('express');
const Group = require('../models/group.model');
const User = require('../models/user.model');
const router = express.Router();
const chalk = require('chalk');
const utils = require("../utils/utils")
const {
  ObjectId
} = require('mongodb');


router.post('/', async (req, res) => {
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
          }
          else {
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
        error: "Cannot create group."
      });
    })
});


router.get('/company', async (req, res) => {
  let belongCompany = await utils.getCompanyId(req.user._id, res);
  Group.find({
    belongCompany: belongCompany,
  })
    .then((docs) => {
      if (docs.length === 0) {
        res.status(200).send({
          data: docs,
          message: "There are no groups.",
        });
      } else {
        res.status(200).send({
          data: docs,
          message: "Success.",
        });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Error!",
      });
    });
});

router.get(
  '/my_groups',
  async (req, res, next) => {
    User.findOne({
      _id: req.user._id
    })
      .then(async (docs) => {
        if (docs.length === 0) {
          res.status(200).send({
            data: docs,
            message: "User not found.",
          });
        } else {
          let ids = [];
          for (let i = 0; i < docs.belongGroups.length; i++) {
            if (docs.belongGroups[i] != "") {
              ids.push(docs.belongGroups[i].groupId);
            }
          }
          const records = await Group.find().where("_id").in(ids).exec();
          
          res.status(200).send({
            data: records,
            message: "Success.",
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          error: "Error."
        });
      })
  }
);

router.post('/members', async (req, res) => {
    Group.aggregate([
      {
        '$match': {
          '_id': new ObjectId(req.body.groupId)
        },
      },
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'members.userId', 
          'foreignField': '_id', 
          'as': 'memberNames'
        }
      }, 
      {
        '$project': {
          'memberNames': {
            'password': 0,
            'belongGroups' : 0
          }
        }
      }
    ])
      .then((docs) => {
        if (docs.length === 0) {
          res.status(200).send({
            data: docs,
            message: "User not found.",
          });
        } else {
          res.status(200).send({
            data: docs,
            message: "Success.",
          });
        }
      })
      .catch((err) => {
        res.status(400).send({
          error: "Error."
        });
      })
  }
);


router.put('/remove_member', async (req, res) => {
  Group.findOneAndUpdate(
    {
      _id: req.body.groupId,
    },
    {
      $pull: { members: { userId: req.body.memberId } },
    }
  )
    .then((doc) => {
      if (!doc) {
        res.status(200).send({ message: "Cannot find group" });
      }
      else {
        User.findOneAndUpdate(
          {
            _id: req.body.memberId,
          },
          {
            $pull: {
              belongGroups: {
                groupId: doc._id,
              },
            },
          }
        )
          .then((doc) => {
            if (!doc) {
              res.status(200).send({ message: "User not found!" });
            }
            else {
            res.status(200).send({
              message: "Success.",
            });
          }
          })
          .catch((err) => {
            try {
              Group.findOneAndDelete({ _id: doc._id });
            } catch {
              res.status(400).send({
                error: "Support!",
              });
            }
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Error.",
      });
    });

});

router.put('/', (req, res) => {
  console.log(req.body)
  Group.findOneAndUpdate({
      _id: req.query.id,
  }, {
      ...req.body,
  })
  .then((doc) => {
      res.status(200).send({
          message: "Başarı ile paket yenilendi."
      });
      console.log("doc",doc);
  })
  .catch((err) => {
      res.status(400).send({
          error: "İşlem başarısız parametrelerinizi kontrol ediniz"
      });
  })
});

router.put('/add_member', async (req, res) => {
  Group.findOneAndUpdate(
    {
      _id: req.body.groupId,
    },
    {
      $push: { members: { userId: req.body.memberId } },
    }
  )
    .then((doc) => {
      if (!doc) {
        res.status(200).send({ message: "Cannot find group" });
      }
      else {
        User.findOneAndUpdate(
          {
            _id: req.body.memberId,
          },
          {
            $push: {
              belongGroups: {
                groupId: doc._id,
              },
            },
          }
        )
          .then((docs) => {
            if (!docs) {
              res.status(200).send({ message: "User not found." });
            }
            else {
              res.status(200).send({
                message: "Success.",
              })
        };
      })
    .catch((err) => {
      try {
        Group.findOneAndDelete({ _id: doc._id });
      } catch {
        res.status(400).send({
          error: "Support.",
        });
      }
    });
  }
    })
  .catch((err) => {
    res.status(400).send({
      error: "Error.",
    });
  });
});


router.put('/add_bulk_member', async (req, res) => {
  const userIdList = req.body.memberList.map((user)=> {return {"userId": user}});

  Group.findOneAndUpdate(
    {
      _id: req.body.groupId,
    },
    {
      $push: { members: { $each: userIdList}}, //////DEĞİŞTİ
    }
  )
    .then((doc) => {
      if (!doc) {
        res.status(200).send({ message: "Cannot find group" });
      }
      else {
        User.updateMany(
          {
            _id: { $in: req.body.memberList }
          },
          {
            $push: {
              belongGroups: {
                groupId: doc._id,
              },
            },
          }
        )
          .then((docs) => {
            if (!docs) {
              res.status(200).send({ message: "User not found." });
            }
            else {
              res.status(200).send({
                message: "Success.",
              })
        };
      })
    .catch((err) => {
      try {
        Group.findOneAndDelete({ _id: doc._id });
      } catch {
        res.status(400).send({
          error: "Support.",
        });
      }
    });
  }
    })
  .catch((err) => {
    res.status(400).send({
      error: "Error.",
    });
  });
});



router.delete('/', (req, res) => {
  Group.findOneAndDelete({
    _id: req.query.id
  })
    .then((doc) => {
      if (!doc) {
        res.status(200).send({ message: "Cannot find group." });
      }
      else {
        User.updateMany({},
          {
            $pull: { belongGroups: { groupId: doc._id } },
          }
        ).then((docs) => {
          if (!docs) {
            res.status(200).send({ message: "User not found." });
          }
          else {
          res.status(200).send({ message: "Success." });
          }
        })
          .catch((err) => {
            res.status(400).send({
              error: "Error.",
            });
          });
      }
    })
    .catch((err) => {
      res.status(400).send({
        error: "Error."
      });
    })
});

module.exports = router;