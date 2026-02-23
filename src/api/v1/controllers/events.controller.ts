import { Request, Response } from "express";
import {
  createEventService,
  getAllEventsService,
  getEventByIdService,
  updateEventService,
  deleteEventService,
} from "../services/events.service";
import { Event } from "../models/event.model";

export const createEvent = async (req: Request, res: Response) => {
  try {
    const payload: Omit<Event, "id"> = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };

    const created = await createEventService(payload);
    return res.status(201).json(created);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllEvents = async (_req: Request, res: Response) => {
  try {
    const events = await getAllEventsService();
    return res.status(200).json(events);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await getEventByIdService(req.params.id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(event);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const updated = await updateEventService(req.params.id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(200).json(updated);
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const deleted = await deleteEventService(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Event not found" });
    }

    return res.status(204).send();
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};