module.exports = [{
    name: "greroll",
    code: `
$editMessage[$message[1];{newEmbed:{title:Розыгрыш закончен.} {description:
    Организатор: <@!$getMessageVar[host;$message[1]]>
    Приз: **$getMessageVar[prize;$message[1]]**
Победитель(ли): $if[$get[random]==;Нет победителя (нет участника);$get[random]]} {color:$getServerVar[color]}};$channelID]
$SendMessage[$if[$get[random]!=;Congrats $get[random] you won **$getMessageVar[prize;$message[1]]**;Not enough participants]]

$let[random;$djsEval[
var arrayy = "$getReactions[$channelID;$message[1];🎉;true;id]".split(",")
arrayy.splice(arrayy.indexOf("$clientId"),1)
var array = arrayy
var win = ""
let u = 1
while (u != 0 && array.length > 0) {
let r = Math.floor(Math.random()*array.length); 
win += "<@!"+array[r]+">" + " "
array.splice(array.indexOf(array[r]), 1)

u = u - 1

}
win.split(" ").filter(function(a) {

return a!='<@!undefined>' && a != '' && a != 'undefined'

}).join(", ")

;true]]
$onlyIf[$getMessage[$channelID;$message[1]]==Раздача завершена!;
Розыгрыш с указанным идентификатором еще не завершен или недействителен]
$onlyIf[$message[1]!=;Укажите действительный идентификатор сообщения]

$onlyPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять сообщениями"}{color:Red}}]
$onlyPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у вас отсутствует разрашение на "Управлять каналами"}{color:Red}}]

$onlyClientPerms[managechannels;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять каналами"}{color:Red}}]
$onlyClientPerms[addreactions;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Добалять реакции"}{color:Red}}]
$onlyClientPerms[managemessages;{newEmbed:{title:Ошибка}{description:Извените но, у бота отсутствует разрашение на "Управлять сообщениями"}{color:Red}}]
$suppressErrors
`
}]