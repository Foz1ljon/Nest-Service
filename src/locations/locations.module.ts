import { Module } from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { LocationsController } from "./locations.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";
import { LocationsResolver } from "./locations.resolver";
import { Event } from "../events/entities/event.entity";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [TypeOrmModule.forFeature([Location, Event]), JwtModule],
  controllers: [LocationsController],
  providers: [LocationsService, LocationsResolver],
})
export class LocationsModule {}
