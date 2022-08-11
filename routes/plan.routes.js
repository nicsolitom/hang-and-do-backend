const router = require("express").Router();
const mongoose = require("mongoose");

const { isAuthenticated } = require("../middleware/jwt.middleware");

const User = require("../models/User.model");
const Plan = require("../models/Plan.model");
const Post = require("../models/Post.model");

// Create > new plan
router.post("/plans", isAuthenticated, (req, res, next) => {
  const { title, dateTime, description, imgUrl, location, createdBy } =
    req.body;

  Plan.create({ title, dateTime, description, imgUrl, location, createdBy })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  Read > all plans
router.get("/plans", isAuthenticated, (req, res, next) => {
  Plan.find()
    .then((allPlans) => {
      res.json(allPlans);
    })
    .catch((err) => {
      res.json(err);
    });
});

// Read > specific plan
router.get("/plans/:planId", isAuthenticated, (req, res, next) => {
  const { planId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(planId)) {
    res.status(400).json({ message: "Specified id for plan is not valid" });
    return;
  }

  Plan.findById(planId)
    .populate("posts", "joined")
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//Join plan (adding user in plan models > joined array)
router.put("/plans/:planId", isAuthenticated, (req, res, next) => {
  const { planId } = req.params;
  const { userId } = req.body;

  console.log("userId: ", userId);
  console.log("planId: ", planId);

  if (!mongoose.Types.ObjectId.isValid(planId)) {
    res.status(400).json({ message: "Specified planId is not valid" });
    return;
  }

  Plan.findByIdAndUpdate(planId, { $push: { joined: userId } }, { new: true })
    .then((response) => {
      console.log(response);

      res.json({
        message: `User with id ${userId} joined plan with id ${planId}.`,
      });
    })
    .catch((error) => res.status(500).json(error));
});

//Update plan
router.put("/plans/:planId/edit", isAuthenticated, (req, res, next) => {
  const { planId } = req.params;
  const { title, dateTime, description, imgUrl, location, createdBy } =
    req.body;

  if (!mongoose.Types.ObjectId.isValid(planId)) {
    res.status(400).json({ message: "Specified plan id is not valid" });
    return;
  }

  Plan.findByIdAndUpdate(
    planId,
    { title, dateTime, description, imgUrl, location, createdBy },
    { new: true }
  )
    .then((response) => {
      console.log(response);
      res.json({
        message: `Updated plan with id ${planId}.`,
      });
    })
    .catch((error) => res.status(500).json(error));
});

//Delete plan
router.delete("/plans/:planId", isAuthenticated, (req, res, next) => {
  const { planId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(planId)) {
    res.status(400).json({ message: "Specified planId is not valid" });
    return;
  }

  Plan.findByIdAndRemove(planId)
    .then(() =>
      res.json({
        message: `Plan with id ${planId} & all associated tasks were removed successfully.`,
      })
    )
    .catch((error) => res.status(500).json(error));

  // .then(deletedPlan => {
  //     return Post.deleteMany({ _id: { $in: deletedPlan.posts } });
  // })
});

module.exports = router;
