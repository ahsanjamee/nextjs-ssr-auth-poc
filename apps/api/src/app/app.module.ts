import { JwtModule } from '@auth-demo/jwt';
import { Module } from '@nestjs/common';
import * as fs from 'fs';
import { AuthModule } from '../auth/auth.module';

@Module({
	imports: [
		JwtModule.forRoot(
			fs.readFileSync('apps/api/devKeys/public.pem', { encoding: 'utf8' }),
			fs.readFileSync('apps/api/devKeys/private.pem', { encoding: 'utf8' }),
		),
		AuthModule,
	],
})
export class AppModule {}
