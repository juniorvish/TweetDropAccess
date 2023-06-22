const { checkNftDropAccess } = require('../controllers/nftDropController');
const { User } = require('../models/user');

describe('NFT Drop Access Tests', () => {
  test('User with completed actions should have access', async () => {
    const user = new User({
      twitterId: '123456',
      actionsCompleted: true
    });

    const accessStatus = await checkNftDropAccess(user);
    expect(accessStatus).toBe(true);
  });

  test('User with incomplete actions should not have access', async () => {
    const user = new User({
      twitterId: '789012',
      actionsCompleted: false
    });

    const accessStatus = await checkNftDropAccess(user);
    expect(accessStatus).toBe(false);
  });
});