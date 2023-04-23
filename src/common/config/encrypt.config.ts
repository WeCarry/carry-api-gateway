import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import * as crypto from 'crypto';

export class Encryption {
	private static SALT_ROUNDS = 10;
	private static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
	private static JWT_REFRESH_SECRET =
		process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key';

	// Password hashing
	public static async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, Encryption.SALT_ROUNDS);
	}

	// Password hashing
	public static async createSalt(): Promise<string> {
		return await bcrypt.genSalt(Encryption.SALT_ROUNDS);
	}

	public static async comparePassword(
		password: string,
		hash: string
	): Promise<boolean> {
		return await bcrypt.compare(password, hash);
	}

	// JSON Web Token encoding and decoding
	public static createToken(
		payload: object,
		expiresIn: string | number = '1h'
	): string {
		return jwt.sign(payload, Encryption.JWT_SECRET, { expiresIn });
	}

	public static verifyToken(token: string): any {
		try {
			return jwt.verify(token, Encryption.JWT_SECRET);
		} catch (error) {
			throw error;
		}
	}

	// Refresh Token encoding and decoding
	public static createRefreshToken(
		payload: object,
		expiresIn: string | number = '7d'
	): string {
		return jwt.sign(payload, Encryption.JWT_REFRESH_SECRET, { expiresIn });
	}

	public static verifyRefreshToken(token: string): any {
		try {
			return jwt.verify(token, Encryption.JWT_REFRESH_SECRET);
		} catch (error) {
			throw new Error('Invalid refresh token');
		}
	}

	public static createHashWithSalt(refreshId: string): {
		hash: string;
		salt: crypto.KeyObject;
	} {
		const salt = crypto.createSecretKey(crypto.randomBytes(16));
		const hash = crypto
			.createHmac('sha512', salt)
			.update(refreshId)
			.digest('base64');
		return { hash, salt };
	}
}
