import admin from 'firebase-admin';
import {applicationDefault, getApps} from 'firebase-admin/app';

export default function initFirebaseAdmin() {
  if (!isAppInitialized()) {
    try {
      doInitializeApp();
    } catch (error) {
      console.log(error);
    }
  }
}

function isAppInitialized() {
  return getApps().length > 0;
}

function doInitializeApp() {
  const credential = applicationDefault();
  admin.initializeApp({
    credential,
  });
}
