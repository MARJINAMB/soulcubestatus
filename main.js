// https://gist.github.com/vegeta897/e4410669c921c2ab7635e1d0153b0bc6
const Discord = require('discord.js');
const client = new Discord.Client();
client.login('NzA1NTMwNzU1NjQzNjA1MDMy.XqtCvA.kQsGRCQ-lfVFIJwBvsJV6t-tFyo');
const Repeat = require("repeat")


var request = require('request');
var mcCommand = '/minecraft'; // Command for triggering
var mcIP = 'mc.soulcubenw.com'; // Your MC server IP


client.on("ready", () =>{
	console.log(`Bot is ready! ${client.user.username}`);	
	Repeat(updateStatus).every(20000, 'ms').for(999999999, 'h').start.in(1, 'sec');
});


function updateStatus(){
	var url = 'http://mcapi.us/server/status?ip=' + mcIP;
	request(url, function(err, response, body) {
		if(err) {
			console.log(err);
		}else{
			body = JSON.parse(body);
			if(body.online) {
				var playersnow = 0;
				if(body.players.now) {
					playersnow = body.players.now;
				} 
				out = "✅ Online   "+playersnow+"/"+body.players.max;
				client.user.setActivity(out, { type: 'PLAYING' });
				console.log("Online");
			}else{
				out = "❌ Offline ❌";
				console.log(out);
				client.user.setActivity(out, { type: 'PLAYING' });
				console.log("Offline");
			}
		}
	});
}