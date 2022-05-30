import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { User } from "./entity/users";
import { Achievement } from "./entity/achivement";
import { AchievementCategory } from "./entity/achivementCategory";
import { Pet } from "./entity/pet";
import { Friend } from "./entity/friends";
import { Habbit } from "./entity/habbits";
import { StructedHabbit } from "./entity/habbitstructed";
import { PetCategory } from "./entity/petCategory";

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
  entities: [
    Achievement,
    AchievementCategory,
    Friend,
    Habbit,
    StructedHabbit,
    Pet,
    PetCategory,
    User,
  ],
  migrations: ["dist/migration/*.js"],
  extra: {
    insecureAuth: true,
    ssl: {
      rejectUnauthorized: false,
    },
  },
  ssl: false,
};

const AppDataSource = new DataSource(dataSourceOption);
export default AppDataSource;
