const { validationResult } = require("express-validator");
const mailProvidersService = require("../services/mailProvidersService");

class MailController {
  async postEmail(req, res, next) {
    try {
      const validationErrors = validationResult(req);

      if (!validationErrors.isEmpty()) {
        console.log(validationErrors.array());
        return res.status(400).json({ errors: validationErrors.array() });
      } else {
        const { responseStatus, responseData } =
          await mailProvidersService.genericMailService(req.body, req.params.provider);
          res.status(responseStatus).send(
            responseData.error ? { error: responseData.error } : responseData
          );
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
};

module.exports = new MailController();
