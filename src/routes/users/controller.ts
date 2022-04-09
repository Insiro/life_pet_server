import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { Pet } from "../../entity/pet";

export const pet_list: RequestHandler = async (req, res) => {
  const { id: user_id } = req.params;
  var pets = await AppDataSource.manager
    .createQueryBuilder(Pet, "pet")
    .where("pet.id = :=user_id", { user_id })
    .getMany();
  var pet_id_list: String[] = [];
  pets.forEach((pet) => {
    pet_id_list.push(pet.id);
  });

  res.status(StatusCodes.OK).json({ pets: pet_id_list });
};
