import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Event } from "./entities/event.entity";
import { MoreThan, Repository } from "typeorm";
import { Request } from "express";
import { JwtService } from "@nestjs/jwt";
import { Location } from "../locations/entities/location.entity";
import { AddLocationDto } from "./dto/add-location.dto";
import { FindEventDto } from "./dto/find-event.dto";
// import { FindEventDto } from "./dto/find-event.dto";

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private readonly eventRepo: Repository<Event>,
    @InjectRepository(Location) private locationRepo: Repository<Location>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createEventDto: CreateEventDto, req: Request) {
    const { user } = createEventDto;
    const token = this.jwtService.decode(
      req.headers.authorization.split(" ")[1],
    );

    const newEvent = this.eventRepo.create({
      ...createEventDto,
      user: token["id"],
    });
    return this.eventRepo.save(newEvent);
  }

  async addLocation(addLocationDto: AddLocationDto) {
    const event = await this.eventRepo.findOne({
      where: { id: addLocationDto.event_id },
      relations: {
        user: true,
        locations: true,
      },
    });
    const location = await this.locationRepo.findOne({
      where: { id: addLocationDto.location_id },
    });
    if (!event || !location)
      throw new NotFoundException("Event or Location not found");

    event.locations.push(location);
    await this.eventRepo.save(event);
    return event;
  }

  async removeLocation(addLocationDTo: AddLocationDto) {
    const event = await this.eventRepo.findOne({
      where: { id: addLocationDTo.event_id },
      relations: {
        user: true,
        locations: true,
      },
    });
    const location = await this.locationRepo.findOne({
      where: { id: addLocationDTo.location_id },
    });
    if (!event || !location)
      throw new NotFoundException("Event or Location not found");
    const update = event.locations.filter((l) => l.id !== location.id);
    event.locations = update;
    await this.eventRepo.save(event);

    return event;
  }

  async findAll(findEventDto: FindEventDto, req: Request) {
    const token = this.jwtService.decode(
      req.headers.authorization.split(" ")[1],
    );

    const data = await this.eventRepo.find({
      relations: { user: true, locations: true },
    });
    const events = data.filter((event) => event.user.id == token["id"]);
    return events;
  }

  async findOne(id: number, req: Request) {
    const token = this.jwtService.decode(
      req.headers.authorization.split(" ")[1],
    );
    const data = await this.eventRepo.findOne({
      relations: {
        user: true,
        locations: true,
      },
      where: { id },
    });
    if (data.user["id"] !== token["id"]) return "Not found";
    return data;
  }

  async update(id: number, updateEventDto: UpdateEventDto, req: Request) {
    const token = this.jwtService.decode(
      req.headers.authorization.split(" ")[1],
    );
    const data = await this.eventRepo.findOne({
      where: { id },
      relations: {
        user: true,
        locations: true,
      },
    });

    if (data.user.id !== token["id"])
      throw new NotFoundException("Event not found");
    await this.eventRepo.update(id, updateEventDto);
    return this.eventRepo.findOne({
      where: { id },
      relations: { user: true, locations: true },
    });
  }

  async remove(id: number, req: Request) {
    const token = this.jwtService.decode(
      req.headers.authorization.split(" ")[1],
    );
    const data = await this.eventRepo.findOne({
      where: { id },
      relations: { user: true, locations: true },
    });
    if (data.user.id !== token["id"])
      throw new NotFoundException("Event not found");
    return this.eventRepo.delete({ id });
  }
}
