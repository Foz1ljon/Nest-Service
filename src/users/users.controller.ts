import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  UseGuards,
  Req,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { Request } from "express";
import { UpdateUserDto } from "./dto/update-user.dto";
import { LoginUserDto } from "./dto/login-user.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "../guards/jwt-auth.guard";

@ApiTags("Users")
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "Register a new user" })
  @Post("register")
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @ApiOperation({ summary: "login user" })
  @Post("login")
  @HttpCode(200)
  login(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @ApiOperation({ summary: "Get all user" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Get user by id" })
  @Get(":id")
  async findOne(@Param("id") id: string, @Req() req: Request) {
    return this.usersService.findOne(+id, req);
  }
  @UseGuards(UserGuard)
  @ApiOperation({ summary: "Update user by id" })
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(+id, updateUserDto, req);
  }

  @ApiOperation({ summary: "Remove user by id" })
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    return this.usersService.remove(+id, req);
  }
}
