import { AppDataSource } from "../../data-source";
import { User } from "../../entity/users";

export async function get_user(id: string): Promise<User | null> {
  const user = await AppDataSource.manager
    .createQueryBuilder(User, "user")
    .where("user.id = :id", { id: id })
    .getOne();
  return user;
}
