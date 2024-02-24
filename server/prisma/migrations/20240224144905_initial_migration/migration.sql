-- CreateTable
CREATE TABLE "Setter" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Setter_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "setterId" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DayOfTheWeek" (
    "id" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "value" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DayOfTheWeek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Appointment" (
    "id" TEXT NOT NULL,
    "setterId" TEXT NOT NULL,
    "isApproved" BOOLEAN NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Appointment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AppointmentToDayOfTheWeek" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Setter_email_key" ON "Setter"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_setterId_key" ON "User"("setterId");

-- CreateIndex
CREATE UNIQUE INDEX "DayOfTheWeek_day_key" ON "DayOfTheWeek"("day");

-- CreateIndex
CREATE INDEX "Appointment_setterId_idx" ON "Appointment"("setterId");

-- CreateIndex
CREATE UNIQUE INDEX "_AppointmentToDayOfTheWeek_AB_unique" ON "_AppointmentToDayOfTheWeek"("A", "B");

-- CreateIndex
CREATE INDEX "_AppointmentToDayOfTheWeek_B_index" ON "_AppointmentToDayOfTheWeek"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_setterId_fkey" FOREIGN KEY ("setterId") REFERENCES "Setter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_setterId_fkey" FOREIGN KEY ("setterId") REFERENCES "Setter"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToDayOfTheWeek" ADD CONSTRAINT "_AppointmentToDayOfTheWeek_A_fkey" FOREIGN KEY ("A") REFERENCES "Appointment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AppointmentToDayOfTheWeek" ADD CONSTRAINT "_AppointmentToDayOfTheWeek_B_fkey" FOREIGN KEY ("B") REFERENCES "DayOfTheWeek"("id") ON DELETE CASCADE ON UPDATE CASCADE;
