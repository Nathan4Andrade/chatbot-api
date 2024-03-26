import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";

import { queueService } from "@/services";

async function createQueue(req: AuthenticatedRequest, res: Response) {
  const { name, queueId, botInfoId } = req.body;

  const queue = await queueService.createQueue(botInfoId, {
    name,
    queueId,
    botInfoId,
  });
  res.status(httpStatus.CREATED).json(queue);
}

async function getQueueById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const queue = await queueService.getQueueById(Number(id));
  res.status(httpStatus.OK).send(queue);
}

async function updateQueue(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const { name, queueId, botInfoId } = req.body;

  const updatedQueue = await queueService.updateQueue(Number(id), {
    name,
    queueId,
    botInfoId,
  });
  res.status(httpStatus.OK).send(updatedQueue);
}

async function deleteQueue(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  await queueService.deleteQueue(Number(id));
  res.status(httpStatus.NO_CONTENT).send();
}

export { createQueue, getQueueById, updateQueue, deleteQueue };
