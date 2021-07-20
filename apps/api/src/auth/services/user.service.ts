import { JwtService } from '@auth-demo/jwt';
import { HttpException, Injectable } from '@nestjs/common';
import { ReturnModelType } from '@typegoose/typegoose';
import { compareSync } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { InjectModel } from 'nestjs-typegoose';
import { CreateUserDTO } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(UserEntity) private userModel: ReturnModelType<typeof UserEntity>,
		private jwtService: JwtService,
	) {}

	async create(user: CreateUserDTO) {
		const doc = await this.userModel.create(user);
		const json = doc.toJSON();
		return plainToClass(UserEntity, json);
	}

	async login(user: CreateUserDTO) {
		const doc = await this.userModel.findOne({ name: user.name });
		if (!doc) throw new HttpException('Invalid Username Or Password', 401);
		const isValid = compareSync(user.password, doc.password);
		if (isValid) {
			const token = this.jwtService.sign({ id: doc.id, name: doc.name });
			return { token };
		}
		throw new HttpException('Invalid Username Or Password', 403);
	}
}
