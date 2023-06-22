const { verifyUserActions } = require('../controllers/userActionsController');
const { User } = require('../models/user');

describe('User Actions Verification', () => {
  test('should verify user actions correctly', async () => {
    const mockUser = new User({
      twitterId: '123456',
      username: 'testuser',
      actionsCompleted: {
        retweet: true,
        like: true,
        hashtag: true
      }
    });

    const requiredActions = {
      retweet: true,
      like: true,
      hashtag: true
    };

    const result = await verifyUserActions(mockUser, requiredActions);
    expect(result).toBe(true);
  });

  test('should fail verification if user actions do not match required actions', async () => {
    const mockUser = new User({
      twitterId: '123456',
      username: 'testuser',
      actionsCompleted: {
        retweet: true,
        like: false,
        hashtag: true
      }
    });

    const requiredActions = {
      retweet: true,
      like: true,
      hashtag: true
    };

    const result = await verifyUserActions(mockUser, requiredActions);
    expect(result).toBe(false);
  });
});