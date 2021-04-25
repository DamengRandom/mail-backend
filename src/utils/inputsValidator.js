const { body, check } = require("express-validator");

const emailArrayValidator = (field) =>
  check(`${field}.*`).isEmail().withMessage("Please enter valid email addresses.");

const singleEmailValidator = (field) =>
  check(`${field}.*`).isEmail().withMessage("Please enter a valid email address.");

const requiredFieldValidator = (field, message) =>
  body(field).notEmpty().withMessage(`${message} is required.`);

const mailInputsValidator = [
  emailArrayValidator('to'),
  emailArrayValidator('cc.*'),
  emailArrayValidator('bcc.*'),
  singleEmailValidator('from'),
  requiredFieldValidator("subject", "Subject"),
  requiredFieldValidator("provider", "Provider"),
  requiredFieldValidator("html", "Body content"),
];

module.exports = mailInputsValidator;
