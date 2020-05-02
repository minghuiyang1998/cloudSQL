import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("history", { schema: "cloud_sql" })
export class History {
  @PrimaryGeneratedColumn({ type: "bigint", name: "_id" })
  id: string;

  @Column("text", { name: "uuid" })
  uuid: string;

  @Column("text", { name: "data" })
  data: string;
}
