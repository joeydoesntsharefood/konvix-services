import { Entity, Column, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'usuario' })
export class User  extends BaseEntity {
  @PrimaryGeneratedColumn('increment')
  'cod_usuario': number;

  @Column()
  'des_email': string;

  @Column()
  'des_senha': string;

  @Column()
  'flg_inativo': boolean;
};