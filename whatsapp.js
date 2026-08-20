//installer "puppeteer": "^24.4.0", et "puppeteer-core": "^24.4.0",

// // const { Client, LocalAuth }=require('whatsapp-web.js');
// const qrcode=require('qrcode-terminal');

// // Création du client WhatsApp Web
// const client = new Client({
//     puppeteer: {// (1) l'installation dans package et dans heroku('...') a fait contourner l'erreur de puppeteer introuvable
//         args: ['--no-sandbox', // (2) fait ignorer ces arguments à fait contourner la deuxieme erreur
//       '--disable-setuid-sandbox',
//       '--disable-dev-shm-usage', // Réduit l'utilisation de /dev/shm
//       '--disable-gpu', // Désactive le GPU (inutile sur un serveur)
//       '--single-process']// (3) il reste l'erreur sur le depassement de la memoire allouée par heroku
//     },
//     authStrategy: new LocalAuth(), // Sauvegarde la session
// });

// // Affichage du QR Code pour la connexion
// client.on('qr', (qr) => {
//     console.log('Scanne ce QR Code avec WhatsApp Web :');
//     qrcode.generate(qr, { small: true });
// });

// // Quand le bot est prêt
// client.on('ready', () => {
//     console.log('Bot connecté à WhatsApp !');
// });

// const groupName='Labo Central';
// module.exports.sendToWhatsApp=async function (message) {
        
//     const chats = await client.getChats();
//     const group = chats.find(chat => chat.isGroup && chat.name === groupName);
//     if (group) {
//         await group.sendMessage(message);
//         console.log(`Message envoyé au groupe : ${message}`);
//     } else {
//         console.log('Groupe introuvable. Vérifie le nom !');
//     }
// }

// client.initialize();

// // export { sendToWhatsApp };
