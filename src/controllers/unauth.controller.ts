import { Request, Response } from "express";
import { unAuthService } from "../services/unauth.service";
import { UserService } from "../services/user.service";

export const SigninController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const response = await UserService.findOne({ des_email: email  });

  if (!response) return res.send({ success: false, message: 'E-mail ou senha invalidos.' });

  const { des_senha, flg_inativo } = response;

  const verifyPassword = await unAuthService.verifyHash(password, des_senha);

  if (!verifyPassword) return res.send({ success: false, message: 'Email ou senha invalidos.' });

  if (!flg_inativo) return res.send({ success: false, message: 'Usuário inativo.' });

  return res.send({ success: true, message: 'Foi possível fazer o autenticação do seu usuário.' });
}

export const SignupController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const response = await UserService.findOne({ des_email: email  });

  if (response) return res.send({ success: false, message: 'E-mail já possui um registro em nosso banco.' });

  const hash = await unAuthService.generateHash(password);

  const data = {
    'des_email': email,
    'des_senha': hash,
    'flg_inativo': false
  };

  await unAuthService.signup(data);

  return res.send({ success: true, message: 'Foi possível fazer o registro do seu usuário.' });
}