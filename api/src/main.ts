import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { commonConfigs } from 'configs/configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validator config
  app.useGlobalPipes(new ValidationPipe());

  // Swagger Configs
  const config = new DocumentBuilder()
    .setTitle('Real Estate Management')
    .setDescription('The Real Estate Management Api')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);


  await app.listen(commonConfigs.port || 3000);

  console.log(`
  -----------------------------------------------
  Server is listening on: ${await app.getUrl()}
  Api docs:               ${await app.getUrl()}/api-docs
  -----------------------------------------------
  `)
}
bootstrap();
