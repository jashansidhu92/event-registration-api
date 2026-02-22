import request from "supertest";
import { app } from "../src/app";

describe("Event validation – invalid date", () => {
  it("should return 400 with correct validation message for invalid date", async () => {
    const response = await request(app)
      .post("/api/v1/events")
      .send({
        name: "Test Event",
        date: "not-a-date",
        location: "Winnipeg",
        capacity: 50,
      });

    expect(response.status).toBe(400);

    expect(response.body).toEqual({
  message: 'Validation error: "date" must be in ISO 8601 date format',
});
  });
});