import { HttpException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { plainToClass } from 'class-transformer';
import { InjectModel } from 'nestjs-typegoose';
import { UserEntity } from '../../auth/entities/user.entity';

@Injectable()
export class UserService {
	constructor(@InjectModel(UserEntity) private userModel: ReturnModelType<typeof UserEntity>) {}

	async getSelf(id: string) {
		const doc = await this.userModel.findById(id);
		if (doc) {
			return plainToClass(UserEntity, doc.toJSON());
		}
		throw new HttpException('User not found', 404);
	}
}
