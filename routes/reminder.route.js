const express = require("express");
const reminderController = require("../controllers/reminder.controller.js");
const {validateInputs} = require("../middlewares/validate.js");
const reminderValidation = require("../validations/reminder.validation");
const { verifyToken } = require("../configs/auth.js");

const router = express.Router();

router.get("/list", verifyToken, reminderController.listReminders);
router.post(
  "/create",
  verifyToken,
  validateInputs(reminderValidation.add),
  reminderController.addReminder
);
router.put(
  "/edit/:id",
  verifyToken,
  validateInputs(reminderValidation.update),
  reminderController.editReminder
);
router.delete("/delete/:id", verifyToken, reminderController.deleteReminder);

module.exports = router;
