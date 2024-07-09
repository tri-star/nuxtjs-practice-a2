import { faker } from '@faker-js/faker'
import { factory, nullable, primaryKey } from '@mswjs/data'

export const mswDb = factory({
  loggedAdminUser: {
    id: primaryKey(faker.string.uuid),
    name: faker.person.fullName,
    loginId: faker.internet.userName,
    createdAt: nullable(faker.date.recent),
    updatedAt: nullable(faker.date.recent),
  },
  adminUser: {
    id: primaryKey(faker.string.uuid),
    name: faker.person.fullName,
    loginId: faker.internet.userName,
    createdAt: nullable(faker.date.recent),
    updatedAt: nullable(faker.date.recent),
  },
})
