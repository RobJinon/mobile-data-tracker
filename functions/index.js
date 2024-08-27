/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

exports.updateCurrentDate = functions.pubsub.schedule('0 5 * * *').timeZone('Asia/Manila').onRun(async(context) => {
    const db = admin.firestore();
    const currentDate = new Date().toISOString().split('T')[0]; // format date as YYYY-MM-DD
    
    try {
        const ispsRef = db.collection('isps');
        const snapshot = await ispsRef.get();
        const batch = db.batch();

        snapshot.forEach(doc => {
            const docRef = ispsRef.doc(doc.id);
            batch.update(docRef, { currDate: currentDate });
        });

        await batch.commit();
        console.log("Successfully updated currDate for all documents");
    } catch (error) {
        console.error("Error updating currentDate: ", error);
    }
});