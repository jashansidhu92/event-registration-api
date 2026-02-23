import { db } from "../../../config/firebaseConfig";
import { Event } from "../models/event.model";
import { randomUUID } from "crypto";

const collectionName = "events";
const useMemory = process.env.USE_INMEMORY_DB === "true";
const memoryStore = new Map<string, Event>();

export const createEventRepo = async (
  data: Omit<Event, "id">
): Promise<Event> => {
  if (useMemory) {
    const id = randomUUID();
    const event = { id, ...data };
    memoryStore.set(id, event);
    return event;
  }

  const docRef = await db.collection(collectionName).add(data);
  return { id: docRef.id, ...data };
};

export const getAllEventsRepo = async (): Promise<Event[]> => {
  if (useMemory) {
    return Array.from(memoryStore.values());
  }

  const snapshot = await db.collection(collectionName).get();
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Omit<Event, "id">),
  }));
};

export const getEventByIdRepo = async (id: string): Promise<Event | null> => {
  const docSnap = await db.collection(collectionName).doc(id).get();
  if (!docSnap.exists) return null;

  return {
    id: docSnap.id,
    ...(docSnap.data() as Omit<Event, "id">),
  };
};

export const updateEventRepo = async (
  id: string,
  data: Partial<Omit<Event, "id">>
): Promise<Event | null> => {
  const docRef = db.collection(collectionName).doc(id);

  const docSnap = await docRef.get();
  if (!docSnap.exists) return null;

  await docRef.update(data);

  const updatedSnap = await docRef.get();
  return {
    id: updatedSnap.id,
    ...(updatedSnap.data() as Omit<Event, "id">),
  };
};

export const deleteEventRepo = async (id: string): Promise<boolean> => {
  const docRef = db.collection(collectionName).doc(id);

  const docSnap = await docRef.get();
  if (!docSnap.exists) return false;

  await docRef.delete();
  return true;
};