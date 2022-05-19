import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { AppDataSource } from "../../data-source";
import { Pet } from "../../entity/pet";
import { User } from "../../entity/users";
import { Habbit } from "../../entity/habbits";
import { HttpError, get_user_404, hash } from "../../utils";
import { Friend } from "../../entity/friends";
import { Achievement } from "../../entity/achivement";

export const pet_list: RequestHandler = async (req, res) => {
  const { id: user_id } = req.params;
  let pets = await AppDataSource.manager
    .createQueryBuilder(Pet, "pet")
    .where("pet.id = :=user_id", { user_id })
    .getMany();
  let pet_id_list: String[] = [];
  pets.forEach((pet) => {
    pet_id_list.push(pet.id);
  });

  res.status(StatusCodes.OK).json({ pets: pet_id_list });
};

export const habit_list: RequestHandler = async (req, res, next) => {
  try {
    let habbits = await AppDataSource.manager
      .createQueryBuilder(Habbit, "habbit")
      .where("habbit.id =:id", { id: req.params.id })
      .getMany();
    if (habbits.length == 0) {
      throw new HttpError(StatusCodes.NOT_FOUND);
    }
    res.status(StatusCodes.OK).json({ habbits: habbits });
  } catch (error) {
    next(error);
  }
};

export const friend_list: RequestHandler = async (req, res, next) => {
  try {
    let friend_ids = await AppDataSource.manager
      .createQueryBuilder(Friend, "friend")
      .where("fiend.user1 =:id or firend.user2 =:id", { id: req.params.user_id })
      .getMany();
    let firends: User[] = [];
    friend_ids.forEach(async (friend) => {
      let user = await AppDataSource.manager
        .createQueryBuilder(User, "user")
        .where("user.id =:id", { id: friend.id })
        .getOne();
      if (user != null) firends.push(user);
    });
    res.status(StatusCodes.OK).json({ friends: firends });
  } catch (error) {
    next(error);
  }
};
export const achievment_list: RequestHandler = async (req, res, next) => {
  try {
    let achivements = await AppDataSource.manager
      .createQueryBuilder(Achievement, "achive")
      .where("achive.user =:user_id", { user_id: req.params.id })
      .getMany();
    res.status(StatusCodes.OK).json({ acivements: achivements });
  } catch (error) {
    next(error);
  }
};
