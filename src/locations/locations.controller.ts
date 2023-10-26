import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { LocationsService } from "./locations.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserGuard } from "../guards/jwt-auth.guard";
@ApiTags("Locations")
@Controller("locations")
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @ApiOperation({ summary: "add location" })
  @UseGuards(UserGuard)
  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }
  @ApiOperation({ summary: "get all location" })
  @UseGuards(UserGuard)
  @Get()
  findAll() {
    return this.locationsService.findAll();
  }

  @ApiOperation({ summary: "get location by id" })
  @UseGuards(UserGuard)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.locationsService.findOne(+id);
  }

  @ApiOperation({ summary: "update location by id" })
  @UseGuards(UserGuard)
  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(+id, updateLocationDto);
  }

  @ApiOperation({ summary: "delete location by id" })
  @UseGuards(UserGuard)
  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.locationsService.remove(+id);
  }
}
