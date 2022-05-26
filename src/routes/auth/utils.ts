import { User } from "../../entity/users";
import AppDataSource from "../../data-source";
export async function check_duplicate_id(id: string): Promise<boolean> {
  const user = await AppDataSource.manager
    .createQueryBuilder(User, "user")
    .where("user.id = :id", { id: id })
    .getOne();
  return user === null;
}
