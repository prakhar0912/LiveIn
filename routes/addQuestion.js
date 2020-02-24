//jshint esversion:8
const router = require("express").Router();
const Action = require("../model/Action");
const verify = require("./verifyToken");

router.post("/:action_id", verify, async (req, res) => {
  const actionID = req.params.action_id;
  Action.findByIdAndUpdate(
    actionID,
    { $push: { Questions: req.body } },
    err => {
      if (err) {
        res.json(err);
      }
    }
  );
  await Action.findById(actionID)
    .then(data => {
      const length = data.Questions.length;
      res.json(data.Questions[length - 1]);
    })
    .catch(err => {
      res.json(err);
    });
});
module.exports = router;
