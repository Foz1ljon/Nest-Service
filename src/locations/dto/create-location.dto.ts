import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsNumberString } from "class-validator";

@InputType()
export class CreateLocationDto {
  @ApiProperty({ example: "33", description: "location latidue" })
  @Field()
  @IsNumberString()
  latitude: string;
  
  @ApiProperty({ example: "33", description: "longtitude" })
  @Field()
  @IsNumberString()
  longtitude: string;
}
