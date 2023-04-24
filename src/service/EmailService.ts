// email.service.ts
import nodemailer, { Transporter } from 'nodemailer';

export class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'vinh.dang23@student.passerellesnumeriques.org',
                pass: 'vlwkakeaqkdemdet',
            },
        });
    }

    public async sendEmail(to: string, subject: string, text: string): Promise<boolean> {
        const mailOptions = {
            from: 'vinh.dang23@student.passerellesnumeriques.org',
            to,
            subject,
            text,
        };

        try {
            await this.transporter.sendMail(mailOptions);
            console.log(`Email sent to ${to} with subject "${subject}"`);
            return true;
        } catch (error) {

            console.error(`Error sending email to ${to}: ${error.message}`);
            return false;

        }
    }
}
