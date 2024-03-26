import { Menu, Option, Queue } from "@prisma/client";
import { menuRepository } from "@/repositories";
import { notFoundError, unauthorizedError } from "@/errors";

async function createMenu(botInfoId: number, menu: CreateMenuParams) {
  return menuRepository.createMenu({
    ...menu,
    BotInfo: { connect: { id: botInfoId } },
  });
}

async function getMenuById(userId: number, menuId: number) {
  const menu = await menuRepository.getMenuById(menuId);
  if (!menu) throw notFoundError();
  if (userId !== menu.BotInfo.userId) throw unauthorizedError();

  return menu;
}

async function updateMenu(
  userId: number,
  menuId: number,
  menu: CreateMenuParams
) {
  const menuExists = await menuRepository.getMenuById(menuId);
  if (!menuExists) throw notFoundError();
  if (menuExists.BotInfo.userId !== userId) throw unauthorizedError();

  const updatedMenu = menuRepository.updateMenu(menuId, menu);
  return updatedMenu;
}

async function deleteMenu(userId: number, menuId: number) {
  const menuExists = await menuRepository.getMenuById(menuId);
  if (!menuExists) throw notFoundError();
  if (menuExists.BotInfo.userId !== userId) throw unauthorizedError();

  const deletedMenu = menuRepository.deleteMenu(menuId);
  return deletedMenu;
}

export const menuService = {
  createMenu,
  getMenuById,
  updateMenu,
  deleteMenu,
};

export type CreateMenuParams = Pick<
  Menu,
  "menuId" | "intro" | "transferMessage"
>;
