import twilio from "twilio";

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

let client: twilio.Twilio | null = null;

if (accountSid && authToken) {
    client = twilio(accountSid, authToken);
}

export const sendSMS = async ({ to, body }: { to: string; body: string }) => {
    if (!client || !fromNumber) {
        console.warn("Twilio credentials not set. SMS not sent.");
        return;
    }

    try {
        await client.messages.create({
            body,
            from: fromNumber,
            to,
        });
        console.log(`SMS sent to ${to}`);
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
};
