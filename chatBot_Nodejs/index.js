const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '887263687:AAGC7TBiPIm7VwAK2iG3rqmXKtS0k68HnxI';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});
var IdMiChat = 000;//cambiar por tu ID del chat

var SerialPort = require('serialport');
var MiPuerto = new SerialPort('/dev/ttyUSB0', {
  baudRate: 9600,
  autoOpen: true
});
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  console.log("El ID del char" + chatId);
  var Mensaje = msg.text;
  if (Mensaje == "Encender") {
    console.log("encendiendo el led");
    bot.sendMessage(chatId, 'Entendido Encendere el led');
    MiPuerto.write("H");
  } else if (Mensaje == "Apagar") {
    console.log("apagar el led");
    bot.sendMessage(chatId, 'Entendido Apagare el led');
    MiPuerto.write("L");
  }
});
MiPuerto.setEncoding('utf8');

MiPuerto.on('data', function(data) {
  console.log("Lo que entro es " + data);
  if (data[0] == 'H') {
    console.log("Boton Precionado");
    bot.sendMessage(IdMiChat, "Se preciono el boton");
  }
});
