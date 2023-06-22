const { authenticateWithTwitter } = require('../controllers/authController');
const { expect } = require('chai');

describe('Twitter Authentication', () => {
  it('should authenticate a user with valid credentials', async () => {
    const mockUser = {
      id: '123456789',
      username: 'testuser',
      displayName: 'Test User',
      profileImage: 'https://example.com/profile.jpg',
    };

    const result = await authenticateWithTwitter(mockUser);
    expect(result).to.be.an('object');
    expect(result).to.have.property('id');
    expect(result).to.have.property('username');
    expect(result).to.have.property('displayName');
    expect(result).to.have.property('profileImage');
  });

  it('should throw an error with invalid credentials', async () => {
    const mockUser = {
      id: '',
      username: '',
      displayName: '',
      profileImage: '',
    };

    try {
      await authenticateWithTwitter(mockUser);
    } catch (error) {
      expect(error).to.be.an('error');
    }
  });
});