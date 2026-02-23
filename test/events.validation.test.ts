import request from "supertest";
import app from "../src/app";

describe("Event Validation", () => {
  it("should return 400 when date is invalid", async () => {

    const payload = {
      name: "Bad Event",
      date: "not-a-date",
      location: "Winnipeg",
      capacity: 20,
      category: "sports",
      registrationCount: 0,
      status: "active",
    };

    const response = await request(app)
      .post("/api/v1/events")
      .send(payload);

    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
  });
});