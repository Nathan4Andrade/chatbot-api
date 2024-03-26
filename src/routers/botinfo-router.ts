import { Router } from "express";

import { authenticateToken, validateBody, validateParams } from "@/middlewares";
import { createBotInfo } from "@/controllers";
import { createBotInfoSchema } from "@/schemas";

const botInfoRouter = Router();

botInfoRouter
  .all("/*", authenticateToken)
  .post("/", validateBody(createBotInfoSchema), createBotInfo);

export { botInfoRouter };
