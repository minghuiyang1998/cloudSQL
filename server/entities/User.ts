import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user", { schema: "cloud_sql" })
export class User {
  @PrimaryGeneratedColumn({ type: "int", name: "_id" })
  id: number;

  @Column("linestring", { name: "uuid" })
  uuid: string;

  @Column("linestring", { name: "username" })
  username: string;

  @Column("linestring", { name: "password" })
  password: string;

  @Column("linestring", { name: "passhash" })
  passhash: string;

  @Column("datetime", { name: "createdDate" })
  createdDate: Date;

  @Column("datetime", { name: "modifiedDate", nullable: true })
  modifiedDate: Date | null;
}
