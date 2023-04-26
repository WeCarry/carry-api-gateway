export const generateRandomCode = (): string => {
	// Generate a random number between 0 and 999999
	const randomNumber = Math.floor(Math.random() * 1000000);

	// Convert the number to a 6-digit string by padding it with leading zeros
	const sixDigitCode = randomNumber.toString().padStart(6, '0');

	return sixDigitCode;
};
