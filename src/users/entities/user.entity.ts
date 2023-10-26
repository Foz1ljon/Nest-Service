import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Event } from "../../events/entities/event.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@ObjectType()
@Entity("users")
export class User {
  @ApiProperty({ example: "1", description: "user id" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "Sobirjon", description: "user name" })
  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @ApiProperty({ example: "sobirjon@gmail.com", description: "user email" })
  @Field({ nullable: false })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ example: "+998901234567", description: "user phone_number" })
  @Field({ nullable: false })
  @Column({ nullable: false })
  phone_number: string;

  @ApiProperty({ example: "UzB3ki!st4n", description: "user password" })
  @Field({ nullable: false })
  @Column({ nullable: false })
  password: string;

  @OneToMany((type) => Event, (event) => event.user)
  @Field((type) => [Event])
  events: Event[];
}
