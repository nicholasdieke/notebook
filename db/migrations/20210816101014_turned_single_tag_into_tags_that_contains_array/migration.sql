/*
  Warnings:

  - You are about to drop the column `tag` on the `Note` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Note" DROP COLUMN "tag",
ADD COLUMN     "tags" TEXT[];
