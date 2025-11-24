import sgMail from "@sendgrid/mail";

if (process.env.SENDGRID_API_KEY) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
}

export const sendEmail = async ({
    to,
    subject,
    html,
}: {
    to: string;
    subject: string;
    html: string;
}) => {
    if (!process.env.SENDGRID_API_KEY) {
        console.warn("SENDGRID_API_KEY is not set. Email not sent.");
        return;
    }

    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL || "noreply@loopify.app", // Change to your verified sender
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        console.log(`Email sent to ${to}`);
    } catch (error) {
        console.error("Error sending email:", error);
        if ((error as any).response) {
            console.error((error as any).response.body);
        }
        throw error;
    }
};
