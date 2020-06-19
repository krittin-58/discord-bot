### config.js
````
const configDB = {
    dbHost: "localhost",
    dbPort: "27017",
    dbName: "discord-checkin",
    dbPass: "123456",
};

const configDiscord = {
    tokenBot: '<TOKEN BOT HERE>',
    botName: 'YOU NAME BOT',
    botId: 'YOU BOT ID',
};

````
### index.js
- This case, I used cloud.mongodb.com be cluster database.
````
// Database
mongoose.connect(`mongodb+srv://${configDB.dbHost}:${configDB.dbPass}@cluster0-coptech-bot-discord-rsv4f.mongodb.net/${configDB.dbName}?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true});
````
- This case, use mongodb compass community | credit
````
mongoose.connect(`mongodb://${configDB.dbHost}:${configDB.dbPort}/${configDB.dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
````

# discord-bot-features
- [x] Check-in
- [x] Check-out
- [x] NoSQL used MongoDB

# Next update
- [ ] store.steampowered.com
- [ ] star wars movie infomation api
- [ ] iss location tracker

# thank & credit
- https://medium.com/@athi.lhong/d720c41219d1 ==> Check-in & Check-out
