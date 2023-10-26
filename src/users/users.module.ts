import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { UsersResolver } from "./users.resolver";
import { JwtModule } from "@nestjs/jwt";
import { env } from "process";
import { ConfigModule } from "@nestjs/config";
import { Event } from "../events/entities/event.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Event]),
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    JwtModule.register({
      secret: env.JWT_ACCESS_KEY,
      signOptions: {
        expiresIn: env.JWT_ACCESS_TIME,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersResolver],
})
export class UsersModule {}
