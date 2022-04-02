import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp()

const stripe = require("stripe")("sk_test_51K6oGfCM9K7H85bb4WYMEiyDEJQpSo8nizanmn24aoyxLJMQJ7h1PK6XYHHbMi6GeazsYSNLOSC6MstGnBO50n9W00X5iQ9fs8");

export const createStripeCheckout =
functions.https.onCall(async (data:any, context:any) => {

  console.log(JSON.stringify(data.posts.map((post:any) => post.id).join(',')))

  // Stripe init
  const session = await stripe.checkout.sessions.create({
    success_url: 'http://localhost:3000',
    cancel_url: 'http://localhost:3000',
    payment_intent_data: {
      metadata: {
        uid: data.uid,
        posts: JSON.stringify(data.posts.map((post:any) => post.id).join(',')),
      },
    },
    line_items:data.posts.map((post:any) => {
      return ({
        price_data: {
          currency: "usd",
          unit_amount: post.price * 100,
          product_data: {
            name: post.title,
          },
        },
        quantity: 1
      })
    }),
    mode: 'payment',
  });

  return (session ?
    {id: session.id} :
    "no res");
});

export const stripeWebhook =
functions.https.onRequest(async (request, response:any) => {

  let event

  const webhookRawBody = request.rawBody
  const webhookStripeSignatureHeader = request.headers["stripe-signature"]
  const webhookSecret = "whsec_HHWcMQ5gs1T9mYgIedeAFbPeU9hAXV4t"

  try {
    event = stripe.webhooks.constructEvent(
      webhookRawBody,
      webhookStripeSignatureHeader,
      webhookSecret
    );
  } catch (err) {
    console.log("BAD", err)

    return response.sendStatus(400)
  }

  try {
    admin.firestore().collection("orders").add({
      posts: event.data.object.metadata.posts.split(',').map((id:string) => id.replace(`"`, "")),
      uid: event.data.object.metadata.uid,
    shipping: event.data.object.shipping,
      status: "Waiting for seller to ship",
      createdAt: new Date(),
    })

    console.log("it worked!!!")
  } catch (e) {console.log}


  response.sendStatus(200)
})
