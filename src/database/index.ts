import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "sqlite",
  database: "./db-teste.sqlite",
  entities: ["src/entities/*.ts"],
  logging: true,
  synchronize: true
})

