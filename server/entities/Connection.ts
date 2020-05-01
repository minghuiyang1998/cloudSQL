import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("connection", { schema: "cloud_sql" })
export class Connection {
  @PrimaryGeneratedColumn({ type: "bigint", name: "_id" })
  id: string;

  @Column("text", { name: "clientId" })
  clientId: string;

  @Column("text", { name: "uuid" })
  uuid: string;

  @Column("text", { name: "now" })
  now: string;

  @Column("datetime", { name: "connectedAt", nullable: true })
  connectedAt: Date | null;
}
