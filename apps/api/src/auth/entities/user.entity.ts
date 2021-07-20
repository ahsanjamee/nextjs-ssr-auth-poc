import { modelOptions, pre, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
@modelOptions({
	schemaOptions: {
		collection: 'users',
		toJSON: {
			transform: (_, ret) => {
				ret.id = ret._id;
				delete ret._id;
				delete ret.__v;
				delete ret.password;
				return ret;
			},
		},
	},
})
@pre<UserEntity>('save', function () {
	this.password = bcrypt.hashSync(this.password, 10);
})
export class UserEntity {
	@prop({ required: true, unique: true })
	name: string;

	@prop({ required: true })
	password: string;
}
