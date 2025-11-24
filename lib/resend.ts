import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!process.env.RESEND_API_KEY || !resend) {
        console.warn("RESEND_API_KEY is not set. Email not sent.");
        return;
    }

    try {
        const data = await resend.emails.send({
            from: 'Loopify <onboarding@resend.dev>', // Default testing domain
            to: [to],
            subject: subject,
            html: html,
        });
        console.log(`Email sent to ${to}`, data);
        return data;
    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};
