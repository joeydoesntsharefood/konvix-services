import { appDataSource } from "../database";
import { Sale } from "../entities/sales.entity";

export const SaleService = {
  create: async (data: Partial<Sale>) => {
    try {
      const repository = await appDataSource.getRepository(Sale);
      
      const response = await repository.save(data);

      return response;
    } catch (err: any) {
      console.log(err);
      return false;
    };
  },
  list: async (query?: any) => {
    const startAt = query?.startAt;
    const endAt = query?.endAt;

    try {
      const repository = await appDataSource.getRepository(Sale);

      const queryBuilder = repository.createQueryBuilder('venda');

      if (startAt && endAt) {
        const startDate = new Date(startAt);
        const endDate = new Date(endAt);

        queryBuilder.where(
          'Date(venda.dta_venda) BETWEEN :startDate AND :endDate',
          {
            startDate,
            endDate,
          },
        );
      } else if (startAt) {
        const startDate = new Date(startAt);

        queryBuilder.where('DATE(venda.dta_venda) >= :startDate', {
          startDate,
        });
      } else if (endAt) {
        const endDate = new Date(endAt);

        queryBuilder.where('DATE(venda.dta_venda) <= :endDate', {
          endDate,
        });
      }

      const response = await queryBuilder.getMany();

      return response;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
};
