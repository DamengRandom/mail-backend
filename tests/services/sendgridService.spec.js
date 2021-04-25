const sgMail = require('@sendgrid/mail');

jest.mock('@sendgrid/mail');

describe('MailProvidersService sendgrid functionality', () => {
  beforeAll(() => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return return 200 when all params are provided', () => {
    // Arrange
    const successResponse = {
      data: {
        "to": ["damonmaozewu@gmail.com", "damon.compliancespace@gmail.com"],
        "cc": ["damon.wu@complispace.com.au"],
        "bcc": ["1h0f1.aus@gmail.com"],
        "from": "damon.compliancespace@gmail.com",
        "subject": "Damon trial for sendgrid api integration",
        "provider": "sendgrid",
        "html": "Some new html contents by 24 April 2021 ..."
      },
    };

    // Act
    const result = sgMail.send.mockImplementation(() => Promise.resolve(successResponse));

    // Assert
    result().then(response => {
      expect(response.data).toBeDefined();
      expect(response.data.provider).toEqual('sendgrid');
    });
  });

  it('should return 400 when request body is not provided', () => {
    // Arrange
    const errorResponse = { error: 'Error: mail provider is not supported yet ..' };

    // Act
    const result = sgMail.send.mockImplementation(() => Promise.reject(errorResponse));

    // Assert
    result().then(() => {
      expect(result).toMatchObject(errorResponse);
    });
  });
});
