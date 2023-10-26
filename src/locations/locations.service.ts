import { Injectable } from "@nestjs/common";
import { CreateLocationDto } from "./dto/create-location.dto";
import { UpdateLocationDto } from "./dto/update-location.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Location } from "./entities/location.entity";
import { Repository } from "typeorm";

@Injectable()
export class LocationsService {
  constructor(
    @InjectRepository(Location) private locationRepo: Repository<Location>,
  ) {}
  create(createLocationDto: CreateLocationDto) {
    return this.locationRepo.save(createLocationDto);
  }

  findAll() {
    return this.locationRepo.find();
  }

  findOne(id: number) {
    return this.locationRepo.findOne({ where: { id } });
  }

  update(id: number, updateLocationDto: UpdateLocationDto) {
    return this.locationRepo.update(id, updateLocationDto);
  }

  remove(id: number) {
    return this.locationRepo.delete({ id });
  }
}
