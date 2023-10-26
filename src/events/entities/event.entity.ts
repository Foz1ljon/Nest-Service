import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Location } from "../../locations/entities/location.entity";
import { User } from "../../users/entities/user.entity";
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@ObjectType()
@Entity("events")
export class Event {
  @ApiProperty({ example: "1", description: "event id" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "run ", description: "event title" })
  @Field()
  @Column()
  title: string;

  @ApiProperty({
    example: "run in the morning",
    description: "event description",
  })
  @Field()
  @Column()
  description: string;

  @ApiProperty({ example: "2023-10-22", description: "event start date" })
  @Field()
  @Column({ type: Date })
  startDate: Date;

  @ApiProperty({ example: "2023-10-23", description: "event end date" })
  @Field()
  @Column({ type: Date })
  endDate: Date;

  @ApiProperty({ example: "1", description: "user id" })
  @ManyToOne((type) => User, (user) => user.events)
  @Field((type) => User)
  user: User;

  @OneToMany((type) => Location, (location) => location.event)
  locations: Location[];
}
