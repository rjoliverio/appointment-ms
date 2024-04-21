/*
  Warnings:

  - You are about to drop the column `isApproved` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `status` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "AppointmentStatus" AS ENUM ('Approved', 'Waiting', 'Rejected');

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "isApproved",
ADD COLUMN     "status" "AppointmentStatus" NOT NULL;
