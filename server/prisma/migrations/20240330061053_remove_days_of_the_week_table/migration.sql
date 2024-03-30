/*
  Warnings:

  - You are about to drop the `DayOfTheWeek` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AppointmentToDayOfTheWeek` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AppointmentToDayOfTheWeek" DROP CONSTRAINT "_AppointmentToDayOfTheWeek_A_fkey";

-- DropForeignKey
ALTER TABLE "_AppointmentToDayOfTheWeek" DROP CONSTRAINT "_AppointmentToDayOfTheWeek_B_fkey";

-- AlterTable
ALTER TABLE "Appointment" ALTER COLUMN "endTime" DROP NOT NULL;

-- DropTable
DROP TABLE "DayOfTheWeek";

-- DropTable
DROP TABLE "_AppointmentToDayOfTheWeek";
