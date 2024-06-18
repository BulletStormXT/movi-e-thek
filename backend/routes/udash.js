const express = require("express");
const router = express.Router();
const udashController = require("../controllers/udashController");

router.post("/users/:userId/udash", udashController.addToudash);
router.patch("/users/:userId/udash/:udashItemId", udashController.updateudashItem);
router.delete("/users/:userId/udash/:udashItemId", udashController.removeudashItem);
router.get("/users/:userId/udash", udashController.getudashItems);

module.exports = router;
