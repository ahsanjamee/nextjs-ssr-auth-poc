import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { install } from 'source-map-support';
import { AppModule } from './app/app.module';
install({ environment: 'node', handleUncaughtExceptions: true, hookRequire: true });

const setupSwagger = (app: INestApplication) => {
	const options = new DocumentBuilder()
		.setTitle('User API Operations')
		.addBearerAuth({ description: 'User JWT Token', type: 'http', name: 'Authorization', bearerFormat: 'JWT' })
		.setVersion('1.0')
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup('api', app, document, { swaggerOptions: { persistAuthorization: true } });
};

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const port = process.env.PORT || 3333;
	app.enableCors();
	setupSwagger(app);
	app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
	await app.listen(port, () => {
		Logger.log(`Listening at http://localhost:${port}/api`);
	});
}

bootstrap();
