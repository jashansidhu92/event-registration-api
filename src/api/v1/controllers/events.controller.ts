import { Request, Response } from "express";

interface Event {
  id: string;
  name: string;
  date: string;
  capacity: number;
  status: string;
  registrationCount: number;
  createdAt: string;
  updatedAt: string;
}

const events: Event[] = [];

function findEventIndex(id: string) {
  return events.findIndex((e) => e.id === id);
}

export const createEvent = (req: Request, res: Response) => {
  const { name, date, capacity, status, registrationCount } = req.body;

  const now = new Date().toISOString();
  const newEvent: Event = {
    id: `evt_${String(events.length + 1).padStart(5, "0")}`,
    name,
    date,
    capacity,
    status,
    registrationCount: registrationCount ?? 0,
    createdAt: now,
    updatedAt: now,
  };

  events.push(newEvent);

  return res.status(201).json({
    message: "event created",
    data: newEvent,
  });
};

export const getAllEvents = (_req: Request, res: Response) => {
  return res.status(200).json({
    count: events.length,
    data: events,
  });
};

export const getEventById = (req: Request, res: Response) => {
  const event = events.find((e) => e.id === req.params.id);

  if (!event) {
    return res.status(404).json({ message: "Event not found" });
  }

  return res.status(200).json({ data: event });
};

export const updateEvent = (req: Request, res: Response) => {
  const index = findEventIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  const existing = events[index];
  const updated: Event = {
    ...existing,
    ...req.body,
    updatedAt: new Date().toISOString(),
  };

  events[index] = updated;

  return res.status(200).json({
    message: "event updated",
    data: updated,
  });
};

export const deleteEvent = (req: Request, res: Response) => {
  const index = findEventIndex(req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Event not found" });
  }

  events.splice(index, 1);

  return res.status(200).json({ message: "event deleted" });
};