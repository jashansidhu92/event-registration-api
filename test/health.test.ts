import request from "supertest";
import { app } from "../src/app";

it("returns 200 for /health", async () => {
  const res = await request(app).get("/health");
  expect(res.status).toBe(200);
});