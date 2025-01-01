const ps = require('ps-node');           
const nodemailer = require('nodemailer'); 
const twilio = require('twilio');
const os = require('os');
const fs = require('fs');
const config = require('./config'); 

const sendEmail = (message) => {
    const transporter = nodemailer.createTransport({
        service: config.SMTP.service,
        auth: {
            user: config.SMTP.user,
            pass: config.SMTP.pass
        }
    });

    const mailOptions = {
        from: config.SMTP.user,
        to: config.SMTP.recipient,
        subject: 'Alerte de performance VM',
        text: message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Erreur lors de l\'envoi de l\'email: ', error);
        } else {
            console.log('Email envoyé: ' + info.response);
        }
    });
};

const sendSms = (message) => {
    const client = twilio(config.TWILIO.accountSid, config.TWILIO.authToken);

    client.messages.create({
        body: message,
        from: config.TWILIO.from,
        to: config.TWILIO.to
    })
    .then((message) => console.log('SMS envoyé: ', message.sid))
    .catch((error) => console.error('Erreur lors de l\'envoi du SMS: ', error));
};

const checkCpuUsage = () => {
    const cpuUsage = os.loadavg()[0]; 

    if (cpuUsage > config.CPU_THRESHOLD) {
        sendAlert(`Alerte : L'utilisation du CPU est à ${cpuUsage}%`);
        suggestOptimization("CPU");
    }
};

const checkRamUsage = () => {
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    const ramUsage = (1 - (freeMemory / totalMemory)) * 100;

    if (ramUsage > config.RAM_THRESHOLD) {
        sendAlert(`Alerte : L'utilisation de la RAM est à ${ramUsage}%`);
        suggestOptimization("RAM");
    }
};

const checkDiskUsage = () => {
    const diskUsage = fs.statSync('/'); 
    const totalDiskSpace = diskUsage.size; 
    const usedDiskSpace = totalDiskSpace - fs.freemem();
    const diskUsagePercentage = (usedDiskSpace / totalDiskSpace) * 100;

    if (diskUsagePercentage > config.DISK_THRESHOLD) {
        sendAlert(`Alerte : L'utilisation du disque est à ${diskUsagePercentage}%`);
        suggestOptimization("Disque");
    }
};

const sendAlert = (message) => {
    if (config.NOTIFY_METHOD === 'email') {
        sendEmail(message);
    } else if (config.NOTIFY_METHOD === 'sms') {
        sendSms(message);
    } else {
        console.log('Méthode de notification invalide. Utilisez "email" ou "sms".');
    }
};

const suggestOptimization = (resource) => {
    switch (resource) {
        case 'CPU':
            console.log("Suggestion : Réduire les processus surchargés ou ajouter des cœurs CPU.");
            break;
        case 'RAM':
            console.log("Suggestion : Augmenter la RAM ou optimiser les applications.");
            break;
        case 'Disque':
            console.log("Suggestion : Libérer de l'espace disque ou augmenter l'espace disponible.");
            break;
        default:
            console.log("Aucune suggestion d'optimisation disponible.");
    }
};

const monitorResources = () => {
    console.log("Surveillance des ressources...");
    checkCpuUsage();
    checkRamUsage();
    checkDiskUsage();
};

monitorResources();
