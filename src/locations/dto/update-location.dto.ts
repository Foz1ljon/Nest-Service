import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateLocationDto {
  @ApiProperty({ example: "33", description: "location latidue" })
  @Field()
  latitude?: string;

  @ApiProperty({ example: "33", description: "longtitude" })
  @Field()
  longtitude?: string;
}
