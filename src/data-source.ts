import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
dotenv.config({ path: "./ormconfig.env" });
const {
  TYPEORM_HOST: host,
  TYPEORM_PORT: port,
  TYPEORM_USER: user,
  TYPEORM_PASS: password,
  TYPEORM_DATABASE: db,
} = process.env;
const dataSourceOption: DataSourceOptions = {
  type: "mysql",
  host: host || "localhost",
  port: (port && parseInt(port)) || 3306,
  username: user || "life_pet",
  password: password || "",
  database: db || "life_pet",
  synchronize: true,
  logging: false,
  entities: ["dist/entity/*.js"],
  migrations: ["dist/migration/*.js"],
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ssl: false,
};

export const AppDataSource = new DataSource(dataSourceOption);
