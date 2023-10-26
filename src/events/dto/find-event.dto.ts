import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class FindEventDto {
  @ApiProperty({ example: "2023-01-01", description: "find date" })
  @Field({ nullable: true })
  date_begin?: Date;

  @ApiProperty({ example: "2023-01-01", description: "find date" })
  @Field({ nullable: true })
  date_end?: Date;
}
