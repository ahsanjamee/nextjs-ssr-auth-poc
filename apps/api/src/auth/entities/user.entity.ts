import { modelOptions, pre, prop } from '@typegoose/typegoose';
import * as bcrypt from 'bcryptjs';
import { Exclude, Expose } from 'class-transformer';
@modelOptions({
	schemaOptions: {
		collection: 'users',
		toJSON: {
			transform: (_, ret) => {
				ret.id = ret._id.toString();
				delete ret._id;
				delete ret.__v;
			},
		},
	},
})
@pre<UserEntity>('save', function () {
	this.password = bcrypt.hashSync(this.password, 10);
})
export class UserEntity {
	@Expose()
	id: string;

	@Expose()
	@prop({ required: true, unique: true })
	name: string;

	@Exclude()
	@prop({ required: true })
	password: string;
}
