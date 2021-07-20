import { Test } from '@nestjs/testing';
import { JWTConstants } from './jwt.constants';
import { JwtService } from './jwt.service';

describe('JwtService', () => {
	let service: JwtService;

	beforeEach(async () => {
		const pubKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyFrRJmjtd+tnTIhxzQ7W
dGoL3Jx43qcBCKwL9NoR3AmWSSam4o1XWd1mu+SdUSJypQoITpV/ZOYjysbhl+vB
PoVPBgwVRniSF9Z6DfbWC4RFRltDmQoUQdrDGjdfEpkxN3vHj8igP5zzUWfVW7nM
qappW3Ybw9gMYhZmJZLSdADFdqWYBrIBzP+rwIo9JbqFXG6eoUeOdFsukj2fFisk
2GInHdGR+EvHfVoDy09dFeMnB6ZkoM7CxarOzTq4k6QK05ZjJxdO2hcxqvYBj/uR
wzBGGgjYUCY4WYbzjn5VaEIFAAVauOLUGchM+I4kON1qxYuDh8elKOPdb51awwZg
5wIDAQAB
-----END PUBLIC KEY-----
`;
		const privKey = `-----BEGIN RSA PRIVATE KEY-----
MIIEpAIBAAKCAQEAyFrRJmjtd+tnTIhxzQ7WdGoL3Jx43qcBCKwL9NoR3AmWSSam
4o1XWd1mu+SdUSJypQoITpV/ZOYjysbhl+vBPoVPBgwVRniSF9Z6DfbWC4RFRltD
mQoUQdrDGjdfEpkxN3vHj8igP5zzUWfVW7nMqappW3Ybw9gMYhZmJZLSdADFdqWY
BrIBzP+rwIo9JbqFXG6eoUeOdFsukj2fFisk2GInHdGR+EvHfVoDy09dFeMnB6Zk
oM7CxarOzTq4k6QK05ZjJxdO2hcxqvYBj/uRwzBGGgjYUCY4WYbzjn5VaEIFAAVa
uOLUGchM+I4kON1qxYuDh8elKOPdb51awwZg5wIDAQABAoIBAFlHvvOyxj8t8zYz
hyKtffsaVnbUczgki11l7V4K3vKCgynNw4gpG8e71U/dLA0/oH7S3ajHDaHUvBZc
UaL1N4O4u+Ih+EkS6Wcd9/3JBNDU/FnByXmk+CnwZgiErCUJhtkGm4MDEAXI1tRr
xLO/M+hXO+O52d2HpN0AxjvwFUADXL2kPZm15br/pmnNyIReL1XAw03W6JFpE0jT
bqI9jajDa0DiDh1X6/zMGiitSMdsXVNgKFjasyvqieOwzeDIgXOuKDJ9+girygRA
fnMckfiwivbp/f8LHcNKGgq14NJswX/DMotmNj5yVVwtknoU/nHgIKfKPA3UUihw
NeI9AoECgYEA/rvWr+o3rk14iq6wZCMRVdbgtkIaGqY9450v83gQ6uwriqAtGsUM
au0w8YsrG3noAYbivdtWXMbhxw3RXrr4izz8zli+BoDI/A1aV1Wae6JZ2sTOeT3S
0BwGjKA22UxQJiZUbzlHW89YeSnSdL0g7e/vLYyff/Jv1PRLm4emYpcCgYEAyVnH
RPpUiEvU9UwpAExFXKYyoK3FXLr9hN2kYPzF1C7BN8kElYAf0+DpTLHko1Nap0am
lgmAkWqOWlaVIbsFK/WyMnJbjqDawZbsiIAPNAbMW+jfcXiP0JqP0YRsM1luxJ5A
hUPaJjxoAoaC5ONsm6FX3o4MYFRb+sPhYfDozjECgYBzgJBz62ub6RzDJTpt7Uiq
92ekvIxBkSd20YswhjyFiNilXsOU48whn7MVktjU+I2uQ48ELzQVlUhCjY1lurl/
yQOIPMzM/hAj2ZohB3uom5DKlXpZlyLDojGGCg9UsDmXUsHuPLaSdo3TQpdev3Ly
8Fwu9xhLV45FrQ+rUfKruQKBgQCvMWWYF/P7T3fxIx49ux9S+OzuL6SdBbpWo/9F
wEplT3UhE8/gQMXwti5oZBSbI4iqKWgC/iuW208XPWSvH6nlUPeGu0f8tusALFCM
iFgyHYQsqFfaxFrl18YxN/ZpS3R8sXFUQvCJ+l9Jaz5y54r1cxIgfBo6qswJSexO
Kq510QKBgQCsf5mY21WeWe2zbN+XZo+iVnOEsv76DAaVi06CJYv2ne8h9hV6sVyR
1HSQhDsAuYQkyQINpdAAQHLqLTCU1PnGrHXAawT4Wz32s+lmbYaDeOHJPDAZEXHE
2YU5az46KiZ4/ZLPEy1EoGaHVihiQJ2TRKtKbSztJkOxjmZoTDlDPA==
-----END RSA PRIVATE KEY-----
`;
		const module = await Test.createTestingModule({
			providers: [
				JwtService,
				{
					provide: JWTConstants.JWT_PUBLIC_KEY_TOKEN,
					useValue: pubKey,
				},
				{
					provide: JWTConstants.JWT_PRIVATE_KEY_TOKEN,
					useValue: privKey,
				},
				{
					provide: JWTConstants.JWT_EXPIRES_TOKEN,
					useValue: '7d',
				},
			],
		}).compile();

		service = module.get(JwtService);
	});

	it('should be defined', () => {
		expect(service).toBeTruthy();
	});

	it('should return a token', () => {
		const token = service.sign({ id: 123 });
		console.log(token);
		expect(token).toBeTruthy();
		expect(token.match(/\./g).length).toBe(2);
	});

	it('should be able to create a token then verify and decode it', () => {
		const token = service.sign({ id: 123 });
		const res = service.verify<{ id: 123 }>(token);
		expect(res).toBeTruthy();
		expect(res.id).toBe(123);
	});

	it('token expiry should be equal to 7 days', () => {
		const now = Date.now();
		const token = service.sign({ id: 123 });
		const res = service.verify<{ id: 123 }>(token);
		expect(res).toBeTruthy();
		expect(res.id).toBe(123);

		console.log(res.exp * 1000, now + 1000 * 60 * 60 * 24 * 7);
		expect(res.exp * 1000).toBeGreaterThanOrEqual(now + 1000 * 60 * 60 * 24 * 7);
	});
});
