const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");
client.on('ready', async =>{
    console.log(`${client.user.username} Is now online ready to server ${client.guilds.cache.size} server or servers!`);
    console.log(`Bot Created By: Mythic#6219`)
});



client.on('guildMemberAdd', async member =>{
    const WelcomeChannel = member.guild.channels.cache.find(ch => ch.id === config.Welcome_Channel_Information.welcome_channel_id)
    if (!WelcomeChannel) return console.log(`I could not find the welcome channel! Please make sure the welcome channel ID is setup correctly in the config.json.`);
    
    const WelcomeRole = member.guild.roles.cache.find(role => role.id === config.Welcome_Channel_Information.join_role_id);
    if (!WelcomeRole) return console.log(`I could not find the welcome role! Please make sure it is setup correctly in the config.json.`)


    const WelcomeEmbed = new Discord.MessageEmbed()
    .setTitle(config.Welcome_Embed_Information.embed_title)
    .setDescription(config.Welcome_Embed_Information.embed_description)
    .setFooter(`We Currently Have ${member.guild.memberCount} Members!`)
    .setTimestamp()
    .setColor(config.Welcome_Embed_Information.embed_color)
    WelcomeChannel.send(WelcomeEmbed)

    member.roles.add(WelcomeRole)
    const MemberCountChannel = member.guild.channels.cache.find(ch => ch.id === config.Welcome_Channel_Information.member_count_channel_id).setName(`Member Count: ${member.guild.memberCount}`);
    if (!MemberCountChannel) return console.log(`I could not find the member count channel! Please make sure it is setup correctly in the config.json.`)

});

client.on('guildMemberRemove', async member =>{
    const LeaveChannel = member.guild.channels.cache.find(ch => ch.id === config.Leave_Channel_Information.leave_channel_id)
    if (!LeaveChannel) return console.log(`I could not find the leave channel! Please make sure the leave channel ID is setup correctly in the config.json.`);
    
    const LeaveEmbed = new Discord.MessageEmbed()
    .setTitle(config.Leave_Embed_Information.embed_title)
    .setDescription(config.Leave_Embed_Information.embed_description)
    .setFooter(`We Currently Have ${member.guild.memberCount} Members!`)
    .setTimestamp()
    .setColor(config.Leave_Embed_Information.embed_color)
    LeaveChannel.send(LeaveEmbed)

    const MemberCountChannel = member.guild.channels.cache.find(ch => ch.id === config.Welcome_Channel_Information.member_count_channel_id).setName(`Member Count: ${member.guild.memberCount}`);
    if (!MemberCountChannel) return console.log(`I could not find the member count channel! Please make sure it is setup correctly in the config.json.`)

});


client.login(config.Important_Information.bot_token)