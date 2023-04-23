// import admin from 'firebase-admin';
// import { applicationDefault, getApps } from 'firebase-admin/app';
// import * as fireorm from 'fireorm';

// export default function initFirebaseAdmin() {
//   if (!isAppInitialized()) {
//     try {
//       doInitialize();
//     } catch (ignored) {
//       console.log(ignored);
//     }
//   }
// }

// function isAppInitialized() {
//   return getApps().length > 0;
// }

// /**
//  * Effectively perform Firebase Admin SDK initialization
//  * with serviceAccount
//  */
// function doInitialize() {
//   admin.initializeApp({
//     credential: applicationDefault(),
//     databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseio.com`,
//     projectId: `${process.env.FIREBASE_PROJECT_ID}`,
//   });

//   const firestoreObj = admin.firestore();
//   fireorm.initialize(firestoreObj, {
//     validateModels: true,
//     validatorOptions: { whitelist: true },
//   });
// }
