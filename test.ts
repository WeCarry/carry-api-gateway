import { Encryption } from './src/common/config/encrypt.config';
async function main() {
	const hashedPass = await Encryption.hashPassword('123456789');
	console.log(hashedPass);
	const compare = await Encryption.comparePassword('123456789', hashedPass);
	console.log(compare);
}
main();
