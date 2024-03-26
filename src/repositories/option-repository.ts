import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { notFoundError } from "@/errors";

async function createOption(option: Prisma.OptionCreateInput) {
  return prisma.option.create({
    data: {
      ...option,
    },
  });
}

async function getOptionById(optionId: number) {
  const option = await prisma.option.findUnique({
    where: { id: optionId },
    include: { Menu: true },
  });
  if (!option) {
    throw notFoundError();
  }
  return option;
}

async function updateOption(
  optionId: number,
  option: Prisma.OptionUpdateInput
) {
  const updatedOption = await prisma.option.update({
    where: { id: optionId },
    data: option,
  });
  return updatedOption;
}

async function deleteOption(optionId: number) {
  return prisma.option.delete({ where: { id: optionId } });
}

async function getOptionsByMenuId(menuId: number) {
  return prisma.option.findMany({
    where: { menuId: menuId },
  });
}

export const optionRepository = {
  createOption,
  getOptionById,
  updateOption,
  deleteOption,
  getOptionsByMenuId,
};
