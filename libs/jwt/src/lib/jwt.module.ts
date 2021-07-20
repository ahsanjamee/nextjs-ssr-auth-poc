import { DynamicModule, Global, Module } from '@nestjs/common';
import { JWTConstants } from './jwt.constants';
import { JwtService } from './jwt.service';

@Global()
@Module({})
export class JwtModule {
	/**
	 * public key and private key pair for signing and validating tokens
	 * @param publicKey Public Key
	 * @param privateKey Private Key
	 * @param expiresIn expires in [default: '7d']
	 *
	 */
	static forRoot(publicKey: string, privateKey: string, expiresIn?: string | number): DynamicModule {
		if (!publicKey) throw new Error('Public Key is Required for JWTModule to function');
		if (!privateKey) throw new Error('Public Key is Required for JWTModule to function');
		return {
			module: JwtModule,
			controllers: [],
			providers: [
				JwtService,
				{
					provide: JWTConstants.JWT_PUBLIC_KEY_TOKEN,
					useValue: publicKey,
				},
				{
					provide: JWTConstants.JWT_PRIVATE_KEY_TOKEN,
					useValue: privateKey,
				},
				{
					provide: JWTConstants.JWT_EXPIRES_TOKEN,
					useValue: expiresIn || '7d',
				},
			],
			exports: [
				JwtService,
				JWTConstants.JWT_PRIVATE_KEY_TOKEN,
				JWTConstants.JWT_PUBLIC_KEY_TOKEN,
				JWTConstants.JWT_EXPIRES_TOKEN,
			],
		};
	}
}
