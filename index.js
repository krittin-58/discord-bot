const Discord = require('discord.js');
const CoptechBot = new Discord.Client();
const moment = require('moment');

const mongoose = require('mongoose');
const { configDB } = require('./config/config');
const employeeSchema = require('./model/employee');

// Database
mongoose.connect(`mongodb+srv://${configDB.dbHost}:${configDB.dbPass}@cluster0-coptech-bot-discord-rsv4f.mongodb.net/${configDB.dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .once('open', () => console.log('Database is connected! === Discord CHECK-IN'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

const Employee = mongoose.model('employee', employeeSchema);

// BOT
CoptechBot.login('<Token discord bot>', () => {
}).catch((error) => console.log('error', error));

CoptechBot.on('ready', () => {
    console.log('Coptech Bot Ready!');
});

CoptechBot.on('message', async msg => {
    const username = msg.author.username;
    const id = msg.author.discriminator;
    const text = msg.content;
    const currentChannel = msg.channel.id;
    const checkInChannel = currentChannel;

    if (username !== '<bot name>' && id !== '<bot id>' && currentChannel === checkInChannel) {
        switch(text) {
            case 'check-in':
                await Employee.create({
                    name: username,
                    userId: id,
                    startWork: Date.now(),
                })
                msg.reply('บันทึกสำเร็จครับ มาทำงานเวลา : '+ moment().format('MMMM Do YYYY h:mm:ss') + "ออกงานอย่าลืมพิมพ์ bye ด้วยนะครับ")
                break;
            case 'check-out':
                await Employee.create({
                    name: username,
                    userId: id,
                    endWork: Date.now(),
                })
                msg.reply('บันทึกสำเร็จครับ ออกงานเวลา: '+ moment().format('MMMM Do YYYY h:mm:ss'))
                break;
            default:
                msg.reply('บันทึกผิดพลาดครับ โปรดลองใหม่อีกครั้ง ต้องการ (เข้างาน พิมพ์ check-in) || (ออกงาน พิมพ์ check-out)')
                break;
        }
    }
});

