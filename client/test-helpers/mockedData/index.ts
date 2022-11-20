import { faker } from '@faker-js/faker'

export const getMockedUser = (): any => ({
    uid: faker.helpers.unique(faker.database.mongodbObjectId),
    email: faker.helpers.unique(faker.internet.email),
    name: faker.helpers.unique(faker.name.fullName),
})
