import { Option, Queue } from "@prisma/client";
import { optionRepository } from "@/repositories";
import { notFoundError } from "@/errors";

async function createOption(menuId: number, option: CreateOptionParams) {
  return optionRepository.createOption({
    ...option,
    Menu: { connect: { id: menuId } },
  });
}

async function getOptionById(optionId: number) {
  const option = optionRepository.getOptionById(optionId);
  if (!option) throw notFoundError();
  return option;
}

async function updateOption(optionId: number, option: CreateOptionParams) {
  const updatedOption = optionRepository.updateOption(optionId, option);
  if (!updatedOption) throw notFoundError();
  return updatedOption;
}

async function deleteOption(optionId: number) {
  const deletedOption = optionRepository.deleteOption(optionId);
  if (!deletedOption) throw notFoundError();
  return deletedOption;
}

export const optionService = {
  createOption,
  getOptionById,
  updateOption,
  deleteOption,
};

export type CreateOptionParams = Pick<
  Option,
  | "optionId"
  | "name"
  | "action"
  | "userIdTransfer"
  | "menuIdTransfer"
  | "queueIdTransfer"
>;
