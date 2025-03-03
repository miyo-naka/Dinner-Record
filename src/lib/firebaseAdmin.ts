import admin from "firebase-admin";

// const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK as string);

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.applicationDefault(),
  });
} else {
  admin.app();
}

export const auth = admin.auth();
