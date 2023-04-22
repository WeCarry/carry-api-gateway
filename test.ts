import { Encryption } from './src/common/config/encrypt.config';
import dotenv from 'dotenv';
dotenv.config();
import { sendVerificationEmail } from './src/common/notifications/email.notification';

async function main() {
	// const hashedPass = await Encryption.hashPassword('123456789');
	// console.log(hashedPass);
	// const compare = await Encryption.comparePassword('123456789', hashedPass);
	// console.log(compare);

	const res = await sendVerificationEmail(
		'b.fayyoz2000@gmail.com',
		'Salom Uzbekistano'
	);
	console.log(res);
}
main();
