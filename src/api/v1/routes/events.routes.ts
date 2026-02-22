import { Router } from "express";
import { createEvent, getAllEvents } from "../controllers/events.controller";
import { validateBody } from "../middleware/validateBody";
import { createEventSchema } from "../validation/event.validation";

const router = Router();

router.post("/", validateBody(createEventSchema), createEvent);
router.get("/", getAllEvents);

export default router;