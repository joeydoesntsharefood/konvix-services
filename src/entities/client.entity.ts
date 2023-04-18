import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'client' })
export class Client extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  'cod_cliente': number;
  
  @Column()
  'des_nome': string;
  
  @Column()
  'flg_inativo': boolean;
  
  @Column()
  'des_endereco': string;
  
  @Column()
  'num_endereco': string;
  
  @Column()
  'des_cidade': string;
  
  @Column()
  'des_uf': string;
  
  @Column()
  'des_telefone': string;
  
  @Column()
  'des_contato': string;
  
  @Column()
  'val_venda_acumulado': number;
  
  @Column()
  'qtd_venda_pedidos': number;
  
  @Column()
  'dta_ult_pedido': string;
  
  @Column()
  'dta_cadastro': string;
  
  @Column()
  'dta_alteracao': string;
}
