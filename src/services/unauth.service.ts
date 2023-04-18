import { appDataSource } from "../database";
import { User } from "../entities/user.entity";
import bcrypt from 'bcrypt'

export const unAuthService = {
  signup: async ({ des_email, des_senha, flg_inativo }: { des_email: string, des_senha: string, flg_inativo: boolean }) => {
    try {
      const repository = await appDataSource.getRepository(User);

      await repository.save({ des_email, des_senha, flg_inativo });

      return { success: true };
    } catch (err: any) {
      console.log(err);

      return { success: false, err };
    }
  },
  generateHash: async (password: string)  => {
    const salt = 10; 

    return new Promise<string>((resolve, reject) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        } else {
          resolve(hash);
        }
      });
    });
  },
  verifyHash: (password: string, hash: string): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      bcrypt.compare(password, hash, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
};