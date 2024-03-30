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
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect()
  })
