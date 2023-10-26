import { Field, ID, ObjectType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { Event } from "../../events/entities/event.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity("locations")
export class Location {
  @ApiProperty({ example: "1", description: "location id" })
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "33", description: "location latidue" })
  @Field()
  @Column()
  latitude: string;
  @ApiProperty({ example: "33", description: " location longtitude" })
  @Field()
  @Column()
  longtitude: string;

  @ApiProperty({ example: "1", description: "event id" })
  @ManyToOne((type) => Event, (event) => event.locations)
  @Field((type) => Event)
  event: Event;
}
