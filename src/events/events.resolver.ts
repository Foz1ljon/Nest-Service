import { EventsService } from "./events.service";
import { Req, UseGuards } from "@nestjs/common";
import { CreateEventDto } from "./dto/create-event.dto";
import { Request } from "express";
import { UpdateEventDto } from "./dto/update-event.dto";
import { UserGuard } from "../guards/jwt-auth.guard";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Event } from "./entities/event.entity";
import { FindEventDto } from "./dto/find-event.dto";

@Resolver("Events")
export class EventsResolver {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(UserGuard)
  @Mutation(() => Event)
  addEvent(
    @Args("createEvent") createEventDto: CreateEventDto,
    @Req() req: Request,
  ) {
    return this.eventsService.create(createEventDto, req);
  }

  @UseGuards(UserGuard)
  @Query(() => [Event])
  getAllEvent(@Args("findAll") findEventDto: FindEventDto, @Req() req: Request) {
    return this.eventsService.findAll(findEventDto,req);
  }

  
  @UseGuards(UserGuard)
  @Query(() => Event)
  getEvent(@Args("id", { type: () => ID }) id: number, @Req() req: Request) {
    return this.eventsService.findOne(id, req);
  }

  @UseGuards(UserGuard)
  @Mutation(() => Event)
  updateEvent(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateEvent") updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    return this.eventsService.update(id, updateEventDto, req);
  }

  @UseGuards(UserGuard)
  @Mutation(() => Number)
  remove(@Args("id", { type: () => ID }) id: number, @Req() req: Request) {
    return this.eventsService.remove(id, req);
  }
}
