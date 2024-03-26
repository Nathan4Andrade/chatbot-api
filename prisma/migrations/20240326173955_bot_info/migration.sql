-- CreateTable
CREATE TABLE "BotInfo" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "companyName" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "defaultQueueId" INTEGER NOT NULL,
    "weekdays" TEXT[],
    "weekend" TEXT[],
    "daysOfWeek" INTEGER[],
    "weekendDays" INTEGER[],
    "dayOffMessages" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BotInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Queue" (
    "id" SERIAL NOT NULL,
    "queueId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "botInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Queue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Menu" (
    "id" SERIAL NOT NULL,
    "menuId" INTEGER NOT NULL,
    "intro" TEXT NOT NULL,
    "transferMessage" TEXT NOT NULL,
    "botInfoId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Menu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Option" (
    "id" SERIAL NOT NULL,
    "optionId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "menuId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "userIdTransfer" INTEGER,
    "queueIdTransfer" INTEGER,
    "menuIdTransfer" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Option_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BotInfo_userId_key" ON "BotInfo"("userId");

-- AddForeignKey
ALTER TABLE "BotInfo" ADD CONSTRAINT "BotInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Queue" ADD CONSTRAINT "Queue_botInfoId_fkey" FOREIGN KEY ("botInfoId") REFERENCES "BotInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Menu" ADD CONSTRAINT "Menu_botInfoId_fkey" FOREIGN KEY ("botInfoId") REFERENCES "BotInfo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_menuId_fkey" FOREIGN KEY ("menuId") REFERENCES "Menu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
