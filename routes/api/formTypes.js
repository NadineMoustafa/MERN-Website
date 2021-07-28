const express = require("express");
const router = express.Router();
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
    const FormTypes = await formTypeController.search();
    return res.json({ data: FormTypes });
  }
);

router.get(
  "/getAllFormTypes",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const forms = await formTypeController.search();
    console.log(forms);
    const types = [];
    for (i = 0; i < forms.length; i++) {
      if (forms[i].toJSON().formType) {
        types.push(forms[i].toJSON().formType);
      }
    }
    return res.json({ data: types });
  }
);
router.get(
  "/getAllFormTypeArrays",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const forms = await formTypeController.search();
    //console.log(forms)
    const types = [];
    for (i = 0; i < forms.length; i++) {
      if (forms[i].toJSON().formTypeArray) {
        //console.log(forms[i])
        types.push(forms[i].toJSON().formTypeArray);
      }
    }
    return res.json({ data: types });
  }
);

router.get(
  "/getByFormType/:formType",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const formType2 = req.params.formType;
    const certainForm = await formTypeController.search("formType", formType2);
    return res.json({ data: certainForm });
  }
);

router.get(
  "/getByFormTypeArray/:formTypeArray",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    const formType2 = req.params.formTypeArray;
    const certainForm = await formTypeController
      .search("formTypeArray", formType2)
      .then(res => {
        return res;
      })
      .catch(err => {
        return err;
      });
    console.log(certainForm);
    return res.json({ data: certainForm });
  }
);

router.get("/test", async (req, res) => {
  return await formTypeController.search();
});

router.post(
  "/NewFormType",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Admin") {
      if (req.body.formType === undefined)
        return res.status(400).json({ error: "Can't create FormType" });
      const formType = await formTypeController.create(req.body);
      if (formType.error)
        return res.status(400).json({ error: formType.error });
      return res.json({
        msg: "Form Type created successfully",
        data: formType
      });
    } else return res.status(401).json({ error: "Not Authorized" });
  }
);

router.post(
  "/NewFormTypeArray",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    if (req.user.userType === "Admin") {
      if (req.body.formTypeArray === undefined)
        return res.status(400).json({ error: "Can't create Form Type Array" });
      const formType = await formTypeController.create(req.body);
      if (formType.error)
        return res.status(400).json({ error: formType.error });
      return res.json({
        msg: "Form Type Array created successfully",
        data: formType
      });
    } else return res.status(401).json({ error: "Not Authorized" });
  }
);

module.exports = router;
