import { Request, Response } from "express";
import { Event } from "../models/event.model";

let events: Event[] = [];
let nextId = 1;

export const createEvent = (req: Request, res: Response) => {
  const newEvent: Event = {
    id: String(nextId++),
    ...req.body,
    createdAt: new Date().toISOString(),
  };

  events.push(newEvent);
  return res.status(201).json(newEvent);
};

export const getAllEvents = (_req: Request, res: Response) => {
  return res.status(200).json(events);
};

export const getEventById = (req: Request, res: Response) => {
  const { id } = req.params;

  const event = events.find((e) => e.id === id);
  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.status(200).json(event);
};

export const updateEvent = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = events.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const updated: Event = {
    ...events[index],
    ...req.body,
    id, 
  };

  events[index] = updated;
  return res.status(200).json(updated);
};

export const deleteEvent = (req: Request, res: Response) => {
  const { id } = req.params;

  const index = events.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events.splice(index, 1);
  return res.status(204).send();
};