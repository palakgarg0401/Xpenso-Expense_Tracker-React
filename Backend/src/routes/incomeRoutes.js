const express = require("express");
const router = express.Router();
const { addIncome, getIncomes, deleteIncome } = require("../controllers/incomeControllers");

router.post("/", addIncome);
router.get("/", getIncomes);
router.delete("/:id", deleteIncome);

module.exports = router;