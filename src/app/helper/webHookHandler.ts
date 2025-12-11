import Stripe from 'stripe';
import config from '../config';
import { Request, Response } from 'express';
import Payment from '../modules/payment/payment.model';
import User from '../modules/user/user.model';
import Premium from '../modules/premium/premium.model';

const stripe = new Stripe(config.stripe.secretKey!);

const webHookHandlers = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string;
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      config.stripe.webhookSecret!,
    );
  } catch (err: any) {
    console.error('❌ Webhook Error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  console.log('Event: ', event.type);

  try {
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;

      const payment = await Payment.findOne({ sessionId: session.id });
      if (!payment) return res.json({ received: true });

      payment.status = 'completed';
      payment.stripePaymentIntentId = session.payment_intent as string;
      await payment.save();

      const user = await User.findById(payment.user);
      if (!user) return res.json({ received: true });

      const subscription = await Premium.findById(payment.subscription);
      if (!subscription) return res.json({ received: true });

      if (!subscription.totalSubscripeUser?.includes(user._id)) {
        subscription?.totalSubscripeUser?.push(user._id);
        await subscription.save();
      }

      const mounthToYearAdd = subscription?.type === 'year' ? 12 : 1;

      const expireDate = new Date();
      expireDate.setMonth(expireDate.getMonth() + mounthToYearAdd);

      user.isSubscription = true;
      user.subscription = subscription._id;
      user.subscriptionExpiry = expireDate;
      await user.save();
      return res.json({ received: true });
    }
    if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;

      const payment = await Payment.findOne({
        stripePaymentIntentId: intent.id,
      });

      if (payment) {
        payment.status = 'failed';
        await payment.save();
      }
    }

    return res.json({ received: true });
  } catch (err: any) {
    console.error('❌ Handler Error:', err.message);
    return res.status(500).send(`Webhook Handler Error: ${err.message}`);
  }
};

export default webHookHandlers;
