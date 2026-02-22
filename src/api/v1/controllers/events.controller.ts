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

export const createEvent = (req: Request, res: Response) => {
  const { name, date, capacity, status } = req.body;

  const newEvent: Event = {
    id: `evt_${String(events.length + 1).padStart(5, "0")}`,
    name,
    date,
    capacity,
    status: status ?? "active",
    registrationCount: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
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