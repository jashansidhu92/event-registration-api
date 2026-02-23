import {
  createEventRepo,
  getAllEventsRepo,
  getEventByIdRepo,
  updateEventRepo,
  deleteEventRepo,
} from "../repositories/events.repository";
import { Event } from "../models/event.model";

export const createEventService = async (
  data: Omit<Event, "id">
): Promise<Event> => {
  return await createEventRepo(data);
};

export const getAllEventsService = async (): Promise<Event[]> => {
  return await getAllEventsRepo();
};

export const getEventByIdService = async (
  id: string
): Promise<Event | null> => {
  return await getEventByIdRepo(id);
};

export const updateEventService = async (
  id: string,
  data: Partial<Omit<Event, "id">>
): Promise<Event | null> => {
  return await updateEventRepo(id, data);
};

export const deleteEventService = async (id: string): Promise<boolean> => {
  return await deleteEventRepo(id);
};