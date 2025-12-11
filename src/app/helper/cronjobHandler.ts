import cron from 'node-cron';
import User from '../modules/user/user.model';
import Premium from '../modules/premium/premium.model';

cron.schedule('0 0 */1 * * *', async () => {
  console.log('running a task every 5 seconds');

  const now = new Date();

  const expireUser = await User.find({
    isSubscription: true,
    subscriptionExpiry: { $lte: now },
  });

  if (expireUser.length > 0) {
    for (const user of expireUser) {
      await Premium.updateMany(
        {
          totalSubscripeUser: user._id,
        },
        {
          $pull: {
            totalSubscripeUser: user._id,
          },
        },
      );

      user.isSubscription = false;
      user.subscriptionExpiry = null;
      await user.save();
    }
  }

  console.log('✔ Auto subscription expiry update done');
});
