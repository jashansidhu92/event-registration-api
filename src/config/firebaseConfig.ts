import admin from "firebase-admin";

if (process.env.USE_INMEMORY_DB === "true") {
} else {
  if (!admin.apps.length) {
    admin.initializeApp();
  }
}

export const db = admin.firestore();