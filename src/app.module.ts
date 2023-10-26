import { ApolloDriverConfig, ApolloDriver } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "./users/users.module";
import { JwtModule } from "@nestjs/jwt";
import { EventsModule } from "./events/events.module";
import { LocationsModule } from "./locations/locations.module";
@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: "schema.gql",
      sortSchema: true,
      playground: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get<string>("TYPEORM_HOST"),
        port: configService.get<number>("TYPEORM_PORT"),
        username: configService.get<string>("TYPEORM_USERNAME"),
        password: configService.get<string>("TYPEORM_PASSWORD"),
        database: configService.get<string>("TYPEORM_DATABASE"),
        entities: [__dirname + "/**/*.entity{.ts,.js}"],
        synchronize: true,
        autoLoadentities: true,
        logging: false,
      }),
    }),
    UsersModule,
    JwtModule,
    EventsModule,
    LocationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
