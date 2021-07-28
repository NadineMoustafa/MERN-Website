const express = require("express");
const router = express.Router();
const dynamicFormController = require("../../controllers/dynamicFormController");

router.get("/", async (req, res) => {
  const dynamicForm = await dynamicFormController.search();
  return res.json({ data: dynamicForm });
});

router.post("/", async (req, res) => {
  const newdynamicForm = await dynamicFormController.create(req.body,"Unassigned",null,null);
  if (newdynamicForm.error) {
    if (newdynamicForm.error.details)
      return res.status(400).json(newdynamicForm.error.details[0].message);
    else return res.status(400).json(newdynamicForm.error);
  }

  return res.json({ data: newdynamicForm });
});

router.put("/:id", async (req, res) => {
  const id = req.params.id;
  var dynamicForm = await dynamicFormController.update("_id", id, req.body);
  if (!dynamicForm) return res.json({ msg: "ID not there" });
  if (dynamicForm.error) {
    if (dynamicForm.error.details)
      return res.status(400).json(dynamicForm.error.details[0].message);
    else return res.status(400).json(dynamicForm.error);
  }
  return res.json({
    msg: "Dynamic Form updated successfully",
    data: dynamicForm
  });
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const dynamicForm = await dynamicFormController.remove("_id", id);
    if (!dynamicForm) return res.json({ msg: "ID not there" });
    return res.json({
      msg: "DynamicForm was deleted successfully",
      data: dynamicForm
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
