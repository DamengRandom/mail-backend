// sendgrid configurations
const sendGridMail = require("@sendgrid/mail");
sendGridMail.setApiKey(process.env.SENDGRID_API_KEY);
// mailgun configurations
const mailgun = require("mailgun-js");
const mg = mailgun({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});

async function sendEmailByProvider(requestBody, provider) {
  if (provider === 'sendgrid') {
    await sendGridMail.send(requestBody);
  } else if (provider === 'mailgun') {
    await mg.messages().send(requestBody);
  } else {
    throw Error('mail provider is not supported yet ..');
  }
  // later will support more mail providers (extendable)
}

class MailProvidersService {
  async genericMailService(requestBody, provider) {
    try {
      await sendEmailByProvider(requestBody, provider);

      const response = {
        provider,
        to: requestBody.to,
        cc: requestBody.cc,
        bcc: requestBody.bcc,
        subject: requestBody.subject,
        body: requestBody.html
      };

      return { responseStatus: 200, responseData: { data: response }}; // json api response structure (tidy)
    } catch (error) {
      return { responseStatus: 400, responseData: { error: error.toString() }};
    }
  }
};

module.exports = new MailProvidersService();
