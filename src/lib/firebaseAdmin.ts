import admin from "firebase-admin";

if (!admin.apps.length) {
  const serviceAccount = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
      /\\n/g,
      "\n"
    ),
  };
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  // console.log("Firebase Admin SDK 初期化成功");
}

export const auth = admin.auth();
export const db = admin.firestore();
