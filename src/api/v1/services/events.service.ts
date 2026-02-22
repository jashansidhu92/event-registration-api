import { Event } from "../models/event.model";

const events: Event[] = [];

export const createEventService = async (event: Event) => {
  events.push(event);
  return event;
};

export const getAllEventsService = async () => {
  return events;
};