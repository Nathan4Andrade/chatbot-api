import { Queue } from "@prisma/client";
import { queueRepository } from "@/repositories";
import { notFoundError } from "@/errors";

async function createQueue(botInfoId: number, queue: CreateQueueParams) {
  return queueRepository.createQueue(botInfoId, {
    ...queue,
  });
}

async function getQueueById(id: number) {
  const queue = queueRepository.getQueueById(id);
  if (!queue) throw notFoundError();
  return queue;
}

async function updateQueue(id: number, queue: CreateQueueParams) {
  const updatedQueue = queueRepository.updateQueue(id, queue);
  if (!updatedQueue) throw notFoundError();
  return updatedQueue;
}

async function deleteQueue(id: number) {
  const deletedQueue = queueRepository.deleteQueue(id);
  if (!deletedQueue) throw notFoundError();
  return deletedQueue;
}

export const queueService = {
  createQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
};

export type CreateQueueParams = Pick<Queue, "queueId" | "name" | "botInfoId">;
