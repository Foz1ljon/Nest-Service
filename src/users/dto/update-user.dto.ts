import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";

@InputType()
export class UpdateUserDto {
  @ApiProperty({ example: "Sobirjon", description: "user name" })
  @Field({ nullable: true })
  name?: string;

  @ApiProperty({ example: "sobirjon@gmail.com", description: "user email" })
  @Field({ nullable: true })
  email?: string;

  @ApiProperty({ example: "+998901234567", description: "user phone_number" })
  @Field({ nullable: true })
  phone_number?: string;

  @ApiProperty({ example: "UzB3ki!st4n", description: "user password" })
  @Field({ nullable: true })
  password?: string;
}
