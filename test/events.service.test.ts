import { createEventService, getAllEventsService } from "../src/api/v1/services/events.service";
import { Event } from "../src/api/v1/models/event.model";

describe("Event Service", () => {
  it("should create an event and return it", async () => {
    const event: Event = {
      name: "Test Event",
      date: "2026-01-01",
      location: "Winnipeg",
      capacity: 10,
      status: "draft",
    };

    const created = await createEventService(event);
    expect(created.name).toBe("Test Event");

    const all = await getAllEventsService();
    expect(all.length).toBeGreaterThan(0);
  });
});