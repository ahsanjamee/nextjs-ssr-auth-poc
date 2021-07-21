import { JwtModule } from '@auth-demo/jwt';
import { Module } from '@nestjs/common';
import * as fs from 'fs';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthModule } from '../auth/auth.module';
import { UserModule } from '../user/user.module';

@Module({
	imports: [
		JwtModule.forRoot(
			fs.readFileSync('apps/api/devKeys/public.pem', { encoding: 'utf8' }),
			fs.readFileSync('apps/api/devKeys/private.pem', { encoding: 'utf8' }),
		),
		// TypegooseModule.forRootAsync({
		// 	imports: [MongodbMemoryServerModule],
		// 	inject: [MongoDBConstants.MONGODB_URL_TOKEN],
		// 	useFactory: async (url: string) => {
		// 		return {
		// 			uri: url,
		// 			useNewUrlParser: true,
		// 			useUnifiedTopology: true,
		// 			useFindAndModify: false,
		// 			useCreateIndex: true,
		// 		};
		// 	},
		// }),
		TypegooseModule.forRoot('mongodb://localhost:27017', {
			useCreateIndex: true,
			useFindAndModify: false,
			useNewUrlParser: true,
			useUnifiedTopology: true,
		}),
		UserModule,
		AuthModule,
	],
})
export class AppModule {}
