import { Encryption } from './src/common/config/encrypt.config';
import dotenv from 'dotenv';
dotenv.config();
import { sendVerificationEmail } from './src/common/notifications/email.notification';
class John {
	constructor() {
		console.log(John.prototype.constructor.name);
	}
}
async function main() {
	// const hashedPass = await Encryption.hashPassword('123456789');
	// console.log(hashedPass);
	// const compare = await Encryption.comparePassword('123456789', hashedPass);
	// console.log(compare);

	// const res = await sendVerificationEmail(
	// 	'b.fayyoz2000@gmail.com',
	// 	'Salom Uzbekistano'
	// );
	// console.log(res);

	// const token =
	// 	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDQ1NWY1YTE2ZDk0MTUzNTk1MGVlYjQiLCJ1c2VyVHlwZSI6IlBBU1NFTkdFUiIsInJlZnJlc2hLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOlsxMzksNDcsMjI3LDIzMSw2MiwxMjksMTI0LDQwLDI1Myw3OCwyMTcsMjUsMTU2LDEyOSwxODgsMTExXX0sImlhdCI6MTY4MjI2ODAyOCwiZXhwIjoxNjgyMjcxNjI4fQ.VCFMdu4OldDeGv5CZ5OI_hqmIwD1pWHAvki5nyczqUk';
	// const a = Encryption.verifyToken(token);
	// console.log(a);

	new John();
}
main();
