import { Module } from '@nestjs/common';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { MongoDBConstants } from './mongodb.constants';

@Module({
	providers: [
		{
			provide: MongoDBConstants.MONGODB_URL_TOKEN,
			useFactory: async () => {
				const server = await MongoMemoryServer.create();
				return server.getUri();
			},
		},
	],
	exports: [MongoDBConstants.MONGODB_URL_TOKEN],
})
export class MongodbMemoryServerModule {}
export * from './mongodb.constants';
