import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { LoginUserDto } from "./dto/login-user.dto";
import * as bcrypt from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateUserDto) {
    const findEmail = await this.userRepo.findOne({
      where: { email: createUserDto.email },
    });
    if (findEmail) throw new BadRequestException("Email already exists");
    createUserDto.password = await bcrypt.hash(createUserDto.password, 7);
    const user = await this.userRepo.save(createUserDto);
    const payload = {
      id: user.id,
    };
    const data = await this.jwtService.signAsync(payload);
    return {
      access_token: data,
    };
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;
    const findUser = await this.userRepo.findOne({ where: { email: email } });
    if (!findUser) throw new BadRequestException("email or password is wrong");
    const isMatch = await bcrypt.compare(password, findUser.password);
    if (!isMatch) throw new BadRequestException("email or password is wrong");

    const payload = {
      id: findUser.id,
    };
    const data = await this.jwtService.signAsync(payload);
    return {
      access_token: data,
    };
  }

  findAll() {
    return this.userRepo.find({
      relations: {
        events: true,
      },
    });
  }

  async findOne(id: number, req: Request) {
    const db = this.jwtService.decode(req.headers.authorization.split(" ")[1]);

    if (id !== db["id"]) throw new BadRequestException("Not allowed");

    return this.userRepo.findOne({
      where: { id },
      relations: {
        events: true,
      },
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto, req: Request) {
    const db = this.jwtService.decode(req.headers.authorization.split(" ")[1]);

    if (id !== db["id"]) throw new BadRequestException("Not allowed");

    await this.userRepo.update(id, updateUserDto);

    return this.userRepo.findOne({ where: { id } });
  }

  remove(id: number, req: Request) {
    
    const db = this.jwtService.decode(req.headers.authorization.split(" ")[1]);

    if (id !== db["id"]) throw new BadRequestException("Not allowed");

    return this.userRepo.delete({ id });
  }
}
