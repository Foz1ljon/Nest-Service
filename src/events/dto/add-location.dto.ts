import { Field, ID, InputType } from "@nestjs/graphql";
import { IsNumber } from "class-validator";

@InputType("Location")
export class AddLocationDto {
  @Field(( ) => ID)
  @IsNumber()
  event_id: number;
  @Field(() => ID)
  @IsNumber()
  location_id: number;
}
