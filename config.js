module.exports = {
    CPU_THRESHOLD: 85,
    RAM_THRESHOLD: 85,
    DISK_THRESHOLD: 85,

    SMTP: {
        service: 'gmail',       
        user: 'your_email@gmail.com',
        pass: 'your_email_password',
        recipient: 'recipient_email@example.com'
    },

    TWILIO: {
        accountSid: 'your_account_sid',
        authToken: 'your_auth_token',
        from: 'your_twilio_phone_number',
        to: 'recipient_phone_number'
    },

    NOTIFY_METHOD: 'email' // Ou 'sms'
};
