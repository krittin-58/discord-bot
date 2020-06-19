const Discord = require('discord.js');
const CoptechBot = new Discord.Client();
const moment = require('moment');

const mongoose = require('mongoose');
const { configDB } = require('./config/config');
const employeeSchema = require('./model/employee');

// Database
mongoose.connect(`mongodb://${configDB.dbHost}:${configDB.dbPort}:${configDB.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection
    .once('open', () => console.log('Database is connected! === Discord CHECK-IN'))
    .on('error', (error) => {
        console.warn('Warning', error);
    });

const Employee = mongoose.model('employee', employeeSchema);

// BOT
CoptechBot.login('NzIzMDQ4NDc5NzQzNjcyMzMx.Xuw-bw.NppptSO67TKoOkqiY6qzffjx0Rw', () => {
}).catch((error) => console.log('error', error));

CoptechBot.on('ready', () => {
    console.log('Coptech Bot Ready!');
});

CoptechBot.on('message', async msg => {
    const username = msg.author.username;
    const id = msg.author.discriminator;
    const text = msg.content;
    const currentChannel = msg.channel.id;
    const checkInChannel = 'เช็คชื่อ';

    if (username !== 'Coptech Bot' && id !== '4747' && currentChannel === checkInChannel) {
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

