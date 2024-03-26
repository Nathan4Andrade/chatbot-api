import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { notFoundError } from "@/errors";

async function createQueue(botInfoId: number, queue: Prisma.QueueUncheckedCreateInput) {
  const { name, queueId } = queue;
  return prisma.queue.create({
    data: { name, queueId, BotInfo: { connect: { id: botInfoId } } },
  });
}

async function getQueueById(id: number) {
  const queue = await prisma.queue.findUnique({
    where: { id },
    include: { BotInfo: true },
  });
  if (!queue) {
    throw notFoundError();
  }
  return queue;
}

async function updateQueue(id: number, queue: Prisma.QueueUpdateInput) {
  const updatedQueue = await prisma.queue.update({
    where: { id },
    data: queue,
  });
  return updatedQueue;
}

async function deleteQueue(id: number) {
  return prisma.queue.delete({ where: { id } });
}

async function getQueuesByBotId(botInfoId: number) {
  return prisma.queue.findMany({
    where: { botInfoId: botInfoId },
  });
}

export const queueRepository = {
  createQueue,
  getQueueById,
  updateQueue,
  deleteQueue,
  getQueuesByBotId,
};
