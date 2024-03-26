import { Prisma } from "@prisma/client";
import { prisma } from "@/config";
import { notFoundError } from "@/errors";

async function createMenu(menu: Prisma.MenuCreateInput) {
  return prisma.menu.create({
    data: menu,
  });
}

async function getMenuById(menuId: number) {
  const menu = await prisma.menu.findUnique({
    where: { id: menuId },
    include: { BotInfo: true },
  });

  return menu;
}

async function updateMenu(menuId: number, menu: Prisma.MenuUpdateInput) {
  const updatedMenu = await prisma.menu.update({
    where: { id: menuId },
    data: menu,
  });
  return updatedMenu;
}

async function deleteMenu(menuId: number) {
  return prisma.menu.delete({ where: { id: menuId } });
}

async function getMenusByBotId(botInfoId: number) {
  return prisma.menu.findMany({
    where: { botInfoId: botInfoId },
  });
}

export const menuRepository = {
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
  getMenusByBotId,
};
