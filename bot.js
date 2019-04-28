const Discord = require('discord.js'),
    client = new Discord.Client(),
    config = require('./config.json'),
    //db = require('quick.db');
    low = require('lowdb'),
    FileSync = require('lowdb/adapters/FileSync'),
    path = require('path'),
    db = low(new FileSync(path.join(__dirname, 'db.json')));
/*Leaderboard = require('leaderboard-promise'),
    lb = new Leaderboard('xp');

var users = db.all();
users.forEach(inf => {
    lb.add(inf.ID, inf.data.xp);
});*/

db.defaults({}).write();

function translateToDamage(number) {
    if (number >= 1 && number <= 9) {
        return 0;
    }
    if (number >= 10 && number <= 19) {
        return 1;
    }
    if (number >= 20 && number <= 24) {
        return 2;
    }
    if (number >= 25 && number <= 29) {
        return 3;
    }
    if (number >= 30 && number <= 34) {
        return 4;
    }
    if (number >= 35 && number <= 39) {
        return 5;
    }
    if (number >= 40 && number <= 44) {
        return 6;
    }
    if (number >= 45 && number <= 49) {
        return 7;
    }
    if (number >= 50 && number <= 54) {
        return 8;
    }
    if (number >= 55 && number <= 59) {
        return 9;
    }
    if (number >= 60 && number <= 64) {
        return 10;
    }
    if (number >= 65 && number <= 69) {
        return 11;
    }
    if (number >= 70 && number <= 74) {
        return 12;
    }
    if (number >= 75 && number <= 79) {
        return 13;
    }
    if (number >= 80 && number <= 84) {
        return 14;
    }
    if (number >= 85 && number <= 89) {
        return 15;
    }
    if (number === 90) {
        return 16;
    }
    if (number === 91) {
        return 17;
    }
    if (number === 92) {
        return 18;
    }
    if (number === 93) {
        return 19;
    }
    if (number === 94) {
        return 20;
    }
    if (number === 95) {
        return 21;
    }
    if (number === 96) {
        return 22;
    }
    if (number === 97) {
        return 23;
    }
    if (number === 98) {
        return 24;
    }
    if (number === 99) {
        return 25;
    }
    if (number === 100) {
        return 26;
    }
}

