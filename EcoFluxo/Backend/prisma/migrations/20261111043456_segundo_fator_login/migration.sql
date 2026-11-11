-- AlterTable
ALTER TABLE `usuarios` ADD COLUMN `loginCode` VARCHAR(191) NULL,
    ADD COLUMN `loginCodeExpires` DATETIME(3) NULL;
