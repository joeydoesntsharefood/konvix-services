import { Request, Response } from "express";
import { translateKeys } from "../utils/translateKeys";
import { ClientService } from "../services/client.service";
import dayjs from "dayjs";

export const ClientController = {
  List: async (req: Request, res: Response) => {

    const query = req.query;

    const response = await ClientService.listClients(query);

    if (!Array.isArray(response)) return res.send({ success: false, message: 'Não encontramos os dados solicitados.' });
    if (response.length === 0) return res.send({ success: false, message: 'Não encontramos registro de clientes em nosso banco.' });

    return res.send({ success: true, message: 'Clientes encontrados.', data: response });
  },
  Create: async (req: Request, res: Response) => {
    const body = req.body;

    const today = dayjs().format('YYYY-MM-DD');
    
    const data = {
      ...body,
      'flg_inativo': false,
      'val_venda_acumulado': 0,
      'qtd_venda_pedidos': 0,
      'dta_ult_pedido': '',
      'dta_cadastro': today,
      'dta_alteracao': today,
    };

    const response = await ClientService.createClient(data);

    if (!response) return res.send({ success: false, message: 'Não foi possível registrar o cliente.' });

    return res.send({ success: true, message: 'Clientes criado com sucesso.' });
  },
  Edit: async (req: Request, res: Response) => {
    const body = req.body;
    const params = req.params

    const today = dayjs().format('YYYY-MM-DD');

    const data = {
      ...body,
      'dta_alteracao': today,
    };

    const response = await ClientService.editClient(Number(params.id), body);

    if (!response) return res.send({ success: false, message: 'Não foi possível editar o cliente.' });

    return res.send({ success: true, message: 'Clientes editado com sucesso.' });
  },
  Delete: async (req: Request, res: Response) => {
    const params = req.params

    const response = await ClientService.deleteClient(Number(params?.id));

    if (!response) return res.send({ success: false, message: 'Não foi possível deletar o cliente.' });

    return res.send({ success: true, message: 'Clientes deletado com sucesso.' });
  }
};