client.on('ready', () => {
    console.log('ready');
    client.on('message', async (msg) => {
        if (msg.content.includes(`${config.prefix}r`)) {
            if (msg.content == `${config.prefix}r`) {
                return msg.channel.send(new Discord.RichEmbed()
                    .setColor("36393F")
                    .setDescription(`You forgot to tell me how many dice you want to role and how many sides. Example \`!r3d80\` - roles 3 dice with 80 sides`)
                );
            }
            if (!msg.content.includes(" ")) {
                return msg.channel.send(new Discord.RichEmbed()
                    .setColor("36393F")
                    .setDescription(`You need to put a space between ${config.prefix}r and XdXX (x being a number)`)
                );
            }
            if (!msg.content.includes("d")) {
                return msg.channel.send(new Discord.RichEmbed()
                    .setColor("36393F")
                    .setDescription(`The command must be set out like this: XdXX. X being how many dice and XX being how many sides.`)
                );
            }
            var dices = parseInt(msg.content.split('+')[0].split('d')[0].replace("!r ", ""));
            var sides;
            var needsAdded;
            if (msg.content.includes('+')) {
                sides = parseInt(msg.content.split('+')[0].split('d')[1]);
                needsAdded = parseInt(msg.content.split('+')[1]);
            } else {
                sides = parseInt(msg.content.split('d')[1]);
                needsAdded = null;
            }
            var dicenumbers = [];
            var damages = [];
            var damage = 0;
            for (var i = 0; i < dices; i++) {
                var dicenumber = Math.floor(Math.random() * sides) + 1;
                dicenumbers.push(dicenumber);
                damages.push(translateToDamage(dicenumber));
                damage += translateToDamage(dicenumber);
            }
            if (needsAdded) {
                damage += needsAdded;
            }
            var Damages = "";
            var diceNumbers = "";
            var NeedsAdded = "";
            if (needsAdded) {
                NeedsAdded = ` + ${needsAdded}`;
            }
            damages.forEach(damage => {
                Damages += ` + ${damage}`;
            });
            dicenumbers.forEach(dicenumber => {
                diceNumbers += `, ${dicenumber}`;
            });
            var critical;
            if (dicenumbers.includes(sides)) {
                critical = `\nYou got a critical hit! Your damage has been doubled to ${damage * 2}`;
            } else critical = "";
            if (dicenumbers.includes(1)) {
                msg.channel.send(new Discord.RichEmbed()
                    .setTitle(`${dices} dice rolled with ${sides} sides`)
                    .setColor("36393F")
                    .setDescription(`Dice threw: ${diceNumbers.replace(', ', '')}\nUnlucky, you rolled a 1. [BOTCHED]`)
                );
            } else {
                msg.channel.send(new Discord.RichEmbed()
                    .setTitle(`${dices} dice rolled with ${sides} sides`)
                    .setColor("36393F")
                    .setDescription(`Dice threw: ${diceNumbers.replace(', ', '')}\nDamage: [ ${Damages.replace(" + ", "")} ]${NeedsAdded} = ${damage}.${critical}\nDon't believe the damage? [Heres proof as a table](https://fiverr-res.cloudinary.com/image/upload/q_auto,f_auto/v1/message_attachements/558739479/original/dice.png?__cld_token__=exp=1549308786~hmac=c6c9c2cefe733eccbc0eab96967fbd77088685c48e257e6a5d5b2cc7bcad1c17).`)
                );
            }
        } else if (msg.content.includes(`${config.prefix}ranks`)) {
            var message = await msg.channel.send('Calculating...');
            for (var indexed = 0; indexed < 10; indexed++) {

            }
        } else if (msg.content.includes(`${config.prefix}xp`)) {
            var args = msg.content.split(" ");
            var user;
            if (msg.content === `${config.prefix}xp`) {
                if (!db.get(`${msg.author.id}.xp`).value()) {
                    return msg.channel.send(new Discord.RichEmbed()
                        .setColor("36393F")
                        .setTitle(`Your XP`)
                        .setDescription(`You have 0 XP`)
                    );
                } else {
                    return msg.channel.send(new Discord.RichEmbed()
                        .setColor("36393F")
                        .setTitle(`Your XP`)
                        .setDescription(`You have ${db.get(`${msg.author.id}.xp`).value()} XP`)
                    );
                }
            } else if (msg.mentions.members.first()) {
                user = client.users.get(msg.mentions.members.first().id);
            } else if (Number.isInteger(args[0]) && args[0].length === 18) {
                user = client.users.get(args[0]);
            } else {
                return msg.channel.send(new Discord.RichEmbed()
                    .setColor("36393F")
                    .setDescription(`Incorrect user type. Must be a mention or an ID (IDs are usually 18 numbers long)`)
                );
            }
            if (args.length === 3) {
                if (msg.member.roles.has(msg.guild.roles.find(r => r.name == 'Records').id)) {
                    var xpToAdd = parseInt(args[2]);
                    if (!db.get(`${user.id}`).value() || !db.get(`${user.id}.xp`).value() || db.get(`${user.id}.xp`).value() === 0) {
                        db.set(user.id, {
                            xp: xpToAdd
                        }).write();;
                        return msg.channel.send(new Discord.RichEmbed()
                            .setColor("36393F")
                            .setTitle(`${xpToAdd} Added`)
                            .setDescription(`${user.tag}'s now has ${db.get(`${user.id}.xp`).value()} XP`)
                        );
                    } else {
                        db.set(user.id, {
                            xp: db.get(`${user.id}.xp`).value() + xpToAdd
                        }).write();
                        return msg.channel.send(new Discord.RichEmbed()
                            .setColor("36393F")
                            .setTitle(`${xpToAdd} Added`)
                            .setDescription(`${user.tag}'s now has ${db.get(`${user.id}.xp`).value()} XP`)
                        );
                    }
                } else {
                    msg.channel.send('Sorry, you need the role named "Records" to add or remove XP from a user.');
                }
            } else {
                args = msg.content.replace(`${config.prefix}xp`).split(" ");
                var userinfo = db.get(`${user.id}`).value();
                if (!userinfo || !userinfo.xp) {
                    return msg.channel.send(new Discord.RichEmbed()
                        .setColor("36393F")
                        .setTitle(`${user.tag}'s XP`)
                        .setDescription(`${user.tag} has 0 XP`)
                    );
                } else {
                    return msg.channel.send(new Discord.RichEmbed()
                        .setColor("36393F")
                        .setTitle(`${user.tag}'s XP`)
                        .setDescription(`${user.tag} has ${db.get(`${user.id}.xp`).value()} XP`)
                    );
                }
            }
        }
    });
});

client.login(config.token);