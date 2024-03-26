import Joi from "joi";

import { CreateQueueParams } from "@/services";

export const createQueueSchema = Joi.object<CreateQueueParams>({
  name: Joi.string().required(),
  queueId: Joi.number().required(),
  botInfoId: Joi.number().required(),
});
