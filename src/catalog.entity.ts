import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Catalog {
  @PrimaryColumn()
  entityName: string;

  @Column('json')
  idList: string[];
}
