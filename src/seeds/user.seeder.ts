// import { define, Factory, Seeder } from "typeorm-seeding";
// import { Connection, DataSource, Repository } from "typeorm";
// import { User } from "../entities/users";
// import bcrypt from 'bcrypt';

// export default class UserSeeder implements Seeder {
//   public async run(factory: Factory, connection: Connection): Promise<void> {
//     const userRepository: Repository<User> = connection.getRepository(User);

//     const users = [
//       { first_name: 'John', last_name: 'Doe', email: 'john.doe@example.com', password: 'password123' },
//       // Add more user objects as needed
//     ];

//     for (const userData of users) {
//       const existingUser = await userRepository.findOne({where: { email: userData.email }});

//       if (existingUser) {
//         console.log(`User with email ${userData.email} already exists. Skipping.`);
//         continue;
//       }
//       const user = userRepository.create({
//         first_name: userData.first_name,
//         last_name: userData.last_name,
//         email: userData.email,
//         password: await bcrypt.hash(userData.password, 10), // Hash the password using bcrypt
//       });
//       await userRepository.save(user);
//     }
//   }
// }

import { Seeder, Factory } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { User } from '../entities/users';

export default class UserSeeder implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<void> {
    await factory(User)().createMany(10);
  }
}