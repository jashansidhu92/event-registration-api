import { Event } from "../models/event.model";
import {
  createEventRepo,
  getAllEventsRepo,
  getEventByIdRepo,
  updateEventRepo,
  deleteEventRepo,
} from "../repositories/events.repository";

export const createEventService = async (data: Omit<Event, "id">): Promise<Event> => {
  try {
    return await createEventRepo(data);
  } catch (err) {
    throw new Error("Failed to create event");
  }
};

export const getAllEventsService = async (): Promise<Event[]> => {
  try {
    return await getAllEventsRepo();
  } catch (err) {
    throw new Error("Failed to fetch events");
  }
};

export const getEventByIdService = async (id: string): Promise<Event | null> => {
  try {
    return await getEventByIdRepo(id);
  } catch (err) {
    throw new Error("Failed to fetch event");
  }
};

export const updateEventService = async (
  id: string,
  data: Partial<Omit<Event, "id">>
): Promise<Event | null> => {
  try {
    return await updateEventRepo(id, data);
  } catch (err) {
    throw new Error("Failed to update event");
  }
};

export const deleteEventService = async (id: string): Promise<boolean> => {
  try {
    return await deleteEventRepo(id);
  } catch (err) {
    throw new Error("Failed to delete event");
  }
};