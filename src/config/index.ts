import { DataSource, DataSourceOptions } from "typeorm";
const {
  TYPEORM_HOST: host,
  TYPEORM_PORT: port,
  TYPEORM_USER: user,
  TYPEORM_PASS: password,
  TYPEORM_DB: db,
} = process.env;

export const dataSourceOption: DataSourceOptions = {
  type: "mysql",
  host: host || "localhost",
  port: (port && parseInt(port)) || 3306,
  username: user || "life_pet",
  password: password || "",
  database: db || "life_pet",
  synchronize: true,
  logging: false,
  entities: ["dist/entity/*.ts", "dist/entity/*.js"],
  migrations: ["dist/migration/*.ts", "dist/migration/*.js"],
};
