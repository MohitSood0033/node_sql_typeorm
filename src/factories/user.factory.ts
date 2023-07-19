import { Faker } from "@faker-js/faker";
import { User } from "../entities/users";
import { define } from "typeorm-seeding";

define(User, (faker: Faker) => {
  const user = new User();
  user.first_name = faker.name.firstName();
  user.last_name = faker.name.lastName();
  user.email = faker.internet.email();
  user.password = faker.internet.password();
  return user;
});