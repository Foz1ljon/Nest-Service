import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from "@nestjs/common";
import { EventsService } from "./events.service";
import { CreateEventDto } from "./dto/create-event.dto";
import { Request } from "express";
import { UpdateEventDto } from "./dto/update-event.dto";
import { UserGuard } from "../guards/jwt-auth.guard";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { AddLocationDto } from "./dto/add-location.dto";
import { FindEventDto } from "./dto/find-event.dto";
@ApiTags("Events")
@Controller("events")
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}
  @ApiOperation({ summary: "Create a new event" })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createEventDto: CreateEventDto, @Req() req: Request) {
    return this.eventsService.create(createEventDto, req);
  }
  @UseGuards(UserGuard)
  @Post("add")
  add(@Body() addLocationDto: AddLocationDto) {
    return this.eventsService.addLocation(addLocationDto);
  }
  @UseGuards(UserGuard)
  @Post("dell")
  delete(@Body() addLocationDto: AddLocationDto) {
    return this.eventsService.removeLocation(addLocationDto);
  }
  @ApiOperation({ summary: "Get all event" })
  @UseGuards(UserGuard)
  @Get()
  findAll(@Body() findEventDto: FindEventDto, @Req() req: Request) {
    return this.eventsService.findAll(findEventDto, req);
  }

  @ApiOperation({ summary: "Get event by id" })
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: Request) {
    return this.eventsService.findOne(+id, req);
  }

  @ApiOperation({ summary: "Update event by id" })
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateEventDto: UpdateEventDto,
    @Req() req: Request,
  ) {
    return this.eventsService.update(+id, updateEventDto, req);
  }

  @ApiOperation({ summary: "Remove event by id" })
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string, @Req() req: Request) {
    return this.eventsService.remove(+id, req);
  }
}
