import { Module } from '@nestjs/common';
import { TypegooseModule } from 'nestjs-typegoose';
import { UserController } from './controllers/user/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserService } from './services/user.service';

@Module({
	controllers: [UserController],
	providers: [UserService],
	imports: [TypegooseModule.forFeature([UserEntity])],
})
export class AuthModule {}
