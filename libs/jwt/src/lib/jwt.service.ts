import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWTConstants } from './jwt.constants';

@Injectable()
export class JwtService {
	constructor(
		@Inject(JWTConstants.JWT_PUBLIC_KEY_TOKEN) private publicKey: string,
		@Inject(JWTConstants.JWT_PRIVATE_KEY_TOKEN) private privateKey: string,
		@Inject(JWTConstants.JWT_EXPIRES_TOKEN) private expiredIn: string,
	) {}

	sign(payload: Record<string, unknown>): string {
		return jwt.sign(payload, this.privateKey, { expiresIn: this.expiredIn || '7d', algorithm: 'RS256' });
	}

	verify<T>(token: string): T & jwt.JwtPayload {
		const decoded = jwt.verify(token, this.publicKey, { algorithms: ['RS256'] });
		return decoded as T & jwt.JwtPayload;
	}
}
