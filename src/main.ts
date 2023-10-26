import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { env } from "process";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.setGlobalPrefix("api");

  const config = new DocumentBuilder()
    .setTitle("NestJS API")
    .setDescription("REST API NestJS, TypeORM, GraphQL")
    .setVersion("1.0")
    .addTag("NestJS")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document);

  await app.listen(env.API_PORT, () => {
    console.log("Running on " + env.API_PORT);
  });
}
bootstrap().catch((err) => {
  console.log(err);
});
