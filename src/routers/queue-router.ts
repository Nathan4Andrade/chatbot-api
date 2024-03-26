import { Router } from "express";

import { authenticateToken, validateBody, validateParams } from "@/middlewares";

import { createQueue } from "@/controllers";

import { createQueueSchema } from "@/schemas";

const queueRouter = Router();

queueRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createQueueSchema), createQueue);

export { queueRouter };
