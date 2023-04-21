import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

export class Encryption {
    private static SALT_ROUNDS = 10;
    private static JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

    // Password hashing
    public static async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, Encryption.SALT_ROUNDS);
    }

    public static async comparePassword(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

    // JSON Web Token encoding and decoding
    public static createToken(payload: object, expiresIn: string | number = '1h'): string {
        return jwt.sign(payload, Encryption.JWT_SECRET, { expiresIn });
    }

    public static verifyToken(token: string): any {
        try {
            return jwt.verify(token, Encryption.JWT_SECRET);
        } catch (error) {
            throw new Error('Invalid token');
        }
    }
}
