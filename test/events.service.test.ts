import { createEventService, getAllEventsService } from "../src/api/v1/services/events.service";
import { Event } from "../src/api/v1/models/event.model";

jest.mock("../src/api/v1/repositories/events.repository", () => ({
  createEventRepo: jest.fn(async (event: Omit<Event, "id">) => ({
    id: "mock-id",
    ...event,
  })),
  getAllEventsRepo: jest.fn(async () => [
    {
      id: "mock-id",
      name: "Test Event",
      date: "2026-01-01",
      location: "Winnipeg",
      capacity: 10,
      category: "Workshop",
      registrationCount: 0,
      status: "active",
      createdAt: "2026-01-01",
    },
  ]),
}));

afterEach(() => {
  jest.clearAllMocks();
});

describe("Event Service", () => {
  it("should create an event and return it", async () => {
    // Arrange
    const payload: Omit<Event, "id"> = {
      name: "Test Event",
      date: "2026-01-01",
      location: "Winnipeg",
      capacity: 10,
      category: "workshop",
      registrationCount: 0,
      status: "active",
      createdAt: "2026-01-01",
    };

    // Act
    const created = await createEventService(payload);

    // Assert
    expect(created.id).toBe("mock-id");
    expect(created.name).toBe("Test Event");
  });

  it("should return all events", async () => {
    // Arrange (mock already returns 1 event)

    // Act
    const all = await getAllEventsService();

    // Assert
    expect(all.length).toBeGreaterThan(0);
    expect(all[0].id).toBe("mock-id");
  });
});