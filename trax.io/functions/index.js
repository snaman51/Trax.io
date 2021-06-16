
const functions = require("firebase-functions");

const admin = require("firebase-admin");
admin.initializeApp();

const firestore = admin.firestore();

exports.toFirestore = functions.database.ref("/test")
    .onWrite((change, context) => {
      const original = change.after.val();
      original.time=Date.now();
      console.log("Uppercasing", context.params.pushId, original);
      return firestore.collection("location").doc("device").collection("snaman")
          .add(original).then(() => {
            console.log("Document successfully written!");
          });
    });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
