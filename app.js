const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const XLSX = require('xlsx');





// Función para generar un tiempo de espera aleatorio entre un rango
function getRandomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min) * 1000; // convertir a milisegundos
}




// Leer el archivo Excel
const workbook = XLSX.readFile('datos.xlsx');
const worksheet = workbook.Sheets[workbook.SheetNames[0]];
const datos = XLSX.utils.sheet_to_json(worksheet);







// Inicializar el cliente de WhatsApp
const client = new Client({
    puppeteer: {
        headless: true,
    },
});


//generador de codigo QR
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', async () => {
    console.log('Client is ready!');







    // Enviar mensaje a cada persona en la lista
    for (const persona of datos) {
        if (persona.telefono) {  // Asegúrate de que el número no esté vacío
            const chatId = `${persona.telefono}@c.us`;
            // Crear mensaje personalizado usando los datos del Excel
            const mensajePersonalizado = `🔰¡Parce, si llenás un grupo de Telegram con miles de personas, te volvés un berraco para hacer plata! Aquí te tiro unas ideas bien aterrizadas pero exageradas pa’ que entendás cómo llenarte los bolsillos:\n\nPublicidad directa: Las marcas te van a rogar, “¡Parce, metenos un anuncio!”, y vos les cobrás un billete largo por cada publicación. 🤑\n\nContenido premium: Vendé acceso a un grupo VIP, algo como \"La crema y nata del grupo\", y cobrás mensualidades como si fueras Netflix. 🎬\n\nAfiliados en masa: Publicás enlaces de Amazon, Aliexpress o lo que sea y, ¡BOOM!, cada compra te deja billete. Sin sudar, parce. 💸\n\nCursos y talleres: Montá cursos pa’ que aprendan algo bacano y cobrás como si fueras Harvard. 🎓\n\nRifas y premios: “Parce, por $10 entrás a la rifa de un PlayStation.” Te llenás de plata con solo organizar rifitas. 🎮\n\nNetworking de cracks: Vendé el grupo como el lugar donde están “los duros” y poné una tarifa pa’ entrar. Como si fuera un club exclusivo, pero virtual. 💼\n\nBots automáticos: Cobrá a las empresas por usar bots en tu grupo que contesten y promocionen cosas. Vos te quedás con la tajada. 🤖\n\nVende el grupo: Cuando lo tengás lleno, alguien con billete va a querer comprarlo. Vendés y te haces el sueldo de un año en un día. 💥\n\nEventos exclusivos: Organizá webinars o charlas pa’ los del grupo, y cobrás la entrada como si trajeras a Messi. 🎤\n\nMerchandising del grupo: Sacá camisetas, gorras, stickers con frases del grupo y vendés todo. Eso pega, parce. 👕\n\nSi lo hacés bien, en menos de lo que canta un gallo, ¡estás facturando como los grandes! ¿Entonces qué? ¡A llenar ese grupo, papá! 🚀  https://youtu.be/ou54ezhUC_U`;

            try {
                const response = await client.sendMessage(chatId, mensajePersonalizado);
                console.log(`Mensaje enviado a ${persona.telefono}:`, response);

                // Esperar un tiempo aleatorio entre 10 y 30 segundos antes del próximo mensaje
                const delay = getRandomDelay(1, 10);
                console.log(`Esperando ${delay / 1000} segundos antes del próximo mensaje...`);
                await new Promise(resolve => setTimeout(resolve, delay));

            } catch (err) {
                console.error(`Error al enviar mensaje a ${persona.telefono}:`, err);
            }
        }
    }

    console.log('¡Todos los mensajes han sido enviados!');
});





// Opcional: escuchar todos los mensajes entrantes y comandos '!ping'
client.on('message_create', message => {
    console.log(message.body);

    if (message.body === '!ping') {
        message.reply('pong');
    }
});

client.initialize();