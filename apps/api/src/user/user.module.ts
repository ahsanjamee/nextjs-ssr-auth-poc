import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserEntity } from '../auth/entities/user.entity';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
	providers: [UserService],
	controllers: [UserController],
	imports: [TypegooseModule.forFeature([UserEntity])],
})
export class UserModule {}
