const express = require("express");
const router = express.Router();
const dependenciesController = require("../../controllers/dependenciesController");
const formTypeController = require("../../controllers/formTypeController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const tokenKey = require("../../config/keys_dev").secretOrKey;
const passport = require("passport");
require("../../config/passport")(passport);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const dependencies = await dependenciesController.search();
    return res.json({ data: dependencies });
  }
);

router.get("/test", async (req, res) => {
  return await dependenciesController.search();
});

router.post(
  "/NewDependencies",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Admin") {
      if (req.body.formType === undefined)
        return res.status(400).json({ error: "Can't create Dependency" });
      const avaialableDependency = await dependenciesController.search();
      if (avaialableDependency.error)
        return res.status(400).json({ error: avaialableDependency.error });
      if (avaialableDependency === []) {
        const dependency = await dependenciesController.create(req.body);
        if (dependency.error)
          return res.status(400).json({ error: dependency.error });
        return res.json({
          msg: "Dependency created successfully",
          data: dependency
        });
      } else {
        const dependency = await dependenciesController.update(
          "_id",
          avaialableDependency[0]._id,
          req.body
        );
        if (dependency.error)
          return res.status(400).json({ error: dependency.error });
        return res.json({
          msg: "Dependency updated successfully",
          data: dependency
        });
      }
    } else return res.status(401).json({ error: "Not Authorized" });
  }
);

module.exports = router;
