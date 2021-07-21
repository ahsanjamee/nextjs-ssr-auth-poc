import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { AuthController } from './controllers/user/auth.controller';
import { UserEntity } from './entities/user.entity';
import { AuthService } from './services/auth.service';
@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [TypegooseModule.forFeature([UserEntity])],
})
export class AuthModule {}
