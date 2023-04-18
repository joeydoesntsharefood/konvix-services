import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'venda_item' })
export class SaleItem extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  'cod_item': number;

  @Column()
  'cod_venda': number;

  @Column()
  'des_produto': string;

  @Column()
  'val_unitario': number;

  @Column()
  'qtd_itens': number;

  @Column()
  'val_total': number;

  @Column()
  'dta_cadastro': string;
}