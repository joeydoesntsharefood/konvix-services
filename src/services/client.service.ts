import { FindOneOptions } from "typeorm";
import { appDataSource } from "../database";
import { Client } from "../entities/client.entity";

export const ClientService = {
  createClient: async (data: Client) => {
    try {
      const repository = await appDataSource.getRepository(Client);

      await repository.save(data);

      return true;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  },
  listClients: async (query?: any) => {
    try {
      const repository = await appDataSource.getRepository(Client);

      const response = await repository.find({ order: { ...query } });

      return response;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  },
  editClient: async (cod_cliente: number, data: Partial<Client>) => {
    try {
      const repository = await appDataSource.getRepository(Client);

      const response = await repository.update({ cod_cliente }, data);

      return response;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  },
  deleteClient: async (cod_cliente: number) => {
    try {
      const repository = await appDataSource.getRepository(Client);

      const response = await repository.delete({ cod_cliente });

      return response;
    } catch (err: any) {
      console.log(err);
      return err;
    }
  },
  indexClient: async (cod_cliente: number) => {
    try {
      const options: FindOneOptions<Client> = {
        where: {
          cod_cliente
        }
      }

      const repository = await appDataSource.getRepository(Client);

      const response = await repository.findOne(options);

      return response;
    } catch (err: any) {
      console.log(err);
      return false;
    }
  }
};
