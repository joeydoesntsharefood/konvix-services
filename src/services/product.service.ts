import { FindManyOptions } from "typeorm";
import { appDataSource } from "../database";
import { SaleItem } from "../entities/saleItem.entity";

export const ProductService = {
  create: async (data: Partial<SaleItem>) => {
    try {
      const repository = await appDataSource.getRepository(SaleItem);

      const response = await repository.save(data);

      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    };
  },
  list: async (query: any) => {
    const options: FindManyOptions<SaleItem> = {
      where: {
        ...query
      }
    }
    try {
      const repository = await appDataSource.getRepository(SaleItem);

      const response = await repository.find(options);

      return response;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
};
