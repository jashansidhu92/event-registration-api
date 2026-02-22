import express, { Request, Response } from "express";
import v1Router from "./api/v1/routes";

export const app = express();

app.use(express.json());

app.use((req, res) => {
  res.status(HTTP_STATUS.NOT_FOUND).json({ message: "Route not found" });
});

app.use("/api/v1", v1Router);
