import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');

  // Configuration de la validation globale
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non définies dans les DTOs
      transform: true, // Transforme automatiquement les types
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('User API')
    .setDescription('API de gestion des utilisateurs')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(process.env.PORT ?? 3000);

  const url = await app.getUrl();
  console.log(`Application is running on: ${url}/api`);
  console.log(`Swagger documentation is available at: ${url}/docs`);
}

void bootstrap(); // NOSONAR
