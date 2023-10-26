import { Field, InputType } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import {
  IsAlpha,
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from "class-validator";

@InputType()
export class CreateUserDto {
  @ApiProperty({ example: "Sobirjon", description: "user name" })
  @Field({ nullable: false })
  @IsAlpha()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "sobirjon@gmail.com", description: "user email" })
  @Field({ nullable: false })
  @IsEmail()
  email: string;

  @ApiProperty({ example: "+998901234567", description: "user phone_number" })
  @Field({ nullable: false })
  @IsPhoneNumber("UZ")
  phone_number: string;
  
  @ApiProperty({ example: "UzB3ki!st4n", description: "user password" })
  @Field({ nullable: false })
  @IsStrongPassword({ minLength: 6 })
  password: string;
}
