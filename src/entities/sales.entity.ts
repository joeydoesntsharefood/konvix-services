import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'venda' })
export class Sale extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  'cod_venda': number;
  
  @Column()
  'cod_cliente': number;
  
  @Column()
  'dta_venda': string;
  
  @Column()
  'val_total_venda': number;
}
