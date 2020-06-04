import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user', { schema: 'cloud_sql' })
export class User {
  @PrimaryGeneratedColumn({ type: 'bigint', name: '_id' })
  id: string;

  @Column('text', { name: 'uuid' })
  uuid: string;

  @Column('text', { name: 'username' })
  username: string;

  @Column('text', { name: 'passhash' })
  passhash: string;

  @Column('datetime', { name: 'createdDate' })
  createdDate: Date;

  @Column('datetime', { name: 'modifiedDate', nullable: true })
  modifiedDate: Date | null;
}
