import { Response } from "express";
import httpStatus from "http-status";
import { AuthenticatedRequest } from "@/middlewares";
import { notFoundError, unauthorizedError } from "@/errors";

import { botInfoService } from "@/services";

async function createBotInfo(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  const {
    companyName,
    number,
    weekdays,
    weekend,
    dayOffMessages,
    daysOfWeek,
    weekendDays,
  } = req.body;

  const botInfo = await botInfoService.createBotInfo(userId, {
    companyName,
    number,
    weekdays,
    weekend,
    dayOffMessages,
    daysOfWeek,
    weekendDays,
  });
  res.status(httpStatus.CREATED).json(botInfo);
}

async function getBotInfoById(req: AuthenticatedRequest, res: Response) {
  const { botInfoId } = req.params;
  const { userId } = req;
  const botInfo = await botInfoService.getBotInfoById(
    userId,
    Number(botInfoId)
  );

  return res.status(httpStatus.OK).send(botInfo);
}

async function updateBotInfo(req: AuthenticatedRequest, res: Response) {
  const { botInfoId } = req.params;
  const { userId } = req;
  const {
    companyName,
    number,
    defaultQueueId,
    weekdays,
    weekend,
    dayOffMessages,
    daysOfWeek,
    weekendDays,
  } = req.body;

  const updatedBotInfo = await botInfoService.updateBotInfo(
    userId,
    Number(botInfoId),
    {
      companyName,
      number,
      weekdays,
      weekend,
      dayOffMessages,
      daysOfWeek,
      weekendDays,
    }
  );

  return res.status(httpStatus.OK).send(updatedBotInfo);
}

async function deleteBotInfo(req: AuthenticatedRequest, res: Response) {
  const { botInfoId } = req.params;
  const { userId } = req;
  const deletedBotInfo = await botInfoService.deleteBotInfo(
    userId,
    Number(botInfoId)
  );

  return res.status(httpStatus.OK).send(deletedBotInfo);
}

export { createBotInfo, getBotInfoById, updateBotInfo, deleteBotInfo };
