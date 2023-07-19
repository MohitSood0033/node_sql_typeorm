import { DataSource } from "typeorm";
import * as mysql from "mysql";

async function createDatabase(): Promise<void> {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "12345678",
  });

  return new Promise((resolve, reject) => {
    connection.connect((error) => {
      if (error) {
        reject(error);
      } else {
        connection.query("CREATE DATABASE IF NOT EXISTS rspians", (error) => {
          if (error) {
            reject(error);
          } else {
            console.log("Database created successfully");
          }
          connection.end();
          resolve();
        });
      }
    });
  });
}

const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "12345678",
  database: "rspians",
  synchronize: true,
  logging: false,
  entities: ["src/entities/*.ts"],
  migrations: ["src/migrations/**/*.ts"],
  subscribers: [],
});

export default AppDataSource;

// Initialize the database and export the AppDataSource instance
(async () => {
  try {
    await createDatabase();
    await AppDataSource.initialize();
    console.log("Database connected");
  } catch (error) {
    console.error(error);
    throw error;
  }
})();
