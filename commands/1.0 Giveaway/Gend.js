module.exports = [{
    name: "gend",
    code: `
$editMessage[$message[1];{newEmbed:{title:The drawing is over.} {description:
    Organizer: <@!$getMessageVar[host;$message[1]]>
    Prize: **$getMessageVar[prize;$message[1]]**
Winner (Lee): $if[$get[random]==;No winner (no participant);$get[random]]} {color:$getVar[color]}};$channelID]
$SendMessage[$if[$get[random]!=;Congratulations $get[random] 
You won **$getMessageVar[prize;$message[1]]**;Not enough participants]]

$let[random;$djsEval[
var arrayy = "$getReactions[$channelID;$message[1];🎉;true;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = $getMessageVar[win;$message[1]]
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
$onlyIf[$getMessage[$channelID;$message[1]]!=The distribution is complete!;The provided distribution ID has already ended or is invalid]
$onlyIf[$message[1]!=;{newEmbed:{title:Error MessageID}{description:Give a valid message ID}{color:Red}}]

$onlyPerms[managemessages;{newEmbed:{title:Permissons Error User}{description:Sorry, but you don't have permission to "Manage Messages"}{color:Red}}]
$onlyPerms[managechannels;{newEmbed:{title:Permissons Error User}{description:Sorry, but you don't have permission to "Manage Channels"}{color:Red}}]

$onlyClientPerms[managechannels;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Manage channels"}{color:Red}}]
$onlyClientPerms[addreactions;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Add reactions"}{color:Red}}]
$onlyClientPerms[managemessages;{newEmbed:{title:Permissons Error Bot}{description:Sorry, but I don't have permission to "Manage Messages"}{color:Red}}]
$suppressErrors`
}]
