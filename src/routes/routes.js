const express = require("express");
const router = express.Router();
const mailController = require('../controller/mailController');
const mailInputsValidator = require('../utils/inputsValidator');

// generic mail route
router.post("/api/:provider", mailInputsValidator, mailController.postEmail);

// test route
router.get("/api/test", (req, res) => {
  res.status(200).send({message:'made it !!'});
});

module.exports = router;
