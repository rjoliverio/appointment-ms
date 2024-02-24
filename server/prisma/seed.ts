import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const fakerSetter = {
  name: 'Rj Oliverio',
  email: 'rjmoliverio@gmail.com',
  contactNumber: '09123456789',
}
const fakerUser = {
  // Default password: 123456
  password: '$2a$12$8TyIM/v2/oG8uUq8C4Fnle/4kgEVTIk62ySm3lq5Jyha7JElSrjza',
}
const fakerDaysOfTheWeek = [
  {
    day: 'Sunday',
    value: 0,
  },
  {
    day: 'Monday',
    value: 1,
  },
  {
    day: 'Tuesday',
    value: 2,
  },
  {
    day: 'Wednesday',
    value: 3,
  },
  {
    day: 'Thursday',
    value: 4,
  },
  {
    day: 'Friday',
    value: 5,
  },
  {
    day: 'Saturday',
    value: 6,
  },
]

async function main() {
  const setter = await prisma.setter.upsert({
    where: { email: fakerSetter.email },
    update: fakerSetter,
    create: fakerSetter,
  })
  await prisma.user.upsert({
    where: { setterId: setter.id },
    update: fakerUser,
    create: {
      ...fakerUser,
      setter: {
        connect: { id: setter.id },
      },
    },
  })
  await prisma.dayOfTheWeek.createMany({
    data: fakerDaysOfTheWeek,
    skipDuplicates: true,
  })
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
