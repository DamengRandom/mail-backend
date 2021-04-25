// mailgun configurations
const mg = require("mailgun-js");

const MailProvidersService = require('../../src/services/mailProvidersService');

jest.mock('@sendgrid/mail', () => { // used for prevent error during testing running for mailgun
  return {
    setApiKey: jest.fn(),
  };
});

jest.mock('mailgun-js', () => {
  const mMailgun = {
    messages: jest.fn().mockReturnThis(),
    send: jest.fn(),
  };

  return jest.fn(() => mMailgun);
});

describe('MailProvidersService mailgun functionality', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return return 200 when request body is provided', async () => {
    // Arrange
    const requestBody = {
      "to": ["damonmaozewu@gmail.com", "damon.compliancespace@gmail.com"],
      "cc": ["damon.wu@complispace.com.au"],
      "bcc": ["1h0f1.aus@gmail.com"],
      "from": "damon.compliancespace@gmail.com",
      "subject": "Damon trial for mailgun api integration",
      "provider": "mailgun",
      "html": "Some new html contents by 24 April 2021 ..."
    };
    const provider = 'mailgun';
    const mailgun = mg({});
    (mailgun.messages().send).mockResolvedValueOnce({
      id: '123',
      message: 'Queued. Thank you.',
    });

    // Act
    const result = await MailProvidersService.genericMailService(requestBody, provider);

    // Assert
    expect(result.responseData.data).toBeDefined();
    expect(result.responseData.data.subject).toEqual('Damon trial for mailgun api integration');
  });

  it('should return 400 when request body is not provided', async () => {
    // Arrange
    const requestBody = undefined;
    const provider = 'mailgun';
    const mailgun = mg({});
    (mailgun.messages().send).mockResolvedValueOnce({
      id: '321',
      message: 'Error',
    });

    // Act
    const result = await MailProvidersService.genericMailService(requestBody, provider);

    // Assert
    expect(result.responseStatus).toEqual(400);
  });
});
