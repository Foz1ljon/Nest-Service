import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";


@InputType()
export class UpdateEventDto {
  @ApiProperty({ example: "run ", description: "event title" })
  @Field({ nullable: true })
  title?: string;

  @ApiProperty({
    example: "run in the morning",
    description: "event description",
  })
  @Field({ nullable: true })
  description?: string;

  @ApiProperty({ example: "2023-10-22", description: "event start date" })
  @Field({ nullable: true })
  startDate?: Date;

  @ApiProperty({ example: "2023-10-23", description: "event end date" })
  @Field({ nullable: true })
  endDate?: Date;
}
