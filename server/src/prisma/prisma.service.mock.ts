const generateMock = () => {
  return {
    create: jest.fn(),
    createMany: jest.fn(),
    findFirst: jest.fn(),
    findUnique: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    updateMany: jest.fn(),
    delete: jest.fn(),
    deleteMany: jest.fn(),
    findFirstOrThrow: jest.fn(),
    findUniqueOrThrow: jest.fn(),
    count: jest.fn(),
    upsert: jest.fn(),
    aggregate: jest.fn(),
    groupBy: jest.fn(),
  }
}

export class PrismaServiceMock {
  user = generateMock()
  notification = generateMock()
  appointment = generateMock()
  setter = generateMock()
  $transaction = jest.fn()
}
