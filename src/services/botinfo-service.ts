import { BotInfo, Menu, Option, Queue } from "@prisma/client";

import { botInfoRepository } from "@/repositories";
import { notFoundError, unauthorizedError } from "@/errors";

async function createBotInfo(userId: number, botInfo: CreateBotInfoParams) {
  const createdBot = await botInfoRepository.createBotInfo({
    ...botInfo,
    User: { connect: { id: userId } },
  });
  return createdBot;
}

async function getBotInfoById(userId: number, botInfoId: number) {
  const botInfo = await botInfoRepository.getBotInfoById(botInfoId);
  if (!botInfo) throw notFoundError();
  if (userId !== botInfo.userId) throw unauthorizedError();

  return botInfo;
}

async function updateBotInfo(
  userId: number,
  botInfoId: number,
  botInfo: CreateBotInfoParams
) {
  const botInfoExists = await botInfoRepository.getBotInfoById(botInfoId);
  if (!botInfoExists) throw notFoundError();
  if (botInfoExists.userId !== userId) throw unauthorizedError();

  const updatedBotInfo = botInfoRepository.updateBotInfo(botInfoId, botInfo);
  return updatedBotInfo;
}

async function deleteBotInfo(userId: number, botInfoId: number) {
  const botInfoExists = await botInfoRepository.getBotInfoById(botInfoId);
  if (!botInfoExists) throw notFoundError();
  if (botInfoExists.userId !== userId) throw unauthorizedError();

  const deletedBotInfo = botInfoRepository.deleteBotInfo(botInfoId);
  return deletedBotInfo;
}

export const botInfoService = {
  createBotInfo,
  getBotInfoById,
  updateBotInfo,
  deleteBotInfo,
};

export type CreateBotInfoParams = Pick<
  BotInfo,
  | "companyName"
  | "dayOffMessages"
  | "number"
  | "weekdays"
  | "weekend"
  | "daysOfWeek"
  | "weekendDays"
>;
