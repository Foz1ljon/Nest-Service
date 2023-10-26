import { UsersService } from "./users.service";
import { Req, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { User } from "./entities/user.entity";
import { LoginUserDto } from "./dto/login-user.dto";
import { Request } from "express";
import { UserGuard } from "../guards/jwt-auth.guard";

@Resolver("users")
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  register(@Args("createUser") createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  @Mutation(() => User)
  login(@Args("loginUser") loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Query(() => [User])
  getAllUser() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  @UseGuards(UserGuard)
  getUser(@Args("id", { type: () => ID }) id: number, @Req() req: Request) {
    return this.usersService.findOne(id, req);
  }

  @Mutation(() => User)
  @UseGuards(UserGuard)
  updateUser(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateUser") updateUserDto: UpdateUserDto,
    @Req() req: Request,
  ) {
    return this.usersService.update(id, updateUserDto, req);
  }

  @Mutation(() => Number)
  @UseGuards(UserGuard)
  removeUser(@Args("id", { type: () => ID }) id: number, @Req() req: Request) {
    return this.usersService.remove(id, req);
  }
}
