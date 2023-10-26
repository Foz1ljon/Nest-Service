import { Module } from "@nestjs/common";
import { EventsService } from "./events.service";
import { EventsController } from "./events.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { User } from "../users/entities/user.entity";
import { EventsResolver } from "./events.resolver";
import { Location } from "../locations/entities/location.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Event, User, Location]), JwtModule],
  controllers: [EventsController],
  providers: [EventsService, EventsResolver],
})
export class EventsModule {}
