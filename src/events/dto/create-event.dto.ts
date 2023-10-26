import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsISO8601, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class CreateEventDto {
  @ApiProperty({ example: "run ", description: "event title" })
  @Field()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    example: "run in the morning",
    description: "event description",
  })
  @Field()
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ example: "2023-10-22", description: "event start date" })
  @Field()
  @IsISO8601()
  startDate: Date;

  @ApiProperty({ example: "2023-10-23", description: "event end date" })
  @Field()
  @IsDateString()
  endDate: Date;

  @ApiProperty({ example: "1", description: "User id" })
  @Field((type) => Int, { nullable: true })
  user: number;
}
