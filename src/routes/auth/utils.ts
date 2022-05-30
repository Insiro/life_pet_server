import { User } from "../../entity/users";
import AppDataSource from "../../data-source";
export async function isAvaiableId(id: string): Promise<boolean> {
  try {
    const user = await AppDataSource.manager
      .createQueryBuilder(User, "user")
      .where("user.id = :id", { id: id })
      .getOne();
    return user === null;
  } catch (_) {
    return false;
  }
}
