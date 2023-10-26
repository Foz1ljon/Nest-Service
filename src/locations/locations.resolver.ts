import { LocationsService } from "./locations.service";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { Location } from "./entities/location.entity";

@Resolver("locations")
export class LocationsResolver {
  constructor(private readonly locationsService: LocationsService) {}

  @Mutation(() => Location)
  addLocation(@Args("createLocation") createLocationDto: CreateLocationDto) {
    return this.locationsService.create(createLocationDto);
  }
  @Query(() => [Location])
  getAllLocation() {
    return this.locationsService.findAll();
  }

  @Query(() => Location)
  getLocation(@Args("id", { type: () => ID }) id: number) {
    return this.locationsService.findOne(id);
  }

  @Mutation(() => Location)
  updateLocation(
    @Args("id", { type: () => ID }) id: number,
    @Args("updateLocation") updateLocationDto: UpdateLocationDto,
  ) {
    return this.locationsService.update(id, updateLocationDto);
  }

  @Mutation(() => Number)
  removeLocation(@Args("id", { type: () => ID }) id: number) {
    return this.locationsService.remove(id);
  }
}
