import request from "supertest";
import { app } from "../src/app";

it("returns 400 for missing name", async () => {
  const res = await request(app)
    .post("/api/v1/events")
    .send({ date: "2026-01-01", location: "Place", capacity: 10 });
  expect(res.status).toBe(400);
});