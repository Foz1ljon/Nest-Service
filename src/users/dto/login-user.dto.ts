import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsStrongPassword } from "class-validator";

@InputType()
export class LoginUserDto {
  @ApiProperty({ example: "sobirjon@gmail.com", description: "user email" })
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "UzB3ki!st4n", description: "user password" })
  @Field({ nullable: false })
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
