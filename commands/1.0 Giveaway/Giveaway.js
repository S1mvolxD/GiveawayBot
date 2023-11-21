module.exports = [{
    name: "giveaway",
    aliases: "gstart",
    code: `
    $setMessageVar[host;$authorID;$get[id]]
    $setMessageVar[win;$message[2];$get[id]]
    $setMessageVar[time;$message[1];$get[id]]
    $setMessageVar[date;$dateStamp;$get[id]]
    $setMessageVar[prize;$messageSlice[2];$get[id]]

    $setTimeout[gw;$get[sc]s;{
        "cid":"$channelID",
        "date":"$dateStamp",
        "time":"$message[1]",
        "host":"$authorID",
        "win":"$message[2]",
        "mid":"$get[id]",
        "prize":"$messageSlice[2]"
        }]

    $let[sc;$splitText[1]$textSplit[$math[$get[p]/1000];.]]
    $let[id;$sendMessage[
        {reactions:🎉} 
        {newEmbed:
            {title:The beginning of the drawing.}
            {description:
                • Ending: <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R> (<t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:D>)
                • Organizer: <@!$authorID>
                • Prize: **$messageSlice[2]**
                • Winners: **$message[2]**} 
{color:$getVar[color]}};true]]
    
    $onlyIf[$messageSlice[2]!=;{newEmbed:{title:Error}{description:**The prize must be awarded**
    **Proper use:**
    \`$getGuildVar[prefix]gstart [Time] [Winners] [Prize]\`}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]
    $onlyIf[$isNumber[$message[2]]==true;{newEmbed:{title:Error}{description:**The specified winner must be a number and above 0**
    **Proper use:**
    \`$getGuildVar[prefix]gstart [Time] [Winners] [Prize]\`}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]

    $onlyIf[$get[p]!=-1;{newEmbed:{title:Error}{description:**The specified time is invalid, please specify the correct time, for example**
        \`1s, 1m, 1h, 1d\`** Proper use: **
        \`$getGuildVar[prefix]gstart [Time] [Winners] [Prize]\`}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]
    $let[p;$parseTime[$if[$message[1]!=;$message[1];1s10ms]]]

$onlyPerms[managemessages;{newEmbed:{title:Permissons Error User}{description:Sorry, but you don't have permission to "Manage Messages"}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]
$onlyPerms[managechannels;{newEmbed:{title:Permissons Error User}{description:Sorry, but you don't have permission to "Manage Channels"}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]

$onlyClientPerms[managechannels;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Manage channels"}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]
$onlyClientPerms[addreactions;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Add reactions"}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]
$onlyClientPerms[managemessages;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Manage Messages"}{color:Red}{footer:Error ~ $username[$authorID]:$authorAvatar}}]$suppressErrors
    `
},{
    name: "gw",
    type: "timeout",
    code: `
    $editMessage[$timeoutData[mid];{newEmbed:{title:The drawing is over.} {description:
        • Ending: <t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:R> (<t:$splitText[1]$textSplit[$math[($datestamp+$parseTime[$message[1]])/1000];.]:D>)
        • Organizer: <@!$timeoutData[host]>
        • Prize: **$timeoutData[prize]**
        • Winners: $if[$get[random]==;No winner **(no participant)**;$get[random]]} {color:$getVar[color]}};$timeoutData[cid]]
        
        $channelSendMessage[$timeoutData[cid];$if[$get[random]!=;
        Congratulations $get[random] You won **$timeoutData[prize]**;Not enough participants]]
        
        $let[random;$djsEval[
        var arrayy = "$getReactions[$timeoutData[cid];$timeoutData[mid];🎉;true;id]".split(",")
        arrayy.splice(arrayy.indexOf("$clientId"),1)
        var array = arrayy
        var win = ""
        let u = $timeoutData[win]
        while (u != 0 && array.length > 0) {
        let r = Math.floor(Math.random()*array.length); 
        win += "<@!"+array[r]+">" + " "
        array.splice(array.indexOf(array[r]), 1)
        
        u = u - 1
        
        }
        win.split(" ").filter(function(a) {
        return a!='<@!undefined>' && a != ''
        }).join(", ")
        ;true]]
        $onlyIf[$getMessage[$timeoutData[cid];$timeoutData[mid]]!=The distribution is complete!;]
        $suppressErrors
    `
}]
