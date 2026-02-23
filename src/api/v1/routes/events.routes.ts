import { Router } from "express";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
} from "../controllers/events.controller";
import { validateBody } from "../middleware/validateBody";
import { createEventSchema, updateEventSchema } from "../validation/event.validation";

const router = Router();

router.post("/", validateBody(createEventSchema), createEvent);
router.get("/", getAllEvents);
router.get("/:id", getEventById);
router.put("/:id", validateBody(updateEventSchema), updateEvent);
router.delete("/:id", deleteEvent);

export default router;