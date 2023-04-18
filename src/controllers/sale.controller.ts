import { Request, Response } from "express";
import { SaleService } from "../services/sale.service";
import { Sale } from "../entities/sales.entity";
import { ProductService } from "../services/product.service";
import { SaleItem } from "../entities/saleItem.entity";
import dayjs from "dayjs";
import { ClientService } from "../services/client.service";

export const SaleController = {
  create: async (req: Request, res: Response) => {
    const body = req.body;

    const saleData: Partial<Sale> = {
      cod_cliente: Number(body?.cod_cliente),
      dta_venda: body?.dta_venda,
      val_total_venda: body?.val_total_venda
    }

    const createSaleResponse = await SaleService.create(saleData);

    if (!createSaleResponse) return res.send({ success: false, message: 'Não foi possível criar está venda.' });

    for await (const product of body.products) {
      const productData: Partial<SaleItem> = {
        dta_cadastro: dayjs().format('YYYY-MM-DD'),
        cod_venda: createSaleResponse?.cod_venda,
        des_produto: product?.des_produto,
        qtd_itens: product?.qtd_itens,
        val_unitario: product?.val_unitario,
        val_total: product?.val_total
      };

      await ProductService.create(productData);
    };

    const clientData = await ClientService.indexClient(Number(body?.cod_cliente));

    if (!clientData) return res.send({ success: false, message: 'Não foi possível recuperar os dados necessários do cliente.' });

    const updateUser = {
      dta_ult_pedido: body?.dta_venda,
      val_venda_acumulado: body?.val_total_venda,
      qtd_venda_pedidos: clientData?.qtd_venda_pedidos + 1
    }

    const clientResponse = await ClientService.editClient(Number(body?.cod_cliente), updateUser);

    if (!clientResponse) return res.send({ success: false, message: 'Não foi possível atualizar a ultima venda.' });

    return res.send({ success: true, message: 'Registramos sua venda.' });
  },
  list: async (req: Request, res: Response) => {
    const query = req.query;

    const sales = await SaleService.list(query);

    if (!Array.isArray(sales)) return res.send({ success: false, message: 'Não foi possível encontrar as vendas.' });
    if (sales.length === 0) return res.send({ success: false, message: 'Não encontramos registro de vendas.' });

    const data =  await Promise.all(sales.map(async value => {
      const userData = await ClientService.indexClient(value?.cod_cliente);

      if (!userData) return null;

      return {
        ...value,
        des_nome_cliente: userData?.des_nome,
        des_cidade_cliente: userData?.des_cidade,
        des_uf_cliente: userData?.des_uf,
        products: await ProductService.list({ cod_venda: value?.cod_venda })
      }
    }))

    return res.send({ success: true, data, message: 'Encontramos as seguintes vendas.' });
  }
};
