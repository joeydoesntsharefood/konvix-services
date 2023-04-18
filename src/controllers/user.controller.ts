import { Request, Response } from "express";
import { UserService } from "../services/user.service";

export const ListUsers = async (req: Request, res: Response) => {
  const response = await UserService.findAll();

  if (!Array.isArray(response)) return res.send({ success: false, message: 'Não foi possível encontrar os dados solicitados.' });

  if (response?.length === 0) return res.send({ success: false, message: 'Não encontramos registros de usuários em nosso banco.' });

  return res.send({ success: true, data: response, message: 'Encontramos seus usuários.' });
};

export const IndexUser = async (req: Request, res: Response) => {
  const { cod_usuario } = req.params;

  const response = await UserService.findOne({ cod_usuario: Number(cod_usuario) });

  if (!response) return res.send({ success: false, message: 'Não foi possível encontrar os dados solicitados.' });

  return res.send({ success: true, data: response, message: 'Encontramos o usuário solicitado.' })
}