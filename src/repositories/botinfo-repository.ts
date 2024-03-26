import { Prisma } from "@prisma/client";
import { prisma } from "@/config";

async function createBotInfo(botInfo: Prisma.BotInfoCreateInput) {
  return prisma.botInfo.create({
    data: {
      ...botInfo,
    },
  });
}

async function getBotInfoById(botInfoId: number) {
  const botInfo = await prisma.botInfo.findUnique({ where: { id: botInfoId } });
  return botInfo;
}

async function updateBotInfo(
  botInfoId: number,
  bot: Prisma.BotInfoUpdateInput
) {
  const updatedBotInfo = await prisma.botInfo.update({
    where: { id: botInfoId },
    data: bot,
  });
  return updatedBotInfo;
}

async function deleteBotInfo(botInfoId: number) {
  return await prisma.botInfo.delete({
    where: { id: botInfoId },
  });
}

export const botInfoRepository = {
  createBotInfo,
  getBotInfoById,
  updateBotInfo,
  deleteBotInfo,
};

export type BotInfoParam = { botInfoId: number };
