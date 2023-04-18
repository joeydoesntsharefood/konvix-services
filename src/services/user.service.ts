import { FindOneOptions } from "typeorm";
import { appDataSource } from "../database";
import { User } from "../entities/user.entity";

export const UserService = {
  findAll: async () => {
    try {
      const repository = await appDataSource.getRepository(User);

      const response = await repository.find();

      return response
    } catch (err: any) {
      return err
    }
  },
  findOne: async (data: any) => {
    const options: FindOneOptions<User> = {
      where: {
        ...data
      }
    };

    try {
      const repository = await appDataSource.getRepository(User);

      const response = await repository.findOne(options);

      return response;
    } catch (err: any) {
      return false;
    };
  }
};
