import nodemailer from 'nodemailer';
import path from 'path';
import fs from 'fs';
import handlebars from 'handlebars';


// Configure your email account and credentials
const transporter = nodemailer.createTransport({
	host: 'smtp-relay.sendinblue.com',
	port: 587,
	secure: false, // use TLS
	auth: {
		user: process.env.MAILER_EMAIL, // replace with your SMTP Login from Sendinblue
		pass: process.env.MAILER_PASSWORD, // replace with your SMTP Password from Sendinblue
	},
});

export async function sendVerificationEmail(
	to: string,
	token: string
): Promise<void> {
	try {
		// Read the email template
		const templatePath = path.resolve(
			__dirname,
			'./signup-email-template.html'
		);
		const templateSource = fs.readFileSync(templatePath, 'utf8');
		// Compile the template with Handlebars
		const template = handlebars.compile(templateSource);
		const emailData = {
			userFirstName: 'John Doe',
			verificationUrl: 'https://www.google.com',
		};
		// Render the template with the email data
		const html = template(emailData);
		const mailOptions = {
			from: 'info@carry.uz',
			to,
			subject: 'Email Verification',
			html,
		};

		await transporter.sendMail(mailOptions);
		console.log(`Verification email sent to ${to}`);
	} catch (error) {
		console.error(
			`Error sending verification email: ${(error as any).message}`
		);
	}
}
