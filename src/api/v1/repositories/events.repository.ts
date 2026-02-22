import { db } from "../../../config/firebaseConfig";
import { Event } from "../models/event.model";
import type { QueryDocumentSnapshot } from "firebase-admin/firestore";

const collectionName = "events";

export const createEventRepo = async (data: Omit<Event, "id">): Promise<Event> => {
  const docRef = await db.collection(collectionName).add(data);
  return { id: docRef.id, ...data };
};

export const getAllEventsRepo = async (): Promise<Event[]> => {
  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc: QueryDocumentSnapshot) => ({
    id: doc.id,
    ...(doc.data() as Omit<Event, "id">),
  }));
};

export const getEventByIdRepo = async (id: string): Promise<Event | null> => {
  const doc = await db.collection(collectionName).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...(doc.data() as Omit<Event, "id">) };
};

export const updateEventRepo = async (
  id: string,
  data: Partial<Omit<Event, "id">>
): Promise<Event | null> => {
  const docRef = db.collection(collectionName).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return null;

  await docRef.update(data);
  const updatedDoc = await docRef.get();
  return { id: updatedDoc.id, ...(updatedDoc.data() as Omit<Event, "id">) };
};

export const deleteEventRepo = async (id: string): Promise<boolean> => {
  const docRef = db.collection(collectionName).doc(id);
  const doc = await docRef.get();
  if (!doc.exists) return false;

  await docRef.delete();
  return true;
};