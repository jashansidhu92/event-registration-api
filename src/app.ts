import express, { Request, Response } from "express";
import v1Router from "./api/v1/routes";

export const app = express();

app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/v1", v1Router);
