import admin from "firebase-admin";

if (!admin.apps.length) {
  console.log("Firebase Admin SDK 初期化中...");
  //   const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_SDK || "{}");
  //   admin.initializeApp({
  //     credential: admin.credential.cert(serviceAccount),
  //   });
  // } else {
  //   admin.app();
  // }

  try {
    const serviceAccount = {
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: (process.env.FIREBASE_PRIVATE_KEY as string).replace(
        /\\n/g,
        "\n"
      ),
    };
    console.log(serviceAccount);

    if (!serviceAccount) {
      throw new Error("FIREBASE_ADMIN_SDK が設定されていません。");
    }

    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });

    console.log("Firebase Admin SDK 初期化成功");
  } catch (error) {
    console.error("Firebase Admin SDK の初期化に失敗しました:", error);
  }
} else {
  console.log("Firebase Admin SDK はすでに初期化済み");
}

export const auth = admin.auth();
