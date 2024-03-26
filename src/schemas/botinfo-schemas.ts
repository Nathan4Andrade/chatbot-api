import Joi from "joi";

import { BotInfoParam } from "@/repositories";
import { CreateBotInfoParams } from "@/services";

export const createBotInfoSchema = Joi.object<CreateBotInfoParams>({
  companyName: Joi.string().required(),
  number: Joi.string().required(),
  weekdays: Joi.array().items(Joi.string()).max(2).required(),
  weekend: Joi.array().items(Joi.string()).max(2).required(),
  daysOfWeek: Joi.array().items(Joi.number()).max(5).required(),
  weekendDays: Joi.array().items(Joi.number()).max(2).required(),
  dayOffMessages: Joi.array().items(Joi.string()).max(3).required(),
});

export const botInfoParamSchema = Joi.object<BotInfoParam>({
  botInfoId: Joi.number().required(),
});
